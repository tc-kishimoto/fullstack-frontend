import { marked } from "marked";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

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
    renderer.heading = (text, level) => {
        count++;
        // const slug = encodeURI(text.toLowerCase())
        // this.toc.push({
        //     level: level,
        //     slug: slug,
        //     title: text
        // })
        return `<h${level} id="${count}">${text}</h${level}>\n`
    }
    renderer.link = (href, title, text) => {
        return `<a href="${href}" target="_blank">${text}</a>`;
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

    return <div dangerouslySetInnerHTML={{__html: marked.parse(content)}}/>;
}

export default Contents;