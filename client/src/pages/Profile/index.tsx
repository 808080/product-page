import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useLoaderData } from 'react-router-dom';
import { Row, Col, InputGroup, Alert, Button, Form } from 'react-bootstrap';
import { useTypedDispatch, useTypedSelector } from '../../store/hooks';
import { userDataFailed, setUser } from '../../store/reducers/user';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { UserDAO } from '../../utils/types';
import countries from '../../countryCodes.json';
import validate from './validation';
import Loader from '../../components/Loader';

const Profile = () => {

  const loadedUser = useLoaderData() as UserDAO;
  const { data: stateUser, userError } = useTypedSelector(state => state.user);
  const dispatch = useTypedDispatch();
  if (!stateUser) {
    dispatch(setUser(loadedUser));
    return <Loader />;
  };
  const { id, email, ...user } = stateUser;
  const tel = user.phone.split('-');
  const countryOptions = useMemo(() => countries, []);

  const [disabled, setDisabled] = useState(true);
  const [alert, setAlert] = useState('');

  const formik = useFormik({
    initialValues: {
      ...user,
      dialCode: tel[0],
      phone: tel[1],
    },
    onSubmit: async (values) => {
      dispatch(userDataFailed(''));
      const { phone, dialCode, ...newUser } = values;
      const user = await httpRequest<UserDAO, UserDAO>(HTTPmethods.PATCH, '/user', {
        ...newUser,
        id,
        email,
        phone: `${dialCode}-${phone}`
      });
      if (user.success) {
        setDisabled(true);
        setAlert('Profile updated successfully');
      }
      dispatch(user.success ? setUser(user.data) : userDataFailed(user.error));
    },
    validateOnChange: true,
    validateOnBlur: true,
    validate,
  });

  useEffect(() => {
    formik.setValues({
      ...user,
      dialCode: tel[0],
      phone: tel[1],
    });
  }, [disabled]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h3 className='my-3'>Profile</h3>
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
            disabled={disabled}
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
            disabled={disabled}
          />
          <Form.Control.Feedback type='invalid'>{formik.errors.lastName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md='4' className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            disabled
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md='4' className='mb-3'>
          <Form.Label>Country</Form.Label>
          <Form.Select
            name='country'
            value={formik.values.country}
            onChange={formik.handleChange}
            disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
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
            disabled={disabled}
          />
          <Form.Control.Feedback type='invalid'>{formik.errors.birthDate}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      {userError && <Alert variant='danger' onClose={() => { dispatch(userDataFailed('')) }} dismissible>
        {userError}
      </Alert>}

      {alert && <Alert variant='success' onClose={() => { setAlert('') }} dismissible>
        {alert}
      </Alert>}

      <div className='text-center mt-3'>
        <Button type='button' variant={disabled ? 'primary' : 'danger'} onClick={() => {
          setAlert('');
          setDisabled(!disabled);
        }}>{disabled ? 'Edit' : 'Cancel'}</Button>
        {!disabled && <Button className='ms-3' type='submit' variant='success' disabled={formik.isSubmitting}>Submit</Button>}
      </div>
    </Form>
  );
};

export default Profile;