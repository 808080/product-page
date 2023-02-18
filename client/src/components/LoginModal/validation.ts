import { LoginData } from '../../store/reducers/user';
import {
    isEmail,
    isPassword,
} from '../../utils/validators';

const validate = (values: LoginData) => {
    const errors = {} as typeof values;

    if (!isEmail(values.email)) {
        errors.email = 'Invalid e-mail';
    }

    if (!isPassword(values.password)) {
        errors.password = 'Min length is 8 symbols. Password must contain atleast one digit, one capital and one small letter, a special symbol and no whitespaces';
    }

    return errors;
};

export default validate;