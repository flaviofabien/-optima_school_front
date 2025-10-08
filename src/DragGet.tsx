import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    
  } from '@dnd-kit/sortable';
  import { CSS } from '@dnd-kit/utilities';
  
  export default function DraggableUserListGet({ items, setItems }: any) {
    const sensors = useSensors(useSensor(PointerSensor));
  
    const swap = (arr: any[], indexA: number, indexB: number) => {
        const newArr = [...arr];
        const temp = newArr[indexA];
        newArr[indexA] = newArr[indexB];
        newArr[indexB] = temp;
        return newArr;
      };
    
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over.id);

        const newItems = swap(items, oldIndex, newIndex);
        setItems(newItems);
    };
  
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items?.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
        <ul className="flex gap-4  p-4 rounded  w-[1500px] flex-wrap">
            {items?.map((item: any,index : any) => (                
                <div className={` `}>
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    item={item}
                    index={index}
                    setItems={setItems}
                  />                
                </div>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    );
  }
  
  function SortableItem({ id, item , index , setItems }: any) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 1000 : 'auto',
      backgroundColor: 'white',
      width: '150px',
      height: '80px',
    };    
  
    return (
        <div className={`${index % 2 !== 0 && " flex gap-x-2 gap-y-8" } relative `} >
            <li
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className= {`bg-white py-4 px-4 rounded shadow w-40 relative `} 
            >
               
                <span>{item.nom}</span>
                <div className="text-xs text-gray-500">{item.Classe?.nom}</div>
            </li> <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    e.preventDefault(); 
                    console.log("Clicked to remove ID:", id);
                    setItems((prevItems: any[]) =>
                      prevItems.filter((i: any) => i.id !== id)
                    );
                  }}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700 hover:scale-150 z-[2000] bg-white"
                  type="button"
                >
                  ✕
                </button>

            <div className={`${ ( (index + 1) % 2 === 0 && ((index + 1 ) % 8 !== 0)   ) && " ml-2 border-r-4 border-black" } `}  ></div>
        </div>
    );
  }
  