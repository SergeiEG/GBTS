const ONE_DAY = 1;
const THREE_DAY = 3;
const ONE_MONTH = 1;
const TWO_MONTH = 2;

export const begin = new Date();

const getDateParse = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + ONE_MONTH).toString().padStart(2, "0");
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

const getMaxDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const max = new Date(year, month + TWO_MONTH, 0);

  return getDateParse(max);
};

const getMinDate = (date: Date, plusDay: number) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + ONE_MONTH).toString().padStart(2, "0");
  const day = (date.getDate() + plusDay).toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const entryMin = getMinDate(begin, ONE_DAY);
export const depMin = getMinDate(begin, THREE_DAY);
export const maxDate = getMaxDate(begin);
