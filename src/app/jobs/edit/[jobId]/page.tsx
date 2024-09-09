import { JobModel } from "@/models/Job";
import JobForm from "@/app/components/JobForm";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
    params: {
        jobId: string;
    };
};

export default async function EditJobPage({ params }: PageProps) {
    const jobId = params.jobId;  // Correctly access params here
    await mongoose.connect(process.env.MONGO_URI as string);  // Use await to ensure connection is complete

    // Fetch the job document from MongoDB
    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));

    if (!jobDoc) {
        return 'Not Found';
    }

    // Fetch the user details
    const { user } = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY as string);

    if (!user) {
        return 'You need to login';
    }

    // Verify organization membership for the user
    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: jobDoc.orgId,  // Ensure orgId is correctly referenced from jobDoc
    });

    // Render the JobForm component, no need to pass orgId as it is handled inside JobForm
    return <JobForm jobDoc={jobDoc} />;
}
