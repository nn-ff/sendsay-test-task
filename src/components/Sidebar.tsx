import React, { FC } from 'react';

interface SidebarProps {
  children: JSX.Element;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
