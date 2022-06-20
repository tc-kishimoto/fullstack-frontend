import Link from '@mui/material/Link';
import mdList from "../../config/mdlist.json";
import styled from "styled-components";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SideNav = styled.nav`
    background-color: aliceblue;
    width: 300px;
    height: fit-content;
    position: sticky;
    top: 30px;
    overflow: auto;
    max-height: 100vh;
`

function SideMenu(props) {
    const categoryName = props.categoryName;
    const contents = props.contents;
    // const items = contents.map(e => {
    //     return (
    //         <li>
    //             <Link underline="hover" href={`/contents/${categoryName}/${e}`}>
    //                 {e}
    //             </Link>
    //         </li>
    //     );
    // })
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
                <ul>
                    {mdList.contents[e].map(content => {
                        return (
                            <li>
                                <Link underline="hover" href={content}>{content}</Link>
                            </li>
                        );
                    })}
                </ul>
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

