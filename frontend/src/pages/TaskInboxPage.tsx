import { Clock3, UserCheck } from "lucide-react";
import { inboxTasks } from "../data/mockData";

export function TaskInboxPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Tasks Waiting", value: "11", note: "Human tasks ready for action" },
          { label: "Unclaimed", value: "5", note: "Good example of queue-based work" },
          { label: "Due Today", value: "2", note: "Used to teach urgency and SLA risk" },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-500">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Pending User Tasks</h3>
            <p className="mt-1 text-sm text-slate-400">
              Mock inbox for learning assignment, claiming, and approval work.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
            Current view: My team queue
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {inboxTasks.map((task) => (
            <article
              key={task.id}
              className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-white">{task.title}</p>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                      {task.id}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{task.process}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 px-3 py-2">
                    Priority: {task.priority}
                  </div>
                  <div className="rounded-2xl border border-white/10 px-3 py-2">
                    Status: {task.status}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <UserCheck size={16} />
                    {task.assignee}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={16} />
                    Due {task.due}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-white"
                  >
                    Claim Task
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950"
                  >
                    Open Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
