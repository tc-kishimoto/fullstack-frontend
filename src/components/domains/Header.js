import * as React from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import UserMenu from './UserMenu';
import NotifiMenu from './NotifiMenu';


const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const Logo = styled.img`
    width: 250px;
    cursor: pointer;
`

const Ul = styled.ul`
    list-style: none;
    display: flex;
    margin-right: 50px;
`

const Li = styled.li`
    margin: 10px;
`

const SearchFormPare = styled.div`
    display:inline-block;
    margin-top: 30px;
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