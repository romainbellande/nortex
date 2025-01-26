import PageContainer from '@/components/page-container';
import { Heading } from '@/components/ui/heading';
import TaskFormDialog from './task-form-dialog';
import { KanbanBoard } from './kanban-board';

export const KanbanPage = () => {
  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={`Kanban`} description='Manage tasks by dnd' />
          <TaskFormDialog />
        </div>
        <KanbanBoard />
      </div>
    </PageContainer>
  );
};
