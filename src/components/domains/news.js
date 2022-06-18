function News(props) {
    return (
        <div>
            お知らせ
            <div className="notify_box">
                {props.news}
            </div>
        </div>
    );
}

export default News;