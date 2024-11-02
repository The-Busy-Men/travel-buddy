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

const PreviewObjectPage = ({approvalId}: { approvalId: UUID;}) => {
  const {approvalData, approvalDataIsLoading} = useApprovalById(approvalId);

  const dataAsObject = approvalData?.type === 'hotel' ? approvalData?.data as Hotel : approvalData?.data as AirBnb;
  return (
    <>
      <WarningWrapper message={`Preview for Approval Request: ${approvalId}`}>
        <Card>
          <CardHeader>This request is currently: {approvalData?.status.charAt(0).toUpperCase() + approvalData?.status.slice(1)}</CardHeader>
          <CardContent>
            <div className="flex flex-row">
              <Button variant='ghost' className="text-green-500 hover:bg-green-500 hover:bg-opacity-20 mr-2" disabled={approvalData?.status === 'approved'}><CiSquareCheck className="mr-2" size={20}/>Approve Request</Button>
              <Button variant='ghost' className="text-orange-500 hover:bg-orange-500 hover:bg-opacity-20 mr-2" disabled={approvalData?.status === 'pending'}><CiSquareQuestion className="mr-2" size={20}/>Revert to Pending</Button>
              <Button variant='ghost' className="text-red-500 hover:bg-red-500 hover:bg-opacity-20" disabled={approvalData?.status === 'rejected'}><CiSquareRemove className="mr-2" size={20}/>Reject Request</Button>
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