import News from "../components/domains/News";
import CategoryCard from "../components/domains/CategoryCard"
import ContentsCard from "../components/domains/ContentsCard";

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

    const contentsList = {
        "contents": {
            "DB": [
                "01_DBMS概要",
                "02_MySQLの導入",
                "03_PostgreSQLの導入",
                "04_SQL入門",
                "05_SQL応用",
                "06_DBMSの機能",
                "07_DB設計",
                "08_GUIツールの導入",
                "09_SQL実践編",
                "10_インデックス",
                "11_実行計画",
                "12_NoSQL",
                "13_MongoDB",
                "14_MySQLのストアドプロシージャ",
                "単元課題",
                "単元課題1",
                "単元課題2",
                "演習問題",
                "演習問題1-模範解答",
                "演習問題1",
                "演習問題2-模範解答",
                "演習問題2",
                "演習問題3",
                "演習問題4",
                "練習問題",
                "練習問題1-模範解答",
                "練習問題1",
                "練習問題2-模範解答",
                "練習問題2",
                "練習問題3-模範解答",
                "練習問題3",
                "練習問題4-模範解答",
                "練習問題4",
                "練習問題5",
                "練習問題6",
                "練習問題7",
                "練習問題8-模範解答",
                "練習問題8",
                "練習問題9"
            ],
            "IT基礎": [
                "Excel_00_実習",
                "Excel_01_ショートカットキー",
                "Excel_02_基本機能",
                "Excel_03_関数",
                "Excel_04_VBA",
                "Office基礎",
                "コンピュータ用語辞典",
                "タイピング&ショートカットキー",
                "プログラミング入門"
            ],
        }
    }

    const contents = Object.keys(contentsList.contents).map(e => {
        return (
            <ContentsCard 
                categoryName={e} 
                contents={contentsList.contents[e]} 
                key={e}
            />
        );
    })

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
            <hr />
            {contents}
        </div>
    );
}

export default Index;