import Index from './pages/Index';
import Contents from './pages/Contents';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />}>
      </Route>
      <Route path="/contents" element={<Contents />}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
