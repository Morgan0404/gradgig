import { getSignInUrl, getUser, signOut } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

export default async function Header() {
    const { user } = await getUser();
    const signInUrl = await getSignInUrl();
    return (
        <header>
            <div className="fade-in container flex items-center justify-between mx-auto my-4 px-4 max-w-full">
                {/* Left Section */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link
                        href="/"
                        className="font-bold text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-900 whitespace-nowrap"
                    >
                        Grad Gig
                    </Link>
                    <Link
                        href="/about"
                        className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 text-center text-sm sm:text-base"
                    >
                        About
                    </Link>
                </div>
                {/* Navigation */}
                <nav className="flex items-center gap-2">
                    {!user && (
                        <Link
                            href={signInUrl}
                            className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 text-center text-sm sm:text-base"
                        >
                            Login
                        </Link>
                    )}
                    {user && (
                        <form
                            action={async () => {
                                'use server';
                                await signOut();
                            }}
                        >
                            <button
                                type="submit"
                                className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 text-center text-sm sm:text-base"
                            >
                                Logout
                            </button>
                        </form>
                    )}
                    <Link
                        href="/new-listing"
                        className="text-white bg-gradient-to-br from-gray-900 to-gray-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 py-1 px-2 sm:py-2 sm:px-4 rounded-md text-center text-sm sm:text-base"
                    >
                        Post a job
                    </Link>
                </nav>
            </div>
        </header>
    );
}
