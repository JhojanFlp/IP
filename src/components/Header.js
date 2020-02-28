import React from 'react';
import { Navbar, NavbarText, NavbarBrand } from 'reactstrap';

const Header = () => {
  return (
    <div className="">
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">IP - Sistemas Operativos</NavbarBrand>
        <nav className="mr-auto" navbar>
          
        </nav>
        <NavbarText>Jhojan F. Beltrán - Julian A. Rojas</NavbarText>
      </Navbar>
    </div>
  );
}
 
export default Header;