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

    const inputClass = "mt-1.5 block w-full border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    const labelClass = "block text-sm font-medium text-gray-700 mb-0.5";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Booking</h2>}
        >
            <Head title="New Booking" />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl border border-gray-100">

                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">New Booking</h3>
                                    <p className="text-xs text-gray-500">Schedule a new service appointment</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="px-6 py-6 space-y-5">

                            <div>
                                <label className={labelClass}>Vehicle</label>
                                <select
                                    value={data.vehicle_id}
                                    onChange={(e) => setData('vehicle_id', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select a vehicle</option>
                                    {vehicles.map((vehicle) => (
                                        <option key={vehicle.id} value={vehicle.id}>
                                            {vehicle.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.vehicle_id && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.vehicle_id}</div>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Booking Date</label>
                                    <input
                                        type="date"
                                        value={data.booking_date}
                                        onChange={(e) => setData('booking_date', e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors.booking_date && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.booking_date}</div>}
                                </div>
                                <div>
                                    <label className={labelClass}>Booking Time</label>
                                    <input
                                        type="time"
                                        value={data.booking_time}
                                        onChange={(e) => setData('booking_time', e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors.booking_time && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.booking_time}</div>}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Customer Complaint</label>
                                <textarea
                                    value={data.complaint}
                                    onChange={(e) => setData('complaint', e.target.value)}
                                    className={inputClass}
                                    rows="3"
                                    placeholder="e.g. Car makes a clicking noise when turning"
                                />
                                {errors.complaint && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.complaint}</div>}

                                <button
                                    type="button"
                                    onClick={getAiSuggestions}
                                    disabled={aiLoading}
                                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 transition-all"
                                >
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                    {aiLoading ? 'Analyzing...' : 'Get AI Suggestions'}
                                </button>

                                {aiError && (
                                    <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>
                                        {aiError}
                                    </div>
                                )}

                                {aiResult && (
                                    <div className="mt-4 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-sm font-bold text-purple-900 flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                                </svg>
                                                AI Analysis
                                            </h4>
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm ${urgencyColors[aiResult.urgency]}`}>
                                                {aiResult.urgency} Urgency
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1.5">Possible Issues</p>
                                                <ul className="space-y-1">
                                                    {aiResult.issues.map((issue, i) => (
                                                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                            <span className="text-purple-400 mt-0.5">•</span>
                                                            {issue}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1.5">Recommended Services</p>
                                                <ul className="space-y-1">
                                                    {aiResult.recommended_services.map((service, i) => (
                                                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                            <span className="text-indigo-400 mt-0.5">✓</span>
                                                            {service}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                                <Link
                                    href={route('bookings.index')}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-95 disabled:opacity-60 transition-all"
                                >
                                    {processing ? 'Saving…' : 'Create Booking'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}