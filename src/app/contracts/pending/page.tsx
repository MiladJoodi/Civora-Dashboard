import { ContractsList } from "@/components/Contracts/ContractsList"

const PendingContractsPage = () => {
  return (
    <>
      <ContractsList statusFilter="pending" />
    </>
  )
}

export default PendingContractsPage
