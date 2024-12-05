"use client"

import React, { useEffect } from "react"
import { useLife } from "@/hooks"
import { useSession } from "next-auth/react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react"

const columns = [
  { name: "ID", uid: "id" },
  { name: "Policy Type", uid: "policy_type" },
  { name: "Face Amount", uid: "face_amount" },
  { name: "Premium Mode", uid: "premium_mode" },
  { name: "Premium Amount", uid: "premium_amount" },
  { name: "Policy Term", uid: "policy_term" },
  { name: "Beneficiary", uid: "benificiary_name" },
  { name: "Relationship", uid: "benificiary_relationship" },
  { name: "Status", uid: "status" },
]

const statusColorMap: any = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
}

const LifeList = () => {
  const { lifeContracts, getMines } = useLife()
  const { data, status } = useSession()

  useEffect(() => {
    if ((data as any)?.token) {
      getMines((data as any)?.token)
    }
  }, [data, getMines])

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof typeof item]

    switch (columnKey) {
      case "status":
        return (
          <Chip
            color={statusColorMap[cellValue] || "default"}
            variant="dot"
            size="sm"
          >
            {cellValue.toUpperCase()}
          </Chip>
        )
      case "benificiary_name":
        return (
          <Tooltip content={`Relationship: ${item.benificiary_relationship}`}>
            {cellValue}
          </Tooltip>
        )
      default:
        return cellValue
    }
  }, [])

  if (!lifeContracts?.length) {
    return <p className="text-center text-gray-500">No contracts found.</p>
  }

  return (
    <Table aria-label="Life Contracts Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={lifeContracts}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default LifeList
