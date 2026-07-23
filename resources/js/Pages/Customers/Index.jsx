import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, customers, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('customers.index'), { search }, { preserveState: true });
    };

    const handleDelete = (customer) => {
        if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
            router.delete(route('customers.destroy', customer.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customers</h2>}
        >
            <Head title="Customers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-gray-300 rounded-md shadow-sm w-80"
                                />
                                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md">
                                    Search
                                </button>
                            </form>

                            <Link
                                href={route('customers.create')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                + Add Customer
                            </Link>
                        </div>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Phone</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Address</th>
                                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {customers.data.map((customer) => (
                                    <tr key={customer.id}>
                                        <td className="px-4 py-2">{customer.name}</td>
                                        <td className="px-4 py-2">{customer.email}</td>
                                        <td className="px-4 py-2">{customer.phone}</td>
                                        <td className="px-4 py-2">{customer.address || '-'}</td>
                                        <td className="px-4 py-2 text-right space-x-2">
                                            <Link
                                                href={route('customers.edit', customer.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(customer)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {customers.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                                            No customers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2">
                            {customers.links.map((link, index) => (
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