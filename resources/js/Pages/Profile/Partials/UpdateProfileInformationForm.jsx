import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    // useForm includes _method: 'patch' so Laravel routes/spoofing works via POST
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        _method: 'patch',
        name: user.name,
        email: user.email,
        address: user.address || '',
        avatar: null,
    });

    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    // Derive initials from the current name for the placeholder
    const initials = data.name
        ? data.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : '?';

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData('avatar', file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        // forceFormData: true tells Inertia to send as multipart/form-data
        // so the file is transmitted correctly. The _method field above
        // tells Laravel to treat the POST as a PATCH (method spoofing).
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setAvatarPreview(null);
                setData('avatar', null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    // What to show in the avatar circle
    const displayAvatar = avatarPreview
        ? avatarPreview
        : user.avatar
        ? `/storage/${user.avatar}`
        : null;

    return (
        <section className={className}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Profile Information</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Update your name, email, address, and photo.</p>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">

                {/* ── Avatar Upload Section ── */}
                <div className="flex items-center gap-5">
                    {/* Avatar circle */}
                    <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-indigo-100">
                            {displayAvatar ? (
                                <img
                                    src={displayAvatar}
                                    alt="Profile avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-white text-xl font-bold tracking-tight">{initials}</span>
                                </div>
                            )}
                        </div>
                        {/* Camera icon overlay button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center hover:bg-indigo-700 transition shadow-sm"
                            title="Change photo"
                        >
                            <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                            </svg>
                        </button>
                    </div>

                    {/* Upload prompt */}
                    <div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg transition"
                        >
                            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            {data.avatar ? 'Change Photo' : 'Upload Photo'}
                        </button>
                        {data.avatar && (
                            <p className="mt-1.5 text-xs text-gray-500 truncate max-w-[160px]">{data.avatar.name}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">JPG, PNG, GIF up to 2MB</p>
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>
                {errors.avatar && <InputError message={errors.avatar} className="-mt-3" />}

                {/* ── Name ── */}
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* ── Email ── */}
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* ── Address ── */}
                <div>
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="street-address"
                        placeholder="123 Main St, City, Country"
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                {/* ── Email Verification Notice ── */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                        <p className="text-sm text-amber-800">
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-semibold underline hover:text-amber-900 transition"
                            >
                                Resend verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <p className="mt-1 text-xs font-medium text-green-700">
                                A new verification link has been sent to your email address.
                            </p>
                        )}
                    </div>
                )}

                {/* ── Save Button ── */}
                <div className="flex items-center gap-4 pt-1">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {processing ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Saving…
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-200"
                        leaveTo="opacity-0"
                    >
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Saved.
                        </span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
