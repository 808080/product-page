import { FC, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../store/hooks';
import { logout } from '../../store/reducers/user';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { UserDAO } from '../../utils/types';
import LoginModal from '../LoginModal';

type LogoutAction =
  | {
    success: true
  }
  | {
    success: false, error: string
  };

const Header: FC<{ user: undefined | UserDAO }> = ({ user }) => {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const dispatch = useTypedDispatch();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    const res = await httpRequest<LogoutAction, { id: UserDAO['id'] }>(HTTPmethods.POST, '/logout', user);
    if (res.success) {
      dispatch(logout());
      navigate('/');
    }
  };

  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to='/'>Product Page</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to='/'>Products</Nav.Link>
                {user ?
                  <>
                    <Nav.Link as={Link} to='/premium-products'>Premium products</Nav.Link>
                    <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
                  </> :
                  <>
                    <Nav.Link onClick={handleOpen}>Sign in</Nav.Link>
                    <Nav.Link as={Link} to='/signup'>Sign up</Nav.Link>
                  </>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <LoginModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Header;