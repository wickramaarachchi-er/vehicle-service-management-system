import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, jobCards }) {
    const { data, setData, post, processing, errors } = useForm({
        job_card_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('invoices.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generate Invoice</h2>}
        >
            <Head title="Generate Invoice" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Completed Job Card</label>
                                <select
                                    value={data.job_card_id}
                                    onChange={(e) => setData('job_card_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Select a completed job card</option>
                                    {jobCards.map((jobCard) => (
                                        <option key={jobCard.id} value={jobCard.id}>
                                            {jobCard.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.job_card_id && <div className="text-red-600 text-sm mt-1">{errors.job_card_id}</div>}
                                {jobCards.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        No completed job cards available for invoicing. Complete a job card first.
                                    </p>
                                )}
                            </div>

                            <p className="text-sm text-gray-500">
                                Labor cost and parts totals will be calculated automatically from the job card.
                            </p>

                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('invoices.index')}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || jobCards.length === 0}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Generate Invoice
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}