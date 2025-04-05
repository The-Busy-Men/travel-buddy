import { UUID } from "crypto";
import { AirBnb, Hotel } from "../../../api/entities";
import WarningWrapper from "../../components/wrappers/warningWrapper";
import { useApprovalById } from "../../forms/hooks/useApprovalById";
import UserObjectDetails from "../../objects/users/objectDetails";
import { Loader } from "../../components/ui/loader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { CiSquareCheck } from "react-icons/ci";
import { CiSquareQuestion } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../api/providers/alertContext";

const PreviewObjectPage = ({ approvalId }: { approvalId: UUID;}) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { approvalData, approvalDataIsLoading, updateApprovalStatus } = useApprovalById(approvalId);

  const dataAsObject = approvalData?.type === 'hotel' ? approvalData?.data as Hotel : approvalData?.data as AirBnb;
  const status = approvalData?.status;

  const handleStatusChange = (newStatus: string) => {
    updateApprovalStatus.mutate({body: {approvalId: approvalId, status: newStatus}});
    navigate('/admin/approvals')
    showAlert(`Request (${approvalId}) has been set to: ${newStatus}`, 'success')
  }
  return (
    <>
      <WarningWrapper message={`Preview for Approval Request: ${approvalId}`}>
        <Card className="shadow-lg">
          <CardHeader>This request is currently: {approvalData?.status.charAt(0).toUpperCase() + approvalData?.status.slice(1)}</CardHeader>
          <CardContent>
            <div className="flex flex-row">
              <Button variant='ghost' className="text-green-500 hover:bg-green-500 hover:bg-opacity-20 mr-2" disabled={status === 'approved'} onClick={() => handleStatusChange('approved')}>
                <CiSquareCheck className="mr-2" size={20}/>Approve Request
              </Button>
              <Button variant='ghost' className="text-orange-500 hover:bg-orange-500 hover:bg-opacity-20 mr-2" disabled={status === 'pending'} onClick={() => handleStatusChange('pending')}>
                <CiSquareQuestion className="mr-2" size={20}/>Revert to Pending
              </Button>
              <Button variant='ghost' className="text-red-500 hover:bg-red-500 hover:bg-opacity-20" disabled={['rejected', 'approved'].some((s) => s === status)} onClick={() => handleStatusChange('rejected')}>
                <CiSquareRemove className="mr-2" size={20}/>Reject Request
              </Button>
            </div>
          </CardContent>
        </Card>

        <Loader show={approvalDataIsLoading} fullscreen />
        {!approvalDataIsLoading &&  <UserObjectDetails objectData={dataAsObject} objectType={approvalData?.type} /> }
      </WarningWrapper>
    </>
  )
}

export default PreviewObjectPage;