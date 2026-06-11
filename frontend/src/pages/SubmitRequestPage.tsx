import { FileText, SendHorizontal, ShieldCheck } from "lucide-react";
import { requestTemplates } from "../data/mockData";

export function SubmitRequestPage() {
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

        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Requester Name</span>
            <input
              defaultValue="Nina Brooks"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Request Type</span>
            <select className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none">
              {requestTemplates.map((template) => (
                <option key={template.type}>{template.type}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-slate-300">Business Justification</span>
            <textarea
              rows={5}
              defaultValue="Need budget approval for a customer workshop in Toronto next month."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Department</span>
            <input
              defaultValue="Marketing"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Estimated Cost</span>
            <input
              defaultValue="$3,200"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950"
            >
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
            <li>Request type can drive different approval paths later.</li>
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
