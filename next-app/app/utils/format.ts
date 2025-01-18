export const format = {
  toDisplay: (str: string | undefined | null): string => {
    if (!str) return '';
    
    try {
      return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch (error) {
      console.error('Error formatting string:', str, error);
      return String(str); // Fallback to original string
    }
  }
}; 