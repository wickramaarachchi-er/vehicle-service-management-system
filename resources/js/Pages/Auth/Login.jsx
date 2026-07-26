import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div 
            className="min-h-screen flex flex-col sm:justify-center items-center pt-10 sm:pt-0 relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/60 sm:bg-black/40 backdrop-blur-[2px] transition-all"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white/95 backdrop-blur-md shadow-2xl sm:rounded-2xl border border-white/20">
                
                {/* Branding / Logo Area */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1.5 flex items-center justify-center gap-2">
                        <span>🚗</span> ServiceHub
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Vehicle Service Management System</p>
                </div>

                {status && (
                    <div className="mb-6 p-3 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-lg text-sm font-medium text-green-700 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white/80"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white/80"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="peer h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                                />
                            </div>
                            <span className="ml-2.5 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none focus:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-700 shadow-md hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Optional subtle footer */}
            <div className="relative z-10 mt-8 text-center text-sm text-white/70 font-medium">
                &copy; {new Date().getFullYear()} ServiceHub. All rights reserved.
            </div>
        </div>
    );
}
