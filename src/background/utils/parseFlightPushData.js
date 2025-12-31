function parseFlightPushData(flightChunk) {
  if (typeof flightChunk !== 'string') {
    return;
  }

  const lines = flightChunk.split('\n');
  const parsed = [];

  for (const line of lines) {
    const match = line.match(/^(\w+):(.+)/);
    if (!match) continue;

    const key = match[1];
    const value = match[2];

    if (value.startsWith('"$S')) {
      parsed.push({ type: 'Symbol', key, value: value.replace(/^"|\\"$/g, '') });
    } else if (value.startsWith('I[')) {
      try {
        const content = JSON.parse(value.replace(/^I/, ''));
        parsed.push({ type: 'Instance', key, content });
      } catch {
        parsed.push({ type: 'Instance', key, raw: value });
      }
    } else if (value.startsWith('T"')) {
      parsed.push({ type: 'Text', key, value: value.slice(2, -1) });
    } else if (value.startsWith('L[')) {
      try {
        const list = JSON.parse(value.replace(/^L/, ''));
        parsed.push({ type: 'List', key, content: list });
      } catch {
        parsed.push({ type: 'List', key, raw: value });
      }
    } else if (value.startsWith('O{')) {
      parsed.push({ type: 'Object', key, raw: value });
    } else {
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
