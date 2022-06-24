import * as React from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import UserMenu from './UserMenu';
import NotifiMenu from './NotifiMenu';


const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1), 0px 4px 8px rgba(0,0,0,0.1);
`

const Logo = styled.img`
    width: 200px;
    height: 50px;
    margin: 10px 0 0 5px;
    cursor: pointer;
`

const Ul = styled.ul`
    list-style: none;
    display: flex;
    margin-right: 50px;
`

const Li = styled.li`
    margin: 0px 10px;
`

const SearchFormPare = styled.div`
    display:inline-block;
    margin-top: 13px;
`

function Header() {

    return (
        <HeaderDiv>
            <Logo 
            src={`${process.env.PUBLIC_URL}/images/index/logo.png`} 
            onClick={() => {
                window.location.href='/'
            }} 
            />
            <SearchFormPare>
                <SearchForm />
            </SearchFormPare>
            <Ul>
                <Li>
                    <UserMenu />
                </Li>
                <Li>
                    <NotifiMenu />
                </Li>
            </Ul>
        </HeaderDiv>
    )
}

export default Header;