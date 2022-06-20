import Index from './pages/Index';
import Contents from './pages/Contents';
import CategoryList from './pages/CategoryList';
import Header from './components/domains/Header';
import SearchResult from './pages/SearchResult';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
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
          <Route path="/search" 
                  element={<SearchResult />}>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
