import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortReviews from './SortReviews.jsx'
import ListReviews from './ListReviews.jsx'
import MoreReviews from './MoreReviews.jsx'
import AddReviews from './AddReviews.jsx'

const Reviews = function Reviews({ productID, name }) {
  const [reviews, setReviews] = useState({});
  const [displayCount, setDisplayCount] = useState(2);
  const [moreReviews, setMoreReviews] = useState(true);

  useEffect(() => {
    if (productID !== undefined) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${productID}`, {
        headers: { Authorization: process.env.GITHUB_TOKEN },
      })
        .then((result) => {
          // console.log('REVIEW State', result.data)
          setReviews(result.data);
        })
        .catch((err) => {
          // console.log('Error fetching data in "Breakdown.jsx"', err);
          alert('Error in Breakdown.jsx', err);
        });
    }
  }, [productID]);

  if (!reviews.product) {
    return <div>loading...</div>
  }

  return (
    <div>
      <SortReviews reviews={reviews}/>
      <ListReviews reviews={reviews} displayCount={displayCount}/>
      <div>
        <MoreReviews reviews={reviews.count} displayCount={displayCount} setDisplayCount={setDisplayCount}/>
        <AddReviews id={productID} name={name}/>
      </div>
    </div>
  );
};

// Reviews.propTypes = {
//   productID: PropTypes.number.isRequired,
// };

export default Reviews;
