import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import JobForm from "@/app/components/JobForm";

type PageProps = {
    params: {
        orgId: string;
    };
};

export default async function NewListingForOrgPage(props: PageProps) {
    const { user } = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if (!user) {
        return 'Please log in';
    }

    const orgId = props.params.orgId;

    // Debugging: check if orgId is extracted correctly
    console.log("Extracted orgId:", orgId);
    console.log("Type of orgId:", typeof orgId);

    // Check if the user has access to the organization
    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: orgId,
    });

    const hasAccess = oms.data.length > 0;
    if (!hasAccess) {
        return 'No access';
    }

    // Pass only the jobDoc if necessary, but NOT orgId since it's handled inside JobForm
    return (
        <JobForm />
    );
}
