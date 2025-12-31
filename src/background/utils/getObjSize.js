export const getObjSize = (obj) => obj && new TextEncoder().encode(JSON.stringify(obj)).length;
