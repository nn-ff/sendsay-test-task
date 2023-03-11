import React, { FC } from 'react';
import Constructor from './Constructor';
import SwitchConstructor from './SwitchConstructor';

interface CanvasProps {
  children: JSX.Element;
}

const Canvas: FC<CanvasProps> = ({ children }) => {
  return (
    <div className="canvas">
      <SwitchConstructor />
      {children}
    </div>
  );
};

export default Canvas;
