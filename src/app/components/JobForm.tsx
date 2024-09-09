import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import { saveJobAction } from "@/app/actions/jobActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "@/app/components/ImageUpload";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";

export default function JobForm({ jobDoc }: { jobDoc?: any }) {
    const router = useRouter();
    const [orgId, setOrgId] = useState<string | undefined>(undefined);
    const [countryid, setCountryid] = useState(jobDoc?.countryId || 0);
    const [stateid, setStateid] = useState(jobDoc?.stateId || 0);
    const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
    const [countryName, setCountryName] = useState(jobDoc?.country || '');
    const [stateName, setStateName] = useState(jobDoc?.state || '');
    const [cityName, setCityName] = useState(jobDoc?.city || '');

    // useEffect to ensure that orgId is set only after the component is mounted
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    useEffect(() => {
        // @ts-ignore
        const { orgId } = router.query;

        if (orgId) {
            setOrgId(orgId as string); // Cast to string if it's present
        }
        // @ts-ignore

    }, [router.query]);

    // Handle the case when orgId is not yet available
    if (!orgId) {
        return <div>Loading...</div>; // Show a loading state until orgId is available
    }

    async function handleSaveJob(data: FormData) {
        if (!stateName) {
            console.error("State is required.");
            return;
        }
        if (!cityName) {
            console.error("City is required.");
            return;
        }

        data.set('country', countryName.toString());
        data.set('state', stateName.toString());
        data.set('city', cityName.toString());
        data.set('countryId', countryid.toString());
        data.set('stateId', stateid.toString());
        data.set('cityId', cityId.toString());
        data.set('orgId', orgId); // Use the orgId extracted from the URL

        console.log("Saving job with data:", Object.fromEntries(data.entries()));

        // Save job using the action
        const savedJobDoc = await saveJobAction(data);

        // Redirect after saving
        router.replace(`/jobs/${savedJobDoc.orgId}`);
    }

    return (
        <Theme>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission behavior
                    const formData = new FormData(e.currentTarget); // Capture form data
                    handleSaveJob(formData); // Call save function
                }}
                className="container mt-6 flex flex-col gap-4"
            >
                <TextField.Root name="title" placeholder="Job title" defaultValue={jobDoc?.title || ''} />

                <div className="grid sm:grid-cols-3 gap-6 *:grow">
                    <div>
                        Remote?
                        <RadioGroup.Root defaultValue={jobDoc?.remote || 'hybrid'} name="remote">
                            <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                            <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Full time?
                        <RadioGroup.Root defaultValue={jobDoc?.type || 'full'} name="type">
                            <RadioGroup.Item value="project">Project</RadioGroup.Item>
                            <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Salary
                        <TextField.Root name="salary" defaultValue={jobDoc?.salary || ''}>
                            <TextField.Slot>$</TextField.Slot>
                            <TextField.Slot>K/year</TextField.Slot>
                        </TextField.Root>
                    </div>
                </div>

                <div>
                    Location
                    <div className="flex flex-col sm:flex-row gap-4 *:grow">
                        <CountrySelect
                            defaultValue={countryid ? { id: countryid, name: countryName } : 0}
                            onChange={(e: any) => {
                                setCountryid(e.id);
                                setCountryName(e.name);
                            }}
                            placeHolder="Select Country"
                        />
                        <StateSelect
                            defaultValue={stateid ? { id: stateid, name: stateName } : 0}
                            countryid={countryid}
                            onChange={(e: any) => {
                                setStateid(e.id);
                                setStateName(e.name);
                            }}
                            placeHolder="Select State"
                        />
                        <CitySelect
                            defaultValue={cityId ? { id: cityId, name: cityName } : 0}
                            countryid={countryid}
                            stateid={stateid}
                            onChange={(e: any) => {
                                setCityId(e.id);
                                setCityName(e.name);
                            }}
                            placeHolder="Select City"
                        />
                    </div>
                </div>

                <div className="sm:flex">
                    <div className="w-1/3">
                        <h3>Job icon</h3>
                        <ImageUpload name="jobIcon" icon={faStar} defaultValue={jobDoc?.jobIcon || ''} />
                    </div>
                    <div className="grow">
                        <h3>Contact person</h3>
                        <div className="flex gap-2">
                            <div>
                                <ImageUpload name="contactPhoto" icon={faUser} defaultValue={jobDoc?.contactPhoto || ''} />
                            </div>
                            <div className="grow flex flex-col gap-1">
                                <TextField.Root
                                    placeholder="John Doe"
                                    name="contactName"
                                    defaultValue={jobDoc?.contactName || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faUser} />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root
                                    placeholder="Phone"
                                    type="tel"
                                    name="contactPhone"
                                    defaultValue={jobDoc?.contactPhone || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root
                                    placeholder="Email"
                                    type="email"
                                    name="contactEmail"
                                    defaultValue={jobDoc?.contactEmail || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>
                </div>

                <TextArea
                    defaultValue={jobDoc?.description || ''}
                    placeholder="Job description"
                    resize="vertical"
                    name="description"
                />

                <div className="flex justify-center">
                    <Button size="3">
                        <span className="px-8">Save</span>
                    </Button>
                </div>
            </form>
        </Theme>
    );
}
