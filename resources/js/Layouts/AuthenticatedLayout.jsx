import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const navItems = [
    { name: 'Dashboard', href: 'dashboard', roles: ['Admin', 'Service Advisor', 'Mechanic'] },
    { name: 'Customers', href: 'customers.index', roles: ['Admin', 'Service Advisor'] },
    { name: 'Vehicles', href: 'vehicles.index', roles: ['Admin', 'Service Advisor'] },
    { name: 'Mechanics', href: 'mechanics.index', roles: ['Admin'] },
    { name: 'Parts', href: 'parts.index', roles: ['Admin', 'Service Advisor', 'Mechanic'] },
    { name: 'Bookings', href: 'bookings.index', roles: ['Admin', 'Service Advisor'] },
    { name: 'Job Cards', href: 'job-cards.index', roles: ['Admin', 'Service Advisor', 'Mechanic'] },
    { name: 'Invoices', href: 'invoices.index', roles: ['Admin', 'Service Advisor'] },
];

const navIcons = {
    Dashboard: '📊',
    Customers: '👥',
    Vehicles: '🚗',
    Mechanics: '🔧',
    Parts: '⚙️',
    Bookings: '📅',
    'Job Cards': '📋',
    Invoices: '🧾',
};

export default function AuthenticatedLayout({ user, header, children }) {
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);

    const userRoles = user.roles?.map((r) => r.name) || [];
    const visibleNavItems = navItems.filter((item) =>
        item.roles.some((role) => userRoles.includes(role))
    );

    const isActive = (routeName) => {
        try {
            return route().current(routeName) || route().current(routeName + '.*');
        } catch {
            return false;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <aside className="hidden md:flex md:flex-col w-64 bg-gradient-to-b from-indigo-700 via-indigo-600 to-purple-700 text-white">
                <div className="px-6 py-6 border-b border-white/10">
                    <h1 className="text-lg font-bold tracking-tight">🚗 ServiceHub</h1>
                    <p className="text-xs text-indigo-200 mt-0.5">Vehicle Service Management</p>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {visibleNavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={route(item.href)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                                isActive(item.href)
                                    ? 'bg-white/15 text-white shadow-sm'
                                    : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <span>{navIcons[item.name]}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>


            </aside>

            {/* Mobile sidebar toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-indigo-700 to-purple-700 text-white flex items-center justify-between px-4 py-3">
                <h1 className="font-bold">🚗 ServiceHub</h1>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="text-2xl leading-none">
                    {mobileOpen ? '✕' : '☰'}
                </button>
            </div>

            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-20 bg-black/40" onClick={() => setMobileOpen(false)}>
                    <aside
                        className="w-64 h-full bg-gradient-to-b from-indigo-700 to-purple-700 text-white p-4 pt-16"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="space-y-1">
                            {visibleNavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={route(item.href)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-100 hover:bg-white/10 hover:text-white transition"
                                >
                                    <span>{navIcons[item.name]}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col md:pl-0 pt-14 md:pt-0">
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <div>{header}</div>
                    <div className="relative group">
    <button className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-50 transition">
        <div className="w-9 h-9 rounded-full overflow-hidden shadow-sm flex-shrink-0">
    {user.avatar ? (
        <img
            src={`/storage/${user.avatar}`}
            alt={user.name}
            className="w-full h-full object-cover"
        />
    ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
    )}
</div>
        <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</p>
            <p className="text-xs text-indigo-600 font-medium leading-tight">{userRoles[0]}</p>
        </div>
        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
        </svg>
    </button>

    <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <Link
            href={route('profile.edit')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
            👤 Profile
        </Link>
        <Link
            href={route('logout')}
            method="post"
            as="button"
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
        >
            🚪 Log Out
        </Link>
    </div>
</div>
                </header>

                <main className="flex-1">{children}</main>
            </div>

        </div>
    );
}