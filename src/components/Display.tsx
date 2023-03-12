import React, { FC } from 'react';

import { useAppSelector } from '../hooks/useAppSelector';
export interface DisplayProps {
  side: string | boolean;
}
const Display: FC<DisplayProps> = ({ side }) => {
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'display')?.draggable;
  const { display, upperDisplay } = useAppSelector((state) => state.calculatorSlice.items);
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  const styleSide = side === 'right' ? 'right_side' : '';

  return (
    <div
      className={`sidebar-display ${
        !isDraggable && side === 'left' ? 'not_active' : side === 'right' ? 'display__cursor' : ''
      } ${styleSide}`}>
      <div
        className={`sidebar-display__content ${
          !runtime ? 'result__constructor' : 'result__runtime'
        }`}>
        <div className="sidebar-display__upper">{upperDisplay}</div>
        <div
          className={`sidebar-display__result ${
            runtime ? (display.length > 17 ? 'result__lenght' : 'result__low') : ''
          }`}>
          {display}
        </div>
      </div>
    </div>
  );
};

export default Display;
