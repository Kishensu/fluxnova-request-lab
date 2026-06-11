export const overviewMetrics = [
  { label: "Active Requests", value: "24", detail: "8 waiting for approval" },
  { label: "Pending User Tasks", value: "11", detail: "Across finance and ops" },
  { label: "Average Cycle Time", value: "2.4 days", detail: "Mock training metric" },
  { label: "SLA At Risk", value: "3", detail: "Needs follow-up today" },
];

export const requestTemplates = [
  {
    type: "Access Request",
    purpose: "Provision a tool or system for a teammate.",
    owner: "IT Operations",
  },
  {
    type: "Budget Approval",
    purpose: "Route spend for manager and finance review.",
    owner: "Finance",
  },
  {
    type: "Vendor Onboarding",
    purpose: "Collect due diligence and contract checks.",
    owner: "Procurement",
  },
];

export const inboxTasks = [
  {
    id: "TASK-201",
    title: "Manager approval for laptop upgrade",
    assignee: "Ava Patel",
    priority: "High",
    due: "Today",
    process: "Hardware Request",
    status: "Awaiting approval",
  },
  {
    id: "TASK-202",
    title: "Review budget notes for marketing event",
    assignee: "Jordan Kim",
    priority: "Medium",
    due: "Tomorrow",
    process: "Budget Approval",
    status: "Needs clarification",
  },
  {
    id: "TASK-203",
    title: "Validate vendor compliance documents",
    assignee: "Sam Rivera",
    priority: "Low",
    due: "Jun 14",
    process: "Vendor Onboarding",
    status: "Ready to claim",
  },
];

export const processSteps = [
  {
    name: "Start Event",
    type: "Event",
    state: "Completed",
    description: "A user submits a request form to create a process instance.",
  },
  {
    name: "Validate Request",
    type: "Service Task",
    state: "Completed",
    description: "Mock validation checks required fields and business rules.",
  },
  {
    name: "Manager Approval",
    type: "User Task",
    state: "Active",
    description: "A manager reviews cost, urgency, and justification.",
  },
  {
    name: "Approval Gateway",
    type: "Exclusive Gateway",
    state: "Waiting",
    description: "Routes the process to fulfillment or rejection path.",
  },
  {
    name: "Complete Request",
    type: "End Event",
    state: "Waiting",
    description: "Ends the process after the final business outcome.",
  },
];

export const dashboardPanels = [
  {
    title: "Requests by Stage",
    value: "6 intake / 11 approval / 7 completed",
    note: "Shows where work is waiting in the process.",
  },
  {
    title: "Task Ownership",
    value: "5 unclaimed / 4 finance / 2 managers",
    note: "Useful for teaching task assignment and queues.",
  },
  {
    title: "Escalation Watch",
    value: "3 requests close to SLA breach",
    note: "Highlights how monitoring supports operations teams.",
  },
];

export const recentRequests = [
  {
    id: "REQ-1048",
    requester: "Nina Brooks",
    type: "Budget Approval",
    status: "Manager Approval",
    updated: "5 min ago",
  },
  {
    id: "REQ-1047",
    requester: "Chris Wang",
    type: "Vendor Onboarding",
    status: "Compliance Review",
    updated: "21 min ago",
  },
  {
    id: "REQ-1046",
    requester: "Leah Gomez",
    type: "Access Request",
    status: "Completed",
    updated: "1 hour ago",
  },
];
