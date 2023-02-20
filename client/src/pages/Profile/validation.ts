import { UserEditData } from '../../store/reducers/user';
import {
  is18,
  isEmpty,
  isPhone,
} from '../../utils/validators';

const validate = (values: UserEditData) => {
  const errors: Record<string, string> = {};

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

  return errors;
};

export default validate;