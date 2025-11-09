import {
    arrayMove
  } from '@dnd-kit/sortable';

export const handleDragEnd = (event : any ,setItems : any,items : any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as number);
      const newIndex = items.indexOf(over.id as number);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

