import News from "../components/domains/News";
import CategoryCard from "../components/domains/CategoryCard"
import ContentsCard from "../components/domains/ContentsCard";
import styled from "styled-components";
import mdList from "../config/mdlist.json"

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 24px;
    background-color: aliceblue;
`

const CategoryList = styled.div`
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

function Index() {

    const contents = Object.keys(mdList.contents).map(e => {
        return (
            <ContentsCard 
                categoryName={e} 
                contents={mdList.contents[e]} 
                key={e}
            />
        );
    })

    const category = mdList.categories.map(e => {
        return <CategoryCard 
                    categoryName={e} 
                    key={e}
                />
    })
    return (
        <Container>
            <News news={'osirase'}/>
            <CategoryList>
                {category}
            </CategoryList>
            <hr />
            <CategoryList>
                {contents}
            </CategoryList>
        </Container>
    );
}

export default Index;