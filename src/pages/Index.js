import News from "../components/domains/news";
// import

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