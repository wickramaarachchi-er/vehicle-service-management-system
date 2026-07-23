import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, vehicles, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('vehicles.index'), { search }, { preserveState: true });
    };

    const handleDelete = (vehicle) => {
        if (confirm(`Are you sure you want to delete ${vehicle.registration_no}?`)) {
            router.delete(route('vehicles.destroy', vehicle.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vehicles</h2>}
        >
            <Head title="Vehicles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by reg no, make, model, or VIN..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-gray-300 rounded-md shadow-sm w-80"
                                />
                                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md">
                                    Search
                                </button>
                            </form>

                            <Link
                                href={route('vehicles.create')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                + Add Vehicle
                            </Link>
                        </div>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Registration No</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Make / Model</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Year</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Owner</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Mileage</th>
                                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {vehicles.data.map((vehicle) => (
                                    <tr key={vehicle.id}>
                                        <td className="px-4 py-2">{vehicle.registration_no}</td>
                                        <td className="px-4 py-2">{vehicle.make} {vehicle.model}</td>
                                        <td className="px-4 py-2">{vehicle.year}</td>
                                        <td className="px-4 py-2">{vehicle.customer?.name || '-'}</td>
                                        <td className="px-4 py-2">{vehicle.mileage.toLocaleString()} km</td>
                                        <td className="px-4 py-2 text-right space-x-2">
                                            <Link
                                                href={route('vehicles.edit', vehicle.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(vehicle)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {vehicles.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                                            No vehicles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2">
                            {vehicles.links.map((link, index) => (
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