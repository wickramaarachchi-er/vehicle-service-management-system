import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, bookings, mechanics, parts }) {
    const { data, setData, post, processing, errors } = useForm({
        booking_id: '',
        mechanic_id: '',
        labor_cost: 0,
        parts: [],
    });

    const addPartRow = () => {
        setData('parts', [...data.parts, { part_id: '', quantity_used: 1 }]);
    };

    const removePartRow = (index) => {
        setData('parts', data.parts.filter((_, i) => i !== index));
    };

    const updatePartRow = (index, field, value) => {
        const updated = [...data.parts];
        updated[index][field] = value;
        setData('parts', updated);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('job-cards.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Job Card</h2>}
        >
            <Head title="New Job Card" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Booking</label>
                                <select
                                    value={data.booking_id}
                                    onChange={(e) => setData('booking_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Select a booking</option>
                                    {bookings.map((booking) => (
                                        <option key={booking.id} value={booking.id}>
                                            {booking.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.booking_id && <div className="text-red-600 text-sm mt-1">{errors.booking_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Assign Mechanic</label>
                                <select
                                    value={data.mechanic_id}
                                    onChange={(e) => setData('mechanic_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Unassigned</option>
                                    {mechanics.map((mechanic) => (
                                        <option key={mechanic.id} value={mechanic.id}>
                                            {mechanic.name} — {mechanic.specialization}
                                        </option>
                                    ))}
                                </select>
                                {errors.mechanic_id && <div className="text-red-600 text-sm mt-1">{errors.mechanic_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Labor Cost</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.labor_cost}
                                    onChange={(e) => setData('labor_cost', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.labor_cost && <div className="text-red-600 text-sm mt-1">{errors.labor_cost}</div>}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Parts Used</label>
                                    <button
                                        type="button"
                                        onClick={addPartRow}
                                        className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200"
                                    >
                                        + Add Part
                                    </button>
                                </div>

                                {data.parts.map((row, index) => (
                                    <div key={index} className="flex gap-2 mb-2 items-start">
                                        <select
                                            value={row.part_id}
                                            onChange={(e) => updatePartRow(index, 'part_id', e.target.value)}
                                            className="flex-1 border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">Select a part</option>
                                            {parts.map((part) => (
                                                <option key={part.id} value={part.id}>
                                                    {part.name} (Stock: {part.stock_quantity}) — Rs. {part.unit_price}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            min="1"
                                            value={row.quantity_used}
                                            onChange={(e) => updatePartRow(index, 'quantity_used', e.target.value)}
                                            className="w-24 border-gray-300 rounded-md shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removePartRow(index)}
                                            className="text-red-600 px-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                {errors.parts && <div className="text-red-600 text-sm mt-1">{errors.parts}</div>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('job-cards.index')}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Create Job Card
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}