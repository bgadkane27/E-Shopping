import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-green-400">
      <h4>Header</h4>
      <Routes>
        <Route path="/auth" element={<AppLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
