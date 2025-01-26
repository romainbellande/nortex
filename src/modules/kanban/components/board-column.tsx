import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BoardColumnActions } from './board-column-actions';
import { TaskCard } from './task-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BoardTaskEntity } from '../server/schema/board-task';
import { BoardColumnEntity } from '../server/schema/board-column';

export type ColumnType = 'Column';

export interface ColumnDragData {
  type: ColumnType;
  column: BoardColumnEntity;
}

interface BoardColumnProps {
  column: BoardColumnEntity;
  tasks: BoardTaskEntity[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.name}`
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva(
    'h-[75vh] max-h-[75vh] w-[350px] max-w-full bg-secondary flex flex-col flex-shrink-0 snap-center',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2 opacity-30',
          overlay: 'ring-2 ring-primary'
        }
      }
    }
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
      })}
    >
      <CardHeader className='space-between flex flex-row items-center border-b-2 p-4 text-left font-semibold'>
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className='relative -ml-2 h-auto cursor-grab p-1 text-primary/50'
        >
          <span className='sr-only'>{`Move column: ${column.title}`}</span>
          <GripVertical />
        </Button>
        {/* <span className="mr-auto !mt-0"> {column.title}</span> */}
        {/* <Input
          defaultValue={column.title}
          className="text-base !mt-0 mr-auto"
        /> */}
        <BoardColumnActions id={column.id} title={column.title} />
      </CardHeader>
      <CardContent className='flex flex-grow flex-col gap-4 overflow-x-hidden p-2'>
        <ScrollArea className='h-full'>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
