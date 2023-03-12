import React, { FC } from 'react';
import { SVG_COLOR } from '../../constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { resetAction } from '../../store/slices/calculatorSlice';
import { setRunTime } from '../../store/slices/runTimeSlice';
import { EIcon, SvgIcon } from '../svgicon';

import cl from './SwitchController.module.scss';

export const SwitchController: FC = () => {
  const dispatch = useAppDispatch();
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);

  const onClickController = () => {
    dispatch(setRunTime(false));
    dispatch(resetAction());
  };
  return (
    <div className={cl.sidebar_switch}>
      <div className={cl.sidebar_switch__content}>
        <div
          onClick={() => dispatch(setRunTime(true))}
          className={`${cl.controller_items__runtime} ${runtime ? cl.active : ''}`}>
          <SvgIcon
            name={EIcon.Runtime}
            color={runtime ? SVG_COLOR.blueberry : SVG_COLOR.cyanBlue}
            size={{ width: '20', height: '20' }}
          />
          Runtime
        </div>
        <div
          onClick={onClickController}
          className={`${cl.controller_items} ${!runtime ? cl.active : ''}`}>
          <SvgIcon
            name={EIcon.Constructor}
            color={runtime ? SVG_COLOR.cyanBlue : SVG_COLOR.blueberry}
            size={{ width: '20', height: '20' }}
          />
          Constructor
        </div>
      </div>
    </div>
  );
};
