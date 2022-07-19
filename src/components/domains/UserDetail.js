import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from '../../service/axios';
import FetchData from './FetchData';

const UserDetail = () => {

  const axios = useAxios();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState('1');
  const [data, setData] = useState({});

  return (
    <>
    <h3>{data.name}</h3>
    <TabContext value={tabValue}>
        <TabList aria-label="basic tabs example" onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="演習提出" value="2" />
          <Tab label="テスト結果" value="3" />
          <Tab label="日報" value="4" />
        </TabList>
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
        endpoint={'getUser'}
      />
    </>
  )
}

export default UserDetail;