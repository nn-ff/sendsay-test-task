import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { BinaryOperators } from './components/binaryOperators';
import { Canvas } from './components/canvas';
import { Constructor } from './components/constructor';
import { Display } from './components/display';
import { Equal } from './components/equal';
import { Numbers } from './components/numbers';
import { Sidebar } from './components/sidebar';
import { EIcon, SvgIcon } from './components/svgicon';
import { SVG_COLOR } from './constants';
import { GLOBAL_COLOR } from './constants/globalColor';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { setDragState } from './store/slices/constructorSlice';
import { getStyle } from './utils/getStyle';

interface Ilist {
  component: JSX.Element;
  id: string;
  draggable: boolean;
}

const list: Ilist[] = [
  { component: <Display />, id: 'display', draggable: true },
  { component: <BinaryOperators />, id: 'operators', draggable: true },
  { component: <Numbers />, id: 'numbers', draggable: true },
  { component: <Equal />, id: 'equal', draggable: true },
];

const App = () => {
  const dispatch = useAppDispatch();
  const runtime = useAppSelector((state) => state.runTimeSlice.items.runtime);
  const dragSensor = useAppSelector((state) => state.constructorSlice.items);
  const constructorList: Ilist[] = [];
  const [sidebarList, setSidebarList] = useState<Ilist[]>(list);
  const [runTimeList, setRunTimeList] = useState<Ilist[]>(constructorList);
  const [holder, setHolder] = useState<number>(0);
  const [dragStart, setDragStart] = useState<boolean>(false);
  const [globalDrag, setGlobalDrag] = useState<boolean>(false);

  const DragEndHandle = (result: DropResult) => {
    setGlobalDrag(false);
    setDragStart(false);
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      destination.droppableId === 'List' ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    let add: Ilist;
    const active: Ilist[] = sidebarList;
    const complete: Ilist[] = runTimeList;

    if (source.droppableId === 'List') {
      add = active.splice(source.index, 1)[0];
    } else {
      add = complete.splice(source.index, 1)[0];
    }

    if (destination.droppableId === 'List') {
      active.splice(destination.index, 0, add);
    } else {
      let customIndex;
      const hasDisplayCopy = complete.some((obj) => obj.id === 'display-copy');

      if (hasDisplayCopy && draggableId !== 'display' && destination.index === 0) {
        customIndex = destination.index + 1;
      } else {
        customIndex = draggableId === 'display' ? 0 : destination.index;
      }

      if (source.droppableId === 'List' && destination.droppableId === 'ConstructorList') {
        active.splice(source.index, 0, { ...add, draggable: false });
        dispatch(setDragState({ id: draggableId, draggable: false }));

        const copyId = add.id + '-copy';
        complete.splice(customIndex, 0, { ...add, id: copyId });
      } else {
        complete.splice(customIndex, 0, add);
      }
    }

    setSidebarList(active);
    setRunTimeList(complete);
  };

  const onClickRemove = (obj: Ilist) => {
    const removeItem = runTimeList.filter((item) => item.id !== obj.id);
    setRunTimeList(removeItem);
    dispatch(setDragState({ id: obj.id.replace('-copy', ''), draggable: true }));
  };

  const onDragUpdateHandle = (result: DragUpdate) => {
    const { destination, source, draggableId } = result;
    if (destination?.droppableId === 'ConstructorList') {
      if (draggableId === 'display') {
        setDragStart(true);
        setHolder(-1);
        return;
      }
      setDragStart(true);

      if (typeof destination?.index !== 'undefined') {
        if (destination.index === 0) {
          if (runTimeList.some((obj) => obj.id === 'display-copy')) {
            setHolder(0);
            return;
          }
        }
        if (destination.index === source.index - 1) {
          setHolder(destination.index - 1);
        } else {
          if (!runTimeList.some((obj) => obj.id === 'display-copy') && destination.index === 0) {
            setHolder(-1);
          } else {
            source.index === destination.index
              ? setHolder(destination.index - 1)
              : destination.index === 1 && source.index === 3
              ? setHolder(0)
              : setHolder(destination.index);
          }
        }
      } else {
        setHolder(source.index - 1);
      }
    } else {
      setDragStart(false);
    }
  };
  const onDragStartHandle = (result: DragStart) => {
    const { source } = result;
    setGlobalDrag(true);
    if (source.droppableId === 'List') {
      setDragStart(true);
      return;
    }
    if (source.droppableId === 'ConstructorList') {
      setHolder(source?.index - 1);
      setDragStart(true);
    }
  };

  const styles = {
    cursor: globalDrag ? 'move' : 'auto',
  };
  return (
    <div className="wrapper">
      <div className="calculator_wrapper" style={styles}>
        <DragDropContext
          onDragStart={onDragStartHandle}
          onDragUpdate={onDragUpdateHandle}
          onDragEnd={DragEndHandle}>
          {!runtime ? (
            <Sidebar>
              <Droppable isDropDisabled droppableId="List">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="sidebar-content">
                    {sidebarList.map((obj, index) => {
                      return (
                        <Draggable
                          key={obj.id}
                          draggableId={obj.id}
                          index={index}
                          disableInteractiveElementBlocking={true}
                          isDragDisabled={!dragSensor.find((arr) => arr.id === obj.id)?.draggable}>
                          {(provided, snapshot) => (
                            <>
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={getStyle(provided.draggableProps.style, snapshot, 'left')}>
                                {React.cloneElement(obj.component, {
                                  draggable: obj.draggable,
                                  side: 'left',
                                })}
                              </div>
                              {snapshot.isDragging && (
                                <div className="drag-clone">{obj.component}</div>
                              )}
                            </>
                          )}
                        </Draggable>
                      );
                    })}
                    <span className="hide__placeholder">{provided.placeholder}</span>
                  </div>
                )}
              </Droppable>
            </Sidebar>
          ) : (
            <div className="sidebar"></div>
          )}
          <Canvas>
            <Constructor>
              <Droppable droppableId="ConstructorList">
                {(provided, snapshot) => (
                  <div
                    className={`sidebar-constuctor ${
                      dragSensor.some((obj) => obj.draggable === false)
                        ? 'not_active_constructor'
                        : ''
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      backgroundColor: dragSensor.some((obj) => obj.draggable === false)
                        ? 'transparent'
                        : snapshot.isDraggingOver
                        ? GLOBAL_COLOR.aliceBlue
                        : 'transparent',
                    }}>
                    {!runTimeList.some((obj) => obj.id === 'display-copy') &&
                      holder === -1 &&
                      dragStart &&
                      !dragSensor.some((obj) => obj.draggable === false) === false && (
                        <SvgIcon
                          name={EIcon.Holder}
                          size={{ width: '250', height: '6' }}
                          color={SVG_COLOR.blueberry}
                          className={'draggable-holder__top'}
                        />
                      )}
                    {runTimeList.map((obj, index) => {
                      return (
                        <Draggable
                          disableInteractiveElementBlocking={true}
                          key={obj.id}
                          isDragDisabled={runtime ? true : obj.id === 'display-copy' ? true : false}
                          draggableId={obj.id}
                          index={index}>
                          {(provided, snapshot) => (
                            <>
                              <div
                                onDoubleClick={!runtime ? () => onClickRemove(obj) : undefined}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={getStyle(provided.draggableProps.style, snapshot, 'right')}>
                                {React.cloneElement(obj.component, {
                                  draggable: obj.draggable,
                                  side: 'right',
                                })}
                                {dragStart && index === holder ? (
                                  <SvgIcon
                                    name={EIcon.Holder}
                                    size={{ width: '250', height: '6' }}
                                    color={SVG_COLOR.blueberry}
                                    className={'draggable-holder'}
                                  />
                                ) : null}
                              </div>
                              {snapshot.isDragging && (
                                <div className="drag-clone__constructor">{obj.component}</div>
                              )}
                            </>
                          )}
                        </Draggable>
                      );
                    })}
                    <span className="hide__placeholder">{provided.placeholder}</span>
                  </div>
                )}
              </Droppable>
            </Constructor>
          </Canvas>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
