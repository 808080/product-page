import { FC, useState } from 'react';
import { ButtonGroup, Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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

const languages: Record<string, string> = {
  en: 'English',
  ru: 'Русский'
};

const Header: FC<{ user: undefined | UserDAO }> = ({ user }) => {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const dispatch = useTypedDispatch();

  const { t, i18n } = useTranslation();

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
                <Nav.Link as={Link} to='/'>{t('Products')}</Nav.Link>
                {user ?
                  <>
                    <Nav.Link as={Link} to='/premium-products'>{t('PProducts')}</Nav.Link>
                    <Nav.Link as={Link} to='/profile'>{t('Profile')}</Nav.Link>
                    <Nav.Link onClick={handleLogout}>{t('Log out')}</Nav.Link>
                  </> :
                  <>
                    <Nav.Link onClick={handleOpen}>{t('Sign in')}</Nav.Link>
                    <Nav.Link as={Link} to='/signup'>{t('Sign up')}</Nav.Link>
                  </>}
              </Nav>

              <DropdownButton
                as={ButtonGroup}
                variant='primary'
                title={t('Language')}
              >
                {Object.keys(languages).map((lang) => <Dropdown.Item
                  key={lang}
                  active={i18n.resolvedLanguage === lang}
                  onClick={() => i18n.changeLanguage(lang)}
                >
                  {languages[lang]}
                </Dropdown.Item>)}
              </DropdownButton>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <LoginModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Header;