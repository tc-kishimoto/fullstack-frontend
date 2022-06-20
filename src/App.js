import Index from './pages/Index';
import Contents from './pages/Contents';
import CategoryList from './pages/CategoryList';
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
      <Route path="/contents/:category/:contentName" 
              element={<Contents />}>
      </Route>
      <Route path="/list/:category" 
              element={<CategoryList />}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
