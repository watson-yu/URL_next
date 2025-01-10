export const format = {
  // 儲存格式：使用底線作為分隔符
  toStorageFormat: (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[-\s]+/g, '_');  // 空格和連字號轉換為底線
  },

  // URL格式：使用連字號
  toRouteFormat: (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[_\s]+/g, '-');  // 底線和空格轉換為連字號
  },

  // 顯示格式：使用空格，每個單字首字母大寫
  toDisplayFormat: (text) => {
    if (!text) return '';
    return text
      .split(/[_\s-]+/)  // 分割所有可能的分隔符
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  // 比對格式：移除所有分隔符
  toCompareFormat: (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[_\s-]+/g, '');
  }
};
