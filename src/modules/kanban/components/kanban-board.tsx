'use client';
import { FC, Fragment, useState } from 'react';
import {
  Announcements,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { SortableContext } from '@dnd-kit/sortable';
import { BoardColumnEntity } from '../server/schema/board-column';
import { KanbanBoardContainer } from './kanban-board-container';
import { BoardColumn } from './board-column';
import { BoardColumnFormDialog } from './board-column-form-dialog';
import { TaskCard } from './task-card';
import { BoardTaskEntity } from '../server/schema/board-task';

export const KanbanBoard: FC = () => {
  const columns: BoardColumnEntity[] = [];
  const tasks: BoardTaskEntity[] = [];
  const columnsId = columns.map((col) => col.id);
  const [activeColumn, setActiveColumn] = useState<BoardColumnEntity | null>(
    null
  );
  const [activeTask, setActiveTask] = useState<BoardTaskEntity | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: string) {
    const tasksInColumn = tasks.filter((task) => task.columnId === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column
    };
  }

  const onDragStart = (event: DragStartEvent) => {};
  const onDragEnd = (event: DragEndEvent) => {};
  const onDragOver = (event: DragOverEvent) => {};

  const announcements: Announcements = {
    onDragStart({ active }) {
      return '';
    },
    onDragOver({ active, over }) {
      return '';
    },
    onDragEnd({ active, over }) {
      return '';
    },
    onDragCancel({ active }) {
      return '';
    }
  };
  return (
    <DndContext
      accessibility={{
        announcements
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <KanbanBoardContainer>
        <SortableContext items={columnsId}>
          {columns?.map((col, index) => (
            <Fragment key={col.id}>
              <BoardColumn
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
              {index === columns?.length - 1 && (
                <div className='w-[300px]'>
                  <BoardColumnFormDialog />
                </div>
              )}
            </Fragment>
          ))}
          {!columns.length && <BoardColumnFormDialog />}
        </SortableContext>
      </KanbanBoardContainer>

      {'document' in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};
