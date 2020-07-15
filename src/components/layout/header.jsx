import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime } from 'react-intl';

function Header(props) {
  const { user, setUser } = useContext(AuthContext);
  const {setReloadLanguage} = props;

  async function logout() {
    window.localStorage.removeItem('token');
    setUser(null);
  }

  const handleClick = () => {
    logout();
  }

  const changeLanguage = (value) => {
    localStorage.setItem('initCurrentLocale', value);
    setReloadLanguage(value);
  };
  
  return (
    <>
    <div className='navbar-wrapper'>
      <Navbar fixed="top" collapseOnSelect expand="lg">
        <Navbar.Brand className='title' href="/dashboard">Wallaclone!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {
          // (user === 'guest') ? <Nav className='end-section'> <Nav.Link href="/login">{props.intl.formatMessage({ id: 'all.logIn' })}!</Nav.Link></Nav> :
          (user === 'guest') ? <Nav className='end-section'> <Nav.Link><Link to={`/login`}>{props.intl.formatMessage({ id: 'all.logIn' })}!</Link></Nav.Link></Nav> :
          <>
          <Nav className="mr-auto"> 
            <Nav.Link> 
              <Link to={`/dashboard`}> {props.intl.formatMessage({ id: 'header.adList' })} </Link>
            </Nav.Link>
            <Nav.Link> 
              <Link to={`/createAd`}> {props.intl.formatMessage({ id: 'header.createAd' })} </Link> 
            </Nav.Link>
          </Nav>

          <Nav className='right-section'>
          <NavDropdown title={user} id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to={'/favorites'}>{props.intl.formatMessage({ id: 'header.yourFavorites' })}</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to={'/myads/'+user}>{props.intl.formatMessage({ id: 'header.yourAds' })}</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item><Link to={'/myprofile'}>{props.intl.formatMessage({ id: 'header.editYourProfile' })}</Link></NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='logout' onClick={handleClick}>
              <Link to={`/logout`}>{props.intl.formatMessage({ id: 'all.logOut' })}</Link>
            </Nav.Link>
          </Nav>
          </>
          }
          
          <Nav.Link> 
            <Link onClick={()=> changeLanguage('es-ES')}> ES </Link>/
            <Link onClick={()=> changeLanguage('en-US')}> EN </Link>
          </Nav.Link>

          {/* <FormattedMessage id="app.title" value={(message) => ({message})} /> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
    </>
  )
}
const header = injectIntl(Header);
export { header };
// export default Header;