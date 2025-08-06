import type { FC } from 'react';
import TestErrorButton from '../ErrorBoundary/TestErrorButton.tsx';
import { APP_TITLES } from '../../constants';
import './Header.module.scss';

const Header: FC = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">{APP_TITLES.MAIN_TITLE}</h1>
      <p className="app-subtitle">{APP_TITLES.SUBTITLE}</p>
      <TestErrorButton />
    </header>
  );
};

export default Header;
