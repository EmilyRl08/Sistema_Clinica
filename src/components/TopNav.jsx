import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartPulse, LayoutDashboard, Users, UserRound, CalendarDays, Bell, Search, User } from 'lucide-react';

const TopNav = () => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/pacientes', name: 'Pacientes', icon: <Users size={18} /> },
    { path: '/medicos', name: 'Médicos', icon: <UserRound size={18} /> },
    { path: '/consultas', name: 'Consultas', icon: <CalendarDays size={18} /> },
  ];

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-8 sticky top-0 z-50 transition-all shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-rose-50 rounded-xl">
          <HeartPulse className="text-rose-500" size={28} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent">
          MedCore
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 font-medium text-sm ${
                isActive 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="w-full bg-slate-100/50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        
        <button className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 pr-4 rounded-full transition-all border border-transparent hover:border-slate-200">
          <div className="w-9 h-9 bg-gradient-to-tr from-primary to-indigo-500 rounded-full flex items-center justify-center text-white shadow-sm">
            <User size={18} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 leading-none">Admin</p>
            <p className="text-xs text-slate-500 mt-1">Gestor</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
