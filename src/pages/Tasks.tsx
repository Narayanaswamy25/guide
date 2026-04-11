
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  List as ListIcon, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDroppable
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTaskStore, Task, TaskStatus, TaskPriority } from '../stores/taskStore';
import { useAuth } from '../context/AuthContext';

const COLUMNS: { id: TaskStatus; label: string; color: string; icon?: any }[] = [
  { id: 'backlog', label: 'Backlog', color: 'text-neutral-500', icon: Circle },
  { id: 'todo', label: 'To Do', color: 'text-[#00FFFF]', icon: ListIcon },
  { id: 'in-progress', label: 'In Progress', color: 'text-[#FF00FF]', icon: Clock },
  { id: 'done', label: 'Done', color: 'text-[#DFFF00]', icon: CheckCircle2 },
];

const PRIORITY_ICONS: Record<TaskPriority, any> = {
  low: Circle,
  medium: Clock,
  high: AlertCircle,
  urgent: FlameIcon,
};

function FlameIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 3.5 6.5 1.5 2 2 4.5 2 7a6 6 0 1 1-12 0c0-1.38.5-3 1-4.5 1.072-2.143.224-4.054 2-6 .5 2.5 2 4.5 3.5 6.5" />
    </svg>
  );
}

interface SortableTaskCardProps {
  task: Task;
}

const SortableTaskCard: React.FC<SortableTaskCardProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const PriorityIcon = PRIORITY_ICONS[task.priority];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#DFFF00]/30 transition-all group cursor-grab active:cursor-grabbing mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 ${
          task.priority === 'urgent' ? 'bg-red-500/10 text-red-500' : 
          task.priority === 'high' ? 'bg-[#FF00FF]/10 text-[#FF00FF]' :
          task.priority === 'medium' ? 'bg-[#00FFFF]/10 text-[#00FFFF]' :
          'bg-neutral-800 text-neutral-500'
        }`}>
          <PriorityIcon size={10} />
          {task.priority}
        </div>
        <button className="text-neutral-700 group-hover:text-white transition-colors">
          <MoreVertical size={14} />
        </button>
      </div>
      <h3 className="text-sm font-black text-white uppercase tracking-tight mb-3 group-hover:text-[#DFFF00] transition-colors leading-tight">
        {task.title}
      </h3>
      <p className="text-[10px] text-neutral-500 font-medium mb-6 line-clamp-2 leading-relaxed">
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-white border border-black flex items-center justify-center text-[8px] font-black text-black">
            JD
          </div>
        </div>
        <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-neutral-600">
          <div className="flex items-center gap-1">
            <Calendar size={10} />
            <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskColumn: React.FC<{
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
  icon: any;
}> = ({ id, title, tasks, color, icon: Icon }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${color}`}>
            {title}
          </span>
          <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-black text-neutral-500">
            {tasks.length}
          </span>
        </div>
        <button className="text-neutral-700 hover:text-white transition-colors">
          <Plus size={14} />
        </button>
      </div>

      <SortableContext 
        id={id}
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div 
          ref={setNodeRef}
          className="flex-grow space-y-4 p-2 rounded-2xl transition-colors min-h-[100px]"
        >
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
          
          {tasks.length === 0 && (
            <div className="h-40 border border-dashed border-white/5 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-neutral-800">
              Drop tasks here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export const Tasks: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    status: 'todo' as TaskStatus,
    dueDate: ''
  });

  const { tasks, addTask, moveTask, isLoading } = useTaskStore();
  const { user, isAuthReady } = useAuth();
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim() && user) {
      await addTask({
        ...newTask,
        assigneeId: user.id,
        projectId: 'default',
        tags: [],
        dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : ''
      });
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: ''
      });
      setIsAdding(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overId = over.id as string;

    // Check if dropped over a column or another task
    const overColumn = COLUMNS.find(c => c.id === overId);
    const overTask = tasks.find(t => t.id === overId);

    if (overColumn && activeTask) {
      moveTask(activeTask.id, overColumn.id);
    } else if (overTask && activeTask && activeTask.status !== overTask.status) {
      moveTask(activeTask.id, overTask.status);
    }

    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
        <div className="relative">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center animate-spin-slow">
            <div className="w-10 h-10 bg-[#00FFFF] rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.3)]"></div>
          </div>
          <div className="absolute -inset-4 bg-[#00FFFF]/10 blur-2xl rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <div className="text-[#00FFFF] font-black uppercase tracking-[0.6em] text-sm animate-pulse">
            Synchronizing Queue
          </div>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="text-neutral-600 font-mono text-[9px] uppercase tracking-[0.3em] max-w-xs text-center leading-relaxed">
          Mapping task dependencies... <br />
          Optimizing node distribution...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
            Your Assignments // {tasks.length} Pending
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Assignments
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-[#DFFF00] text-black' : 'text-neutral-500 hover:text-white'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-[#DFFF00] text-black' : 'text-neutral-500 hover:text-white'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] flex items-center gap-2"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </header>

      {/* New Task Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg glass-card p-10 relative"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
              >
                <Plus className="rotate-45" size={20} />
              </button>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Create Assignment</h2>
              <form onSubmit={handleAddTask} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Title</label>
                  <input 
                    type="text" 
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g. Complete Chapter 5 Reading"
                    className="input-field"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Description</label>
                  <textarea 
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Describe the assignment requirements..."
                    className="input-field min-h-[100px] py-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Priority</label>
                    <select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Due Date</label>
                    <input 
                      type="date" 
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full">Create Assignment</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-y border-white/5">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
            <input 
              type="text" 
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-[#DFFF00]/30 transition-all"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-neutral-500 hover:text-white transition-all">
            <Filter size={18} />
          </button>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DFFF00]"></span>
            <span>Done: {tasks.filter(t => t.status === 'done').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF00FF]"></span>
            <span>In Progress: {tasks.filter(t => t.status !== 'done').length}</span>
          </div>
        </div>
      </div>

      {/* View Content */}
      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COLUMNS.map((column) => (
                  <TaskColumn 
                    key={column.id}
                    id={column.id}
                    title={column.label}
                    color={column.color}
                    tasks={filteredTasks.filter(t => t.status === column.id)}
                    icon={column.icon || Circle}
                  />
                ))}
              </div>

              <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                  styles: {
                    active: {
                      opacity: '0.5',
                    },
                  },
                }),
              }}>
                {activeTask ? (
                  <div className="p-5 bg-white/[0.05] border border-[#DFFF00]/50 rounded-2xl shadow-2xl shadow-black/50 rotate-3 scale-105">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2">
                      {activeTask.title}
                    </h3>
                    <div className="text-[8px] font-black text-[#DFFF00] uppercase tracking-widest">
                      Moving...
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {filteredTasks.map((task) => (
              <div key={task.id} className="glass-card p-4 flex items-center justify-between group hover:border-[#DFFF00]/20 transition-all">
                <div className="flex items-center gap-6">
                  <button className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.status === 'done' ? 'bg-[#DFFF00] border-[#DFFF00] text-black' : 'border-neutral-800 text-transparent hover:border-white'
                  }`}>
                    <CheckCircle2 size={12} />
                  </button>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-[#DFFF00] transition-colors">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">{task.projectId}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                    task.priority === 'urgent' ? 'bg-red-500/10 text-red-500' : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {task.priority}
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white border border-black flex items-center justify-center text-[8px] font-black text-black">
                      JD
                    </div>
                  </div>
                  <button className="text-neutral-700 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
