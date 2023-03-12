import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { operandAction } from '../../store/slices/calculatorSlice';
import { DisplayProps } from '../display';
import cl from './BinaryOperators.module.scss';

export const BinaryOperators: FC<DisplayProps> = ({ side }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.constructorSlice.items);
  const isDraggable = item.find((obj) => obj.id === 'operators')?.draggable;
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  const operation = ['/', '*', '-', '+'];

  return (
    <div
      className={`${cl.sidebar_operators} ${runtime ? cl.runtime_disable__drag : ''} ${
        !isDraggable && side === 'left' ? cl.not_active : ''
      } ${side === 'right' ? cl.right_side : ''}`}>
      <div className={cl.sidebar_operators__content}>
        {operation.map((arr) => {
          return (
            <button
              key={arr}
              onClick={runtime ? () => dispatch(operandAction(arr)) : undefined}
              className={`${runtime ? cl.number_active : cl.number_deactive}`}>
              {arr === '*' ? 'x' : arr}
            </button>
          );
        })}
      </div>
    </div>
  );
};
