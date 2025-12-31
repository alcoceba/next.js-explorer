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

  it('parses Object type', () => {
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
});
