import Index from './pages/Index';
import Contents from './pages/Contents';
import CategoryList from './pages/CategoryList';
import Header from './components/domains/Header';
import Search from './pages/Search';
import Login from './pages/Login'; 
import MyPage from './pages/MyPage';
import CompanyList from './components/domains/CompanyList';
import CourseList from './components/domains/CourseList';
import UserList from './components/domains/UserList';
import UserForm from './components/domains/UserForm';
import CompanyForm from './components/domains/CompanyForm';
import CourseForm from './components/domains/CourseForm';
import MySubmissionList from './components/domains/MySubmissionList';

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
            <Route path="submission" element={<MySubmissionList/>}></Route>
            <Route path="user" element={<UserList/>}></Route>
            <Route path="company" element={<CompanyList/>}></Route>
            <Route path="course" element={<CourseList/>}></Route>
            <Route path="user/:id" element={<UserForm/>}></Route>
            <Route path="company/:id" element={<CompanyForm/>}></Route>
            <Route path="course/:id" element={<CourseForm/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
