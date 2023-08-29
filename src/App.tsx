import { Route, Routes } from "react-router-dom";
import {routes}  from "./routes";

function App() {
  return (
    <Routes>
        {
          routes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route key={idx} path={route.path} element={<Page/>} />
            )
          })
        }
    </Routes>
  );
}

export default App;

