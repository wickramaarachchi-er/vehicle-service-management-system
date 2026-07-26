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

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Hero Banner */}
                    <div
                        className="mb-6 rounded-xl shadow-md overflow-hidden relative"
                        style={{
                            backgroundImage: "url('/images/banners/invoices-banner.jpg.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Semi-transparent gradient overlay */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(234,179,8,0.72), rgba(245,158,11,0.68))' }}></div>
                        
                        <div className="px-8 py-8 md:py-10 relative z-10 flex items-center gap-6">
                            <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight">Invoices</h1>
                                <p className="mt-1 text-white/80 text-sm md:text-base font-medium">Generate bills, process payments, and track revenue.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl border border-gray-100 p-6">

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
                                                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors"
                                            >
                                                <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(invoice)}
                                                className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition-colors"
                                            >
                                                <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916" />
                                                </svg>
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