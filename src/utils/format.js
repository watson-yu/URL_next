export const format = {
  // Storage format: uses underscores as separators
  toStorageFormat: (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[-\s]+/g, '_');
  },

  // URL format: uses hyphens, preserves spaces between words
  toRouteFormat: (text) => {
    if (!text) return '';
    // First replace underscores with spaces, then replace multiple spaces with single space
    return text
      .toLowerCase()
      .trim()
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s/g, '-');
  },

  // Display format: capitalizes first letter of each word
  toDisplayFormat: (text) => {
    if (!text) return '';
    return text
      .split(/[_\s-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  // Compare format: removes all separators
  toCompareFormat: (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[_\s-]+/g, '');
  }
};
