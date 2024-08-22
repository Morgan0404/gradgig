import {getSignInUrl, getUser, signOut} from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
    const { user } = await getUser();
    const signInUrl = await getSignInUrl();
    return (
        <header>
            <div className="container flex items-center justify-between mx-auto my-4">
                <div className="flex items-center gap-4">
                    <Link href={'/'} className="font-bold text-2xl">Grad Gig</Link>
                    <Link href={'/about'} className="rounded-md bg-gray-200 py-2 px-4 text-center"> About us </Link>
                </div>
                <nav className="flex gap-2">
                    {!user && (
                        <Link className="rounded-md bg-gray-200 py-2 px-4 rounded-md text-center" href={signInUrl}>
                            Login
                        </Link>
                    )}
                    {user && (
                        <form action={async () => {
                            'use server';
                            await signOut();
                        }}>
                            <button type="submit" className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                                Logout
                            </button>
                        </form>
                    )}
                    <Link className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800  py-2 px-4 rounded-md " href={'/new-listing'}>
                        Post a job
                    </Link>
                </nav>
            </div>
        </header>
    );
}