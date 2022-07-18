import styled from 'styled-components';

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

export default News;