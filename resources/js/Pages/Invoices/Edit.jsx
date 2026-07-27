import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, invoice }) {
    const { data, setData, put, processing, errors } = useForm({
        payment_status: invoice.payment_status || 'Pending',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('invoices.update', invoice.id));
    };

    const inputClass = "mt-1.5 block w-full border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    const labelClass = "block text-sm font-medium text-gray-700 mb-0.5";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoice {invoice.invoice_number}</h2>}
        >
            <Head title={`Invoice ${invoice.invoice_number}`} />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl border border-gray-100">

                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">Update Invoice Status</h3>
                                    <p className="text-xs text-gray-500">Manage payment status for {invoice.invoice_number}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Receipt Summary Card */}
                            <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-6 mb-6 relative overflow-hidden">
                                {/* Decorative top edge like a receipt */}
                                <div className="absolute top-0 left-0 right-0 h-1 flex space-x-1 overflow-hidden opacity-20">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full -mt-1 flex-shrink-0"></div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-center mb-6">
                                    <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm inline-flex">
                                        <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25h6a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0015 3H9a2.25 2.25 0 00-2.25 2.25v6.75A2.25 2.25 0 009 14.25z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 14.25v4.5a2.25 2.25 0 01-2.25 2.25h-3a2.25 2.25 0 01-2.25-2.25v-4.5" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                                        <span className="text-gray-500 font-medium">Vehicle</span>
                                        <span className="text-gray-800 font-medium">{invoice.job_card.booking.vehicle.registration_no}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                                        <span className="text-gray-500 font-medium">Customer</span>
                                        <span className="text-gray-800 font-medium">{invoice.job_card.booking.customer.name}</span>
                                    </div>
                                    
                                    <div className="pt-2 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Labor Total</span>
                                            <span className="text-gray-700 font-medium">Rs. {Number(invoice.labor_total).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Parts Total</span>
                                            <span className="text-gray-700 font-medium">Rs. {Number(invoice.parts_total).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-300">
                                        <span className="text-base font-bold text-gray-800 uppercase tracking-wider">Grand Total</span>
                                        <span className="text-xl font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-200 shadow-sm">
                                            Rs. {Number(invoice.grand_total).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className={labelClass}>Payment Status</label>
                                    <select
                                        value={data.payment_status}
                                        onChange={(e) => setData('payment_status', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                    {errors.payment_status && <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>{errors.payment_status}</div>}
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route('invoices.index')}
                                        className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-95 disabled:opacity-60 transition-all"
                                    >
                                        {processing ? 'Saving…' : 'Update Payment Status'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}