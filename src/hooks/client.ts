import { useState } from "react"
import { register as registerAPI } from "@/lib/api/client"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

interface LOGINPAYLOAD {
  email: string
  password: string
}

interface REGISTERPAYLOAD {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
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

  const [registerPayload, setRegisterPayload] = useState<REGISTERPAYLOAD>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  const handleRegisterPayload = (field: string, value: string) => {
    setRegisterPayload((prev) => ({ ...prev, [field]: value }))
  }

  const register = async () => {
    try {
      const res = await registerAPI({
        email: registerPayload.email,
        password: registerPayload.password,
        first_name: registerPayload.firstName,
        last_name: registerPayload.lastName,
        phone: registerPayload.phone,
      })
      if (res.status === 200) {
        toast.success("Registration successful")
        window.location.href = "/auth/login"
      } else {
        toast.error("Registration failed")
      }
    } catch (e) {
      toast.error("Registration failed")
      console.error("Registration error:", e)
    }
  }

  return {
    loginPayload,
    handleLoginPayload,
    login,
    registerPayload,
    handleRegisterPayload,
    register,
  }
}

export default useClient
