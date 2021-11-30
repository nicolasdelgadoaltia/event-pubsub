export const collectionsAreEqual = (...collections: any[]) => {
  const collectionLenghts: number[] = collections.map((v) => v.length);
  const maxElements: number = Math.max(...collectionLenghts);
  let isEqual = true;

  for (let i = 0; i < maxElements; i++) {
    const values = collections.map((v) => v[i]);
    if (!isEqual) {
      break;
    }
    isEqual = values.every((v) => {
      if (typeof v === 'function' || typeof values[0] === 'function') {
        return v.toString() === values[0].toString();
      }
      return JSON.stringify(v) == JSON.stringify(values[0]);
    });
  }
  return isEqual;
};
