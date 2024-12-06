"use client"
import { Button, Input } from "@nextui-org/react"

import { Select, SelectItem } from "@nextui-org/select"
import { useLife } from "@/hooks"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
const UpdateLifeContract = () => {
  const {
    getOneLifeContract,
    life,
    updateLifePayload,
    handleUpdateLifePayload,
    updateLife,
  } = useLife()
  const { data, status } = useSession()
  const id = window.location.pathname.split("/").pop()

  useEffect(() => {
    if (status === "authenticated") {
      getOneLifeContract((data as any)?.token, String(id))
    }
  }, [status])

  useEffect(() => {
    handleUpdateLifePayload("face_amount", life?.face_amount)
    handleUpdateLifePayload("premium_amount", life?.premium_amount)
    handleUpdateLifePayload("policy_term", life?.policy_term)
    handleUpdateLifePayload("benificiary_name", life?.benificiary_name)
    handleUpdateLifePayload(
      "effective_date",

      life?.effective_date ? life?.effective_date.split("T")[0] : ""
    )
    handleUpdateLifePayload(
      "expiration_date",
      life.expiration_date ? life?.expiration_date.split("T")[0] : ""
    )
  }, [life])
  return (
    <form
      className="flex flex-col gap-3"
      method="post"
      action=""
      onSubmit={async (e) => {
        e.preventDefault()

        if ((data as any)?.token) {
          updateLife((data as any)?.token, String(id))
        }
      }}
    >
      <div className="flex gap-2">
        <Input
          label="Face Amount"
          type="number"
          onChange={(e) =>
            handleUpdateLifePayload("face_amount", e.target.value)
          }
          value={updateLifePayload.face_amount}
        />
        <Input
          label="Premium Amount"
          type="number"
          onChange={(e) =>
            handleUpdateLifePayload("premium_amount", e.target.value)
          }
          value={updateLifePayload.premium_amount}
        />
      </div>

      <div className="flex gap-2">
        <Input
          label="Policy Term"
          type="number"
          onChange={(e) =>
            handleUpdateLifePayload("policy_term", e.target.value)
          }
          value={updateLifePayload.policy_term}
        />
        <Input
          label="Benificiary Name"
          type="text"
          onChange={(e) =>
            handleUpdateLifePayload("benificiary_name", e.target.value)
          }
          value={updateLifePayload.benificiary_name}
        />
      </div>
      <label>Policy Start Date</label>
      <Input
        type="Date"
        onChange={(e) =>
          handleUpdateLifePayload("effective_date", e.target.value)
        }
        value={updateLifePayload.effective_date}
      />
      <label>Policy End Date</label>
      <Input
        type="Date"
        onChange={(e) =>
          handleUpdateLifePayload("expiration_date", e.target.value)
        }
        value={updateLifePayload.expiration_date}
      />

      <Button className="text-white mt-10" color="success" type="submit">
        Update Life Contract
      </Button>
    </form>
  )
}

export default UpdateLifeContract
