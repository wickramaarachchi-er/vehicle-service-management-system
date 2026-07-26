import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, part }) {
    const { data, setData, put, processing, errors } = useForm({
        name: part.name || '',
        part_number: part.part_number || '',
        stock_quantity: part.stock_quantity ?? '',
        low_stock_threshold: part.low_stock_threshold ?? '',
        unit_price: part.unit_price ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('parts.update', part.id));
    };

    const inputClass = "mt-1.5 block w-full border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    const labelClass = "block text-sm font-medium text-gray-700 mb-0.5";
    const ErrIcon = () => (
        <svg className="h-3.5 w-3.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
        </svg>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Part</h2>}
        >
            <Head title="Edit Part" />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl border border-gray-100">

                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">Edit Part</h3>
                                    <p className="text-xs text-gray-500">Update details for <span className="font-medium text-indigo-600">{part.name}</span></p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="px-6 py-6 space-y-5">

                            <div>
                                <label className={labelClass}>Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={inputClass}
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><ErrIcon />{errors.name}</div>}
                            </div>

                            <div>
                                <label className={labelClass}>Part Number</label>
                                <input
                                    type="text"
                                    value={data.part_number}
                                    onChange={(e) => setData('part_number', e.target.value)}
                                    className={inputClass}
                                />
                                {errors.part_number && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><ErrIcon />{errors.part_number}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Stock Quantity</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.stock_quantity}
                                        onChange={(e) => setData('stock_quantity', e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors.stock_quantity && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><ErrIcon />{errors.stock_quantity}</div>}
                                </div>
                                <div>
                                    <label className={labelClass}>Low Stock Threshold</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.low_stock_threshold}
                                        onChange={(e) => setData('low_stock_threshold', e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors.low_stock_threshold && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><ErrIcon />{errors.low_stock_threshold}</div>}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Unit Price</label>
                                <div className="relative mt-1.5">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-400 text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.unit_price}
                                        onChange={(e) => setData('unit_price', e.target.value)}
                                        className="block w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    />
                                </div>
                                {errors.unit_price && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><ErrIcon />{errors.unit_price}</div>}
                            </div>

                            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                                <Link
                                    href={route('parts.index')}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-95 disabled:opacity-60 transition-all"
                                >
                                    {processing ? 'Saving…' : 'Update Part'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
