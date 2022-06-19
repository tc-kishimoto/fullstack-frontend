import styled from "styled-components";
import { FaBook } from "react-icons/fa";
import mdList from "../../config/mdlist.json";

const BarStyle = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: rgb(176 85 176);
    color: white;
`

const BookLink = styled.a`
    color: white;
    text-decoration: none;
`

const ContentsLink = styled.a`
    margin: 10px;
    color: #006ef1;
    position: relative;
    display: inline-block;
    transition: .3s;
    text-decoration: none;
`

function TopBar(props) {

    const Contents = mdList.categories.map(category => {
        return <div>
            {category}
            <div>
                {mdList.contents[category].map(content => {
                    return (
                        <ContentsLink href={content}>
                            {content}
                        </ContentsLink>
                    );
                })}
                <hr/>
            </div>
        </div>
    })

    return(
        <div>
            <BarStyle>
                <BookLink href="#">
                    <FaBook/>
                </BookLink>
                {props.title}
            </BarStyle>
            {Contents}
        </div>
    );
}

export default TopBar;
