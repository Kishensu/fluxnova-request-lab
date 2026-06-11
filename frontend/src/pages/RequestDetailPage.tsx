import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Circle,
  GitBranch,
  PlayCircle,
  RefreshCcw,
  Variable,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { workflowStepOrder } from "../data/mockData";
import type { WorkflowRequest, WorkflowStatus } from "../types/workflow";
import { getWorkflowRequestById, updateWorkflowRequest } from "../utils/workflowStorage";

type WorkflowAction = {
  label: string;
  nextStatus: WorkflowStatus;
  title: string;
  detail: string;
  icon: typeof ArrowRight;
  enabledStatuses: WorkflowStatus[];
  tone: "primary" | "secondary" | "danger";
};

const workflowActions: WorkflowAction[] = [
  {
    label: "Move to Validation",
    nextStatus: "Validation",
    title: "Validation started",
    detail: "The request moved into automated validation checks.",
    icon: RefreshCcw,
    enabledStatuses: ["Submitted", "Exception"],
    tone: "secondary",
  },
  {
    label: "Approve",
    nextStatus: "Manager Approval",
    title: "Validation passed",
    detail: "The request passed validation and moved to manager review.",
    icon: CheckCircle2,
    enabledStatuses: ["Validation"],
    tone: "primary",
  },
  {
    label: "Reject",
    nextStatus: "Exception",
    title: "Request rejected",
    detail: "The request failed review and moved to exception handling.",
    icon: XCircle,
    enabledStatuses: ["Validation", "Manager Approval"],
    tone: "danger",
  },
  {
    label: "Request More Info",
    nextStatus: "Exception",
    title: "More information required",
    detail: "The process paused while waiting for clarification from the requester.",
    icon: AlertCircle,
    enabledStatuses: ["Validation", "Manager Approval"],
    tone: "secondary",
  },
  {
    label: "Complete",
    nextStatus: "Completed",
    title: "Request completed",
    detail: "The workflow reached its final completed outcome.",
    icon: CheckCircle2,
    enabledStatuses: ["Manager Approval"],
    tone: "primary",
  },
];

function getStatusTone(status: WorkflowStatus) {
  if (status === "Completed") {
    return "bg-emerald-500/15 text-emerald-300";
  }

  if (status === "Exception") {
    return "bg-rose-500/15 text-rose-300";
  }

  if (status === "Manager Approval") {
    return "bg-amber-500/15 text-amber-300";
  }

  return "bg-white/10 text-slate-200";
}

export function RequestDetailPage() {
  const { requestId } = useParams();
  const [request, setRequest] = useState<WorkflowRequest | null>(null);

  useEffect(() => {
    if (!requestId) {
      return;
    }

    setRequest(getWorkflowRequestById(requestId));
  }, [requestId]);

  const stepStates = useMemo(() => {
    if (!request) {
      return [];
    }

    const currentIndex = workflowStepOrder.findIndex(
      (step) => step.key === request.currentStatus,
    );

    return workflowStepOrder.map((step, index) => {
      let state = "Waiting";

      if (step.key === request.currentStatus) {
        state = "Active";
      } else if (index < currentIndex) {
        state = "Completed";
      }

      if (request.currentStatus === "Exception" && step.key === "Manager Approval") {
        state = "Completed";
      }

      return {
        ...step,
        state,
      };
    });
  }, [request]);

  if (!requestId || !request) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl font-semibold text-white">Request not found</h3>
        <p className="mt-2 text-slate-400">
          Submit a new mock request first, then reopen its detail page.
        </p>
        <Link
          to="/submit-request"
          className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-medium text-slate-950"
        >
          Go to Submit Request
        </Link>
      </div>
    );
  }

  const handleAction = (action: WorkflowAction) => {
    const updatedRequest = updateWorkflowRequest(
      request.id,
      action.nextStatus,
      action.title,
      action.detail,
    );

    setRequest(updatedRequest);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{request.id}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {request.variables.requestType}
              </h3>
              <p className="mt-2 max-w-2xl text-slate-400">{request.variables.description}</p>
            </div>
            <span className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusTone(request.currentStatus)}`}>
              {request.currentStatus}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Requester</p>
              <p className="mt-2 font-medium text-white">{request.variables.requesterName}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Priority</p>
              <p className="mt-2 font-medium text-white">{request.variables.priority}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Amount or Value</p>
              <p className="mt-2 font-medium text-white">
                ${request.variables.amount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Last Updated</p>
              <p className="mt-2 font-medium text-white">
                {new Date(request.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <PlayCircle className="text-emerald-300" size={20} />
            <h3 className="text-xl font-semibold text-white">Simulate Workflow</h3>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Use these buttons to move the mock request across BPMN-style states.
          </p>

          <div className="mt-6 grid gap-3">
            {workflowActions.map((action) => {
              const Icon = action.icon;
              const isEnabled = action.enabledStatuses.includes(request.currentStatus);
              const toneClass =
                action.tone === "primary"
                  ? "bg-white text-slate-950"
                  : action.tone === "danger"
                    ? "border border-rose-400/30 bg-rose-500/10 text-rose-200"
                    : "border border-white/10 bg-slate-950/70 text-white";

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => handleAction(action)}
                  disabled={!isEnabled}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    isEnabled ? toneClass : "cursor-not-allowed border border-white/10 bg-white/5 text-slate-600"
                  }`}
                >
                  <span>{action.label}</span>
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <GitBranch className="text-emerald-300" size={20} />
            <h3 className="text-xl font-semibold text-white">Mock BPMN Steps</h3>
          </div>

          <div className="mt-6 space-y-4">
            {stepStates.map((step) => (
              <div key={step.label} className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold text-white">{step.label}</p>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                        {step.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-2 text-sm ${
                      step.state === "Completed"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : step.state === "Active"
                          ? "bg-amber-500/15 text-amber-300"
                          : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {step.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <Variable className="text-emerald-300" size={20} />
              <h3 className="text-xl font-semibold text-white">Variables Panel</h3>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              {Object.entries(request.variables).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"
                >
                  <span className="text-slate-400">{key}</span>
                  <span className="text-right font-medium text-white">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white">Process Timeline</h3>
            <div className="mt-6 space-y-4">
              {request.timeline.map((entry) => (
                <div key={entry.id} className="flex gap-3">
                  <div className="pt-1 text-emerald-300">
                    {entry.status === "Completed" ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-slate-950/50 p-4 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-white">{entry.title}</p>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{entry.detail}</p>
                    <p className="mt-2 text-xs text-slate-500">Status: {entry.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
