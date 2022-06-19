import { marked } from "marked";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import mdList from "../config/mdlist.json";
import ScrollTop from "../components/domains/ScrollTop";
import Meter from "../components/domains/Meter";
import TopBar from "../components/domains/TopBar";

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

const Link = styled.a`
    color: #006ef1;
    position: relative;
    display: inline-block;
    transition: .3s;
    text-decoration: none;
`

const Main = styled.div`
    display: flex;
    justify-content: center;
`

function SideMenu(props) {
    const categoryName = props.categoryName;
    const contents = props.contents;
    const items = contents.map(e => {
        return (
            <Li>
                <Link href={`/contents/${categoryName}/${e}`}>
                    {e}
                </Link>
            </Li>
        );
    })
    const categories = mdList.categories.map(e => {
        return (
            <Li><Link href={e}>{e}</Link></Li>
        );
    })
    return (
        <SideNav>
            <details open>
                <summary><b>{categoryName}</b></summary>
                <ul>{items}</ul>
            </details>
            <details>
                <summary><b>カテゴリ一覧</b></summary>
                <ul>{categories}</ul>
            </details>
        </SideNav>
    );
}

function Toc(props) {
    const toc = props.toc.map(e => {
        return (
            <Li><Link href={`#${e.level}`} dangerouslySetInnerHTML={{__html: '&nbsp;'.repeat(e.level - 1) + e.title}}></Link>
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
                <ContentDiv dangerouslySetInnerHTML={{__html: html}}/>
                <Toc toc={toc} />
            </Main>
            <Meter/>
        </div>
    );
}

export default Contents;