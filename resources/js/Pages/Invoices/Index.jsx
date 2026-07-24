import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const paymentColors = {
    Paid: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
};

export default function Index({ auth, invoices, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('invoices.index'), { search }, { preserveState: true });
    };

    const handleDelete = (invoice) => {
        if (confirm(`Are you sure you want to delete invoice ${invoice.invoice_number}?`)) {
            router.delete(route('invoices.destroy', invoice.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2>}
        >
            <Head title="Invoices" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by invoice number or customer..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-gray-300 rounded-md shadow-sm w-80"
                                />
                                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md">
                                    Search
                                </button>
                            </form>

                            <Link
                                href={route('invoices.create')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                + Generate Invoice
                            </Link>
                        </div>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Invoice #</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Vehicle</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Customer</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Labor</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Parts</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Payment</th>
                                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {invoices.data.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="px-4 py-2 font-mono text-sm">{invoice.invoice_number}</td>
                                        <td className="px-4 py-2">{invoice.job_card?.booking?.vehicle?.registration_no}</td>
                                        <td className="px-4 py-2">{invoice.job_card?.booking?.customer?.name}</td>
                                        <td className="px-4 py-2">Rs. {Number(invoice.labor_total).toFixed(2)}</td>
                                        <td className="px-4 py-2">Rs. {Number(invoice.parts_total).toFixed(2)}</td>
                                        <td className="px-4 py-2 font-semibold">Rs. {Number(invoice.grand_total).toFixed(2)}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColors[invoice.payment_status]}`}>
                                                {invoice.payment_status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-right space-x-2">
                                            <Link
                                                href={route('invoices.edit', invoice.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(invoice)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {invoices.data.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                                            No invoices found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2">
                            {invoices.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={`px-3 py-1 rounded text-sm ${
                                        link.active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}