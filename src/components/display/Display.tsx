import React, { FC } from 'react';
import cl from './Display.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { MAX_NUMBERS } from '../../constants/calculation';

export interface DisplayProps {
  side?: 'right' | 'left';
}

export const Display: FC<DisplayProps> = ({ side }) => {
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'display')?.draggable;
  const { display, upperDisplay } = useAppSelector((state) => state.calculatorSlice.items);
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);

  return (
    <div
      className={`${cl.sidebar_display} ${!isDraggable && side === 'left' ? cl.not_active : ''} ${
        side === 'right' ? cl.display__cursor + ' ' + cl.right_side : ''
      }`}>
      <div
        className={`${cl.sidebar_display__content} ${
          !runtime ? cl.result__constructor : cl.result__runtime
        }`}>
        <div className={cl.sidebar_display__upper}>{upperDisplay.replaceAll('.', ',')}</div>
        <div
          className={`${cl.sidebar_display__result} ${
            runtime ? (display.length > MAX_NUMBERS ? cl.result__lenght : cl.result__low) : ''
          }`}>
          {display.replaceAll('.', ',')}
        </div>
      </div>
    </div>
  );
};
