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

    const inputClass = "mt-1.5 block w-full border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    const labelClass = "block text-sm font-medium text-gray-700 mb-0.5";
    const errClass = "text-red-500 text-xs mt-1.5 flex items-center gap-1";
    const ErrIcon = () => (
        <svg className="h-3.5 w-3.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
        </svg>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Vehicle</h2>}
        >
            <Head title="Add Vehicle" />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl border border-gray-100">

                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">New Vehicle</h3>
                                    <p className="text-xs text-gray-500">Fill in the details below to register a vehicle</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="px-6 py-6 space-y-5">

                            <div>
                                <label className={labelClass}>Customer</label>
                                <select
                                    value={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select a customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.customer_id && <div className={errClass}><ErrIcon />{errors.customer_id}</div>}
                            </div>

                            <div>
                                <label className={labelClass}>Registration No</label>
                                <input
                                    type="text"
                                    value={data.registration_no}
                                    onChange={(e) => setData('registration_no', e.target.value)}
                                    className={inputClass}
                                    placeholder="e.g. ABC-1234"
                                />
                                {errors.registration_no && <div className={errClass}><ErrIcon />{errors.registration_no}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Make</label>
                                    <input
                                        type="text"
                                        value={data.make}
                                        onChange={(e) => setData('make', e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. Toyota"
                                    />
                                    {errors.make && <div className={errClass}><ErrIcon />{errors.make}</div>}
                                </div>
                                <div>
                                    <label className={labelClass}>Model</label>
                                    <input
                                        type="text"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. Camry"
                                    />
                                    {errors.model && <div className={errClass}><ErrIcon />{errors.model}</div>}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Year</label>
                                <input
                                    type="number"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    className={inputClass}
                                />
                                {errors.year && <div className={errClass}><ErrIcon />{errors.year}</div>}
                            </div>

                            <div>
                                <label className={labelClass}>VIN</label>
                                <input
                                    type="text"
                                    value={data.vin}
                                    onChange={(e) => setData('vin', e.target.value)}
                                    className={inputClass}
                                    placeholder="Vehicle Identification Number"
                                />
                                {errors.vin && <div className={errClass}><ErrIcon />{errors.vin}</div>}
                            </div>

                            <div>
                                <label className={labelClass}>Mileage (km)</label>
                                <input
                                    type="number"
                                    value={data.mileage}
                                    onChange={(e) => setData('mileage', e.target.value)}
                                    className={inputClass}
                                />
                                {errors.mileage && <div className={errClass}><ErrIcon />{errors.mileage}</div>}
                            </div>

                            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                                <Link
                                    href={route('vehicles.index')}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-95 disabled:opacity-60 transition-all"
                                >
                                    {processing ? 'Saving…' : 'Save Vehicle'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}