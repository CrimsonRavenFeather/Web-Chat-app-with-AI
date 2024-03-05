import Home from "./Componet/Home";
import Login from "./Componet/Login";
import Navbar from "./Componet/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { LoginInfoProvider } from "./Context/LogInContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function App() {

  return (
    <>
      <LoginInfoProvider>
        <Router>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {/* <Skeleton count={3} /> */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </SkeletonTheme>
        </Router>
      </LoginInfoProvider>
    </>
  );
}

export default App;
