import { requestPriorityOptions, workflowStatuses } from "../data/mockData";

export type RequestType = "Access Request" | "Budget Approval" | "Vendor Onboarding";

export type RequestPriority = (typeof requestPriorityOptions)[number];

export type WorkflowStatus = (typeof workflowStatuses)[number];

export interface WorkflowVariableMap {
  requesterName: string;
  requestType: RequestType;
  priority: RequestPriority;
  description: string;
  amount: number;
}

export interface WorkflowTimelineEntry {
  id: string;
  status: WorkflowStatus;
  title: string;
  detail: string;
  timestamp: string;
}

export interface WorkflowRequest {
  id: string;
  currentStatus: WorkflowStatus;
  variables: WorkflowVariableMap;
  createdAt: string;
  updatedAt: string;
  timeline: WorkflowTimelineEntry[];
}

export interface WorkflowFormValues {
  requesterName: string;
  requestType: RequestType;
  priority: RequestPriority;
  description: string;
  amount: string;
}
