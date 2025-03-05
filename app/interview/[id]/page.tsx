"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useInterviewStore } from "@/stores/interview";
import { Loader2 } from "lucide-react";
import PreInterviewScreen from "./_components/pre-interview-screen";
import InterviewScreen from "./_components/interview-screen";
import { Interview } from "@/types";

const interview = {
  "id": "2b39f898-7484-41c8-94e9-0271719ede2e",
  "title": "App Dev & Support Engineer II Mock Interview",
  "createdAt": "2025-03-05T00:14:07.763Z",
  "updatedAt": "2025-03-05T00:14:07.763Z",
  "userId": "55b8272b-2d9a-40d3-b3ea-0f74c332fc2a",
  "jobListingId": "471ad44d-ef77-4723-8afb-c2c14d7af26c",
  "resumeId": "6b9bf127-986c-4e52-99b4-a1144c707430",
  "jobListing": {
    "id": "471ad44d-ef77-4723-8afb-c2c14d7af26c",
    "url": "https://www.naukri.com/job-listings-app-dev-support-engineer-ii-conduent-business-services-india-llp-noida-5-to-10-years-040325914227?src=gnbjobs_homepage_srch&sid=17411329149062870_1&xp=13&px=3",
    "title": "App Dev & Support Engineer II",
    "company": "Conduent",
    "location": "Noida",
    "description": "Through our dedicated associates, Conduent delivers mission-critical services and solutions on behalf of Fortune 100 companies and over 500 governments - creating exceptional outcomes for our clients and the millions of people who count on them. You have an opportunity to personally thrive, make a difference and be part of a culture where individuality is noticed and valued every day.\n\nRequirement: We are seeking a highly skilled Senior Full Stack Developer with expertise in .NET Core, C#, Web API, ASP.NET, JavaScript, ReactJS, VueJS, and other related technologies. The ideal candidate will have experience in developing web portals at the enterprise level in a multi-tenancy environment.\n\nJob Level: App Dev & Support Engineer II C06 [5 - 9 Years]\n\nMandatory skills: C# .Net, MVC, Web services, Web API, jQuery, HTML, CSS, .Net Core, MSSQL, JavaScript/jQuery, HTML5, CSS3, Bootstrap\n\nQualifications / Experience:\nBachelors/Masters degree in Computer Science/ Computer Engineering\nMinimum of 6+ years experience in building enterprise scale windows and web application using Microsoft .NET technologies.\n5+ years of experience in C#, ASP.NET MVC and Microsoft Web API\nProficiency in Entity Framework and LINQ\n1+ years of experience in .Net Core, ReactJS, Vue.js\n2-3 Years Proficient understanding of UI/UX designs including HTML5, CSS3\nIn depth knowledge on design patterns and unit testing frameworks.\nAbility to work with a sense of urgency and attention to detail.\nExcellent oral and written communication skills.\nExperience in Git, TFS and CICD pipelines.\nExperience with automated testing frameworks.\nUnderstanding of security best practices in web development.\nFamiliarity with Agile/Scrum methodologies.",
    "skillsRequired": [
      "C#",
      ".NET",
      "ASP.NET",
      "JavaScript",
      "ReactJS",
      "VueJS",
      "HTML",
      "CSS",
      "Web API",
      "MSSQL",
      "Entity Framework",
      "LINQ",
      "Unit Testing Frameworks",
      "jQuery",
      "Bootstrap"
    ],
    "experienceRequired": 6,
    "jobType": "Full Time, Permanent",
    "salary": "Not Disclosed",
    "createdAt": "2025-03-05T00:14:07.717Z",
    "updatedAt": "2025-03-05T00:14:07.717Z"
  },
  "resume": {
    "id": "6b9bf127-986c-4e52-99b4-a1144c707430",
    "title": "Rahul_resume (11).pdf"
  },
  "questions": [
    {
      "id": "4cad9dd8-8de1-4ef3-bdc3-4bb59629628c",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "Can you describe your experience with .NET Core and how you've applied it in your previous projects?",
      "order": 1,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "a9d14b67-8ad1-49af-824c-3b87a421ef28",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "What design patterns are you familiar with, and how have you implemented them in your applications?",
      "order": 2,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "5faa5ea1-edbb-4370-b411-56b2a561793e",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "How do you ensure quality in your code, particularly regarding testing and validation?",
      "order": 3,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "480a9e21-79ee-4761-a6d5-1f53fc02f217",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "Can you provide an example of a challenging problem you faced in a project and how you resolved it?",
      "order": 4,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "e841e45f-e9ca-40db-9039-fcc5b1c3d0a0",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "What role does collaboration play in your work style and how do you ensure effective communication with your team?",
      "order": 5,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "6b763b1f-0df9-4749-bae3-3d45a24de235",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "In your resume, you mentioned working on a full-stack web application using React. Could you elaborate on the tech stack and your specific contributions?",
      "order": 6,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "c9223891-f6d9-419f-bfc9-1f10252a10e7",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "Can you discuss any experience you have with MSSQL, especially in the context of managing data for web applications?",
      "order": 7,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "99a4ed53-1610-4d4d-b542-2e4c9dbae77a",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "What was your role in streamlining the development process of the full-stack end-to-end website you created?",
      "order": 8,
      "type": "VERBAL",
      "codeSnippet": null,
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "70a919ae-80f2-4323-b161-e38641263b4a",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "Write a simple C# method to check if a string is a palindrome. Please explain your thought process while writing this code.",
      "order": 9,
      "type": "CODE",
      "codeSnippet": "public bool IsPalindrome(string str) {\n    int left = 0;\n    int right = str.Length - 1;\n    while (left < right) {\n        if (str[left] != str[right]) return false;\n        left++;\n        right--;\n    }\n    return true;\n}",
      "codeSnippetLang": null,
      "expectedAnswer": ""
    },
    {
      "id": "ad0fe009-84e7-4569-a5bf-8560b4dc7ae4",
      "interviewId": "2b39f898-7484-41c8-94e9-0271719ede2e",
      "content": "Can you write a SQL query to find all users who registered in the last month? Assume we have a 'users' table with a 'registration_date' column.",
      "order": 10,
      "type": "CODE",
      "codeSnippet": "SELECT * FROM users WHERE registration_date >= DATEADD(month, -1, GETDATE());",
      "codeSnippetLang": null,
      "expectedAnswer": ""
    }
  ],
  "interviewSessions": []
} as const

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [hasJoined, setHasJoined] = useState(false);
  const { setCurrentInterview } = useInterviewStore();

  // // Fetch interview data
  // const { data: interview, isLoading, error } = useQuery({
  //   queryKey: ["interview", id],
  //   queryFn: () => fetchInterview(id),
  //   enabled: !!id,
  //   retry: 1,
  // });

  // useEffect(() => {
  //   if (interview) {
  //     setCurrentInterview(interview);
  //   }
  // }, [interview, setCurrentInterview]);

  // Handle join interview
  const handleJoinInterview = () => {
    setHasJoined(true);
  };

  // Handle end call
  const handleEndCall = () => {
    router.push("/interviews");
  };

  if (false) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Interview not found</h1>
        <p className="mt-2 text-gray-500">
          The interview you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push("/interviews")}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
        >
          Go back to interviews
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background">
      {!hasJoined ? (
        <PreInterviewScreen
          interviewTitle={interview.title}
          onJoin={handleJoinInterview}
        />
      ) : (
        <InterviewScreen
          interview={interview}
          onEndCall={handleEndCall}
        />
      )}
    </div>
  );
}