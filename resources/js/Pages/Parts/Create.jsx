import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        part_number: '',
        stock_quantity: '',
        low_stock_threshold: '',
        unit_price: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('parts.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Part</h2>}
        >
            <Head title="Add Part" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Part Number</label>
                                <input
                                    type="text"
                                    value={data.part_number}
                                    onChange={(e) => setData('part_number', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.part_number && <div className="text-red-600 text-sm mt-1">{errors.part_number}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.stock_quantity}
                                    onChange={(e) => setData('stock_quantity', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.stock_quantity && <div className="text-red-600 text-sm mt-1">{errors.stock_quantity}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Low Stock Threshold</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.low_stock_threshold}
                                    onChange={(e) => setData('low_stock_threshold', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.low_stock_threshold && <div className="text-red-600 text-sm mt-1">{errors.low_stock_threshold}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.unit_price}
                                    onChange={(e) => setData('unit_price', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.unit_price && <div className="text-red-600 text-sm mt-1">{errors.unit_price}</div>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('parts.index')}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Save Part
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
