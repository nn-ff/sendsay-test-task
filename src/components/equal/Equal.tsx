import React, { FC } from 'react';
import cl from './Equal.module.scss';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { operandAction } from '../../store/slices/calculatorSlice';
import { DisplayProps } from '../display';

export const Equal: FC<DisplayProps> = ({ side }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'equal')?.draggable;
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);

  return (
    <div
      className={`${cl.sidebar_equal} ${!isDraggable && side === 'left' ? cl.not_active : ''} ${
        side === 'right' ? cl.right_side : ''
      }`}>
      <div
        onClick={runtime ? () => dispatch(operandAction('=')) : undefined}
        className={`${cl.sidebar_equal__content} ${
          runtime ? cl.number_active : cl.number_deactive
        }`}>
        <div>=</div>
      </div>
    </div>
  );
};
