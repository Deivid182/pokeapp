export const removeDuplicates = (array, key) => {
  return array.filter((item, index) => {
      const _item = JSON.stringify(item[key]);
      return index === array.findIndex(obj => {
          return JSON.stringify(obj[key]) === _item;
      });
  });
};
