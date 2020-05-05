import React, { useState } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const [borderBottom, setBorderBottom] = useState('');

  const { url } = useRouteMatch();

  return (
    <Container url={url} size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link className="borderList" to="/">
            Listagem
          </Link>

          <Link className="borderImport" to="import">
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
