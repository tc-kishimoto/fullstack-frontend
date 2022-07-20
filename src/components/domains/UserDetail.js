import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from '../../service/axios';
import UserTab from "./UserTab";

const UserDetail = () => {

  const { id } = useParams();
  useEffect(() => {

  }, [])

  return (
    <UserTab
      id={id}
      users={[]}
      endpoint={'getUser'}
      isUserDisabled={true}
      submissionParams={{params: {user_id: id}}}
    />
  )
}

export default UserDetail;