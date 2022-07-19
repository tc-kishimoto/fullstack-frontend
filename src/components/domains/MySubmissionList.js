import { useEffect, useState } from "react";
import { useAxios } from '../../service/axios';
import SubmissionDataGrid from './SubmittionDataGrid';

const MySubmissionList = () => {

  const axios = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get('/getMySubmissions');
      setData(result.data);
    };
    fetchDate();
  }, [])

  return (
    <SubmissionDataGrid 
      data={data}
    />
  )
}

export default MySubmissionList;