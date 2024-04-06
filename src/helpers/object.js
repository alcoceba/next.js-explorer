export const getObjSize = (obj) =>
  obj && new TextEncoder().encode(JSON.stringify(obj)).length;

export const getObjKeysCount = (obj) =>
  obj && JSON.stringify(obj).match(/[^\\]":/g).length;

export const isObjectAndNotEmpty = (v) => {
  if (v === null) return false;
  if (typeof v !== "object") return false;
  if (Object.keys(v).length === 0) return false;
  return true;
};

export const exportJson = (obj, space) => {
  const data = JSON.stringify(obj, null, space);
  const blob = new Blob([data], { type: "application/json" });
  const element = document.createElement("a");
  element.href = URL.createObjectURL(blob);
  element.download = `nextPageData_${Date.now()}.json`;
  document.body.appendChild(element);
  element.click();
};
