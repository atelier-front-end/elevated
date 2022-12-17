import React, { useState, useEffect } from 'react';
import StarComponent from '../StarComponent.jsx';
import styled from 'styled-components';

const RatingsBrk = function RatingsBrk({ breakdown, ratingsArray, starFilter, setStarFilter }) {
  const [stats, setStats] = useState({});

  let dimensions = {
    height: 32.4,
    width: 27
  };

  const ratingStats = function avgRating() {
    const statsObj = {};
    statsObj.recommended = recommendedPercent(breakdown.recommended);
    statsObj.ratings = starRatingObj(breakdown.ratings)
    return statsObj;
  }

  const recommendedPercent = function recPerc(obj) {
    let rawNum = Number.parseInt(obj.true) / (Number.parseInt(obj.true) + Number.parseInt(obj.false));
    let percent = Math.round(rawNum * 100);
    return percent;
  }

  const starRatingObj= function starRating(obj) {
    let overallRatings = 0
    let totalRatings = 0;
    const result = {}
    for (let key in obj) {
      totalRatings += Number.parseInt(obj[key]);
      overallRatings += Number.parseInt(obj[key]) * Number.parseInt(key);
    }
    for (let key in obj) {
      let rawNum = Number.parseInt(obj[key]) / totalRatings
      let percent = Math.round(rawNum * 1000) / 10;
      result[key] = percent;
    }
    result.avg = Math.round((overallRatings / totalRatings) * 10) / 10;
    return result;
  }

  const clickHandler = function(e, rating, clear) {
    e.preventDefault()
    if (clear) {
      setStarFilter({
        inUse: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      })
      return;
    }
    ratingsArray(rating)
  }

  useEffect(() => {
    setStats(ratingStats())
  }, [breakdown])

  if (!stats.ratings) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <RatingAndStars>
        <RatingSpan>{stats.ratings.avg}</RatingSpan>
        <StarComponent productID={breakdown.product_id} avg={stats.ratings.avg} size={dimensions}
        font={28}/>
      </RatingAndStars>
      <RecommendStatement>
        {stats.recommended}% of reviews recommended this product
      </RecommendStatement>
      <RatingsBarContainer>
        {Object.keys(breakdown.ratings).reverse().map((rating, index) => {
          return (
            <div key={index} onClick={(e) => clickHandler(e, rating)}>
              {/* <span style={{"textDecoration": `${starFilter[rating] ? 'underline': 'none'}`}}>
                {rating} stars
              </span> */}
              <RatingSelector style={{"textDecoration": `${starFilter[rating] ? 'underline': 'none'}`}}>
                {rating} stars
              </RatingSelector>
              <BarContainerStyles>
                <BarFiller
                  style={{"width": `${stats.ratings[rating]}%`}}>
                  <span>{stats.ratings[rating]}%</span>
                </BarFiller>
              </BarContainerStyles>
            </div>
          )
        })}
      </RatingsBarContainer>
      { starFilter.inUse &&
        <button onClick={(e) => clickHandler(e, null, 'clear')}>
          Clear Selection
        </button>
      }
    </div>
  )
}

export default RatingsBrk;

const RatingAndStars = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 5px;
  overflow: auto;
`

const RatingSpan = styled.span`
  font-size: 40px;
`

const RecommendStatement = styled.div`
  font-family: 'Varela Round', sans-serif;
  font-size: 12px;
  color: gray;
  margin-bottom: 5px;
`

const RatingsBarContainer = styled.div`
  margin-bottom: 5px;
    & > div {
      display: flex;
      align-items: center;
    }
`
const BarContainerStyles = styled.div`
  height: 20px;
  width: 70%;
  background-color: "#e0e0de";
  border-radius: 1px;
  border: solid black 1px;
  margin: 5px;
`

const BarFiller = styled.div`
  height: 100%;
  background-color: gray;
  border-radius: inherit;
  text-align: right;
  & > span {
    padding: 5;
    color: black;
    font-size: 10px;
  }
`

const RatingSelector = styled.span`
  cursor: pointer;
    &:hover {
      color: gray;
    }
`