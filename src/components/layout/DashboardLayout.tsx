// src/components/layout/DashboardLayout.tsx
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { useThemeStore } from "../../store/useThemeStore";
import { Sun, Moon, Bell } from "lucide-react";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Responsivo */}
        <header className="h-16 sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            {/* Logo solo visible en móvil */}
            <div className="md:hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <h2 className="text-sm font-bold md:font-medium text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Resumen
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
          </div>
        </header>

        {/* Contenido Principal con padding extra en móvil */}
        <main className="p-4 md:p-8 pb-24 md:pb-8">{children}</main>
      </div>

      <BottomNav />
    </div>
  );
};
