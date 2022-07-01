import News from "../components/domains/News";
import CategoryCardList from "../components/domains/CategoryCardList";
import styled from "styled-components";

const Container = styled.div`
    margin: 0 auto;
    padding: 24px;
`

function Index() {

    return (
        <Container>
            <News news={'osirase'}/>
            <CategoryCardList></CategoryCardList>
        </Container>
    );
}

export default Index;