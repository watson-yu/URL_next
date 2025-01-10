// 新增統一的格式處理工具
export const format = {
  // 儲存格式：全小寫連字號
  toStorageFormat: (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')  // 空格或底線轉連字號
      .replace(/[^a-z0-9-]/g, ''); // 只保留小寫字母、數字和連字號
  },

  // 顯示格式：每個單字首字母大寫
  toDisplayFormat: (text) => {
    return text
      .split(/[-\s_]+/)  // 以連字號、空格或底線分割
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  // 路由格式：全小寫連字號
  toRouteFormat: (text) => {
    return format.toStorageFormat(text);
  },

  // 比對格式：全小寫，移除所有分隔符號
  toCompareFormat: (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[-\s_]+/g, '');
  }
};
