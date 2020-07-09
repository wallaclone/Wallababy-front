import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';
import { Form }  from 'react-bootstrap';
import apiCall from '../api/api';
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

  // const [ language, setLanguage ] = useState ('');
  // const changeLanguageBySelect = async (event) => {
  //   const value = event.target.value;
  //   // console.log("*****event.target.name:", event.target.name);
  //   // console.log("*****event.target.value:", event.target.value);
  //   // console.log("*****event.target.type:", event.target.type);
  //   setLanguage(value);
  //   // console.log("*****language:", language, ".");
  //   setReloadLanguage(value);
  //   // if(event.target.type !== 'checkbox') {
  //   //   setObjectForm({
  //   //     ...objectForm,
  //   //     [event.target.name] : event.target.value
  //   //   });
  //   // } else { //if(event.target.type === 'checkbox') {
  //   //   setObjectForm({
  //   //     ...objectForm,
  //   //     [event.target.name] : event.target.checked,
  //   //   });
  //   // }
  // };

  const changeLanguage = (value) => {
    // setLanguage(value);
    // console.log("*****language:", language, ".");
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
          
          {/* <select name='language' onChange={changeLanguage} value={language} >
            <option value='' defaultValue>...</option>
            <option value="es-ES">ES</option>
            <option value="en-US">EN</option>
            <option value="de-DE">DE</option>
          </select> */}
          
          {/* <Form.Control as="select" 
            name="language"
            id="language"
            onChange={changeLanguageBySelect}
            value={language}
            style={{ width: '72px' }}
            >
              <option value="es-ES">ES</option>
              <option value="en-US">EN</option>
          </Form.Control> */}

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