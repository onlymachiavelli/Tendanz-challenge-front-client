"use client"
import { Button, Input } from "@nextui-org/react"

import { Select, SelectItem } from "@nextui-org/select"
import { useLife } from "@/hooks"
import { useSession } from "next-auth/react"
const CreateLifeContract = () => {
  const { createLife, createLifePayload, handleLifePayload } = useLife()
  const { data, status } = useSession()

  return (
    <form
      className="flex flex-col gap-3"
      method="post"
      action=""
      onSubmit={async (e) => {
        e.preventDefault()

        if ((data as any)?.token) {
          await createLife((data as any)?.token)
        }
      }}
    >
      <div className="flex gap-2">
        <Select
          label="Select Policy Type"
          placeholder="Choose one"
          value={createLifePayload.policy_type}
          onSelectionChange={(e) => {
            handleLifePayload(
              "policy_type",
              ["Whole Life", "Term Life", "Universal Life", "Variable Life"][
                Number(e.anchorKey)
              ]
            )
          }}
        >
          {["Whole Life", "Term Life", "Universal Life", "Variable Life"].map(
            (item: string, index: number) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            )
          )}
        </Select>

        <Select
          label="Select Premium Mode"
          placeholder="Choose one"
          value={createLifePayload.premium_mode}
          onSelectionChange={(e) =>
            handleLifePayload(
              "premium_mode",
              ["Monthly", "Quarterly", "Semi-Annual", "Annual"][
                Number(e.anchorKey)
              ]
            )
          }
        >
          {["Monthly", "Quarterly", "Semi-Annual", "Annual"].map(
            (item: string, index: number) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            )
          )}
        </Select>
      </div>

      <div className="flex gap-2">
        <Select
          value={createLifePayload.benificiary_relationship}
          onSelectionChange={(e) =>
            handleLifePayload(
              "benificiary_relationship",
              ["Spouse", "Child", "Parent", "Sibling", "Grandparent", "Other"][
                Number(e.anchorKey)
              ]
            )
          }
          label="Benificiary Relationship"
          placeholder="Choose one"
        >
          {["Spouse", "Child", "Parent", "Sibling", "Grandparent", "Other"].map(
            (item: string, index: number) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            )
          )}
        </Select>

        <Select
          value={createLifePayload.contingent_benificiary_relationship}
          onSelectionChange={(e) =>
            handleLifePayload(
              "contingent_benificiary_relationship",
              ["Spouse", "Child", "Parent", "Sibling", "Grandparent", "Other"][
                Number(e.anchorKey)
              ]
            )
          }
          label="Contingent Benificiary Relationship"
          placeholder="Choose one"
        >
          {["Spouse", "Child", "Parent", "Sibling", "Grandparent", "Other"].map(
            (item: string, index: number) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            )
          )}
        </Select>
      </div>
      <div className="flex gap-2">
        <Input
          label="Face Amount"
          type="number"
          onChange={(e) => handleLifePayload("face_amount", e.target.value)}
          value={createLifePayload.face_amount}
        />
        <Input
          label="Premium Amount"
          type="number"
          onChange={(e) => handleLifePayload("premium_amount", e.target.value)}
          value={createLifePayload.premium_amount}
        />
      </div>

      <div className="flex gap-2">
        <Input
          label="Policy Term"
          type="number"
          onChange={(e) => handleLifePayload("policy_term", e.target.value)}
          value={createLifePayload.policy_term}
        />
        <Input
          label="Benificiary Name"
          type="text"
          onChange={(e) => {
            handleLifePayload("benificiary_name", e.target.value)
            handleLifePayload("contingent_benificiary_name", e.target.value)
          }}
          value={createLifePayload.benificiary_name}
        />
      </div>
      <label>Policy Start Date</label>
      <Input
        type="Date"
        onChange={(e) => handleLifePayload("effective_date", e.target.value)}
        value={createLifePayload.effective_date}
      />
      <label>Policy End Date</label>
      <Input
        type="Date"
        onChange={(e) => handleLifePayload("expiration_date", e.target.value)}
        value={createLifePayload.expiration_date}
      />

      <Button className="text-white mt-10" color="success" type="submit">
        Request Policy
      </Button>
    </form>
  )
}

export default CreateLifeContract
