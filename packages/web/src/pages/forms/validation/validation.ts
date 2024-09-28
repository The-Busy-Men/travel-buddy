const isValidString = (str: string): boolean => {
  if (!str || str === '' || typeof str !== 'string') return false;
  return true;
};

const isValidNumber = (num: number) => {
  if (!num || isNaN(num) || typeof num !== 'number') return false;
  return true;
};

export { isValidString, isValidNumber };
