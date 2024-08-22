'use client'
import { useState } from "react";
import JobRow from "@/app/components/JobRow";
import Hero from "@/app/components/Hero";
import type { Job } from "@/models/Job";

export default function Jobs({ header, jobs }: { header: string, jobs: Job[] }) {
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const handleSearch = (searchTerm: string) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = jobs.filter(
            (job) =>
                job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                job.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                job.orgName?.toLowerCase().includes(lowerCaseSearchTerm) ||
                job.city.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredJobs(filtered);
    };

    return (
        <div>
            {/* Ensure only one Hero component */}
            <Hero onSearch={handleSearch} />

            <div className="bg-slate-200 py-6 rounded-3xl">
                <div className="container">
                    <h2 className="font-bold mb-4">{header || 'Recent jobs'}</h2>

                    <div className="flex flex-col gap-4">
                        {!filteredJobs?.length && (
                            <div>No jobs found</div>
                        )}
                        {filteredJobs && filteredJobs.map(job => (
                            <JobRow key={job._id} jobDoc={job} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
