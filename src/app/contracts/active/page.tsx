import { ContractsList } from "@/components/Contracts/ContractsList"

const ActiveContractsPage = () => {
  return (
    <>
      <ContractsList statusFilter="active" />
    </>
  )
}

export default ActiveContractsPage
