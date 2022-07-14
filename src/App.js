import Index from './pages/Index';
import Contents from './pages/Contents';
import CategoryList from './pages/CategoryList';
import Header from './components/domains/Header';
import Search from './pages/Search';
import Login from './pages/Login'; 
import MyPage from './pages/MyPage';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  RecoilRoot,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <Header />
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
                  element={<Search />}>
          </Route>
          <Route path="/login" 
                  element={<Login />}>
          </Route>
          <Route path="/mypage"
                  element={<MyPage />}>
          </Route>
          <Route path="/mypage/:menu"
                  element={<MyPage />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
