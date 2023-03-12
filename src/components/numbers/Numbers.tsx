import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { displayAction } from '../../store/slices/calculatorSlice';
import { DisplayProps } from '../display';
import cl from './Numbers.module.scss';

export const Numbers: FC<DisplayProps> = ({ side }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.constructorSlice.items);
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  const isDraggable = item.find((obj) => obj.id === 'numbers')?.draggable;
  const numbersButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ','];

  return (
    <div
      className={`${cl.sidebar_numbers} ${runtime ? cl.runtime_disable__drag : ''} ${
        !isDraggable && side === 'left' ? cl.not_active : ''
      } ${side === 'right' ? cl.right_side : ''}`}>
      <div className={cl.sidebar_numbers__content}>
        {numbersButtons.map((arr) => {
          const styles = arr === 0 ? { width: 152 } : {};
          return (
            <button
              onClick={
                runtime ? () => dispatch(displayAction(String(arr).replace(',', '.'))) : undefined
              }
              key={arr}
              style={styles}
              className={`${runtime ? cl.number_active : cl.number_deactive}`}>
              {arr}
            </button>
          );
        })}
      </div>
    </div>
  );
};
