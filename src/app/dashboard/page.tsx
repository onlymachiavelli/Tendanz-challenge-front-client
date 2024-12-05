"use client"

import { useSession } from "next-auth/react"
import { Layout } from "@/components/molecules"
import { Numbers } from "@/components/organisms"

const Page = () => {
  const {} = useSession()

  return (
    <Layout>
      <Numbers />
    </Layout>
  )
}

export default Page
