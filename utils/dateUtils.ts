export const isoDateToDate = (isoDate?: string) => {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  } catch (error) {
    return "---";
  }
};


export const isoDateToDateHour = (isoDate?: string) => {
  try {
    const date = new Date(isoDate);
    return date.toUTCString();
  } catch (error) {
    return "---";
  }
};