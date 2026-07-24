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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoice {invoice.invoice_number}</h2>}
        >
            <Head title={`Invoice ${invoice.invoice_number}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="mb-6 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Vehicle</span>
                                <span>{invoice.job_card.booking.vehicle.registration_no}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Customer</span>
                                <span>{invoice.job_card.booking.customer.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Labor Total</span>
                                <span>Rs. {Number(invoice.labor_total).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Parts Total</span>
                                <span>Rs. {Number(invoice.parts_total).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base border-t pt-2">
                                <span>Grand Total</span>
                                <span>Rs. {Number(invoice.grand_total).toFixed(2)}</span>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                                <select
                                    value={data.payment_status}
                                    onChange={(e) => setData('payment_status', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                </select>
                                {errors.payment_status && <div className="text-red-600 text-sm mt-1">{errors.payment_status}</div>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('invoices.index')}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Update Payment Status
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}