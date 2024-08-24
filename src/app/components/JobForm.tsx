'use client'
import {Button, RadioGroup, Text, TextArea, TextField, Theme} from "@radix-ui/themes";
import {useState} from "react";
import "react-country-state-city/dist/react-country-state-city.css"

import {saveJobAction} from "@/app/actions/jobActions";
import{redirect} from "next/navigation";
import "react-country-state-city/dist/react-country-state-city.css";
import type {Job} from "@/models/Job";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMobile, faPhone, faStar, faUser} from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "@/app/components/ImageUpload";




export default function JobForm({orgId,jobDoc}:{orgId:string;jobDoc?:Job}){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [countryid, setCountryid] = useState(jobDoc?.countryId || 0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [stateid, setstateid] = useState(jobDoc?.stateId||0);
    const[cityId,setCityId] = useState(jobDoc?.cityId||0);
    const[countryName, setCountryName] = useState(jobDoc?.country || '');
    const[stateName, setStateName] = useState(jobDoc?.state||'');
    const[cityName, setCityName]= useState(jobDoc?.city||'');

    if (!orgId || orgId === 'undefined') {
        alert("Organization ID is missing or invalid. Please ensure you are logged in and associated with an organization.");
        return;
    }

    async function handleSaveJob(data: FormData) {
        try {
            console.log("Organization ID:", orgId);

            if (!orgId || orgId === 'undefined') {
                throw new Error("Organization ID is missing or invalid.");
            }

            data.set('country', countryName.toString());
            data.set('state', stateName.toString());
            data.set('city', cityName.toString());
            data.set('countryId', countryid.toString());
            data.set('stateId', stateid.toString());
            data.set('cityId', cityId.toString());
            data.set('orgId', orgId);

            const jobDoc = await saveJobAction(data);
            redirect(`/jobs/${jobDoc.orgId}`);
        } catch (error) {
            // @ts-ignore
            alert("Failed to save job. " + error.message);
        }
    }

    return(
        <Theme>


            <form
                action={handleSaveJob}
                className="container mt-6 flex flex-col gap-4"
            >
                {jobDoc && (
                    <input type = "hidden" name="id" value = {jobDoc?._id}/>
                )}
                <TextField.Root name = "title" placeholder="Job title" defaultValue={jobDoc?.title || ''} />

                <div className="grid sm:grid-cols-3  gap-6 *:grow ">
                    <div>
                        Remote?
                        <RadioGroup.Root defaultValue={ jobDoc?.remote || 'hybrid'} name="remote">
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
                            <TextField.Root name="salary" defaultValue = {jobDoc?.salary||''}>
                                <TextField.Slot>
                                    $
                                </TextField.Slot>
                                <TextField.Slot>
                                    K/year
                                </TextField.Slot>
                            </TextField.Root>
                    </div>
                </div>
                <div>
                    Location
                    <div className="flex flex-col sm:flex-row gap-4 *:grow">
                    <CountrySelect
                        defaultValue={countryid? {id:countryid,name:countryName}:0}
                        onChange={(e:any) => {
                            setCountryid(e.id);
                            setCountryName(e.name);
                        }}
                        placeHolder="Select Country"
                    />
                    <StateSelect
                        defaultValue={stateid? {id:stateid,name:stateName}:0}
                        countryid={countryid}
                        onChange={(e:any) => {
                            setstateid(e.id);
                            setStateName(e.name);
                        }}
                        placeHolder="Select State"
                    />
                    <CitySelect
                        defaultValue={cityId? {id:cityId,name:cityName}:0}
                        countryid={countryid}
                        stateid={stateid}
                        onChange={(e:any) => {
                            setCityId(e.id);
                            setCityName(e.name);
                        }}
                        placeHolder="Select City"
                    />
                </div>
                </div>
                <div className="sm:flex ">
                    <div className="w-1/3">
                        <h3>Job icon </h3>
                        <ImageUpload name="jobIcon" icon={faStar} defaultValue={jobDoc?.jobIcon || ''}/>
                    </div>
                    <div className="grow">
                        <h3>Contact person </h3>
                        <div className="flex gap-2">
                            <div className="">
                                <ImageUpload name="contactPhoto" icon={faUser} defaultValue={jobDoc?.contactPhoto || '' }/>
                            </div>
                            <div className="grow flex flex-col gap-1">
                                <TextField.Root
                                    placeholder="John Doe"
                                    name="contactName"
                                    defaultValue={jobDoc?.contactName || ''}>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faUser}/>
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root
                                    placeholder="Phone"
                                    type={"tel"}
                                    name="contactPhone"
                                    defaultValue={jobDoc?.contactPhone || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faPhone}/>
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root
                                    placeholder="Email"
                                    type="email"
                                    name="contactEmail"
                                    defaultValue={jobDoc?.contactEmail || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faEnvelope}/>
                                    </TextField.Slot>
                                </TextField.Root>

                            </div>
                        </div>
                    </div>
                </div>

                <TextArea
                    defaultValue = {jobDoc?.description || ''}
                    placeholder="Job description"
                    resize="vertical"
                    name="description"

                />
                <div className="flex justify-center ">
                    <Button size = "3" >
                        <span className="px-8">Save</span>
                    </Button>
                </div>

            </form>
        </Theme>
    );
}

