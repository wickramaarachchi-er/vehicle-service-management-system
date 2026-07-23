import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, mechanic }) {
    const { data, setData, put, processing, errors } = useForm({
        name: mechanic.name || '',
        employee_id: mechanic.employee_id || '',
        specialization: mechanic.specialization || '',
        contact: mechanic.contact || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('mechanics.update', mechanic.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Mechanic</h2>}
        >
            <Head title="Edit Mechanic" />

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
                                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                                <input
                                    type="text"
                                    value={data.employee_id}
                                    onChange={(e) => setData('employee_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.employee_id && <div className="text-red-600 text-sm mt-1">{errors.employee_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                <input
                                    type="text"
                                    value={data.specialization}
                                    onChange={(e) => setData('specialization', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.specialization && <div className="text-red-600 text-sm mt-1">{errors.specialization}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact</label>
                                <input
                                    type="text"
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.contact && <div className="text-red-600 text-sm mt-1">{errors.contact}</div>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('mechanics.index')}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Update Mechanic
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
