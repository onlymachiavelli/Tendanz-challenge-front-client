"use client"

import { useSession } from "next-auth/react"
import { Layout } from "@/components/molecules"

import { UpdateLifeContract } from "@/components/organisms"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal"

import { Button } from "@nextui-org/react"

const Page = () => {
  const id = window.location.pathname.split("/").pop()

  const {} = useSession()

  return (
    <Layout>
      <div className="w-2/3 h-auto m-auto p-10">
        <UpdateLifeContract />
      </div>
    </Layout>
  )
}

export default Page
