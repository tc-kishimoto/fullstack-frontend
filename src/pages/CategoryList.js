import styled from "styled-components";
import { useParams } from "react-router-dom";
import ListMenu from "../components/domains/ListMenu";
import ListMain from "../components/domains/ListMain";

const ListDiv = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 24px;
    background-color: aliceblue;
    display: flex;
`

function CategoryList() {

    const { category } = useParams();

    return (
        <ListDiv>
            <ListMenu />
            <ListMain categoryName={`${category}`} />
        </ListDiv>
    )
}

export default CategoryList;