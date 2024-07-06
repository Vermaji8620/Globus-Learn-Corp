import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import Questions from "./pages/Questions";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Header /><Dashboard /></>} />
      <Route path="/login" element={<><Header /><Login /></>} />
      <Route path="/signup" element={<><Header /><Signup /></>} />
      <Route path="/quizlist/:courseId" element={<><Header /><Questions /></>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
