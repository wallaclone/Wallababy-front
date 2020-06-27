// testing useContext

import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

export default function ContextTest() {
  const test = useContext(AuthContext) 
  return (
    <>
    <h2>Test</h2>
    <div>Context says:</div>
    <div>{test}</div>
    </>
  )
}