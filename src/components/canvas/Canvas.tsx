import React, { FC } from 'react';
import { SwitchController } from '../switchController';

import cl from './Canvas.module.scss';

interface CanvasProps {
  children: JSX.Element;
}

export const Canvas: FC<CanvasProps> = ({ children }) => {
  return (
    <div className={cl.canvas}>
      <SwitchController />
      {children}
    </div>
  );
};
