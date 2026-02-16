import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Users, MessageSquare, Monitor, Smartphone, Tablet, RefreshCw } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AnalyticsDashboard = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, contactsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/analytics/stats`),
        fetch(`${BACKEND_URL}/api/contacts`),
      ]);
      const statsData = await statsRes.json();
      const contactsData = await contactsRes.json();
      setStats(statsData);
      setMessages(contactsData.contacts || []);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  const deviceIcon = (type) => {
    if (type === 'mobile') return <Smartphone size={14} />;
    if (type === 'tablet') return <Tablet size={14} />;
    return <Monitor size={14} />;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-void/90 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
        data-testid="analytics-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-card rounded-2xl border border-white/[0.08]"
          onClick={(e) => e.stopPropagation()}
          data-testid="analytics-dashboard"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Analytics Dashboard</h2>
              <p className="text-xs font-mono text-slate-500 mt-1">Visitor insights & messages</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                data-testid="analytics-refresh"
                className="p-2 rounded-lg text-slate-400 hover:text-accent hover:bg-accent/[0.06] transition-all"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={onClose}
                data-testid="analytics-close"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-4">
            {['overview', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                data-testid={`analytics-tab-${tab}`}
                className={`px-4 py-2 rounded-lg font-mono text-xs tracking-wide uppercase transition-all ${
                  activeTab === tab
                    ? 'bg-accent/[0.1] text-accent'
                    : 'text-slate-500 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <RefreshCw size={24} className="animate-spin text-accent" />
            </div>
          ) : (
            <div className="p-6">
              {activeTab === 'overview' && stats && (
                <div className="space-y-6">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={<Eye size={18} />} label="Total Visits" value={stats.total_visits} color="#0EF6CC" />
                    <StatCard icon={<Users size={18} />} label="Today" value={stats.today_visits} color="#3B82F6" />
                    <StatCard icon={<MessageSquare size={18} />} label="Messages" value={stats.total_messages} color="#F59E0B" />
                    <StatCard icon={<MessageSquare size={18} />} label="Unread" value={stats.unread_messages} color="#EF4444" />
                  </div>

                  {/* Device breakdown */}
                  {Object.keys(stats.devices).length > 0 && (
                    <div>
                      <h3 className="font-mono text-xs text-slate-500 tracking-wide uppercase mb-3">Devices</h3>
                      <div className="flex gap-4">
                        {Object.entries(stats.devices).map(([device, count]) => (
                          <div key={device} className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-lg">
                            <span className="text-accent">{deviceIcon(device)}</span>
                            <span className="font-mono text-sm text-white capitalize">{device}</span>
                            <span className="font-mono text-xs text-slate-500">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Top referrers */}
                  {stats.top_referrers.length > 0 && (
                    <div>
                      <h3 className="font-mono text-xs text-slate-500 tracking-wide uppercase mb-3">Top Referrers</h3>
                      <div className="space-y-2">
                        {stats.top_referrers.map((r, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-2.5 glass-card rounded-lg">
                            <span className="text-sm text-slate-300 font-mono truncate max-w-[300px]">{r.referrer}</span>
                            <span className="font-mono text-xs text-accent">{r.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent visits */}
                  <div>
                    <h3 className="font-mono text-xs text-slate-500 tracking-wide uppercase mb-3">Recent Visits</h3>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      {stats.recent_visits.map((v, i) => (
                        <div key={i} className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-white/[0.02] text-xs">
                          <span className="font-mono text-slate-500 w-40 shrink-0">
                            {new Date(v.timestamp).toLocaleString()}
                          </span>
                          <span className="text-slate-400 truncate">{v.page}</span>
                          <span className="text-slate-600 ml-auto">{v.screen_width}x{v.screen_height}</span>
                        </div>
                      ))}
                      {stats.recent_visits.length === 0 && (
                        <p className="text-sm text-slate-500 text-center py-4">No visits yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-8">No messages yet</p>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={i} className="glass-card rounded-xl p-5" data-testid={`message-card-${i}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-heading font-semibold text-sm text-white">{msg.name}</span>
                            <span className="font-mono text-xs text-slate-500">{msg.email}</span>
                          </div>
                          <span className="font-mono text-xs text-slate-600">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {msg.subject && (
                          <p className="text-sm text-accent font-medium mb-1">{msg.subject}</p>
                        )}
                        <p className="text-sm text-slate-400 leading-relaxed">{msg.message}</p>
                        {!msg.read && (
                          <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono bg-accent/10 text-accent">NEW</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="glass-card rounded-xl p-5" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
    <div className="flex items-center gap-2 mb-3">
      <span style={{ color }}>{icon}</span>
      <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase">{label}</span>
    </div>
    <span className="font-heading font-bold text-3xl text-white">{value}</span>
  </div>
);

export default AnalyticsDashboard;
