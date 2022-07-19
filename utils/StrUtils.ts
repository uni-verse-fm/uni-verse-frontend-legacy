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

export const isoDateYear = (isoDate?: string) => {
  try {
    const date = new Date(isoDate);
    return date.getFullYear().toString();
  } catch (error) {
    return "---";
  }
};
export const subMessage = (msg: string) => {
  if (msg.length > 255) return msg.substr(0, 255) + " ...";
  else return msg;
};
