import { ArrowRight, GitBranch, LayoutDashboard, Send, Workflow } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-sm text-emerald-400">Fluxnova Request Lab</p>
            <h1 className="text-2xl font-semibold">BPMN Workflow Learning App</h1>
          </div>
          <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950">
            Start Demo
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-8 py-12">
        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-5xl font-bold leading-tight">
              Learn workflow automation by building a real approval process.
            </h2>
            <p className="mt-5 text-lg text-slate-300">
              Submit a request, validate it, route approvals, handle exceptions,
              and monitor the process using React + Fluxnova.
            </p>

            <div className="mt-8 flex gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-950">
                Submit Request <ArrowRight size={18} />
              </button>
              <button className="rounded-xl border border-white/15 px-5 py-3 font-medium">
                View Process
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Workflow className="text-emerald-400" />
              <h3 className="text-xl font-semibold">Process Flow</h3>
            </div>

            <div className="space-y-4">
              {[
                "Submit Request",
                "Validate Details",
                "Manager Approval",
                "Exception Handling",
                "Complete / Reject",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center justify-between rounded-2xl bg-slate-900 p-4"
                >
                  <div>
                    <p className="text-sm text-slate-400">Step {index + 1}</p>
                    <p className="font-medium">{step}</p>
                  </div>
                  <GitBranch className="text-slate-500" size={20} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Send,
              title: "Request Intake",
              text: "Capture request details and start a BPMN process instance.",
            },
            {
              icon: GitBranch,
              title: "Workflow Routing",
              text: "Use gateways, tasks, variables, and approval decisions.",
            },
            {
              icon: LayoutDashboard,
              title: "Monitoring",
              text: "Track process status, pending tasks, and cycle time.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <item.icon className="mb-4 text-emerald-400" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;