// testing useContext - navbar with logged user
// ! don't merge with develop

import React, { useContext } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';


export default function ContextTest(props) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <>
<Navbar className='navbar'>
  <Navbar.Brand href="#home">Wallaclone</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      Signed in as: {user}
    </Navbar.Text>
   
  </Navbar.Collapse>
</Navbar> 
 <Button>
      Logged out
    </Button>
    </>
  )
}