import React, { useState } from 'react';
import { Users, Briefcase, Calendar, Bell, Settings, LayoutDashboard, DollarSign, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AxisLogo from './AxisLogo';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div 
      className={`
        fixed left-0 top-0 h-screen transition-all duration-300 z-20
        bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900
        shadow-xl
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className={`p-6 flex items-center justify-between ${isCollapsed ? 'px-4' : ''}`}>
        {!isCollapsed ? (
          <AxisLogo textClassName="text-2xl text-white" />
        ) : (
          <AxisLogo className="h-8 w-8" textClassName="hidden" />
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      <nav className="mt-6">
        <SidebarLink 
          icon={<LayoutDashboard />} 
          text="Dashboard" 
          isActive={currentPage === 'dashboard'}
          onClick={() => navigate('/dashboard')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink 
          icon={<Users />} 
          text="Clients" 
          isActive={currentPage === 'clients'}
          onClick={() => navigate('/clients')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink 
          icon={<Briefcase />} 
          text="Pipeline" 
          isActive={currentPage === 'pipeline'}
          onClick={() => navigate('/pipeline')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink 
          icon={<DollarSign />} 
          text="Billing" 
          isActive={currentPage === 'billing'}
          onClick={() => navigate('/billing')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink 
          icon={<Globe />} 
          text="Client Portal" 
          isActive={currentPage === 'portal'}
          onClick={() => navigate('/portal')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink icon={<Calendar />} text="Calendar" isCollapsed={isCollapsed} />
        <SidebarLink icon={<Bell />} text="Notifications" isCollapsed={isCollapsed} />
        <SidebarLink icon={<Settings />} text="Settings" isCollapsed={isCollapsed} />
      </nav>
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  isCollapsed: boolean;
}

const SidebarLink = ({ icon, text, isActive, onClick, isCollapsed }: SidebarLinkProps) => (
  <button
    onClick={onClick}
    className={`
      flex items-center w-full px-6 py-3 text-gray-300 transition-colors
      hover:bg-white/10 hover:text-white
      ${isActive ? 'bg-white/20 text-white shadow-sm' : ''}
      ${isCollapsed ? 'justify-center px-4' : ''}
    `}
    title={isCollapsed ? text : undefined}
  >
    <span className={isCollapsed ? '' : 'mr-3'}>{icon}</span>
    {!isCollapsed && text}
  </button>
);

export default Sidebar;