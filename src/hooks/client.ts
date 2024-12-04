import { useState } from "react"
import {} from "@/lib/api/client"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

interface LOGINPAYLOAD {
  email: string
  password: string
}

const useClient = () => {
  const [loginPayload, setLoginPayload] = useState<LOGINPAYLOAD>({
    email: "",
    password: "",
  })

  const handleLoginPayload = (field: string, value: string) => {
    if (!field || !value) {
      throw new Error("Field and value are required")
    }

    setLoginPayload((prev) => ({ ...prev, [field]: value }))
  }

  const login = async () => {
    try {
      const res: any = await signIn("credentials", {
        identifier: loginPayload.email,
        password: loginPayload.password,
        redirect: false,
      })

      if (res.ok) {
        toast.success("Login successful")
        window.location.href = "/dashboard"
      } else {
        toast.error("Wrong Identifier or Password")
      }
    } catch (e) {
      toast.error("Wrong Identifier or Password")
      console.error("Login error:", e)
    }
  }

  return {
    loginPayload,
    handleLoginPayload,
    login,
  }
}

export default useClient