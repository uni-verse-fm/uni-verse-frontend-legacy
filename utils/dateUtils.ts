export const isoDateToDate = (isoDate?: string) => {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  } catch (error) {
    return "---";
  }
};
