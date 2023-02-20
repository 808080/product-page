import { useFormik } from 'formik';
import { FC } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../store/hooks';
import { LoginData, loginFailed, setUser } from '../../store/reducers/user';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { UserDAO } from '../../utils/types';
import validate from './validation';

type Props = {
  show: boolean;
  handleClose: () => void
};

const LoginModal: FC<Props> = ({ show, handleClose }) => {
  const dispatch = useTypedDispatch();
  const { error } = useTypedSelector(state => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      dispatch(loginFailed(''));
      const user = await httpRequest<UserDAO, LoginData>(HTTPmethods.POST, '/login', values);
      dispatch(user.success ? setUser(user.data) : loginFailed(user.error));
      if (user.success) handleClose();
    },
    validateOnChange: true,
    validateOnBlur: true,
    validate,
  });

  return (
    <Modal
      show={show}
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              required
              placeholder='name@example.com'
              value={formik.values.email}
              isInvalid={formik.touched.email && !!formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              required
              value={formik.values.password}
              isInvalid={formik.touched.password && !!formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {error && <Alert variant='danger' onClose={() => { dispatch(loginFailed('')) }} dismissible>
            {error}
          </Alert>}

          <div className='text-center'>
            <Link to='/signup' onClick={handleClose}>Sign up</Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit' disabled={formik.isSubmitting}>
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginModal;