export const format = {
  // 內部儲存和 URL 都使用底線格式
  toStorage: (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s-]+/g, '_');
  },

  // 只在顯示時轉換為空格格式
  toDisplay: (text) => {
    if (!text) return '';
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};
