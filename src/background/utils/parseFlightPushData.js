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

  const lines = flightChunk.split('\n');
  const parsed = [];

  for (const line of lines) {
    // Match key:value format - key can be alphanumeric (includes hex in Next.js 16)
    const match = line.match(/^(\w+):(.+)/);
    if (!match) continue;

    const key = match[1];
    const value = match[2];

    // Symbol reference (e.g., "$S1", "$SR15", "$SR19")
    if (value.startsWith('"$S')) {
      parsed.push({ type: 'Symbol', key, value: value.replace(/^"|\\"$/g, '') });
    }
    // Instance/Import reference
    else if (value.startsWith('I[')) {
      try {
        const content = JSON.parse(value.replace(/^I/, ''));
        parsed.push({ type: 'Instance', key, content });
      } catch {
        parsed.push({ type: 'Instance', key, raw: value });
      }
    }
    // Text content
    else if (value.startsWith('T"')) {
      parsed.push({ type: 'Text', key, value: value.slice(2, -1) });
    }
    // Text content (hex format - Next.js 16+)
    else if (value.startsWith('T')) {
      const textMatch = value.match(/^T([a-fA-F0-9]+),(.*)$/);
      if (textMatch) {
        parsed.push({ type: 'Text', key, length: parseInt(textMatch[1], 16), value: textMatch[2] });
      } else {
        parsed.push({ type: 'Text', key, value: value.slice(1) });
      }
    }
    // List/Array
    else if (value.startsWith('L[')) {
      try {
        const list = JSON.parse(value.replace(/^L/, ''));
        parsed.push({ type: 'List', key, content: list });
      } catch {
        parsed.push({ type: 'List', key, raw: value });
      }
    }
    // Object
    else if (value.startsWith('O{')) {
      try {
        const obj = JSON.parse(value.replace(/^O/, ''));
        parsed.push({ type: 'Object', key, content: obj });
      } catch {
        parsed.push({ type: 'Object', key, raw: value });
      }
    }
    // Hints (Next.js 16+ for preloading resources)
    else if (value.startsWith('H[')) {
      try {
        const hints = JSON.parse(value.replace(/^H/, ''));
        parsed.push({ type: 'Hints', key, content: hints });
      } catch {
        parsed.push({ type: 'Hints', key, raw: value });
      }
    }
    // Binary/Blob reference (Next.js 16+)
    else if (value.startsWith('B')) {
      parsed.push({ type: 'Binary', key, raw: value });
    }
    // Module reference (for lazy loading)
    else if (value.startsWith('M')) {
      try {
        const module = JSON.parse(value.slice(1));
        parsed.push({ type: 'Module', key, content: module });
      } catch {
        parsed.push({ type: 'Module', key, raw: value });
      }
    }
    // Default: try to parse as JSON
    else {
      try {
        const data = JSON.parse(value);
        parsed.push({ type: 'Data', key, content: data });
      } catch {
        parsed.push({ type: 'Unknown', key, value });
      }
    }
  }

  return parsed;
}

export default parseFlightPushData;
