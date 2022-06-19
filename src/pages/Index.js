import News from "../components/domains/News";
import CategoryCard from "../components/domains/CategoryCard"

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
            {category}
        </div>
    );
}

export default Index;