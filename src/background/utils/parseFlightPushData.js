/**
 * Parse RSC (React Server Components) Flight data from Next.js
 * Supports Next.js 13-16+ flight protocol formats
 *
 * Flight data format: key:value pairs where value can be:
 * - "$S..." - Symbol reference
 * - "I[...]" - Instance/Import
 * - "T..." - Text content
 * - "L[...]" - List/Array
 * - "O{...}" - Object
 * - "H[...]" - Hints (Next.js 16+)
 * - Plain JSON data
 */
function parseFlightPushData(flightChunk) {
  if (typeof flightChunk !== 'string') {
    return;
  }

  const parsed = [];
  let pos = 0;
  const len = flightChunk.length;

  const readUntilNewline = (start) => {
    const end = flightChunk.indexOf('\n', start);
    return {
      line: flightChunk.slice(start, end === -1 ? len : end),
      nextPos: end === -1 ? len : end + 1,
    };
  };

  while (pos < len) {
    // Skip empty/whitespace-only lines
    if (flightChunk[pos] === '\n') {
      pos++;
      continue;
    }

    const colonIndex = flightChunk.indexOf(':', pos);
    if (colonIndex === -1) {
      break;
    }

    const key = flightChunk.slice(pos, colonIndex);
    if (!/^\w+$/.test(key)) {
      // Malformed key; skip to the next newline and try again
      const nextNewline = flightChunk.indexOf('\n', pos);
      pos = nextNewline === -1 ? len : nextNewline + 1;
      continue;
    }

    const afterColon = colonIndex + 1;
    if (afterColon >= len) {
      break;
    }

    const typeChar = flightChunk[afterColon];

    // Symbol reference (e.g., "$Sreact.fragment", "$SR19")
    if (typeChar === '"') {
      const { line, nextPos } = readUntilNewline(afterColon);
      const value = line.slice(1, -1);
      const type = line.startsWith('"$S') ? 'Symbol' : 'Data';
      if (type === 'Symbol') {
        parsed.push({ type, key, value });
      } else {
        try {
          parsed.push({ type: 'Data', key, content: JSON.parse(line) });
        } catch {
          parsed.push({ type: 'Unknown', key, value: line });
        }
      }
      pos = nextPos;
    }
    // Text content
    else if (typeChar === 'T') {
      if (flightChunk[afterColon + 1] === '"') {
        // Legacy quoted format: T"text"
        const { line, nextPos } = readUntilNewline(afterColon);
        parsed.push({ type: 'Text', key, value: line.slice(2, -1) });
        pos = nextPos;
      } else {
        // Length-prefixed format: T<hex_len>,<text>
        const commaIndex = flightChunk.indexOf(',', afterColon);
        if (commaIndex === -1) {
          // Malformed; fall back to consuming the rest of the line
          const { line, nextPos } = readUntilNewline(afterColon);
          parsed.push({ type: 'Text', key, value: line.slice(1) });
          pos = nextPos;
          continue;
        }

        const hexLen = flightChunk.slice(afterColon + 1, commaIndex);
        const length = parseInt(hexLen, 16);
        const textStart = commaIndex + 1;

        // Extract exactly `length` UTF-8 bytes from the remaining string.
        // Each JS character needs at most 4 UTF-8 bytes, so a window of
        // `length` characters is guaranteed to cover `length` bytes.
        const remainingChars = len - textStart;
        const maxChars = Math.min(remainingChars, length);
        const windowStr = flightChunk.slice(textStart, textStart + maxChars);
        const windowBytes = new TextEncoder().encode(windowStr);

        let text;
        if (windowBytes.length < length) {
          // Not enough bytes left; take everything we have
          text = flightChunk.slice(textStart);
          pos = len;
        } else {
          const textBytes = windowBytes.slice(0, length);
          text = new TextDecoder().decode(textBytes);
          pos = textStart + text.length;
        }

        parsed.push({ type: 'Text', key, length, value: text });

        // Text rows may optionally be followed by a newline
        if (pos < len && flightChunk[pos] === '\n') {
          pos++;
        }
      }
    }
    // Instance/Import reference
    else if (typeChar === 'I') {
      const { line, nextPos } = readUntilNewline(afterColon);
      try {
        const content = JSON.parse(line.slice(1));
        parsed.push({ type: 'Instance', key, content });
      } catch {
        parsed.push({ type: 'Instance', key, raw: line });
      }
      pos = nextPos;
    }
    // List/Array
    else if (typeChar === 'L') {
      const { line, nextPos } = readUntilNewline(afterColon);
      try {
        const list = JSON.parse(line.slice(1));
        parsed.push({ type: 'List', key, content: list });
      } catch {
        parsed.push({ type: 'List', key, raw: line });
      }
      pos = nextPos;
    }
    // Object
    else if (typeChar === 'O') {
      const { line, nextPos } = readUntilNewline(afterColon);
      try {
        const obj = JSON.parse(line.slice(1));
        parsed.push({ type: 'Object', key, content: obj });
      } catch {
        parsed.push({ type: 'Object', key, raw: line });
      }
      pos = nextPos;
    }
    // Hints (Next.js 16+ for preloading resources)
    else if (typeChar === 'H') {
      const { line, nextPos } = readUntilNewline(afterColon);
      try {
        const hints = JSON.parse(line.slice(1));
        parsed.push({ type: 'Hints', key, content: hints });
      } catch {
        parsed.push({ type: 'Hints', key, raw: line });
      }
      pos = nextPos;
    }
    // Binary/Blob reference (Next.js 16+)
    else if (typeChar === 'B') {
      const { line, nextPos } = readUntilNewline(afterColon);
      parsed.push({ type: 'Binary', key, raw: line });
      pos = nextPos;
    }
    // Module reference (for lazy loading)
    else if (typeChar === 'M') {
      const { line, nextPos } = readUntilNewline(afterColon);
      try {
        const module = JSON.parse(line.slice(1));
        parsed.push({ type: 'Module', key, content: module });
      } catch {
        parsed.push({ type: 'Module', key, raw: line });
      }
      pos = nextPos;
    }
    // Default: try to parse as JSON
    else {
      const { line, nextPos } = readUntilNewline(afterColon);
      try {
        const data = JSON.parse(line);
        parsed.push({ type: 'Data', key, content: data });
      } catch {
        parsed.push({ type: 'Unknown', key, value: line });
      }
      pos = nextPos;
    }
  }

  return parsed;
}

export default parseFlightPushData;
