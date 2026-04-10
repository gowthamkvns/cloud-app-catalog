import { useAppContext } from '@/context/AppContext';
import { usageOverTimeData, categoryDistribution } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AppWindow, Users, Activity } from 'lucide-react';
import AppCard from '@/components/AppCard';

const COLORS = ['hsl(199,89%,48%)', 'hsl(265,70%,60%)', 'hsl(142,71%,45%)', 'hsl(38,92%,50%)', 'hsl(340,75%,55%)', 'hsl(199,60%,35%)'];

const StatCard = ({ icon: Icon, label, value, trend }: { icon: any; label: string; value: string; trend?: string }) => (
  <div className="glass-card rounded-xl p-5 animate-fade-in">
    <div className="flex items-center justify-between mb-3">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4.5 h-4.5 text-primary" />
      </div>
      {trend && <span className="text-xs text-success font-mono font-medium">+{trend}</span>}
    </div>
    <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </div>
);

const Dashboard = () => {
  const { applications } = useAppContext();
  const totalUsage = applications.reduce((sum, a) => sum + a.usageCount, 0);
  const topApps = [...applications].sort((a, b) => b.usageCount - a.usageCount).slice(0, 4);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading font-bold text-2xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Cloud application catalog overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={AppWindow} label="Total Apps" value={applications.length.toString()} trend="12%" />
        <StatCard icon={Users} label="Total Usage" value={totalUsage.toLocaleString()} trend="24%" />
        <StatCard icon={Activity} label="Active Apps" value={applications.filter(a => a.status === 'active').length.toString()} />
        <StatCard icon={TrendingUp} label="Categories" value={new Set(applications.map(a => a.category)).size.toString()} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h2 className="font-heading font-semibold text-sm text-foreground mb-4">Usage Trends</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={usageOverTimeData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199,89%,48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199,89%,48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,16%)" />
              <XAxis dataKey="month" stroke="hsl(215,12%,50%)" fontSize={12} />
              <YAxis stroke="hsl(215,12%,50%)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: 'hsl(225,20%,9%)', border: '1px solid hsl(225,15%,16%)', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: 'hsl(210,20%,92%)' }}
              />
              <Area type="monotone" dataKey="users" stroke="hsl(199,89%,48%)" fill="url(#colorUsers)" strokeWidth={2} />
              <Area type="monotone" dataKey="apps" stroke="hsl(265,70%,60%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h2 className="font-heading font-semibold text-sm text-foreground mb-4">Categories</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {categoryDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: 'hsl(225,20%,9%)', border: '1px solid hsl(225,15%,16%)', borderRadius: '8px', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {categoryDistribution.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Apps */}
      <div>
        <h2 className="font-heading font-semibold text-sm text-foreground mb-3">Most Used Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topApps.map(app => <AppCard key={app.id} app={app} compact />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
