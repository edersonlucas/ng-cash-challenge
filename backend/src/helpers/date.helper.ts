export const DateIsEqual = (dateFilter: Date, date: Date): boolean =>
  dateFilter.toString().slice(0, 9) === date.toString().slice(0, 9);

export const DateIsValid = (date: Date): boolean =>
  date.toString() !== 'Invalid Date';
