'use client';
import TimeAgo from "@/app/components/TimeAgo";
import { Job } from "@/models/Job";
import axios from "axios";
import Link from "next/link";

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
    return (
        <div className="fade-in bg-white p-4 rounded-lg shadow-sm relative">
            {/* Apply Button in place of the heart icon */}
            <div className="absolute top-4 right-4">
                <a
                    href={`mailto:${jobDoc.contactEmail}?subject=Portfolio Enquiry`}
                    className="text-white bg-gradient-to-br from-gray-900 to-gray-900 hover:bg-gradient-to-bl ring-4 ring-green-400 dark:ring-green-800 py-2 px-4 rounded-md"
                >
                    Apply
                </a>
            </div>
            <div className="fade-in flex grow gap-2">
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
