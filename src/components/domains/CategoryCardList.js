import React from 'react'
import CategoryCard from "./CategoryCard"
import Stack from '@mui/material/Stack';
import mdList from "../../config/mdlist.json"
import styled from "styled-components";
import config from '../../config/config.json'

const CategoryList = styled.div`
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const CategoryCardList = () => {
  const category = mdList.categories.map(e => {
    return (
      <CategoryCard
        categoryName={e}
        contents={mdList.contents[e]}
        key={e}
        explain={config.categoryInfo[e].explain}
      />
    )
  })
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CategoryList>
          {category}
        </CategoryList>
      </Stack>
    </Stack>
  )
}

export default CategoryCardList;