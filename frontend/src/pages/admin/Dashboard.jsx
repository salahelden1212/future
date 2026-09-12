import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaChartLine,
  FaEnvelope,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
  FaBox,
  FaCalendarAlt
} from 'react-icons/fa';
import { dashboardAPI } from '../../services/apiService';
import { formatCurrency } from '../../utils/helpers';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Clients',
      value: stats?.overview?.totalClients || 0,
      icon: FaUsers,
      color: 'bg-brand-500/15 text-brand-400 border-brand-500/20',
      iconColor: 'text-brand-400',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Active Properties',
      value: stats?.overview?.activeProperties || 0,
      icon: FaBuilding,
      color: 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/20',
      iconColor: 'text-accent-cyan',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.overview?.totalRevenue || 0),
      icon: FaChartLine,
      color: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/20',
      iconColor: 'text-accent-emerald',
      trend: '+23%',
      trendUp: true
    },
    {
      title: 'Total Paid',
      value: formatCurrency(stats?.overview?.totalPaid || 0),
      icon: FaMoneyBillWave,
      color: 'bg-brand-400/15 text-brand-400 border-brand-400/20',
      iconColor: 'text-brand-400',
      trend: '+15%',
      trendUp: true
    },
    {
      title: 'Remaining',
      value: formatCurrency(stats?.overview?.totalRemaining || 0),
      icon: FaMoneyBillWave,
      color: 'bg-accent-rose/15 text-accent-rose border-accent-rose/20',
      iconColor: 'text-accent-rose',
      trend: '-5%',
      trendUp: false
    },
    {
      title: 'Unread Messages',
      value: stats?.overview?.unreadMessages || 0,
      icon: FaEnvelope,
      color: 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/20',
      iconColor: 'text-accent-cyan',
      trend: 'New',
      trendUp: true
    },
  ];

  const quickLinks = [
    { icon: FaBox, label: 'Packages', path: '/admin/packages', color: 'text-brand-400 bg-brand-500/10' },
    { icon: FaUsers, label: 'Clients', path: '/admin/clients', color: 'text-accent-cyan bg-accent-cyan/10' },
    { icon: FaBuilding, label: 'Properties', path: '/admin/properties', color: 'text-accent-emerald bg-accent-emerald/10' },
    { icon: FaCalendarAlt, label: 'Timeline', path: '/admin/timeline', color: 'text-brand-400 bg-brand-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome to <span className="text-gradient-brand">Dashboard</span>
          </h1>
          <p className="text-muted-light text-sm">Here's what's happening with your business today.</p>
        </div>
        <div className="text-muted text-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickLinks.map((link, index) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={link.path}
              className="group flex items-center gap-3 p-4 glass-card hover:border-brand-500/30 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center`}>
                <link.icon className="text-sm" />
              </div>
              <span className="text-muted-light group-hover:text-white text-sm font-medium transition-colors">{link.label}</span>
              <FaArrowRight className="ml-auto text-muted group-hover:text-brand-400 group-hover:translate-x-1 text-xs transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="premium-card group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} border flex items-center justify-center`}>
                <stat.icon className={`text-lg ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                stat.trendUp ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-rose/15 text-accent-rose'
              }`}>
                {stat.trendUp ? <FaArrowUp className="text-[9px]" /> : <FaArrowDown className="text-[9px]" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-muted text-sm mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Payments */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-emerald/15 flex items-center justify-center">
                <FaMoneyBillWave className="text-accent-emerald text-sm" />
              </div>
              Recent Payments
            </h2>
            <Link to="/admin/payments" className="text-brand-400 hover:text-brand-300 text-xs flex items-center gap-1">
              View All <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          <div className="space-y-2">
            {stats?.recentPayments?.length > 0 ? (
              stats.recentPayments.slice(0, 5).map((payment, index) => (
                <motion.div
                  key={payment._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white font-bold text-xs">
                      {payment.client?.name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{payment.client?.name || 'Unknown Client'}</p>
                      <p className="text-muted text-xs">{payment.property?.address || 'N/A'}</p>
                    </div>
                  </div>
                  <p className="text-accent-emerald font-semibold text-sm">{formatCurrency(payment.amount)}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-muted text-center py-8 text-sm">No recent payments</p>
            )}
          </div>
        </motion.div>

        {/* Recent Properties */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-cyan/15 flex items-center justify-center">
                <FaBuilding className="text-accent-cyan text-sm" />
              </div>
              Recent Properties
            </h2>
            <Link to="/admin/properties" className="text-brand-400 hover:text-brand-300 text-xs flex items-center gap-1">
              View All <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          <div className="space-y-2">
            {stats?.recentProperties?.length > 0 ? (
              stats.recentProperties.slice(0, 5).map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xs">
                      {property.client?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{property.client?.name || 'Unknown'}</p>
                      <p className="text-muted text-xs truncate max-w-[180px]">{property.address || 'N/A'}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    property.status === 'completed' ? 'bg-accent-emerald/15 text-accent-emerald' :
                    property.status === 'in-progress' ? 'bg-brand-500/15 text-brand-400' :
                    'bg-accent-cyan/15 text-accent-cyan'
                  }`}>
                    {property.status?.replace('-', ' ') || 'pending'}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-muted text-center py-8 text-sm">No recent properties</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
