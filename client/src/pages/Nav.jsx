import React from 'react';
import './All.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar navbar-default'>
      <div className="container">
        <div className="navbar-header">
          <img className="logo" src="/vite.svg" alt="banklogo" />
        </div>
        <ul className="navul">
          <li id="home">
            <Link to="/">HOME</Link>
          </li>
          <li id="customer">
            <Link to="/customers">CUSTOMERS</Link>
          </li>
          <li id="transaction">
            <Link to="/transaction">TRANSACTION</Link>
          </li>
           <li id="ledger">
          <Link to='/ledger'>LEDGER</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
