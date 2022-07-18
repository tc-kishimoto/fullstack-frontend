import styled from "styled-components";
import { Link as Scroll } from 'react-scroll';

const ScrollStyle = styled.div`
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 100;
    background-color: rgb(46, 46, 46);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: rgb(255, 255, 255);
    line-height: 50px;
    text-align: center;
    cursor: pointer;
`

function ScrollTop() {
	return (
		<Scroll to="root" smooth={true} duration={400}>
			<ScrollStyle>↑</ScrollStyle>
		</Scroll>
	);
}

export default ScrollTop;