// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { useApp } from '../context/AppContext';
import { Bell, Search, User } from 'lucide-react';

const Layout = ({ children }) => {
  const { message } = useApp();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full bg-slate-50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
              <Bell size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-full transition-all">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="text-sm font-semibold text-slate-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>

        {/* Feedback Toast */}
        {message && (
          <div className="fixed bottom-8 right-8 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce-in flex items-center gap-3 z-50">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="font-medium text-sm">{message}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;
