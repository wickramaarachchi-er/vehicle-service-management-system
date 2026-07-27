import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
};

export default function Index({ auth, jobCards, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('job-cards.index'), { search }, { preserveState: true });
    };

    const handleDelete = (jobCard) => {
        if (confirm(`Are you sure you want to delete this job card?`)) {
            router.delete(route('job-cards.destroy', jobCard.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Job Cards" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Hero Banner */}
                    <div
                        className="mb-6 rounded-xl shadow-md overflow-hidden relative"
                        style={{
                            backgroundImage: "url('/images/banners/jobcards-banner.jpg.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Semi-transparent gradient overlay */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(244,63,94,0.72), rgba(236,72,153,0.68))' }}></div>
                        
                        <div className="px-8 py-8 md:py-10 relative z-10 flex items-center gap-6">
                            <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184M12 13.5h.008v.008H12v-.008Zm0-3h.008v.008H12v-.008Zm0 6h.008v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight">Job Cards</h1>
                                <p className="mt-1 text-white/80 text-sm md:text-base font-medium">Assign work, track job progress, and update status.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl border border-gray-100">

                        {/* Header bar */}
                        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
                                <div className="relative flex-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by vehicle reg no or mechanic..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-700 transition"
                                >
                                    Search
                                </button>
                            </form>

                            <Link
                                href={route('job-cards.create')}
                                className="inline-flex items-center gap-1.5 bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-rose-700 active:scale-95 transition-all"
                            >
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                New Job Card
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mechanic</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Labor Cost</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {jobCards.data.map((jobCard) => (
                                        <tr key={jobCard.id} className="hover:bg-rose-50/40 transition-colors group">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{jobCard.booking?.vehicle?.registration_no}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{jobCard.booking?.customer?.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{jobCard.mechanic?.name || 'Unassigned'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-medium">Rs. {Number(jobCard.labor_cost).toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${statusColors[jobCard.status]}`}>
                                                    {jobCard.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap space-x-3">
                                                <Link
                                                    href={route('job-cards.edit', jobCard.id)}
                                                    className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-md transition-colors"
                                                >
                                                    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(jobCard)}
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
                                    {jobCards.data.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center">
                                                        <svg className="h-7 w-7 text-rose-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184M12 13.5h.008v.008H12v-.008Zm0-3h.008v.008H12v-.008Zm0 6h.008v.008H12v-.008Z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-500">No job cards found</p>
                                                    <p className="text-xs text-gray-400">Try adjusting your search, or create a new job card to get started.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-100 flex gap-1.5">
                            {jobCards.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                        link.active
                                            ? 'bg-rose-600 text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-600'
                                    } ${!link.url ? 'opacity-40 cursor-not-allowed' : 'hover:bg-rose-50 hover:text-rose-700'}`}
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