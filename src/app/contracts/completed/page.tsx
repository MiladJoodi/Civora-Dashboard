import { ContractsList } from "@/components/Contracts/ContractsList"

const CompletedContractsPage = () => {
  return (
    <>
      <ContractsList statusFilter="completed" />
    </>
  )
}

export default CompletedContractsPage
