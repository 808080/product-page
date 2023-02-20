import { RegData } from '../../store/reducers/user';
import {
  is18,
  isEmail,
  isEmpty,
  isPassword,
  isPhone,
} from '../../utils/validators';

const validate = (values: RegData) => {
  const errors: Record<string, string> = {};

  if (!isEmail(values.email)) {
    errors.email = 'Invalid e-mail';
  }

  if (!isPassword(values.password)) {
    errors.password = 'Min length is 8 symbols. Password must contain atleast one digit, one capital and one small letter, a special symbol and no whitespaces';
  }

  if (!is18(values.birthDate)) {
    errors.birthDate = 'You must be atleast 18 years old';
  }

  if (isEmpty(values.country)) {
    errors.country = 'Required';
  }

  if (isEmpty(values.firstName)) {
    errors.firstName = 'Required';
  }

  if (isEmpty(values.lastName)) {
    errors.lastName = 'Required';
  }

  if (isEmpty(values.phone)) {
    errors.phone = 'Required';
  }

  if (!isPhone(values.phone)) {
    errors.phone = 'Digits allowed only';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  if (!values.terms) {
    errors.terms = 'You must agree to register';
  }

  return errors;
};

export default validate;