import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { displayAction } from '../store/slices/calculatorSlice';
import { DisplayProps } from './Display';

const Numbers: FC<DisplayProps> = ({ side }) => {
  const dispatch = useAppDispatch();
  const numbersButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ','];
  const item = useAppSelector((state) => state.constructorSlice.items);
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  const isDraggable = item.find((obj) => obj.id === 'numbers')?.draggable;
  const styleSide = side === 'right' ? 'right_side' : '';
  return (
    <div
      className={`sidebar-numbers ${runtime ? 'runtime_disable_drag' : ''} ${
        !isDraggable && side === 'left' ? 'not_active' : ''
      } ${styleSide}`}>
      <div className="sidebar-numbers__content">
        {numbersButtons.map((arr) => {
          const styles = arr === 0 ? { width: 152 } : {};
          return (
            <button
              onClick={runtime ? () => dispatch(displayAction(String(arr))) : undefined}
              key={arr}
              style={styles}
              className={`${runtime ? 'action_active' : 'number_deactive'}`}>
              {arr}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Numbers;
