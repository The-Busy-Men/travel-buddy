import { UUID } from "crypto";
import { AirBnb, Hotel } from "../../../api/entities";
import WarningWrapper from "../../components/wrappers/warningWrapper";
import { useApprovalById } from "../../forms/hooks/useApprovalById";
import UserObjectDetails from "../../objects/users/objectDetails";
import { Loader } from "../../components/ui/loader";

const PreviewObjectPage = ({approvalId}: { approvalId: UUID;}) => {
  const {approvalData, approvalDataIsLoading} = useApprovalById(approvalId);

  const dataAsObject = approvalData?.type === 'hotel' ? approvalData?.data as Hotel : approvalData?.data as AirBnb;
  return (
    <>
      <WarningWrapper message={`Preview for Approval Request: ${approvalId}`}>
        <Loader show={approvalDataIsLoading} fullscreen />
        {!approvalDataIsLoading &&  <UserObjectDetails objectData={dataAsObject} objectType={approvalData?.type} /> }
      </WarningWrapper>
    </>
  )
}

export default PreviewObjectPage;