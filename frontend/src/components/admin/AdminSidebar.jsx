import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTachometerAlt,
  FaBox,
  FaProjectDiagram,
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaChartLine,
  FaUserShield,
  FaCalendarAlt,
  FaChevronLeft
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';

const logoDark = '/images/logo-dark.png';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const menuItems = [
    { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard', exact: true },
    { path: '/admin/packages', icon: FaBox, label: 'Packages' },
    { path: '/admin/projects', icon: FaProjectDiagram, label: 'Projects' },
    { path: '/admin/clients', icon: FaUsers, label: 'Clients' },
    { path: '/admin/properties', icon: FaBuilding, label: 'Properties' },
    { path: '/admin/payments', icon: FaMoneyBillWave, label: 'Payments' },
    { path: '/admin/reports', icon: FaChartLine, label: 'Reports' },
    { path: '/admin/timeline', icon: FaCalendarAlt, label: 'Timeline' },
    { path: '/admin/messages', icon: FaEnvelope, label: 'Messages' },
    { path: '/admin/users', icon: FaUserShield, label: 'Users' },
    { path: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-[280px] bg-surface-100 border-r border-white/5 z-50 flex flex-col"
            >
              {/* Logo */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <Link to="/admin" className="flex items-center gap-3">
                  <img
                    src={logoDark}
                    alt="Future"
                    className="h-9 w-auto"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div>
                    <span className="text-base font-bold text-gradient-brand">FUTURE</span>
                    <span className="text-base font-bold text-white/90 ml-1.5">ADMIN</span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-muted hover:text-white hover:bg-white/10 transition-all"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-4 mx-4 mt-4 glass-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{user.name || 'Admin'}</p>
                      <p className="text-muted text-xs truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu */}
              <nav className="flex-1 overflow-y-auto p-3 mt-2">
                <ul className="space-y-0.5">
                  {menuItems.map((item) => {
                    const active = isActive(item.path, item.exact);
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-sm ${
                            active
                              ? 'bg-brand-500/15 text-brand-400 font-medium border border-brand-500/20'
                              : 'text-muted-light hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className={`text-sm ${active ? 'text-brand-400' : 'text-muted group-hover:text-brand-400'}`} />
                            <span>{item.label}</span>
                          </div>
                          {active && <FaChevronLeft className="text-[10px] text-brand-400" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Logout */}
              <div className="p-3 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-3 w-full px-3 py-2.5 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose hover:bg-accent-rose/20 transition-all duration-200 text-sm"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
