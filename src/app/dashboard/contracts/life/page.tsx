"use client"

import { useSession } from "next-auth/react"
import { Layout } from "@/components/molecules"

import { CreateLifeContract, LifeList } from "@/components/organisms"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal"

import { Button } from "@nextui-org/react"
import Link from "next/link"

const Page = () => {
  const {} = useSession()

  //some states
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <Layout>
      <div className="w-3/4 m-auto pt-20 ">
        <LifeList />
      </div>
      <div className="fixed bottom-10 right-10">
        {}

        <Button
          color="success"
          as={Link}
          href="/dashboard/contracts/life/create"
          className="text-white"
          onClick={() => {
            onOpen()
          }}
        >
          Request a Contract
        </Button>
      </div>
    </Layout>
  )
}

export default Page
