import parseFlightPushData from './parseFlightPushData';

describe('parseFlightPushData', () => {
  it('returns undefined for non-string input', () => {
    expect(parseFlightPushData(123)).toBeUndefined();
    expect(parseFlightPushData(null)).toBeUndefined();
  });

  it('parses Symbol type', () => {
    const result = parseFlightPushData('foo:"$Ssymbol"');
    expect(result[0]).toMatchObject({ type: 'Symbol', key: 'foo', value: '$Ssymbol"' });
  });

  it('parses Instance type (valid JSON)', () => {
    const result = parseFlightPushData('bar:I[1,2,3]');
    expect(result[0]).toMatchObject({ type: 'Instance', key: 'bar', content: [1, 2, 3] });
  });

  it('parses Instance type (invalid JSON)', () => {
    const result = parseFlightPushData('bar:I[notjson]');
    expect(result[0]).toMatchObject({ type: 'Instance', key: 'bar', raw: 'I[notjson]' });
  });

  it('parses Text type', () => {
    const result = parseFlightPushData('baz:T"hello"');
    expect(result[0]).toMatchObject({ type: 'Text', key: 'baz', value: 'hello' });
  });

  it('parses List type (valid JSON)', () => {
    const result = parseFlightPushData('qux:L[1,2]');
    expect(result[0]).toMatchObject({ type: 'List', key: 'qux', content: [1, 2] });
  });

  it('parses List type (invalid JSON)', () => {
    const result = parseFlightPushData('qux:L[notjson]');
    expect(result[0]).toMatchObject({ type: 'List', key: 'qux', raw: 'L[notjson]' });
  });

  it('parses Object type with valid JSON', () => {
    const result = parseFlightPushData('obj:O{"foo":1}');
    expect(result[0]).toMatchObject({ type: 'Object', key: 'obj', content: { foo: 1 } });
  });

  it('parses Object type with invalid JSON', () => {
    const result = parseFlightPushData('obj:O{foo:1}');
    expect(result[0]).toMatchObject({ type: 'Object', key: 'obj', raw: 'O{foo:1}' });
  });

  it('parses Data type (valid JSON)', () => {
    const result = parseFlightPushData('dat:{"a":1}');
    expect(result[0]).toMatchObject({ type: 'Data', key: 'dat', content: { a: 1 } });
  });

  it('parses Unknown type (invalid JSON)', () => {
    const result = parseFlightPushData('dat:notjson');
    expect(result[0]).toMatchObject({ type: 'Unknown', key: 'dat', value: 'notjson' });
  });

  it('skips lines that do not match', () => {
    const result = parseFlightPushData('badline\nfoo:"$Ssymbol"');
    expect(result.length).toBe(1);
    expect(result[0].type).toBe('Symbol');
  });

  // Next.js 16+ specific tests
  it('parses hexadecimal keys (Next.js 16+)', () => {
    const result = parseFlightPushData('a1b2:{"test":true}');
    expect(result[0]).toMatchObject({ type: 'Data', key: 'a1b2', content: { test: true } });
  });

  it('parses Hints type (Next.js 16+)', () => {
    const result = parseFlightPushData('hint:H["resource","preload"]');
    expect(result[0]).toMatchObject({
      type: 'Hints',
      key: 'hint',
      content: ['resource', 'preload'],
    });
  });

  it('parses Hints type with invalid JSON', () => {
    const result = parseFlightPushData('hint:H[notjson]');
    expect(result[0]).toMatchObject({ type: 'Hints', key: 'hint', raw: 'H[notjson]' });
  });

  it('parses Binary type (Next.js 16+)', () => {
    const result = parseFlightPushData('bin:BinaryData');
    expect(result[0]).toMatchObject({ type: 'Binary', key: 'bin', raw: 'BinaryData' });
  });

  it('parses Module type (Next.js 16+)', () => {
    const result = parseFlightPushData('mod:M{"id":"./module.js"}');
    expect(result[0]).toMatchObject({ type: 'Module', key: 'mod', content: { id: './module.js' } });
  });

  it('parses Module type with invalid JSON', () => {
    const result = parseFlightPushData('mod:MnotValidJson');
    expect(result[0]).toMatchObject({ type: 'Module', key: 'mod', raw: 'MnotValidJson' });
  });

  it('parses Text with hex length format (Next.js 16+)', () => {
    const result = parseFlightPushData('txt:T5,hello');
    expect(result[0]).toMatchObject({ type: 'Text', key: 'txt', length: 5, value: 'hello' });
  });

  it('parses newer React symbol markers (e.g., $SR19)', () => {
    const result = parseFlightPushData('0:"$SR19"');
    expect(result[0]).toMatchObject({ type: 'Symbol', key: '0', value: '$SR19"' });
  });
});
