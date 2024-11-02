/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Loader } from "../../components/ui/loader";
import { useApproval } from "../../forms/hooks/useApproval";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardTitle } from "../../components/ui/card";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { FilterButton } from "../../components/ui/filterButton";

function ApprovalList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeFilters, setActiveFilters] = useState<string[]>([])

  const statusQueryParams = searchParams.getAll('status') || '';
  const [approvalQuery, setApprovalQuery] = useState(statusQueryParams);
  const { allApprovalData, allApprovalLoading } = useApproval(approvalQuery);

  const getValuesByStatus = (status: string | null) => {
    if (!status) return { color: '', Icon: CiCircleInfo, tooltip: 'No status found' };
    switch (status) {
      case 'pending': return { color: 'border-orange-500', Icon: CiCircleMore, tooltip: 'Waiting for Approval' };
      case 'approved': return { color: 'border-green-500', Icon: CiCircleCheck, tooltip: 'Approved' };
      case 'rejected': return { color: 'border-red-500', Icon: CiCircleRemove, tooltip: 'Rejected' };
      default: return { color: '', Icon: CiCircleInfo, tooltip: 'No status found' };
    }
  }

  const filterOptions = [{id: 'pending', label: 'Pending'}, {id: 'approved', label: 'Approved'}, {id: 'rejected', label: 'Rejected'}]

  const handleFilterChange = (selectedFilters: string[]) => {
    setActiveFilters(selectedFilters)
    setSearchParams({status: selectedFilters})
    setApprovalQuery(selectedFilters)
  }

  const editedFilterOptions = [{id: 'edited', label: 'Not dealt with Approvals'}]

  const [hasBeenEdited, setHasBeenEdited] = useState(true);

  const handleEditFilterChange = () => {
    setHasBeenEdited(!hasBeenEdited);
  }

  const filteredApprovalData = hasBeenEdited ? allApprovalData : allApprovalData?.filter((approval: any) => approval.editedBy == null);

  return (
  <>
  <Loader show={allApprovalLoading} fullscreen />
  <div className="flex justify-center mb-4">
    <h1 className="text-3xl font-bold">All Approvals</h1>
  </div>
  <div className="max-w-fit mx-auto">
    <FilterButton options={filterOptions} onFilterChange={handleFilterChange} label='Status Filter' />
    <FilterButton options={editedFilterOptions} onFilterChange={handleEditFilterChange} label='Edited' />
  </div>
  <div className="grid grid-cols-3 mb-4">
    {filteredApprovalData?.map((approval: any)=> {
      const values = getValuesByStatus(approval.status)
      const textColor = values.color.replace('border', 'text');

      return (
      <>
      <Card className={`max-w-[100%] m-2 p-1 cursor-pointer ${values.color}`} onClick={() => navigate(`/test/approval/${approval.id}`)}>
        <CardTitle className="p-1">
          <div className="flex justify-between w-full">
            <span>{approval.data.name}</span>
            <div className={`${textColor} relative group`}>
              <values.Icon />
              <div className={`absolute opacity-80 bottom-full mb-1 hidden w-max whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded-md shadow-lg group-hover:block font-medium`}>
                {values.tooltip}
              </div>
            </div>
          </div>
        </CardTitle>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <span>
              <p className="font-bold">Requestor: <span className="font-medium">{approval.submittedBy.email}</span></p>
              <p className="text-secondary hover:text-primary">({approval.submittedBy.id})</p>
            </span>
            <span className="font-bold">
              Type: <span className="font-medium">{approval.type}</span>
            </span>
          </div>
        </CardContent>
        <CardFooter className="text-secondary">Request Id: <p className="ml-2 hover:text-primary">{approval.id}</p></CardFooter>
      </Card>
      </>
    )
    })}
  </div>
  </>
)
}

export default ApprovalList;