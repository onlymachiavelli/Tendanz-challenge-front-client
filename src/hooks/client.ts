import { useState } from "react"
import {
  register as registerAPI,
  verify as verifyAPI,
  resendVerificationCode,
} from "@/lib/api/client"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import axiosInstance from "@/config/axios"

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

interface CODEPAYLOAD {
  code?: string
}
const useClient = () => {
  const [loginPayload, setLoginPayload] = useState<LOGINPAYLOAD>({
    email: "",
    password: "",
  })

  const handleLoginPayload = (field: string, value: string) => {
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

  const [codePayload, setCodePayload] = useState<CODEPAYLOAD>({})

  const verifyAccount = async (token: string) => {
    if (!codePayload.code) {
      toast.error("Code is required")

      return
    }

    if (!token) {
      throw new Error("Token is required")
    }

    try {
      const res = await verifyAPI(
        {
          code: codePayload.code,
        },
        token
      )

      if (res.status === 200) {
        toast.success("Account verified")
        window.location.href = "/auth/login"
      } else {
        toast.error("Account verification failed")
      }
    } catch (e) {
      toast.error("Account verification failed")
      console.error("Account verification error:", e)
    }
  }

  const resendCode = async (token: string) => {
    if (!token) {
      throw new Error("Please provide the token !")
    }

    try {
      const request = await resendVerificationCode(token)

      if (request.status == 200) {
        toast.success("Code has been Sent")
      } else {
        toast.error(request.data?.message ?? "Internal Error")
      }
    } catch (e: any) {
      toast.error("Internal Server Error, Please report that !")
      console.log({
        ...e,
      })
    }
  }

  return {
    loginPayload,
    handleLoginPayload,
    login,
    registerPayload,
    handleRegisterPayload,
    register,
    verifyAccount,
    resendCode,
    codePayload,
    setCodePayload,
  }
}

export default useClient
