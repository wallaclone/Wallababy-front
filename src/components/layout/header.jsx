

import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';


export default function Header(props) {
  const { user, setUser } = useContext(AuthContext);
  
  async function logout() {
    window.localStorage.removeItem('token')
    setUser(null)      
  }

  const handleClick =  () => {
      logout()
    }
  
  return (
    <>
    <div className='navbar-wrapper'>
    <Navbar fixed="top" collapseOnSelect expand="lg">
  <Navbar.Brand className='title' href="/dashboard">Wallaclone!</Navbar.Brand>
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
        <NavDropdown.Item href="/favorites">Your favorites</NavDropdown.Item>
        <NavDropdown.Item>Your ads</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Edit your profile</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link className='logout' onClick={handleClick} href="/login">log out</Nav.Link>
    </Nav>
    </>
    }
  </Navbar.Collapse>
  </Navbar>
  </div>

    </>
  )
}