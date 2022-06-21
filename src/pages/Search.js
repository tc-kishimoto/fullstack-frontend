import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const Img = styled.img`
    width: 30px;
    height: 30px;
    position: relative;
    top: 7px;
    margin-right: 10px;
`

function Search() {
    const [result, setResult] = useState([]);

    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    const params = new URLSearchParams;
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
          <Box sx={{ bgcolor: 'aliceblue', p: '20px', }} >
            <div>{result.map(e => {
              return (
                  <div>
                      <Img src={e.img_path}/>
                      <Link href={e.link} underline="hover">{e.link_title}</Link>
                      <p>{e.explanation}</p>
                      <hr/>
                  </div>
              );
            })}
            </div>
          </Box>
        </Container>
    );

}

export default Search;
