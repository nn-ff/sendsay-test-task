import React, { FC, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Display from './Display';
import Equal from './Equal';
import Numbers from './Numbers';
import Operators from './Operators';

interface SidebarProps {
  children: JSX.Element;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <div className="sidebar" style={{ position: 'relative' }}>
      {children}
      {/* <div>
        <div className={`sidebar-display`}>
          <div className="sidebar-display__content">
            <div className="sidebar-display__result">0</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
