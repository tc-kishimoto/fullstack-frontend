import styled from "styled-components";
import mdList from "../../config/mdlist.json"

const ListDiv = styled.div`
    width: 80%;
    margin: 25px;
`

const HeaderDiv = styled.div`
    display: flex;
    background-color: white;
    border-radius: 10px 10px 0 0;
`

const HeaderImg = styled.img`
    height: 120px;
    width: 120px;
    margin: 10px;
`

const HeaderTitle = styled.h2`
    color: #006ef1;
    margin: auto;
`

const PageLinkDiv = styled.div`
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const PageLinkBorder = styled.div`
    width: 300px;
    height: auto;
    background-color: white;
    border: solid #eee;
    border-radius: 10px;
    margin: 10px;
    padding: 15px;
`

const PageLink = styled.a`
    text-decoration: none;
`

function ListMain(props) {
    const categoryName = props.categoryName;
    const contents = mdList.contents[categoryName];

    const PageList = contents.map(c => {
        return (
            <PageLinkBorder>
                <PageLink href={`/contents/${categoryName}/${c}`}>{ c }</PageLink>
            </PageLinkBorder>
        )
    })

    const ListHeader = () => {
        return (
            <HeaderDiv>
                <HeaderImg src={`${process.env.PUBLIC_URL}/images/index/${categoryName}.png`} />
                <div>
                    <HeaderTitle>{ categoryName }</HeaderTitle>
                    <p>カテゴリの説明</p>
                </div>
            </HeaderDiv>
        )
    }

    return (
        <ListDiv>
            <ListHeader />
            <hr />
            <PageLinkDiv>
                { PageList }
            </PageLinkDiv>
        </ListDiv>
    )
}

export default ListMain;