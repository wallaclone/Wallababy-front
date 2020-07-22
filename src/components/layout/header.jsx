import React, { useContext } from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';

function Header(props) {
  const { user, setUser } = useContext(AuthContext);
  const { setReloadLanguage } = props;

  async function logout() {
    window.localStorage.removeItem('token');
    setUser(null);
  }

  const handleClick = () => {
    logout();
  };

  const changeLanguage = (value) => {
    localStorage.setItem('initCurrentLocale', value);
    setReloadLanguage(value);
  };

  return (
    <>
      <div className="navbar-wrapper">
        <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand className="title">
            <Link className="title" to="/dashboard">
              <img
                alt=""
                src="/ico.png"
                width="45"
                height="45"
                className="d-inline-block align-top"
              />
              {' '}
              WallaBaby!
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-light"  />
          <Navbar.Collapse id="responsive-navbar-nav">
            {
          (user === 'guest') ? (
            <Nav className="end-section">
              <Nav.Link>
                <Link to="/login" className="navbar-link">
                  {props.intl.formatMessage({ id: 'all.logIn' })}
                  !
                </Link>
              </Nav.Link>
              <Nav.Link className="navbar-link">
                  <Link className="navbar-link" onClick={() => changeLanguage('es-ES')} to="#"> ES </Link>
                  /
                  <Link className="navbar-link" onClick={() => changeLanguage('en-US')} to="#"> EN </Link>
                </Nav.Link>
            </Nav>
          ) : (
            <>
              <Nav className="mr-auto">
                <Nav.Link>
                  <Link to="/dashboard" className="navbar-link">
                    {props.intl.formatMessage({ id: 'header.adList' })}
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/createAd" className="navbar-link">
                    {props.intl.formatMessage({ id: 'header.createAd' })}
                  </Link>
                </Nav.Link>
              </Nav>

              <Nav className="right-section">
                <NavDropdown title={`${user}`} id="collasible-nav-dropdown">
                  <NavDropdown.Item><Link to="/favorites" className="dropdown-link">{props.intl.formatMessage({ id: 'header.yourFavorites' })}</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link to={`/myads/${user}`} className="dropdown-link">{props.intl.formatMessage({ id: 'header.yourAds' })}</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item><Link to="/myprofile" className="dropdown-link">{props.intl.formatMessage({ id: 'header.editYourProfile' })}</Link></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={handleClick} className="navbar-link">
                  <Link to="/logout" className="navbar-link">{props.intl.formatMessage({ id: 'all.logOut' })}</Link>
                </Nav.Link>
                <Nav.Link className="navbar-link">
                  <Link className="navbar-link" onClick={() => changeLanguage('es-ES')} to="#"> ES </Link>
                  /
                  <Link className="navbar-link" onClick={() => changeLanguage('en-US')} to="#"> EN </Link>
                </Nav.Link>
              </Nav>
            </>
          )
          }
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
const header = injectIntl(Header);
export { header };
