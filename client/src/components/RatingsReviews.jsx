import React, { useState } from 'react';
import axios from 'axios';
import Breakdown from './R_ratingsReviews_subs/Breakdown.jsx';
import Reviews from './R_ratingsReviews_subs/Reviews.jsx';
import styled from 'styled-components';

const RatingsReviews = ({theme, product}) => {
  const [charBreak, setCharBreak] = useState({})
  const [starFilter, setStarFilter] = useState(
    {
      inUse: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    }
  );

  const ratingsArray = function(rating) {
    const adjustedFilter = {...starFilter}
    let truthy = 0;
    adjustedFilter[rating] = !adjustedFilter[rating];
    for (let key in adjustedFilter) {
      if (adjustedFilter[key] === true && key !== 'inUse') {
        truthy++
      }
    }
    if (truthy === 0) {
      adjustedFilter.inUse = false;
    } else {
      adjustedFilter.inUse = true;
    }
    setStarFilter(adjustedFilter);
  }

  if(!product.id) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <RRContainer theme={theme}>
      <H2>Ratings & Reviews</H2>
      <RR>
        <Breakdown productID={product.id} ratingsArray={ratingsArray} setCharBreak={setCharBreak} starFilter={starFilter}/>
        <Reviews theme={theme} productID={product.id} name={product.name} starFilter={starFilter} charBreak={charBreak} setStarFilter={setStarFilter}/>
      </RR>
    </RRContainer>
  )
}

export default RatingsReviews;

const H2 = styled.h2`
  margin: 20px;
`

const RRContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bg};
  min-height: 300px;
  margin: 50px 0 0 0;
`

const RR = styled.div`
  display: flex;
  flex-direction: row;
`