import { useState } from "react";
import News from "../components/domains/News";
import CategoryCardList from "../components/domains/CategoryCardList";
import styled from "styled-components";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

const Container = styled.div`
    margin: 0 auto;
    padding: 24px;
`

function Index() {

    const [tabValue, setTabValue] = useState('1')

    return (
        <Container>
            <News news={'osirase'}/>
            <TabContext value={tabValue}>
                <TabList  aria-label="basic tabs example" onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="教材一覧" value="1"/>
                    <Tab label="カテゴリ別" value="2" />
                </TabList>
                <TabPanel value="1">
                    <CategoryCardList></CategoryCardList>
                </TabPanel>
                <TabPanel value="2">
                    comming soon
                </TabPanel>
            </TabContext>
        </Container>
    );
}

export default Index;