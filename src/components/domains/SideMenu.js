// import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import mdList from "../../config/mdlist.json";
import styled from "styled-components";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

const SideNav = styled.nav`
    background-color: aliceblue;
    width: 300px;
    height: fit-content;
    position: sticky;
    top: 30px;
    overflow: auto;
    max-height: 100vh;
`

function SideMenu() {
    const categories = mdList.categories.map(e => {
        return (
            <Accordion>
                <AccordionSummary
                    aria-controls={e}
                    id={e}
                    >
                    <Typography>{e}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <List>
                            {mdList.contents[e].map(content => {
                                return (
                                    <li>
                                        {/* <Link underline="hover" href={`/contents/${e}/${content}`}>
                                            {content}
                                        </Link> */}
                                        <RouterLink to={`/contents/${e}/${content}`}>
                                            {content}
                                        </RouterLink>
                                    </li>
                                );
                            })}
                        </List>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        );
    })
    return (
        <SideNav>
           {categories} 
        </SideNav>
    );
}

export default SideMenu;

