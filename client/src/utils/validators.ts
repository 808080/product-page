export const isEmpty = (val: string) => val.trim().length === 0;
export const isEmail = (val: string) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
export const isPassword = (val: string) =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W|_)(?=\S+$).{8,}$/.test(val);
export const isValidMinLength = (min: number) => (val: string) =>
  val.length >= min;
export const is18 = (date: string) => new Date().getFullYear() - new Date(date).getFullYear() >= 18;
export const isPhone = (val: string) => /^[0-9]*$/.test(val);