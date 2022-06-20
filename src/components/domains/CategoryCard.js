import styled from 'styled-components';

const Card = styled.div`
    width: 200px;
    height: 200px;
    margin: 10px;
    background-color: white;
    border: solid #eee;
    border-radius: 10px;
    transition: box-shadow 0.5s ease-out, transform 0.5s ease-out;
    box-shadow: 0 15px 10px 5px rgb(0 0 0 / 0%);
    text-align: center;
`

const Link = styled.a`
    color: #006ef1;
    position: relative;
    display: inline-block;
    text-decoration: none;
`

const H2 = styled.h2`
    margin: 0;
`

const CardImg = styled.img`
    margin: auto;
    width: 128px;
    height: 128px;
`

function CategoryCard(props) {
    const categoryName = props.categoryName;
    return (
        <Link href={`/list/${categoryName}`}>
            <Card>
                <H2>{ categoryName }</H2>
                <CardImg alt={categoryName} src={`${process.env.PUBLIC_URL}/images/index/${categoryName}.png`} />
            </Card>
        </Link>
    );
}

export default CategoryCard;
