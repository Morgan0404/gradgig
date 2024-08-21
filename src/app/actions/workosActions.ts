'use server';
import { WorkOS } from "@workos-inc/node";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function createCompany(companyName: string, userId: string) {
    const org = await workos.organizations.createOrganization({ name: companyName });
    await workos.userManagement.createOrganizationMembership({
        userId,
        organizationId: org.id, // Corrected parameter name
        role: 'admin'
    });
    revalidatePath('/new-listing')
    redirect('/new-listing');
}
