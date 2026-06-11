import type {
  WorkflowFormValues,
  WorkflowRequest,
  WorkflowStatus,
  WorkflowTimelineEntry,
} from "../types/workflow";

const STORAGE_KEY = "fluxnova.workflow.requests";

function readStorage(): WorkflowRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as WorkflowRequest[];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function writeStorage(requests: WorkflowRequest[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function formatTimestamp(date: Date) {
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function createTimelineEntry(
  status: WorkflowStatus,
  title: string,
  detail: string,
  timestamp: string,
): WorkflowTimelineEntry {
  return {
    id: `${status}-${timestamp}`,
    status,
    title,
    detail,
    timestamp,
  };
}

export function createWorkflowRequest(values: WorkflowFormValues): WorkflowRequest {
  const now = new Date();
  const timestamp = formatTimestamp(now);
  const requestId = `REQ-${now.getTime().toString().slice(-6)}`;

  return {
    id: requestId,
    currentStatus: "Submitted",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    variables: {
      requesterName: values.requesterName,
      requestType: values.requestType,
      priority: values.priority,
      description: values.description,
      amount: Number(values.amount),
    },
    timeline: [
      createTimelineEntry(
        "Submitted",
        "Request submitted",
        "The requester created a new workflow instance from the form.",
        timestamp,
      ),
    ],
  };
}

export function getStoredRequests() {
  return readStorage();
}

export function saveWorkflowRequest(request: WorkflowRequest) {
  const requests = readStorage();
  writeStorage([request, ...requests]);
}

export function getWorkflowRequestById(requestId: string) {
  return readStorage().find((request) => request.id === requestId) ?? null;
}

export function updateWorkflowRequest(
  requestId: string,
  nextStatus: WorkflowStatus,
  title: string,
  detail: string,
) {
  const requests = readStorage();
  const now = new Date();
  const timestamp = formatTimestamp(now);

  const updatedRequests = requests.map((request) => {
    if (request.id !== requestId) {
      return request;
    }

    return {
      ...request,
      currentStatus: nextStatus,
      updatedAt: now.toISOString(),
      timeline: [
        createTimelineEntry(nextStatus, title, detail, timestamp),
        ...request.timeline,
      ],
    };
  });

  writeStorage(updatedRequests);
  return updatedRequests.find((request) => request.id === requestId) ?? null;
}
