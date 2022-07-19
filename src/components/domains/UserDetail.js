import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from '../../service/axios';
import UserTab from "./UserTab";

const UserDetail = () => {

  const { id } = useParams();

  return (
    <UserTab
      id={id}
      users={[]}
      endpoint={'getUser'}
      isUserDisp={false}
    />
  )
}

export default UserDetail;