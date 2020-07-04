import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';
import { Form }  from 'react-bootstrap';

import {FormattedMessage, FormattedDate, FormattedTime, FormattedRelativeTime} from 'react-intl';

export default function Header({setReloadLanguage}) {
  const { user, setUser } = useContext(AuthContext);

  async function logout() {
    window.localStorage.removeItem('token')
    setUser(null)      
  }

  const handleClick =  () => {
    logout()
  }



  const [ language, setLanguage ] = useState ('');

  const changeLanguage = (event) => {
    console.log("*****event.target.name:", event.target.name);
    console.log("*****event.target.value:", event.target.value);
    //console.log("*****event.target.type:", event.target.type);

    const value = event.target.value;
    console.log("*****value:", value);

    setLanguage('Hola');
    console.log("*****language:", language, ".");

    setLanguage(value);

    console.log("*****language:", language, ".");




    setReloadLanguage(event.target.value);

    // if(event.target.type !== 'checkbox') {
    //   setObjectForm({
    //     ...objectForm,
    //     [event.target.name] : event.target.value
    //   });
    // } else { //if(event.target.type === 'checkbox') {
    //   setObjectForm({
    //     ...objectForm,
    //     [event.target.name] : event.target.checked,
    //   });
    // }

    

  };
  
  return (
    <>
    <div className='navbar-wrapper'>
      <Navbar fixed="top" collapseOnSelect expand="lg">
        <Navbar.Brand className='title' href="/dashbnoard">Wallaclone!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {
          (user === 'guest') ? <Nav className='end-section'> <Nav.Link href="/login">login!</Nav.Link></Nav> :
          <>
          <Nav className="mr-auto"> 
            <Nav.Link href="dashboard">ad list</Nav.Link>
            <Nav.Link href="/createad">create ad</Nav.Link>
          </Nav>

          <Nav className='right-section'>
            <NavDropdown title={user} id="collasible-nav-dropdown">
              <NavDropdown.Item>Your favorites</NavDropdown.Item>
              <NavDropdown.Item>Your ads</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Edit your profile</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='logout' onClick={handleClick} href="/login">log out</Nav.Link>
          </Nav>
          </>
          }
          
          <select name='language' onChange={changeLanguage} value={language} >
            <option value="es-ES">ES</option> {/* defaultValue */}
            <option value="en-US">EN</option>
            <option value="de-DE">DE</option>
          </select>

          {/* <Form.Control as="select" 
            name="language"
            id="language"
            onChange={changeLanguage}
            value={objectForm.language} 
            >
              <option value="es-ES" defaultValue>ES</option>
              <option value="en-US">EN</option>
              <option value="de-DE">DE</option>
          </Form.Control> */}

          {/* <FormattedMessage id="app.title" value={(message) => ({message})} /> */}

        </Navbar.Collapse>
      </Navbar>
    </div>
    </>
  )
}