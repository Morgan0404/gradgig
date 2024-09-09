'use client';

import { useParams } from 'next/navigation';  // Use useParams to get dynamic route parameters
import { useEffect, useState } from 'react';
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import { saveJobAction } from "@/app/actions/jobActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "@/app/components/ImageUpload";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";

export default function JobForm({ jobDoc }: { jobDoc?: any }) {
    const params = useParams();  // Use useParams to access URL params
    const [orgId, setOrgId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);  // Set initial loading state
    const [countryid, setCountryid] = useState(jobDoc?.countryId || '');
    const [stateid, setStateid] = useState(jobDoc?.stateId || '');
    const [cityId, setCityId] = useState(jobDoc?.cityId || '');
    const [countryName, setCountryName] = useState(jobDoc?.country || '');
    const [stateName, setStateName] = useState(jobDoc?.state || '');
    const [cityName, setCityName] = useState(jobDoc?.city || '');
    const [title, setTitle] = useState(jobDoc?.title || '');
    const [description, setDescription] = useState(jobDoc?.description || '');
    const [remote, setRemote] = useState(jobDoc?.remote || 'onsite');
    const [type, setType] = useState(jobDoc?.type || 'full');
    const [salary, setSalary] = useState(jobDoc?.salary || '');
    const [jobIcon, setJobIcon] = useState(jobDoc?.jobIcon || '');
    const [contactPhoto, setContactPhoto] = useState(jobDoc?.contactPhoto || '');
    const [contactName, setContactName] = useState(jobDoc?.contactName || '');
    const [contactPhone, setContactPhone] = useState(jobDoc?.contactPhone || '');
    const [contactEmail, setContactEmail] = useState(jobDoc?.contactEmail || '');

    useEffect(() => {
        console.log('Params object:', params);  // Log the params object to see if orgid is present
        const pathOrgId = params?.orgid;  // Extract orgid from the URL params

        if (typeof pathOrgId === 'string') {
            setOrgId(pathOrgId);  // Set the orgId from the path
            setLoading(false);  // Exit the loading state
        } else if (Array.isArray(pathOrgId)) {
            setOrgId(pathOrgId[0]);  // Take the first element if it's an array
            setLoading(false);
        } else {
            console.error("orgid not found in URL params");
            setLoading(false);  // Exit loading even if orgid is not found to prevent infinite loading
        }
    }, [params]);

    if (loading) {
        return <div>Loading...</div>;  // Show a loading state until orgId is available
    }

    if (!orgId) {
        return <div>Error: Organization ID not found.</div>;  // Display error if orgId is missing
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

        data.set('title', title);
        data.set('description', description);
        data.set('remote', remote);
        data.set('type', type);
        data.set('salary', salary.toString());
        data.set('country', countryName);
        data.set('state', stateName);
        data.set('city', cityName);
        data.set('countryId', countryid.toString());
        data.set('stateId', stateid.toString());
        data.set('cityId', cityId.toString());
        data.set('jobIcon', jobIcon);
        data.set('contactPhoto', contactPhoto);
        data.set('contactName', contactName);
        data.set('contactPhone', contactPhone);
        data.set('contactEmail', contactEmail);
        data.set('orgId', orgId || '');  // Ensure orgId is defined, fallback to empty string

        console.log("Saving job with data:", Object.fromEntries(data.entries()));

        // Save job using the action
        const savedJobDoc = await saveJobAction(data);

        // Redirect after saving
        window.location.href = `/jobs/${savedJobDoc.orgId}`;  // Perform client-side redirect
    }

    return (
        <Theme>
            <form
                onSubmit={(e) => {
                    e.preventDefault();  // Prevent default form submission behavior
                    const formData = new FormData(e.currentTarget);  // Capture form data
                    handleSaveJob(formData);  // Call save function
                }}
                className="container mt-6 flex flex-col gap-4"
            >
                <TextField.Root name="title" placeholder="Job title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />

                <div className="grid sm:grid-cols-3 gap-6 *:grow">
                    <div>
                        Remote?
                        <RadioGroup.Root defaultValue={remote} name="remote" onValueChange={(value) => setRemote(value)}>
                            <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                            <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Full time?
                        <RadioGroup.Root defaultValue={type} name="type" onValueChange={(value) => setType(value)}>
                            <RadioGroup.Item value="project">Project</RadioGroup.Item>
                            <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Salary
                        <TextField.Root name="salary" defaultValue={salary} onChange={(e) => setSalary(e.target.value)}>
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
                        <ImageUpload
                            name="jobIcon"
                            icon={faStar}
                            defaultValue={jobIcon}
                            onUpload={(url: string) => setJobIcon(url)}  // Pass the uploaded URL to setJobIcon state
                        />
                    </div>
                    <div className="grow">
                        <h3>Contact person</h3>
                        <div className="flex gap-2">
                            <div>
                                <ImageUpload
                                    name="contactPhoto"
                                    icon={faUser}
                                    defaultValue={contactPhoto}
                                    onUpload={(url: string) => setContactPhoto(url)}  // Pass the uploaded URL to setContactPhoto state
                                />
                            </div>
                            <div className="grow flex flex-col gap-1">
                                <TextField.Root
                                    placeholder="John Doe"
                                    name="contactName"
                                    defaultValue={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faUser} />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root
                                    placeholder="Phone"
                                    type="tel"
                                    name="contactPhone"
                                    defaultValue={contactPhone}
                                    onChange={(e) => setContactPhone(e.target.value)}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root
                                    placeholder="Email"
                                    type="email"
                                    name="contactEmail"
                                    defaultValue={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
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
                    defaultValue={description}
                    placeholder="Job description"
                    resize="vertical"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
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
