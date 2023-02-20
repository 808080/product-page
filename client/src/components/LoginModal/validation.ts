import { LoginData } from '../../store/reducers/user';
import {
  isEmail,
  isPassword,
} from '../../utils/validators';

const validate = (values: LoginData) => {
  const errors: Record<string, string> = {};

  if (!isEmail(values.email)) {
    errors.email = 'ErorrEmail';
  }

  if (!isPassword(values.password)) {
    errors.password = 'ErrorPassword';
  }

  return errors;
};

export default validate;