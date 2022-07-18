import styled from "styled-components";
import { FaBook } from "react-icons/fa";
import mdList from "../../config/mdlist.json";
import { Transition } from 'react-transition-group';
import { useState } from "react";

const BarStyle = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: rgb(176 85 176);
    color: white;
`

const BookLink = styled.a`
    color: white;
    text-decoration: none;
`

const ContentsLink = styled.a`
    margin: 10px;
    color: #006ef1;
    position: relative;
    display: inline-block;
    transition: .3s;
    text-decoration: none;
`

const Fade = styled.div`

    transition: opacity 1s,transform 0.5s;
    transform: translateX(
        ${({ state }) => (state === "entering" || state === "entered" ? 0 : -105)}%
        );

    /* transform: translateX(0); */
    /* transform: translateX(-105%); */
    z-index: 30;
    background-color: ghostwhite;
    position: fixed;
    width: 80%;
    background-color: white;
    overflow: auto;
    max-height: 95%;
`

function TopBar(props) {

	const [isListDisp, setIsListDisp] = useState(false)

	const Contents = mdList.categories.map(category => {
		return (
			<div>
				{category}
				<div>
					{mdList.contents[category].map(content => {
						return (
							<ContentsLink href={content}>
								{content}
							</ContentsLink>
						);
					})}
					<hr />
				</div>
			</div>
		);
	})

	return (
		<div>
			<BarStyle>
				<BookLink href="#" onClick={() => setIsListDisp(isListDisp ? false : true)}>
					<FaBook />
				</BookLink>
				{props.title}
			</BarStyle>
			<Transition in={isListDisp}>
				{(state) => (
					<Fade state={state}>
						{Contents}
					</Fade>
				)}
			</Transition>
		</div>
	);
}

export default TopBar;
