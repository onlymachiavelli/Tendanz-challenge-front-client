"use client"

import { useSession } from "next-auth/react"
import { Layout } from "@/components/molecules"

import { CreateLifeContract } from "@/components/organisms"

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
  const {} = useSession()

  //some states
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <Layout>
      <div className="w-2/3 h-auto m-auto p-10">
        <CreateLifeContract />
      </div>
    </Layout>
  )
}

export default Page
