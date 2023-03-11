import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { operandAction } from '../store/slices/calculatorSlice';
import { DisplayProps } from './Display';

const Operators: FC<DisplayProps> = ({ draggable, side }) => {
  const dispatch = useAppDispatch();
  const style = side === 'right' ? 'right_side' : '';
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'operators')?.draggable;
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  const operation = ['/', '*', '-', '+'];

  return (
    <div
      className={`sidebar-operators ${runtime ? 'runtime_disable_drag' : 'draggable'} ${
        !isDraggable && side === 'left' ? 'not_active' : ''
      } ${style}`}>
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
