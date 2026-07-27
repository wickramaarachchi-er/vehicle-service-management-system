import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    Completed: 'bg-green-100 text-green-800 border-green-200',
    Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusBorderColors = {
    Pending: 'border-l-yellow-400',
    'In Progress': 'border-l-blue-400',
    Completed: 'border-l-green-400',
    Cancelled: 'border-l-red-400',
};

const chartColors = {
    Pending: '#eab308',
    'In Progress': '#3b82f6',
    Completed: '#22c55e',
    Cancelled: '#ef4444',
};

export default function Dashboard({
    auth,
    todaysBookings,
    activeJobs,
    lowStockParts,
    dailyRevenue,
    todaysBookingsCount,
    activeJobsCount,
    lowStockCount,
}) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const dateStr = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());

    const statusCounts = activeJobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));

    const barData = [
        { name: 'Bookings', value: todaysBookingsCount, fill: '#6366f1' },
        { name: 'Active Jobs', value: activeJobsCount, fill: '#3b82f6' },
        { name: 'Low Stock', value: lowStockCount, fill: '#ef4444' }
    ];

    const cardClass = `bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-slide-up opacity-0`;
    const revenueCardClass = `bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-md p-4 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up opacity-0 text-white`;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2 animate-slide-up" style={{ animationDelay: '0s' }}>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {greeting}, {auth.user.name.split(' ')[0]}! 👋
                            </h1>
                            <p className="mt-1.5 text-gray-500 font-medium">{dateStr}</p>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Revenue Card */}
                        <div className={revenueCardClass} style={{ animationDelay: '0.1s' }}>
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-11 h-11 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg shadow-inner ring-2 ring-white/30">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <h3 className="text-xs font-bold text-emerald-50 tracking-wider uppercase">Today's Revenue</h3>
                                    </div>
                                    <p className="text-2xl font-extrabold text-white tracking-tight mt-1">
                                        Rs. {Number(dailyRevenue).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </p>
                                </div>
                                <div className="mt-3 -mx-2 h-6 opacity-40 relative bottom-0">
                                    <svg preserveAspectRatio="none" className="w-full h-full text-white" viewBox="0 0 100 20">
                                        <path d="M0,20 L10,15 L20,18 L30,5 L40,12 L50,8 L60,15 L70,2 L80,10 L90,6 L100,0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M0,20 L10,15 L20,18 L30,5 L40,12 L50,8 L60,15 L70,2 L80,10 L90,6 L100,0 L100,20 L0,20 Z" fill="currentColor" fillOpacity="0.2" stroke="none"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bookings Card */}
                        <div className={`${cardClass} border-l-4 border-l-indigo-500`} style={{ animationDelay: '0.2s' }}>
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-16 h-16 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/></svg>
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-md ring-2 ring-white text-white">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today's Bookings</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{todaysBookingsCount}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Active Jobs Card */}
                        <div className={`${cardClass} border-l-4 border-l-blue-500`} style={{ animationDelay: '0.3s' }}>
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13.78 15.3l-1.06 1.06a1.5 1.5 0 0 1-2.12 0l-5.65-5.65a1.5 1.5 0 0 1 0-2.12l1.06-1.06a.5.5 0 0 1 .71 0l4.24 4.24a.5.5 0 0 1 0 .71l-.71.71a1.5 1.5 0 0 0 0 2.12l3.53 3.53a.5.5 0 0 1 0 .71z"/></svg>
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md ring-2 ring-white text-white">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Jobs</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{activeJobsCount}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Low Stock Card */}
                        <div className={`${cardClass} border-l-4 border-l-red-500`} style={{ animationDelay: '0.4s' }}>
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-md ring-2 ring-white text-white">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Low Stock Parts</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{lowStockCount}</h3>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Chart: Job Status Distribution */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
                            <div className="mb-4 pb-3 border-b-2 border-indigo-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                                    </div>
                                    Job Status Distribution
                                </h3>
                            </div>
                            <div className="flex-1 min-h-[300px] relative mt-2">
                                {pieData.length > 0 ? (
                                    <>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="45%"
                                                    innerRadius={70}
                                                    outerRadius={95}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={chartColors[entry.name] || '#8884d8'} />
                                                    ))}
                                                </Pie>
                                                <RechartsTooltip
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-[10%]">
                                            <span className="text-4xl font-extrabold text-gray-800 leading-none">{activeJobsCount}</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Jobs</span>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                                            {pieData.map(entry => (
                                                <div key={entry.name} className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartColors[entry.name] }}></span>
                                                    <span className="text-xs font-medium text-gray-600">{entry.name}</span>
                                                    <span className="text-xs font-bold text-gray-900 ml-1">{entry.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-3 border border-gray-100">
                                            <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                        </div>
                                        <p className="text-sm font-medium">No active jobs data.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chart: Today's Overview Bar Chart */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
                            <div className="mb-4 pb-3 border-b-2 border-blue-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center border border-blue-100">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    </div>
                                    Today's Overview Activity
                                </h3>
                            </div>
                            <div className="flex-1 min-h-[250px] mt-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                        <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13, fontWeight: 500}} width={90} />
                                        <RechartsTooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                            {barData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                    {/* Lists Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Today's Bookings */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col animate-slide-up opacity-0" style={{ animationDelay: '0.7s' }}>
                            <div className="mb-4 pb-3 border-b-2 border-indigo-100 flex justify-between items-end">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                    Today's Bookings
                                </h3>
                                <Link href={route('bookings.index')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                                    View all &rarr;
                                </Link>
                            </div>
                            <div className="flex-1 mt-1">
                                {todaysBookings.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 border border-gray-100">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <p className="text-sm font-medium">No bookings scheduled for today.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-3">
                                        {todaysBookings.map((booking) => (
                                            <li key={booking.id} className={`p-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-between group ${statusBorderColors[booking.status] || 'border-l-gray-300'}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-white flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5">Time</span>
                                                        <span className="text-sm font-bold text-gray-700 leading-none">{booking.booking_time.substring(0, 5)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 font-mono tracking-tight">{booking.vehicle?.registration_no}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                            {booking.customer?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold shadow-sm ${statusColors[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Active Jobs List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 lg:col-span-2 flex flex-col animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
                            <div className="mb-4 pb-3 border-b-2 border-blue-100 flex justify-between items-end">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center border border-blue-100">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    </div>
                                    Active Jobs
                                </h3>
                                <Link href={route('job-cards.index')} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                    View all &rarr;
                                </Link>
                            </div>
                            <div className="flex-1 mt-1">
                                {activeJobs.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 border border-gray-100">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <p className="text-sm font-medium">No active jobs right now.</p>
                                        <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                                    </div>
                                ) : (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {activeJobs.map((jobCard) => (
                                            <li key={jobCard.id} className={`p-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-between group ${statusBorderColors[jobCard.status] || 'border-l-gray-300'}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-200 shadow-sm group-hover:scale-105 transition-transform">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 font-mono tracking-tight">{jobCard.booking?.vehicle?.registration_no}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                            {jobCard.mechanic?.name || 'Unassigned mechanic'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold shadow-sm ${statusColors[jobCard.status]}`}>
                                                    {jobCard.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Low Stock Alerts */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col border-t-4 border-t-red-500 animate-slide-up opacity-0" style={{ animationDelay: '0.9s' }}>
                        <div className="mb-4 pb-3 border-b-2 border-red-100 flex justify-between items-end">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center border border-red-100">
                                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                Low Stock Alerts
                            </h3>
                            <Link href={route('parts.index')} className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors">
                                Manage parts &rarr;
                            </Link>
                        </div>
                        <div className="flex-1 mt-1">
                            {lowStockParts.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 border border-gray-100">
                                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-sm font-medium">All parts are sufficiently stocked.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {lowStockParts.map((part) => (
                                        <div key={part.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow hover:border-red-200 transition-all flex flex-col relative overflow-hidden group">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400 group-hover:bg-red-500 transition-colors"></div>
                                            <div className="flex justify-between items-start mb-2 pl-1">
                                                <span className="font-semibold text-gray-800">{part.name}</span>
                                                <span className="font-mono text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">{part.part_number}</span>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-gray-200 flex items-center justify-between pl-1">
                                                <span className="text-xs font-medium text-gray-500">Current Stock</span>
                                                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-red-200 shadow-sm">
                                                    <span className="font-bold text-red-600 leading-none">{part.stock_quantity}</span>
                                                    <span className="text-[10px] text-red-400 font-bold leading-none">/ {part.low_stock_threshold} min</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}