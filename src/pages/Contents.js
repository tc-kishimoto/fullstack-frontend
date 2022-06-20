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

const Li = styled.li`
    list-style-type: none;
`

const Main = styled.div`
    display: flex;
    justify-content: center;
`



function Toc(props) {
    const toc = props.toc.map(e => {
        return (
            <Li><Link underline="hover" href={`#${e.level}`} dangerouslySetInnerHTML={{__html: '&nbsp;'.repeat(e.level - 1) + e.title}}></Link>
            </Li>
        );
    });

    return (
        <SideNav><ul>{toc}</ul></SideNav>
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
                        table: Table}} children={content}/>
                    <hr/>
                    <SubmissionForm/>
                </ContentDiv>
                {/* <Toc toc={toc} /> */}
            </Main>
            <Meter/>
        </div>
    );
}

export default Contents;