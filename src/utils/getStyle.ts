import { DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

export function getStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot,
  side: string,
) {
  if (!snapshot.isDragging) return;
  if (!snapshot.isDropAnimating) {
    return {
      ...style,
      opacity: snapshot.isDragging && side === 'left' ? '0.7' : '1',
      boxShadow:
        side === 'right' && snapshot.isDragging
          ? '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)'
          : 'none',
      borderRadius: side === 'right' && snapshot.isDragging ? '4px' : 0,
    };
  }
  return {
    ...style,
    transitionDuration: '0.001s',
  };
}
