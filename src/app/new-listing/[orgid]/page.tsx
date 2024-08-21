import {getUser} from "@workos-inc/authkit-nextjs";
import {WorkOS} from "@workos-inc/node";
import {RadioGroup, TextArea, TextField, Theme} from "@radix-ui/themes";
import JobForm from "@/app/components/JobForm";

type PageProps = {
  params: {
      orgId: string;
  }
};

export default async function NewListingForOrgPage(props: PageProps) {
    const { user } = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) return 'Please log in';

    const orgId = props.params.orgId;

    // Debugging
    console.log("Extracted orgId:", orgId);  // Check the value
    console.log("Type of orgId:", typeof orgId);  // Check the type

    const oms = await workos.userManagement.listOrganizationMemberships({ userId: user.id, organizationId: orgId });
    const hasAccess = oms.data.length > 0;
    if (!hasAccess) {
        return 'no access';
    }

    return (
        <JobForm orgId={orgId} />
    );
}