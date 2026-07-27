import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, jobCard, mechanics, parts }) {
    const { data, setData, put, processing, errors } = useForm({
        mechanic_id: jobCard.mechanic_id || '',
        status: jobCard.status || 'Pending',
        summary: jobCard.summary || '',
        labor_cost: jobCard.labor_cost || 0,
        parts: jobCard.parts.map((p) => ({
            part_id: p.id,
            quantity_used: p.pivot.quantity_used,
        })),
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
        put(route('job-cards.update', jobCard.id));
    };

    const inputClass = "mt-1.5 block w-full border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    const labelClass = "block text-sm font-medium text-gray-700 mb-0.5";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Job Card</h2>}
        >
            <Head title="Edit Job Card" />

            <div className="py-8">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl border border-gray-100">

                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184M12 13.5h.008v.008H12v-.008Zm0-3h.008v.008H12v-.008Zm0 6h.008v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">Edit Job Card</h3>
                                    <p className="text-xs text-gray-500">Update job details and parts</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="px-6 py-6 space-y-6">

                            <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg">🚗</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-indigo-800 uppercase tracking-wider">Vehicle</p>
                                        <p className="text-sm font-medium text-gray-900">{jobCard.booking.vehicle.registration_no}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-indigo-200"></div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg">👤</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-800 uppercase tracking-wider">Customer</p>
                                        <p className="text-sm font-medium text-gray-900">{jobCard.booking.customer.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Assign Mechanic</label>
                                    <select
                                        value={data.mechanic_id}
                                        onChange={(e) => setData('mechanic_id', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Unassigned</option>
                                        {mechanics.map((mechanic) => (
                                            <option key={mechanic.id} value={mechanic.id}>
                                                {mechanic.name} — {mechanic.specialization}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.mechanic_id && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.mechanic_id}</div>}
                                </div>

                                <div>
                                    <label className={labelClass}>Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.status}</div>}
                                    {data.status === 'Completed' && (
                                        <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-700 bg-amber-50 p-2 rounded-md border border-amber-200">
                                            <svg className="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                            </svg>
                                            Marking as Completed will deduct part stock automatically.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Labor Cost (Rs.)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.labor_cost}
                                    onChange={(e) => setData('labor_cost', e.target.value)}
                                    className={`${inputClass} max-w-xs`}
                                />
                                {errors.labor_cost && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.labor_cost}</div>}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800">Parts Used</label>
                                        <p className="text-xs text-gray-500 mt-0.5">Manage parts required for this job</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addPartRow}
                                        className="inline-flex items-center gap-1 text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 font-medium"
                                    >
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Add Part
                                    </button>
                                </div>

                                {data.parts.length === 0 ? (
                                    <div className="text-center py-6 bg-white rounded-lg border border-gray-200 border-dashed">
                                        <p className="text-sm text-gray-400 font-medium">No parts added.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {data.parts.map((row, index) => (
                                            <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm relative group transition-all hover:border-indigo-200">
                                                <div className="flex-1">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Select Part</label>
                                                    <select
                                                        value={row.part_id}
                                                        onChange={(e) => updatePartRow(index, 'part_id', e.target.value)}
                                                        className="block w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    >
                                                        <option value="">Select a part</option>
                                                        {parts.map((part) => (
                                                            <option key={part.id} value={part.id}>
                                                                {part.name} (Stock: {part.stock_quantity}) — Rs. {part.unit_price}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="w-28">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={row.quantity_used}
                                                        onChange={(e) => updatePartRow(index, 'quantity_used', e.target.value)}
                                                        className="block w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div className="pt-5">
                                                    <button
                                                        type="button"
                                                        onClick={() => removePartRow(index)}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        title="Remove Part"
                                                    >
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.parts && <div className="text-red-500 text-xs mt-2 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.parts}</div>}
                            </div>

                            <div>
                                <label className={labelClass}>Job Summary / Notes</label>
                                <textarea
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    className={inputClass}
                                    rows="3"
                                    placeholder="Enter summary or notes..."
                                />
                                {errors.summary && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.summary}</div>}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('job-cards.index')}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-95 disabled:opacity-60 transition-all"
                                >
                                    {processing ? 'Saving…' : 'Update Job Card'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}