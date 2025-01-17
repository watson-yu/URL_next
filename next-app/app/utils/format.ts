export const format = {
  toDisplay: (str: string): string => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}; 