import parseFlightPushData from './parseFlightPushData';

// Flight payload constants from Next.js
const INLINE_FLIGHT_PAYLOAD_BOOTSTRAP = 0;
const INLINE_FLIGHT_PAYLOAD_DATA = 1;
// const INLINE_FLIGHT_PAYLOAD_FORM_STATE = 2;
const INLINE_FLIGHT_PAYLOAD_BINARY = 3;

/**
 * Decode base64 binary data to string
 * Next.js encodes binary using: btoa(String.fromCodePoint(...chunk))
 * We decode using: atob then charCodeAt for each character
 */
const decodeBase64Binary = (base64String) => {
  try {
    const binaryString = atob(base64String);
    // Convert binary string back to UTF-8 text
    // This handles the case where the data was binary-encoded due to non-UTF-8 characters
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    // Decode as UTF-8
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return '';
  }
};

const decode = ({ appRawData, pagesRawData }) => {
  if (pagesRawData) {
    return JSON.parse(pagesRawData) || null;
  }
  if (appRawData) {
    const flightRawData = [];

    for (const chunk of appRawData) {
      // Next.js 16+ format: tuples like [0], [1, "data"], [2, formState], [3, "base64"]
      if (Array.isArray(chunk)) {
        const [type, data] = chunk;

        // Bootstrap marker - skip
        if (type === INLINE_FLIGHT_PAYLOAD_BOOTSTRAP) {
          continue;
        }

        // Text data chunk (most common)
        if (type === INLINE_FLIGHT_PAYLOAD_DATA && typeof data === 'string') {
          flightRawData.push(data);
          continue;
        }

        // Binary data chunk (base64 encoded) - Next.js 16+
        if (type === INLINE_FLIGHT_PAYLOAD_BINARY && typeof data === 'string') {
          const decoded = decodeBase64Binary(data);
          if (decoded) {
            flightRawData.push(decoded);
          }
          continue;
        }

        // Fallback for older Next.js 15 format or unknown tuple formats:
        // Try to extract any string data from the array
        for (const inner of chunk) {
          if (typeof inner === 'string') {
            flightRawData.push(inner);
          }
        }
      } else if (typeof chunk === 'string') {
        // Legacy format: direct strings in the array
        flightRawData.push(chunk);
      }
    }

    // Join without adding extra newlines - the data already contains proper line breaks
    const flightString = flightRawData.join('');

    return parseFlightPushData(flightString);
  }

  return null;
};

export default decode;
