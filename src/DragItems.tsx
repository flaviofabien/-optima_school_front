import React from 'react';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Types
type ItemId = number;

interface SortableItemProps {
  id: ItemId;
}


export const SortableItem: React.FC<SortableItemProps> = ({ id }) => {
    const {attributes,listeners,setNodeRef,transform,transition,isDragging} = useSortable({ id });
  
    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '10px',
      margin: '5px 0',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      cursor: 'grab',
      zIndex: isDragging ? 9999 : 'auto', // ✅ Force le clone au-dessus
      position: isDragging ? 'relative' : 'static', // ✅ Nécessaire pour le z-index
  
    };
  
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        Élément {id}
      </div>
    );
  };