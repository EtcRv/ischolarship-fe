import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { HomePage, LoginPage, RegisterPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      {routes.map((route, idx) => {
        const Page = route.component;
        return <Route key={idx} path={route.path} element={<Page />} />;
      })}
    </Routes>
  );
}

export default App;
