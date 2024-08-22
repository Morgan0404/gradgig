import Link from "next/link";

export default function About() {
    return (
        <header className=" justify-center h-screen">

            <div className="text-center container mt-8 my-6">
                <h1 className="font-bold text-2xl ">Our mission </h1>
                <div className="project-description ">
                    <p>
                        I developed this project with a clear mission in mind: to empower students by helping them find flexible work opportunities
                        that align with their demanding and dynamic lifestyles. As a student, I’ve experienced firsthand the challenges of juggling academic
                        responsibilities, social commitments, and the need to earn an income. This project was born out of a desire to make that balancing act
                        easier for students everywhere.
                    </p>
                    <br/>
                    <p>
                        One of the key features I focused on was creating a seamless and efficient job application process. I wanted to eliminate the usual
                        roadblocks that come with finding a job—such as the tedious requirement of filling out extensive registration forms or being forced
                        to sign in before even seeing the available opportunities. I believe that students should be able to apply for jobs quickly,
                        without unnecessary hurdles, so they can focus on what truly matters: their education and personal growth.
                    </p>
                    <br/>
                    <p>
                        This platform is designed to be intuitive and user-friendly, allowing students to discover and apply for jobs that fit their schedule
                        and meet their needs with just a few clicks. My aim was to create a space where students could easily connect with employers who understand
                        their unique challenges and are willing to offer the flexibility they need to succeed, both academically and professionally.
                    </p>
                </div>

            </div>

        </header>
    );
}
