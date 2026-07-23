import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, parts, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('parts.index'), { search }, { preserveState: true });
    };

    const handleDelete = (part) => {
        if (confirm(`Are you sure you want to delete ${part.name}?`)) {
            router.delete(route('parts.destroy', part.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parts</h2>}
        >
            <Head title="Parts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by name or part number..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-gray-300 rounded-md shadow-sm w-80"
                                />
                                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md">
                                    Search
                                </button>
                            </form>

                            <Link
                                href={route('parts.create')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                + Add Part
                            </Link>
                        </div>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Part Number</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Stock Quantity</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Unit Price</th>
                                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {parts.data.map((part) => {
                                    const isLowStock = part.stock_quantity <= part.low_stock_threshold;
                                    return (
                                        <tr key={part.id}>
                                            <td className="px-4 py-2">{part.name}</td>
                                            <td className="px-4 py-2">{part.part_number}</td>
                                            <td className="px-4 py-2">
                                                {isLowStock ? (
                                                    <span className="text-red-600 font-medium">
                                                        {part.stock_quantity}
                                                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                                                            Low Stock
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span>{part.stock_quantity}</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">${Number(part.unit_price).toFixed(2)}</td>
                                            <td className="px-4 py-2 text-right space-x-2">
                                                <Link
                                                    href={route('parts.edit', part.id)}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(part)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {parts.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                                            No parts found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2">
                            {parts.links.map((link, index) => (
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
