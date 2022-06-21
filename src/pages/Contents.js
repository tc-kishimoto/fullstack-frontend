import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import mdList from "../config/mdlist.json";
import ScrollTop from "../components/domains/ScrollTop";
import Meter from "../components/domains/Meter";
import TopBar from "../components/domains/TopBar";
import SubmissionForm from "../components/domains/SubmissionForm";
import Link from '@mui/material/Link';
import SideMenu from "../components/domains/SideMenu";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { marked } from "marked";
import List from '@mui/material/List';

const ContentDiv = styled.div`
    width: 60%;
    padding: 24px;
    margin: 0 10px;
    background-color: aliceblue;
    font-family: "メイリオ", "Meiryo", "Yu Gothic", "YakuHanJPs", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
`

const SideNav = styled.nav`
    background-color: aliceblue;
    width: 300px;
    height: fit-content;
    position: sticky;
    top: 30px;
    overflow: auto;
    max-height: 100vh;
`

const Main = styled.div`
    display: flex;
    justify-content: center;
`

const Image = styled.img`
    max-width: 100%;
    border: 1px solid blue;
`


function Toc(props) {
    const heading = marked.lexer(props.content).filter(token => token.type === 'heading')
    return (
        <SideNav>
            <List>
                {heading.map(e => {
                    const linkStyle = {marginLeft: ((e.depth - 1) * 10) + 'px'}
                    return (
                        <li>
                            <Link href={`#${e.text}`} underline="hover" style={linkStyle}>
                                {e.text}
                            </Link>
                        </li>
                    );
                })}
            </List>
        </SideNav>
    );

}

function Contents() {

    const [content, setContent] = useState('');
    
    const { category, contentName } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
            `/markdowns/${category}/${contentName}.md`,
            );

            setContent(result.data);
        };

        fetchData();
    }, []);
    
    return (
        <div>
            <TopBar title={contentName}/>
            <ScrollTop/>
            <Main>
                <SideMenu 
                    categoryName={category} 
                    contents={mdList.contents[category]} 
                />
                <ContentDiv>
                    {/* <div dangerouslySetInnerHTML={{__html: html}}/> */}
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={okaidia}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              />
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            )
                          }
                        ,
                        a({node, inline, className, children, ...props}){ 
                            return (<Link underline="hover" target="_blank" {...props}>{children}</Link>)},
                        h1({node, inline, className, children}){return (<h1 id={children}>{children}</h1>)},
                        h2({node, inline, className, children}){return (<h2 id={children}>{children}</h2>)},
                        h3({node, inline, className, children}){return (<h3 id={children}>{children}</h3>)},
                        img: Image,
                        table: Table, 
                        tr: TableRow, 
                        thead: TableHead, 
                        tbody: TableBody,
                        td: TableCell
                        }} children={content}/>
                    <hr/>
                    <SubmissionForm/>
                </ContentDiv>
                <Toc content={content} />
            </Main>
            <Meter/>
        </div>
    );
}

export default Contents;