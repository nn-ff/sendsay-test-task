import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { operandAction } from '../store/slices/calculatorSlice';
import { DisplayProps } from './Display';

const Equal: FC<DisplayProps> = ({ draggable, side }) => {
  const dispatch = useAppDispatch();
  const style = side === 'right' ? 'right_side' : '';
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'equal')?.draggable;
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  return (
    <div
      className={`sidebar-equal  ${!isDraggable && side === 'left' ? 'not_active' : ''} ${style}`}>
      <div
        onClick={runtime ? () => dispatch(operandAction('=')) : undefined}
        className={`sidebar-equal__content  ${runtime ? 'action_active' : 'number_deactive'}`}>
        <div className={`sidebar-equal__result `}>=</div>
      </div>
    </div>
  );
};

export default Equal;
