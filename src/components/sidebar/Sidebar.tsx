import React, { FC } from 'react';
import cl from './Sidebar.module.scss';

interface SidebarProps {
  children: JSX.Element;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return <div className={cl.sidebar}>{children}</div>;
};
