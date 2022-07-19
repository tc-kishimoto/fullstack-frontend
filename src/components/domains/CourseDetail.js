import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from '../../service/axios';
import UserTab from "./UserTab";

const CourseDetail = () => {

  const axios = useAxios();
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get('/getCourseUsers/' + id);
      setUsers(result.data);
    }
    fetchDate();
  }, []);

  return (
    <UserTab
      id={id}
      users={users}
      endpoint={'getCourse'}
    />
  )
}

export default CourseDetail;

