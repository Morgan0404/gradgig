'use client';
import TimeAgo from "@/app/components/TimeAgo";
import { Job } from "@/models/Job";
import axios from "axios";
import Link from "next/link";

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            {/* Apply Button in place of the heart icon */}
            <div className="absolute top-4 right-4">
                <a
                    href={`mailto:${jobDoc.contactEmail}?subject=Portfolio Enquiry`}
                    className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 py-2 px-4 rounded-md "
                >
                    Apply now !
                </a>
            </div>
            <div className="flex grow gap-2">
                <div className="content-center w-12 basis-12 shrink-0">
                    <img
                        className="size-12"
                        src={jobDoc?.jobIcon}
                        alt="Job Icon"
                    />
                </div>
                <div className="grow sm:flex">
                    <div className="grow">
                        <div>
                            <Link href={`/jobs/${jobDoc.orgId}`} className="hover:underline text-gray-500 text-sm">
                                {jobDoc.orgName || '?'}
                            </Link>
                        </div>
                        <div className="font-bold text-lg mb-1">
                            <Link className="hover:underline" href={'/show/' + jobDoc._id}>
                                {jobDoc.title}
                            </Link>
                        </div>
                        <div className="text-gray-400 text-sm capitalize">
                            {jobDoc.remote}
                            {' '}&middot;{' '}
                            {jobDoc.city}, {jobDoc.country}
                            {' '}&middot;{' '}
                            {jobDoc.type}-time
                            {jobDoc.isAdmin && (
                                <>
                                    {' '}&middot;{' '}
                                    <Link href={'/jobs/edit/' + jobDoc._id}>Edit</Link>
                                    {' '}&middot;{' '}
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await axios.delete('/api/jobs?id=' + jobDoc._id);
                                            window.location.reload();
                                        }}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    {jobDoc.createdAt && (
                        <div className="content-end text-gray-500 text-sm">
                            <TimeAgo createdAt={jobDoc.createdAt} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
