import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ScrollTop from "../components/domains/ScrollTop";

const Img = styled.img`
    width: 30px;
    height: 30px;
    position: relative;
    top: 7px;
    margin-right: 10px;
`

function Search() {
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1);
    const [lineNum, setLineNum] = useState(20);

    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    const params = new URLSearchParams();
    params.append('keyword', query2.get('q'));

    useEffect(() => {
      const fetchDate = async () => {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/searchContent`, {
            params: params,
        });
        setResult(result.data);
      };
      
      fetchDate();
    }, [])

    return(
      <Container maxWidth="md">
          <div>{result.slice((page - 1) * lineNum, (page * lineNum)).map(e => {
            return (
              <div key={e.link}>
                <Img src={e.img_path}/>
                <Link href={e.link} underline="hover">{e.link_title}</Link>
                <p>{e.explanation}</p>
                <hr/>
              </div>
            );
          })}
          </div>
          <Stack spacing={2}>
            <Pagination count={Math.ceil(result.length / lineNum)} color="primary" onChange={(e, page) => setPage(page)} />
          </Stack>
        <ScrollTop/>
      </Container>
    );

}

export default Search;
