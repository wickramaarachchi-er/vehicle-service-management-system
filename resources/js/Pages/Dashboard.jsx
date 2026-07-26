import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    Completed: 'bg-green-100 text-green-800 border-green-200',
    Cancelled: 'bg-red-100 text-red-800 border-red-200',
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
    
    // Prepare data for the donut chart
    const statusCounts = activeJobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Overview</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* Bookings Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/></svg>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-inner shadow-indigo-400/50 text-white">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Today's Bookings</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{todaysBookingsCount}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Active Jobs Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13.78 15.3l-1.06 1.06a1.5 1.5 0 0 1-2.12 0l-5.65-5.65a1.5 1.5 0 0 1 0-2.12l1.06-1.06a.5.5 0 0 1 .71 0l4.24 4.24a.5.5 0 0 1 0 .71l-.71.71a1.5 1.5 0 0 0 0 2.12l3.53 3.53a.5.5 0 0 1 0 .71z"/></svg>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-inner shadow-blue-400/50 text-white">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{activeJobsCount}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Low Stock Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-red-500 to-amber-500 rounded-xl shadow-inner shadow-red-400/50 text-white">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Low Stock Parts</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{lowStockCount}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Revenue Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-inner shadow-emerald-400/50 text-white">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Today's Revenue</p>
                                    <h3 className="text-2xl font-bold text-gray-800">Rs. {Number(dailyRevenue).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                                </div>
                            </div>
                            {/* Decorative Sparkline */}
                            <div className="mt-4 -mx-2 h-8 text-emerald-500 opacity-50 relative bottom-0">
                                <svg preserveAspectRatio="none" className="w-full h-full" viewBox="0 0 100 20">
                                    <path d="M0,20 L10,15 L20,18 L30,5 L40,12 L50,8 L60,15 L70,2 L80,10 L90,6 L100,0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M0,20 L10,15 L20,18 L30,5 L40,12 L50,8 L60,15 L70,2 L80,10 L90,6 L100,0 L100,20 L0,20 Z" fill="currentColor" fillOpacity="0.1" stroke="none"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Today's Bookings */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Today's Bookings
                                </h3>
                                <Link href={route('bookings.index')} className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors">
                                    View all
                                </Link>
                            </div>
                            <div className="flex-1 p-2">
                                {todaysBookings.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <p className="text-sm font-medium">No bookings scheduled for today.</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-gray-50">
                                        {todaysBookings.map((booking) => (
                                            <li key={booking.id} className="p-4 hover:bg-gray-50/80 rounded-lg transition-colors flex items-center justify-between group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-indigo-50/50 flex flex-col items-center justify-center border border-indigo-50">
                                                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider leading-none mb-0.5">Time</span>
                                                        <span className="text-sm font-bold text-indigo-700 leading-none">{booking.booking_time.substring(0, 5)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 font-mono tracking-tight">{booking.vehicle?.registration_no}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                            {booking.customer?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border shadow-sm ${statusColors[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Active Jobs List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 lg:col-span-2 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    Active Jobs
                                </h3>
                                <Link href={route('job-cards.index')} className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors">
                                    View all
                                </Link>
                            </div>
                            <div className="flex-1 p-2">
                                {activeJobs.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <p className="text-sm font-medium">No active jobs right now.</p>
                                        <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-gray-50">
                                        {activeJobs.map((jobCard) => (
                                            <li key={jobCard.id} className="p-4 hover:bg-gray-50/80 rounded-lg transition-colors flex items-center justify-between group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                                                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 font-mono tracking-tight">{jobCard.booking?.vehicle?.registration_no}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                            {jobCard.mechanic?.name || 'Unassigned mechanic'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border shadow-sm ${statusColors[jobCard.status]}`}>
                                                    {jobCard.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Chart: Job Status Distribution */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                            <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                                Job Status Distribution
                            </h3>
                            <div className="flex-1 min-h-[250px] relative">
                                {chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={chartColors[entry.name] || '#8884d8'} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                        <p className="text-sm">No active jobs data.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Low Stock Alerts */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 overflow-hidden flex flex-col border-t-4 border-t-red-500">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-red-50/30">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    Low Stock Alerts
                                </h3>
                                <Link href={route('parts.index')} className="text-xs font-medium text-red-600 hover:text-red-800 bg-red-50 px-3 py-1.5 rounded-full transition-colors">
                                    Manage parts
                                </Link>
                            </div>
                            <div className="flex-1 p-0">
                                {lowStockParts.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <p className="text-sm font-medium">All parts are sufficiently stocked.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-gray-50/50">
                                                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    <th className="px-6 py-3">Part</th>
                                                    <th className="px-6 py-3">Code</th>
                                                    <th className="px-6 py-3">Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {lowStockParts.map((part) => (
                                                    <tr key={part.id} className="hover:bg-red-50/30 transition-colors">
                                                        <td className="px-6 py-3 font-medium text-gray-800">{part.name}</td>
                                                        <td className="px-6 py-3 font-mono text-xs text-gray-500">{part.part_number}</td>
                                                        <td className="px-6 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-red-600">{part.stock_quantity}</span>
                                                                <span className="text-xs text-red-400">/ {part.low_stock_threshold} min</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}