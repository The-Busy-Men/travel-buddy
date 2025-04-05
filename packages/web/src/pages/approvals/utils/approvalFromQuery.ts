import { ApprovalStatus } from '../../forms/hooks/useApproval';

export const getApprovalStatusFromQuery = (
  status: string[] | null,
): ApprovalStatus[] => {
  if (status) {
    // Filter out any invalid status values
    const validStatuses = status.filter((s) =>
      Object.values(ApprovalStatus).includes(s as ApprovalStatus),
    ) as ApprovalStatus[];

    // Return valid statuses or `ApprovalStatus.none` if none are valid
    return validStatuses.length > 0 ? validStatuses : [ApprovalStatus.none];
  }
  return [ApprovalStatus.none];
};
