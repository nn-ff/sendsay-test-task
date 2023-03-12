import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { operandAction } from '../store/slices/calculatorSlice';
import { DisplayProps } from './Display';

const Operators: FC<DisplayProps> = ({ side }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'operators')?.draggable;
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  const operation = ['/', '*', '-', '+'];
  const styleSide = side === 'right' ? 'right_side' : '';

  return (
    <div
      className={`sidebar-operators ${runtime ? 'runtime_disable_drag' : ''} ${
        !isDraggable && side === 'left' ? 'not_active' : ''
      } ${styleSide}`}>
      <div className="sidebar-operators__content">
        {operation.map((arr) => {
          return (
            <button
              key={arr}
              onClick={runtime ? () => dispatch(operandAction(arr)) : undefined}
              className={`${runtime ? 'action_active' : 'number_deactive'}`}>
              {arr === '*' ? 'x' : arr}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Operators;
