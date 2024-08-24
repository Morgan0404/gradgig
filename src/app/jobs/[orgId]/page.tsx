import Jobs from "@/app/components/Jobs";
import { getUser } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";
import { JobModel, addOrgAndUserData } from "@/models/Job";
import { WorkOS } from "@workos-inc/node";

type PageProps = {
    params: {
        orgId: string;
    }
};

export default async function CompanyJobsPage(props: PageProps) {
    console.log("Received orgId:", props.params.orgId);

    if (!props.params.orgId) {
        throw new Error("Organization ID is missing or undefined");
    }

    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    let org;
    try {
        org = await workos.organizations.getOrganization(props.params.orgId);
    } catch (error) {
        console.error("Failed to retrieve organization:", error);
        throw new Error("Failed to retrieve organization");
    }

    const { user } = await getUser();
    let jobsDocs = JSON.parse(JSON.stringify(await JobModel.find({ orgId: org.id })));
    jobsDocs = await addOrgAndUserData(jobsDocs, user);

    return (
        <div>
            <div className="container">
                <h1 className="text-xl my-6">{org.name} Jobs</h1>
            </div>
            <Jobs jobs={jobsDocs} header={"Jobs posted by " + org.name} />
        </div>
    );
}
