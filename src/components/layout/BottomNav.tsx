// src/components/layout/BottomNav.tsx
import { Link } from '@tanstack/react-router';
import { LayoutDashboard, HardHat, FileText, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Inicio', path: '/' },
  { icon: HardHat, label: 'Obras', path: '/obras' },
  { icon: FileText, label: 'Partes', path: '/partes' },
  { icon: Settings, label: 'Ajustes', path: '/config' },
];

export const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg pb-safe">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path as any}
            activeProps={{ className: 'text-blue-600' }}
            className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400"
          >
            <item.icon size={24} />
            <span className="text-[10px] font-medium uppercase tracking-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};