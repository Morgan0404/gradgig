import{JobModel} from "@/models/Job";
import JobForm from "@/app/components/JobForm";
import {getUser} from "@workos-inc/authkit-nextjs";
import {WorkOS} from "@workos-inc/node";
import mongoose from "mongoose";
type PageProps = {
    params:{
        jobId: string;
    };
};
export default async function EditJobPage(pageProps:PageProps){
    const jobId = pageProps.params.jobId;
    mongoose.connect(process.env.MONGO_URI as string);
    const jobDoc = JSON.parse(JSON.stringify( await JobModel.findById(jobId)));
    if(!jobDoc){
        return 'Not Found';
    }
    const {user} = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if(!user){
        return 'You need to login';
    }
    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId:jobDoc.orgId,

    })
    return(
        <JobForm jobDoc={jobDoc} />
    );
}