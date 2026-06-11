import { FileText, SendHorizontal, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  requestPriorityOptions,
  requestTemplates,
} from "../data/mockData";
import type { WorkflowFormValues } from "../types/workflow";
import { createWorkflowRequest, saveWorkflowRequest } from "../utils/workflowStorage";

export function SubmitRequestPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<WorkflowFormValues>({
    requesterName: "Nina Brooks",
    requestType: "Budget Approval",
    priority: "High",
    description: "Need budget approval for a customer workshop in Toronto next month.",
    amount: "3200",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newRequest = createWorkflowRequest(formValues);
    saveWorkflowRequest(newRequest);
    navigate(`/requests/${newRequest.id}`);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
            <SendHorizontal size={20} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Mock Request Form</h3>
            <p className="text-sm text-slate-400">
              Demonstrates the business data that starts a workflow instance.
            </p>
          </div>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Requester Name</span>
            <input
              name="requesterName"
              value={formValues.requesterName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Request Type</span>
            <select
              name="requestType"
              value={formValues.requestType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            >
              {requestTemplates.map((template) => (
                <option key={template.type}>{template.type}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Priority</span>
            <select
              name="priority"
              value={formValues.priority}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            >
              {requestPriorityOptions.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Amount or Value</span>
            <input
              name="amount"
              type="number"
              min="0"
              value={formValues.amount}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-slate-300">Description</span>
            <textarea
              name="description"
              rows={5}
              value={formValues.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button type="submit" className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950">
              Submit Mock Request
            </button>
            <button
              type="button"
              className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-white"
            >
              Save as Draft
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <FileText className="text-emerald-300" size={20} />
            <h3 className="text-lg font-semibold text-white">How this teaches BPMN</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>The form fields become example process variables.</li>
            <li>Submission represents the start event for a new workflow.</li>
            <li>Priority and amount can influence later routing decisions.</li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald-300" size={20} />
            <h3 className="text-lg font-semibold text-white">Mock Templates</h3>
          </div>
          <div className="mt-4 space-y-3">
            {requestTemplates.map((template) => (
              <div key={template.type} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="font-medium text-white">{template.type}</p>
                <p className="mt-1 text-sm text-slate-400">{template.purpose}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  Process owner: {template.owner}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
