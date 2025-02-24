import { Employee } from "@/types/types";
import { RxCross1 } from "react-icons/rx";

// type EmpPropsType = {
//   setToggle: (value: boolean) => void;
// };

type EmpPropsType = {
  switchDetailes: Employee;
  setToggle: (value: boolean) => void;
};

function EmpDocuments({ switchDetailes, setToggle }: EmpPropsType) {
  const {
    _id,
    firstName,
    lastName,
    email,
    phoneNumber,
    resignationDate,
    professionalSummary,
    qualification,
    skill,
    gender,
    address,
    profilePic,
    project,
    role,
    achievements,
  } = switchDetailes;

  return (
    <div className="bg-gray-900 min-h-screen py-4 px-4 sm:px-6 lg:px-8 text-gray-100 select-none leading-relaxed tracking-wide font-paraFont">
      <div className="w-full mx-auto bg-gray-800 shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-red-700 pb-4 mb-6">
          <div className="flex w-full">
            <img
              src={profilePic}
              alt="Employee Photo"
              className="w-24 h-24 rounded-full border border-gray-700"
            />
            <div className="mx-3">
              <h1 className="text-2xl font-bold">
                {firstName} {lastName}
              </h1>
              <div className="mt-2 space-y-1">
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Phone:</strong> {phoneNumber}
                </p>
                <p>
                  <strong>Skill:</strong> {skill}
                </p>
              </div>
            </div>
          </div>
          <div className="cursor-pointer" onClick={() => setToggle(true)}>
            <RxCross1 size={18} />
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Professional Summary */}
          <section className="border-b-2 py-3">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Professional Summary *
            </h3>

            <p className="text-gray-200 w-[90%]">{professionalSummary}</p>
          </section>

          {/* Employment Details */}
          <section className="border-b-2 py-3">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Employment Details *
            </h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <strong>Current Position:</strong> Software Engineer
              </p>
              <p>
                <strong>Department:</strong> IT
              </p>
              <p>
                <strong>Joining Date:</strong> January 15, 2020
              </p>
              <p>
                <strong>Work Location:</strong> HQ - New York
              </p>
              <p>
                <strong>Reporting Manager:</strong> Jane Smith
              </p>
            </div>
          </section>

          {/* Skills */}
          <section className="border-b-2 py-3">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Skills *
            </h3>
            <ul className="flex flex-wrap gap-2">
              {[
                "React",
                "Node.js",
                "TypeScript",
                "RESTful APIs",
                "CSS",
                "Tailwind CSS",
              ].map((skill) => (
                <li
                  key={skill}
                  className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section className="border-b-2 py-3">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Projects *
            </h3>
            <ul className="space-y-4 mt-4">
              {project.map((item) => (
                <li key={item.name}>
                  <h4 className="font-semibold text-gray-100">{item.name}</h4>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="border-b-2 py-3">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Education *
            </h3>
            <ul className="space-y-2">
              <li>
                <p className="font-semibold text-gray-100">
                  Bachelor of Science in Computer Science
                </p>
                <p className="text-sm text-gray-400">
                  University of Technology, 2017
                </p>
              </li>
            </ul>
          </section>

          {/* Certifications */}
          <section className="border-b-2 py-3">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Certifications *
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>{skill}</li>
              <li>Certified Scrum Master (CSM)</li>
            </ul>
          </section>

          {/* Awards and Achievements */}
          <section>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Awards and Achievements *
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>{achievements}</li>
            </ul>
          </section>

          {/* References */}
        </div>
      </div>
    </div>
  );
}

export default EmpDocuments;
