import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, booking, vehicles }) {
    const { data, setData, put, processing, errors } = useForm({
        vehicle_id: booking.vehicle_id || '',
        booking_date: booking.booking_date || '',
        booking_time: booking.booking_time?.slice(0, 5) || '',
        complaint: booking.complaint || '',
        status: booking.status || 'Pending',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('bookings.update', booking.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Booking</h2>}
        >
            <Head title="Edit Booking" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Vehicle</label>
                                <select
                                    value={data.vehicle_id}
                                    onChange={(e) => setData('vehicle_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Select a vehicle</option>
                                    {vehicles.map((vehicle) => (
                                        <option key={vehicle.id} value={vehicle.id}>
                                            {vehicle.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.vehicle_id && <div className="text-red-600 text-sm mt-1">{errors.vehicle_id}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Booking Date</label>
                                    <input
                                        type="date"
                                        value={data.booking_date}
                                        onChange={(e) => setData('booking_date', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.booking_date && <div className="text-red-600 text-sm mt-1">{errors.booking_date}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Booking Time</label>
                                    <input
                                        type="time"
                                        value={data.booking_time}
                                        onChange={(e) => setData('booking_time', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.booking_time && <div className="text-red-600 text-sm mt-1">{errors.booking_time}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                {errors.status && <div className="text-red-600 text-sm mt-1">{errors.status}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Customer Complaint</label>
                                <textarea
                                    value={data.complaint}
                                    onChange={(e) => setData('complaint', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    rows="3"
                                />
                                {errors.complaint && <div className="text-red-600 text-sm mt-1">{errors.complaint}</div>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('bookings.index')}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Update Booking
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}