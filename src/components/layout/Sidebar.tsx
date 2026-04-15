// src/components/layout/Sidebar.tsx
import { Link } from '@tanstack/react-router';
import { LayoutDashboard, HardHat, FileText, Settings } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Panel', path: '/' },
  { icon: HardHat, label: 'Obras', path: '/obras' },
  { icon: FileText, label: 'Partes', path: '/partes' },
  { icon: Settings, label: 'Ajustes', path: '/config' },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex-col p-4 sticky top-0">
      <div className="mb-8 px-2 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
        <span className="text-xl font-bold dark:text-white">partes-front</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path as any}
            activeProps={{ className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};