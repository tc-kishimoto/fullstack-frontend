import { useAxios } from "../service/axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ScrollTop from "../components/domains/ScrollTop";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

const Img = styled.img`
    width: 30px;
    height: 30px;
    position: relative;
    top: 7px;
    margin-right: 10px;
`

function Search() {
  const search = useLocation().search;
  const query2 = new URLSearchParams(search);
  
  
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [lineNum, setLineNum] = useState(20);
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState(query2.get('q'));
  const axios = useAxios();
  
  useEffect(() => {
      const params = new URLSearchParams();
      params.append('keyword', keyword);
      const fetchDate = async () => {
        const result = await axios.get('/searchContent', {
            params: params,
        });
        setResult(result.data);
      };
      
      fetchDate();
    }, [keyword])

    return(
      <Container sx={{p: 2}} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={10}>
          <FormControl fullWidth>
            <TextField 
              id="search-text" 
              label="検索キーワード" 
              variant="outlined" 
              size="small" 
              onChange={e => setText(e.target.value)}
              defaultValue={keyword}
            />
          </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="secondary" onClick={() => setKeyword(text)}><SearchIcon /></Button>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="disp-num-label">表示件数</InputLabel>
              <Select
                labelId="disp-num"
                id="disp-num"
                value={lineNum}
                label="表示件数"
                size="small"
                onChange={e => setLineNum(e.target.value)}
              >
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <hr />
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
