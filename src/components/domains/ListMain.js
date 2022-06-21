import styled from "styled-components";
import mdList from "../../config/mdlist.json"
import Link from '@mui/material/Link';

const ListDiv = styled.div`
    width: 80%;
    margin: 25px;
`

const HeaderDiv = styled.div`
    display: flex;
    background-color: white;
    border-radius: 10px 10px 0 0;
    color: #333333;
`

const HeaderImg = styled.img`
    height: 120px;
    width: 120px;
    margin: 10px;
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

function ListMain(props) {
    const categoryName = props.categoryName;
    const contents = mdList.contents[categoryName];

    const PageList = contents.map(c => {
        return (
            <PageLinkBorder>
                <Link underline="hover" href={`/contents/${categoryName}/${c}`}>{ c }</Link>
            </PageLinkBorder>
        )
    })

    const ListHeader = () => {
        return (
            <HeaderDiv>
                <HeaderImg src={`${process.env.PUBLIC_URL}/images/index/${categoryName}.png`} />
                <div>
                    <h2>{ categoryName }</h2>
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