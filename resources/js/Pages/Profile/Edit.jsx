import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile Settings
                </h2>
            }
        >
            <Head title="Profile Settings" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* ── Hero Banner ── */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 shadow-lg">
                        {/* Decorative blobs */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                        <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />

                        <div className="relative z-10 px-8 py-8 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-inner flex-shrink-0">
                                <svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold text-white tracking-tight">Profile Settings</h1>
                                <p className="mt-0.5 text-white/75 text-sm font-medium">
                                    Manage your account information, password, and security preferences.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Profile Information Card ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Card top accent bar */}
                        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
                        <div className="p-7">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* ── Change Password Card ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                        <div className="p-7">
                            {/* Section header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">Update Password</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Use a long, random password to stay secure.</p>
                                </div>
                            </div>
                            <UpdatePasswordForm className="w-full" />
                        </div>
                    </div>

                    {/* ── Delete Account Card ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-rose-500 to-red-500" />
                        <div className="p-7">
                            {/* Section header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">Delete Account</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data.</p>
                                </div>
                            </div>
                            <DeleteUserForm className="w-full" />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
