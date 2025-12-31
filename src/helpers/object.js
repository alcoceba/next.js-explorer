export const getObjSize = (obj) => obj && new TextEncoder().encode(JSON.stringify(obj)).length;

export const getObjKeysCount = (obj) => obj && JSON.stringify(obj).match(/[^\\]":/g).length;

export const isObjectAndNotEmpty = (v) => {
  if (v === null) return false;
  if (typeof v !== 'object') return false;
  if (Object.keys(v).length === 0) return false;
  return true;
};

export const exportJson = (obj, space) => {
  const data = JSON.stringify(obj, null, space);
  const blob = new Blob([data], { type: 'application/json' });
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blob);
  element.download = `nextPageData_${Date.now()}.json`;
  document.body.appendChild(element);
  element.click();
};

export const traverse = (obj, path = '', result = []) => {
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    for (const key in obj) {
      traverse(obj[key], path + key + ' > ', result);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => {
      traverse(item, path + ' > ', result);
    });
  } else {
    result.push(path.slice(0, -3) + obj);
  }
  return result;
};

export const filterJson = (json, searchString, found) => {
  for (var key in json) {
    if (typeof json[key] === 'object' && json[key] !== null) {
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
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        delete json[key];
      }
    }
  }

  return json;

  // const traversed = traverse(json);

  // return traversed;

  // const wordsToSearch = JSON.stringify(json);
  // const escapedSearchWord = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // const regex = new RegExp(`(${escapedSearchWord})`, 'gi');
  // const highlihgtedText = wordsToSearch.replace(regex, '<span style=\'background:yellow\'>$1</span>');

  // return JSON.parse(highlihgtedText);
};
