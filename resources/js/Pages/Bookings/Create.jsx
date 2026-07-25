import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Create({ auth, vehicles }) {
    const { data, setData, post, processing, errors } = useForm({
        vehicle_id: '',
        booking_date: '',
        booking_time: '',
        complaint: '',
    });

    const [aiLoading, setAiLoading] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [aiError, setAiError] = useState(null);

    const getAiSuggestions = async () => {
        if (!data.complaint || data.complaint.trim().length < 5) {
            setAiError('Please enter a more detailed complaint first.');
            return;
        }

        setAiLoading(true);
        setAiError(null);
        setAiResult(null);

        try {
            const response = await axios.post(route('ai.analyze'), {
                complaint: data.complaint,
            });
            setAiResult(response.data);
        } catch (error) {
            setAiError('Could not get AI suggestions right now. You can still proceed manually.');
        } finally {
            setAiLoading(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    const urgencyColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800',
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Booking</h2>}
        >
            <Head title="New Booking" />

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
                                <label className="block text-sm font-medium text-gray-700">Customer Complaint</label>
                                <textarea
                                    value={data.complaint}
                                    onChange={(e) => setData('complaint', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    rows="3"
                                    placeholder="e.g. Car makes a clicking noise when turning"
                                />
                                {errors.complaint && <div className="text-red-600 text-sm mt-1">{errors.complaint}</div>}

                                <button
                                    type="button"
                                    onClick={getAiSuggestions}
                                    disabled={aiLoading}
                                    className="mt-2 text-sm bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {aiLoading ? 'Analyzing...' : '✨ Get AI Suggestions'}
                                </button>

                                {aiError && (
                                    <p className="text-sm text-red-600 mt-2">{aiError}</p>
                                )}

                                {aiResult && (
                                    <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-md space-y-2">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-semibold text-purple-800">AI Analysis</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${urgencyColors[aiResult.urgency]}`}>
                                                {aiResult.urgency} Urgency
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-600">Possible Issues:</p>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {aiResult.issues.map((issue, i) => (
                                                    <li key={i}>{issue}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-600">Recommended Services:</p>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {aiResult.recommended_services.map((service, i) => (
                                                    <li key={i}>{service}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
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
                                    Create Booking
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}