import React from 'react';
import Link from 'next/link';

// Components
import Logo from '../logo/logo';

// Styles
import * as Styles from './navbar.styles';

const Navbar = () => {
  return (
    <Styles.AppBarContainer>
      <Logo isHide={true} />
    </Styles.AppBarContainer>
  );
};

export default Navbar;
