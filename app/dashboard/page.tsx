"use client"
import { GenerateMockInterviewButton } from '@/components/generate-mock-interview/button'
import { UploadResumeButton } from '@/components/upload-resume/button'
import { useCurrentUser } from '@/services/auth/queries'
import { useGetMyResumesQuery } from '@/services/resume/queries'
import React from 'react'

const Page = () => {
  const { data, isLoading } = useCurrentUser()
  const { data: resumes, isLoading: isResumesLoading } = useGetMyResumesQuery()
  return (
    <div className='flex gap-4 justify-center flex-col items-center w-full min-h-screen'>
      <div> {isLoading ? 'loading...' : data?.email} </div>
      <br />
      <br />
      <br />

      {isResumesLoading ? null : resumes?.length !== 0 && false ? null : <UploadResumeButton />}
      <GenerateMockInterviewButton />
    </div>
  )
}

export default Page