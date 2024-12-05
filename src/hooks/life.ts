import { useState } from "react"

import { CREATELIFECONTRACT, createLifeContract } from "@/lib/api/life"
import toast from "react-hot-toast"

const useLife = () => {
  const [createLifePayload, setLifePayload] = useState<CREATELIFECONTRACT>({
    policy_type: "",
    face_amount: "",
    premium_mode: "",
    premium_amount: "",
    policy_term: "",
    benificiary_name: "",
    benificiary_relationship: "",
    contingent_benificiary_name: "",
    contingent_benificiary_relationship: "",
    effective_date: "",
    expiration_date: "",
  })

  const handleLifePayload = (key: keyof CREATELIFECONTRACT, value: any) => {
    setLifePayload((prev) => ({ ...prev, [key]: value }))
  }

  const createLife = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }

    console.log(
      "🚀 ~ file: life.ts ~ line 56 ~ createLife ~ createLifePayload",
      createLifePayload
    )

    try {
      const response = await createLifeContract(token, {
        ...createLifePayload,
        effective_date: createLifePayload.effective_date + "T00:00:00Z",
        expiration_date: createLifePayload.expiration_date + "T00:00:00Z",
        face_amount: parseInt(createLifePayload.face_amount),
        premium_amount: parseInt(createLifePayload.premium_amount),
        policy_term: parseInt(createLifePayload.policy_term),
      })
      if (response.status === 200) {
        toast.success("Life contract created successfully")
        window.location.href = "/dashboard/contracts/life"
      } else {
        toast.error(response?.data?.message ?? "Failed to create life contract")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to create life contract"
      )
    }
  }

  return {
    createLifePayload,
    handleLifePayload,
    createLife,
  }
}

export default useLife