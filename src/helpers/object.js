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

export const filterJson = (json, searchString, found) => {
  for (var key in json) {
    if (typeof json[key] === "object" && json[key] !== null) {
      found = found || key.toLowerCase().indexOf(searchString) > -1;
      json[key] = filterJson(json[key], searchString, found);
      if (!found && !Object.entries(json[key])?.length) delete json[key];
    } else {
      try {
        if (
          key.toLowerCase().indexOf(searchString) > -1 ||
          json[key] === undefined ||
          json[key].toString().toLowerCase().indexOf(searchString) > -1
        ) {
          found = true;
        }

        if (!found) delete json[key];
      } catch (e) {
        delete json[key];
      }
    }
  }

  return json;
};
