import { useFormik } from 'formik';
import { useMemo } from 'react';
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useTypedDispatch, useTypedSelector } from '../../store/hooks';
import { setUser, userDataFailed } from '../../store/reducers/user';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { UserDAO, UserDTO } from '../../utils/types';
import validate from './validation';
import countries from '../../countryCodes.json';
import { Navigate } from 'react-router-dom';

const Signup = () => {

  const dispatch = useTypedDispatch();
  const { data: user, userError } = useTypedSelector(state => state.user);
  const countryOptions = useMemo(() => countries, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      country: countryOptions[0].code,
      dialCode: countryOptions[0].dialCode,
      firstName: '',
      lastName: '',
      phone: '',
      terms: false
    },
    onSubmit: async (values) => {
      dispatch(userDataFailed(''));
      const { confirmPassword, terms, dialCode, ...newUser } = values;
      const user = await httpRequest<UserDAO, UserDTO>(HTTPmethods.POST, '/user', { ...newUser, phone: `${dialCode}-${values.phone}` });
      dispatch(user.success ? setUser(user.data) : userDataFailed(user.error));
    },
    validateOnChange: true,
    validateOnBlur: true,
    validate,
  });

  return (
    <>
      {user ? (
        <Navigate to='/profile' replace />
      ) :
        <Form onSubmit={formik.handleSubmit}>
          <h3 className='my-3'>Registrations</h3>
          <Row>
            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.firstName && !!formik.errors.firstName}
              />
              <Form.Control.Feedback type='invalid'>{formik.errors.firstName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.lastName && !!formik.errors.lastName}
              />
              <Form.Control.Feedback type='invalid'>{formik.errors.lastName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>Country</Form.Label>
              <Form.Select
                name='country'
                value={formik.values.country}
                onChange={formik.handleChange}
              >
                {countryOptions.map((c) => <option key={c.code} value={c.code}>{`${c.flag} ${c.name}`}</option>)}
              </Form.Select>

              <Form.Control.Feedback type='invalid'>
                {formik.errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>Phone number</Form.Label>
              <InputGroup>
                <Form.Select
                  name='dialCode'
                  style={{ maxWidth: '160px' }}
                  value={formik.values.dialCode}
                  onChange={formik.handleChange}
                >
                  {countryOptions.map((c) => <option key={c.code} value={c.dialCode}>{`${c.flag} ${c.code} | ${c.dialCode}`}</option>)}
                </Form.Select>
                <Form.Control
                  type='tel'
                  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.phone && !!formik.errors.phone}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type='date'
                name='birthDate'
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.birthDate && !!formik.errors.birthDate}
              />
              <Form.Control.Feedback type='invalid'>{formik.errors.birthDate}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='4' className='mb-3'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className='mb-3'>
            <Form.Check
              name='terms'
              label='Agree to terms and conditions'
              onChange={formik.handleChange}
              isInvalid={formik.touched.terms && !!formik.errors.terms}
              feedback={formik.errors.terms}
              feedbackType='invalid'
            />
          </Form.Group>

          {userError && <Alert variant='danger' onClose={() => { dispatch(userDataFailed('')) }} dismissible>
            {userError}
          </Alert>}

          <div className='text-center mt-3'>
            <Button type='submit' disabled={formik.isSubmitting}>Submit</Button>
          </div>
        </Form>
      }
    </>

  );
};

export default Signup;