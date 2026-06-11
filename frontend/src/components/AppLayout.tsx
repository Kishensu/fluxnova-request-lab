import {
  Activity,
  ClipboardList,
  Gauge,
  GitBranch,
  Home,
  Menu,
  Send,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navigation = [
  { to: "/", label: "Home", icon: Home },
  { to: "/submit-request", label: "Submit Request", icon: Send },
  { to: "/task-inbox", label: "Task Inbox", icon: ClipboardList },
  { to: "/process-view", label: "Process View", icon: GitBranch },
  { to: "/dashboard", label: "Dashboard", icon: Gauge },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Workflow Learning Workspace",
    subtitle: "Explore the full request-to-completion lifecycle with mock BPMN data.",
  },
  "/submit-request": {
    title: "Submit Request",
    subtitle: "Teach how business data starts a new process instance.",
  },
  "/task-inbox": {
    title: "Task Inbox",
    subtitle: "Review pending human tasks and ownership states.",
  },
  "/process-view": {
    title: "Process View",
    subtitle: "Follow the BPMN path, gateways, approvals, and outcomes.",
  },
  "/dashboard": {
    title: "Workflow Dashboard",
    subtitle: "Monitor volume, bottlenecks, and SLA health across requests.",
  },
};

export function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activePage = pageMeta[location.pathname] ?? pageMeta["/"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-slate-950/95 px-5 py-6 backdrop-blur transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                Fluxnova Lab
              </p>
              <h1 className="mt-2 text-xl font-semibold text-white">
                Workflow Academy
              </h1>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 p-2 text-slate-400 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-8 rounded-3xl border border-emerald-500/10 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-300">Learning Goal</p>
                <p className="text-sm font-medium text-white">
                  Understand tasks, gateways, and status tracking
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-slate-950"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-white">BPMN Concepts</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>Start events begin the request journey.</li>
              <li>User tasks wait for human action.</li>
              <li>Gateways branch approval logic.</li>
              <li>Dashboards expose process health.</li>
            </ul>
          </div>
        </aside>

        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar backdrop"
          />
        ) : null}

        <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 p-2 text-slate-300 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu size={18} />
                </button>
                <div>
                  <p className="text-sm text-slate-400">{activePage.subtitle}</p>
                  <h2 className="text-2xl font-semibold text-white">
                    {activePage.title}
                  </h2>
                </div>
              </div>

              <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 md:block">
                Demo mode: mock workflow data only
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
