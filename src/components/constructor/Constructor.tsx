import React, { FC } from 'react';
import { SVG_COLOR } from '../../constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import { EIcon, SvgIcon } from '../svgicon';

import cl from './Constructor.module.scss';

interface ConstructorProps {
  children: JSX.Element;
}
export const Constructor: FC<ConstructorProps> = ({ children }) => {
  const dragSensor = useAppSelector((state) => state.constructorSlice.items);

  return (
    <div className={cl.sidebar_constuctor__content}>
      {children}
      {!dragSensor.some((obj) => obj.draggable === false) && (
        <div className={cl.sidebar_constructor__placeholder}>
          <SvgIcon
            name={EIcon.Placeholder}
            color={SVG_COLOR.black}
            size={{ width: '22', height: '22' }}
          />
          <div className={cl.sidebar_constuctor__blue}>Перетащите сюда</div>
          <div className={cl.sidebar_constuctor__bottom}>
            любой элемент
            <br /> из левой панели
          </div>
        </div>
      )}
    </div>
  );
};
