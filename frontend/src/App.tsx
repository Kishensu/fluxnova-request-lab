import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { ProcessViewPage } from "./pages/ProcessViewPage";
import { RequestDetailPage } from "./pages/RequestDetailPage";
import { SubmitRequestPage } from "./pages/SubmitRequestPage";
import { TaskInboxPage } from "./pages/TaskInboxPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/submit-request" element={<SubmitRequestPage />} />
          <Route path="/requests/:requestId" element={<RequestDetailPage />} />
          <Route path="/task-inbox" element={<TaskInboxPage />} />
          <Route path="/process-view" element={<ProcessViewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
