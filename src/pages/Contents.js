import { marked } from "marked";
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

const ContentDiv = styled.div`
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
    
    const renderer = new marked.Renderer()
    let count = 0;
    const toc = [];
    renderer.heading = (text, level) => {
        count++;
        const slug = encodeURI(text.toLowerCase())
        toc.push({
            level: level,
            slug: slug,
            title: text
        })
        return `<h${level} id="${count}">${text}</h${level}>\n`
    }
    renderer.link = (href, title, text) => {
        return `<a href="${href}" target="_blank">${text}</a>`;
    }
    renderer.img = (href, title, text) => {
        return `<img src="${process.env.PUBLIC_URL}/${href}" alt="${text}" />`
    }

    marked.setOptions({
        renderer: renderer, 
        gfm: true,
        breaks: true,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    const html = marked.parse(content)

    return (
        <div>
            <TopBar title={contentName}/>
            <ScrollTop/>
            <Main>
                <SideMenu 
                    categoryName={category} 
                    contents={mdList.contents[category]} 
                />
                <div>
                    <ContentDiv dangerouslySetInnerHTML={{__html: html}}/>
                    <hr/>
                    <SubmissionForm/>
                </div>
                <Toc toc={toc} />
            </Main>
            <Meter/>
        </div>
    );
}

export default Contents;