import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  GitBranch,
  SearchCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { overviewMetrics, recentRequests } from "../data/mockData";
import type { WorkflowRequest } from "../types/workflow";
import { getStoredRequests } from "../utils/workflowStorage";

export function HomePage() {
  const [savedRequests, setSavedRequests] = useState<WorkflowRequest[]>([]);

  useEffect(() => {
    setSavedRequests(getStoredRequests().slice(0, 3));
  }, []);

  const requestsToShow =
    savedRequests.length > 0
      ? savedRequests.map((request) => ({
          id: request.id,
          requester: request.variables.requesterName,
          type: request.variables.requestType,
          status: request.currentStatus,
          updated: new Date(request.updatedAt).toLocaleString(),
        }))
      : recentRequests;

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.25),_transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
            Workflow Learning App
          </p>
          <h3 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white">
            Teach request submission, approvals, tasks, and BPMN process flow in one place.
          </h3>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            This demo frontend mirrors the shape of a Camunda-style workflow product so learners
            can understand how data enters a process, where human tasks wait, and how status moves
            across the lifecycle.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/submit-request"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-slate-950"
            >
              Start a Request <ArrowRight size={18} />
            </Link>
            <Link
              to="/process-view"
              className="rounded-2xl border border-white/15 px-5 py-3 font-medium text-white"
            >
              Explore Process View
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-lg font-semibold text-white">What learners should notice</p>
          <div className="mt-6 space-y-4">
            {[
              {
                icon: ClipboardCheck,
                title: "Request Intake",
                text: "Forms create the initial process variables and business context.",
              },
              {
                icon: SearchCheck,
                title: "Task Visibility",
                text: "User tasks represent work waiting on people, teams, or approvals.",
              },
              {
                icon: GitBranch,
                title: "Routing Logic",
                text: "Gateways explain why processes branch to different outcomes.",
              },
              {
                icon: BookOpen,
                title: "Monitoring",
                text: "Dashboards reveal cycle time, queue health, and stuck requests.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-3">
                  <item.icon className="text-emerald-300" size={18} />
                  <p className="font-medium text-white">{item.title}</p>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <div key={metric.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500">{metric.detail}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Recent Mock Requests</h3>
            <p className="mt-1 text-sm text-slate-400">
              Example requests to connect submission, process status, and user tasks.
            </p>
          </div>
          <Link to="/dashboard" className="text-sm font-medium text-emerald-300">
            View dashboard
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left">
            <thead className="bg-white/5 text-sm text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Request ID</th>
                <th className="px-4 py-3 font-medium">Requester</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Current Step</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/40 text-sm text-slate-200">
              {requestsToShow.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-4 font-medium text-white">{request.id}</td>
                  <td className="px-4 py-4">{request.requester}</td>
                  <td className="px-4 py-4">{request.type}</td>
                  <td className="px-4 py-4">
                    {savedRequests.length > 0 ? (
                      <Link to={`/requests/${request.id}`} className="text-emerald-300 hover:text-emerald-200">
                        {request.status}
                      </Link>
                    ) : (
                      request.status
                    )}
                  </td>
                  <td className="px-4 py-4 text-slate-400">{request.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
