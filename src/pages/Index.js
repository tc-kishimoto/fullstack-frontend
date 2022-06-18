import styled, { keyframes }  from 'styled-components';

const NewsStyle = styled.div`
  padding: 0.5em 1em;
  margin: 0 0 20px 0;
  color:#666;
  background: #ffebe9;
  border-top: solid 5px #ff7d6e;
`

function News(props) {
    return (
        <div>
            お知らせ
            <NewsStyle>
                {props.news}
            </NewsStyle>
        </div>
    );
}

function CategoryCard(props) {
    const categoryName = props.categoryName;
    return (
        <a className="category border" href="#">
            <div className="card">
                <h2>{ categoryName }</h2>
                <img className="ctg_img" alt={categoryName} src={`${process.env.PUBLIC_URL}/images/index/${categoryName}.png`} />
            </div>
        </a>
    );
}

function Index() {
    const categories = [
        "DB",
        "IT基礎",
        "Java1",
        "Java2",
        "JavaScript",
        "JavaScript2",
        "Laravel",
        "oop",
        "PHP",
        "SpringBoot",
        "Web",
        "アルゴリズム",
        "インフラ",
        "グループ開発",
        "個人開発",
        "内定者研修",
        "情報処理",
        "研修関連資料",
        "社会人基礎",
        "開発工程"
    ];
    const category = categories.map(e => {
        return <CategoryCard 
                categoryName={e} 
                key={e}
                />
    })
    return (
        <div>
            <News news={'osirase'}/>
            <p>Fullstack</p>
            <div>
            {category}
            </div>
        </div>
    );
}

export default Index;