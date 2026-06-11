import { ArrowDown, Diamond, Play, UserCircle2 } from "lucide-react";
import { processSteps } from "../data/mockData";

const stepIcon = {
  Event: Play,
  "Service Task": Diamond,
  "User Task": UserCircle2,
  "Exclusive Gateway": Diamond,
};

export function ProcessViewPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div>
          <h3 className="text-xl font-semibold text-white">BPMN-Style Step Flow</h3>
          <p className="mt-1 text-sm text-slate-400">
            A simplified teaching view of how a request travels through a process model.
          </p>
        </div>

        <div className="mt-6">
          {processSteps.map((step, index) => {
            const Icon = stepIcon[step.type as keyof typeof stepIcon] ?? Play;

            return (
              <div key={step.name} className="flex flex-col items-center">
                <div className="w-full rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-lg font-semibold text-white">{step.name}</p>
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                            {step.type}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                      </div>
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

                {index < processSteps.length - 1 ? (
                  <div className="flex h-10 items-center text-slate-600">
                    <ArrowDown size={20} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Current Instance</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>
              <span className="text-slate-200">Instance ID:</span> PI-90021
            </p>
            <p>
              <span className="text-slate-200">Request Type:</span> Budget Approval
            </p>
            <p>
              <span className="text-slate-200">Current Step:</span> Manager Approval
            </p>
            <p>
              <span className="text-slate-200">Next Decision:</span> Approved or rejected
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Teaching Notes</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>User tasks pause the process until a person acts.</li>
            <li>Gateways use process variables to choose the next path.</li>
            <li>End events mark a business outcome like completed or rejected.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
