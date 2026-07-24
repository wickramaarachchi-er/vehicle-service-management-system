import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
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
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <p className="text-sm text-gray-500">Today's Bookings</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{todaysBookingsCount}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <p className="text-sm text-gray-500">Active Jobs</p>
                            <p className="text-3xl font-bold text-blue-600 mt-1">{activeJobsCount}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <p className="text-sm text-gray-500">Low Stock Parts</p>
                            <p className="text-3xl font-bold text-red-600 mt-1">{lowStockCount}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <p className="text-sm text-gray-500">Today's Revenue</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">Rs. {Number(dailyRevenue).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Today's Bookings */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-800">Today's Bookings</h3>
                                <Link href={route('bookings.index')} className="text-sm text-indigo-600 hover:underline">
                                    View all
                                </Link>
                            </div>
                            {todaysBookings.length === 0 ? (
                                <p className="text-sm text-gray-500">No bookings scheduled for today.</p>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {todaysBookings.map((booking) => (
                                        <li key={booking.id} className="py-2 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium">{booking.vehicle?.registration_no}</p>
                                                <p className="text-xs text-gray-500">{booking.customer?.name} — {booking.booking_time}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Active Jobs */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-800">Active Jobs</h3>
                                <Link href={route('job-cards.index')} className="text-sm text-indigo-600 hover:underline">
                                    View all
                                </Link>
                            </div>
                            {activeJobs.length === 0 ? (
                                <p className="text-sm text-gray-500">No active jobs right now.</p>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {activeJobs.map((jobCard) => (
                                        <li key={jobCard.id} className="py-2 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium">{jobCard.booking?.vehicle?.registration_no}</p>
                                                <p className="text-xs text-gray-500">{jobCard.mechanic?.name || 'Unassigned'}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[jobCard.status]}`}>
                                                {jobCard.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Low Stock Alerts */}
                        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-800">Low Stock Alerts</h3>
                                <Link href={route('parts.index')} className="text-sm text-indigo-600 hover:underline">
                                    Manage parts
                                </Link>
                            </div>
                            {lowStockParts.length === 0 ? (
                                <p className="text-sm text-gray-500">All parts are sufficiently stocked.</p>
                            ) : (
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-500">
                                            <th className="py-1">Part</th>
                                            <th className="py-1">Part Number</th>
                                            <th className="py-1">Current Stock</th>
                                            <th className="py-1">Threshold</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {lowStockParts.map((part) => (
                                            <tr key={part.id}>
                                                <td className="py-2">{part.name}</td>
                                                <td className="py-2">{part.part_number}</td>
                                                <td className="py-2 text-red-600 font-medium">{part.stock_quantity}</td>
                                                <td className="py-2">{part.low_stock_threshold}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}