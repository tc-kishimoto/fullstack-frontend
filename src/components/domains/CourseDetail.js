import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FetchData from './FetchData';
import UserDataGrid from './UserDataGrid';
import { useAxios } from '../../service/axios';

const CourseDetail = () => {

  const axios = useAxios();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState('1')
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get('/getCourseUsers/' + id);
      setUsers(result.data);
    }
    fetchDate();
  }, []);

  return (
    <>
    <h3>{data.name}</h3>
      <TabContext value={tabValue}>
        <TabList aria-label="basic tabs example" onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="ユーザー一覧" value="1" />
          <Tab label="演習提出" value="2" />
          <Tab label="テスト結果" value="3" />
          <Tab label="日報" value="4" />
        </TabList>
        <TabPanel value="1">
          <UserDataGrid 
            data={users}
          />
        </TabPanel>
        <TabPanel value="2">
          lesson
        </TabPanel>
        <TabPanel value="3">
          test
        </TabPanel>
        <TabPanel value="4">
          dayly
        </TabPanel>
      </TabContext>
      <FetchData
        id={id}
        setData={setData}
        endpoint={'getCourse'}
      />
    </>
  )
}

export default CourseDetail;

