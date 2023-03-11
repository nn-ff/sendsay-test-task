import React, { FC, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useAppSelector } from '../hooks/useAppSelector';
export interface DisplayProps {
  draggable: boolean;
  side: string | boolean;
}
const Display: FC<DisplayProps> = ({ draggable, side }) => {
  const style = side === 'right' ? 'right_side' : '';
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'display')?.draggable;
  const value = useAppSelector((state) => state.calculatorSlice.items.display);
  const upperValue = useAppSelector((state) => state.calculatorSlice.items.upperDisplay);
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  return (
    <div
      className={`sidebar-display draggable ${
        !isDraggable && side === 'left' ? 'not_active' : 'display__cursor'
      } ${style}`}>
      <div
        className={`sidebar-display__content ${
          !runtime ? 'result__constructor' : 'result__runtime'
        }`}
        style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: -25, fontSize: 14 }}>{upperValue}</div>
        <div
          className={`sidebar-display__result ${
            runtime ? (value.length > 17 ? 'display__result__lenght' : 'display__result__low') : ''
          }`}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default Display;
