import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, customers }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        registration_no: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
        vin: '',
        mileage: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('vehicles.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Vehicle</h2>}
        >
            <Head title="Add Vehicle" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Customer</label>
                                <select
                                    value={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Select a customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.customer_id && <div className="text-red-600 text-sm mt-1">{errors.customer_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Registration No</label>
                                <input
                                    type="text"
                                    value={data.registration_no}
                                    onChange={(e) => setData('registration_no', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.registration_no && <div className="text-red-600 text-sm mt-1">{errors.registration_no}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Make</label>
                                    <input
                                        type="text"
                                        value={data.make}
                                        onChange={(e) => setData('make', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.make && <div className="text-red-600 text-sm mt-1">{errors.make}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Model</label>
                                    <input
                                        type="text"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.model && <div className="text-red-600 text-sm mt-1">{errors.model}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Year</label>
                                <input
                                    type="number"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.year && <div className="text-red-600 text-sm mt-1">{errors.year}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">VIN</label>
                                <input
                                    type="text"
                                    value={data.vin}
                                    onChange={(e) => setData('vin', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.vin && <div className="text-red-600 text-sm mt-1">{errors.vin}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                                <input
                                    type="number"
                                    value={data.mileage}
                                    onChange={(e) => setData('mileage', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.mileage && <div className="text-red-600 text-sm mt-1">{errors.mileage}</div>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('vehicles.index')}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Save Vehicle
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}