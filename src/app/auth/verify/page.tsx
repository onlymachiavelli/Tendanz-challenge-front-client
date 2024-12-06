"use client"
import { useEffect } from "react"
import { Button, Input } from "@nextui-org/react"
import Link from "next/link"
import { useClient } from "@/hooks"
import { useSession } from "next-auth/react"
import { IoReload } from "react-icons/io5"
import { signOut } from "next-auth/react"

const Page = () => {
  const { verifyAccount, resendCode, codePayload, setCodePayload } = useClient()
  const { data, status, update } = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login"
    }
  }, [status])
  return (
    <>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Tendanz Insurrance
            </h1>
            <p className="text-white mt-1">
              Effortlessly manage all your insurance contracts with our
              user-friendly solution.
            </p>
            <Button
              type="button"
              as={Link}
              href="https://tendanz.com/"
              className=" w-1/2 bg-white text-indigo-800 mt-4 py-2  font-semibold mb-2"
            >
              Learn more About Us
            </Button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form
            className="bg-white w-2/3"
            onSubmit={async (e) => {
              e.preventDefault()
              if ((data as any)?.token) {
                await verifyAccount((data as any)?.token).then(() => {
                  signOut()
                })
              }
            }}
            method="post"
            action=""
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Welcome to Tendanz Client Account Center, Please Verify your
              Account!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Please Check your email {data?.user?.email} we have sent an email
              address which contains the Code
            </p>
            <div className="flex gap-3 flex-col">
              <Input
                label="Received Code"
                type="text"
                value={codePayload.code}
                onChange={(e) => {
                  setCodePayload({ ...codePayload, code: e.target.value })
                }}
              />
            </div>
            <div className="flex flex-row items-center justify-center  gap-3">
              <Button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Verify {(data as any)?.user?.firstName}{" "}
                {(data as any)?.user?.lastName}
              </Button>

              <Button
                className="py-2 mt-2"
                color="danger"
                isIconOnly
                type="button"
                onClick={async () => {
                  if ((data as any).token) {
                    await resendCode((data as any).token)
                  }
                }}
              >
                <IoReload size={20} color="white" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page
