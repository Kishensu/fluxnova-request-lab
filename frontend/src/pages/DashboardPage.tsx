import { Activity, AlertTriangle, BarChart3, TimerReset } from "lucide-react";
import { dashboardPanels, overviewMetrics, recentRequests } from "../data/mockData";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric, index) => {
          const icons = [Activity, TimerReset, BarChart3, AlertTriangle];
          const Icon = icons[index];

          return (
            <div key={metric.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{metric.label}</p>
                <Icon size={18} className="text-emerald-300" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-500">{metric.detail}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Monitoring Panels</h3>
          <p className="mt-1 text-sm text-slate-400">
            Mock monitoring widgets that map to common workflow operations needs.
          </p>

          <div className="mt-6 grid gap-4">
            {dashboardPanels.map((panel) => (
              <div key={panel.title} className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm text-slate-400">{panel.title}</p>
                <p className="mt-2 text-lg font-semibold text-white">{panel.value}</p>
                <p className="mt-2 text-sm text-slate-500">{panel.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <div className="mt-6 space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="rounded-[24px] border border-white/10 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{request.id}</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {request.updated}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{request.type}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {request.requester} currently in <span className="text-slate-200">{request.status}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
