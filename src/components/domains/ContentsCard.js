import styled from "styled-components";
import { useState } from "react";

const ContentDiv = styled.div`
    width: 300px;
    height: auto;
    background-color: white;
    border: solid #eee;
    border-radius: 10px;
    margin: 10px;
`

const HeaderDiv = styled.div`
    display: flex;
    background-color: white;
    border-radius: 10px 10px 0 0;
`

const CardImg = styled.img`
    margin: 10px;
    width: 128px;
    height: 128px;
`

const H2 = styled.h2`
    color: #006ef1;
    margin: auto;
`

const HeadLink = styled.a`
    color: #006ef1;
    position: relative;
    display: inline-block;
    text-decoration: none;
`

const ContentLink = styled.a`
    color: #006ef1;
    position: relative;
    display: inline-block;
    transition: .3s;
    text-decoration: none;
`

const DetailDiv = styled.div`
    padding: 0 10px 10px 10px;
    line-height: 1.8;
    overflow: hidden;
`

const MoreBtn = styled.button`
    display: block;
    background-color: #666;
    width: 100px;
    padding: 15px 0;
    border-radius: 4px;
    line-height: 12px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    margin: 10px;
    cursor: pointer;
`

function ContentsCard(props) {

    const [isOpen, setIsOpen] = useState(false);

    const categoryName = props.categoryName;
    const contens =props.contents.map((e, index) => {
        if(isOpen || (!isOpen && index <= 5)) {
            return (
                <p>
                    <ContentLink 
                        href={e}
                        key={e}>
                            {e}
                    </ContentLink>
                </p>
            );
        }
    });
    return(
        <ContentDiv>
            <HeaderDiv>
                <CardImg alt={categoryName} src={`${process.env.PUBLIC_URL}/images/index/${categoryName}.png`} />
                <H2>
                    <HeadLink herf="#">{categoryName}</HeadLink>
                </H2>
            </HeaderDiv>
            <DetailDiv>
                {contens}
            </DetailDiv>
            <MoreBtn onClick={() => setIsOpen(isOpen ? false : true)}>{isOpen ? 'close' : 'open'}</MoreBtn>
        </ContentDiv>
    );
}

export default ContentsCard;