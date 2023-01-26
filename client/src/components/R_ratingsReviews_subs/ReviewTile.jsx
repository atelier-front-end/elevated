import React, { useEffect, useState } from "react";
import axios from "axios";
import ImgView from "../E_qa_subs/ImgView.jsx";
import StarComponent from "../StarComponent.jsx";
import styled from "styled-components";

const ReviewTile = function ReviewTile({ theme, review, setRList, productID }) {
  const [photosArr, setPhotosArr] = React.useState([]);
  const [more, setMore] = React.useState(false);
  const [imgViewStyle, setImgViewStyle] = React.useState({ display: "none" });
  const [imgUrl, setImgUrl] = React.useState("");
  let date = new Date(review.date);

  const handleVote = (e) => {
    e.preventDefault();
    if (window.localStorage.getItem(`voted${review.review_id}`) === null) {
      window.localStorage.setItem(`voted${review.review_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review.review_id}/helpful`;
      const auth = { Authorization: process.env.GITHUB_TOKEN };
      axios({ method: "put", url, headers: auth })
        .then((res) => {
          console.log("response", res);
          setRList(review.review_id);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  const handleMore = function () {
    let bool = !more;
    setMore(bool);
  };

  const handleReport = (e) => {
    e.preventDefault();
    if (window.localStorage.getItem(`reported${review.review_id}`) === null) {
      window.localStorage.setItem(`reported${review.review_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review.review_id}/report`;
      const auth = { Authorization: process.env.GITHUB_TOKEN };
      axios({ method: "put", url, headers: auth })
        .then((res) => {
          console.log("response", res);
          setRList();
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  const openImg = (url) => {
    setImgUrl(url);
    setImgViewStyle({ display: "block" });
  };

  React.useEffect(() => {
    if (review.photos.length) {
      var photoInput = [];

      review.photos.forEach((photo, i) => {
        // console.log('photo', photo, typeof photo);
        var photoUrl = typeof photo === "object" ? photo.url : photo;
        var photoID =
          typeof photo === "object"
            ? photo.id
            : Number(review.review_id + "" + i);

        photoInput.push(
          <Athumbnails
            onClick={(e) => {
              e.preventDefault();
              openImg(photoUrl);
            }}
            key={photoID}
            src={photoUrl}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.style.display = "none";
              currentTarget.src =
                "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";
            }}
          ></Athumbnails>
        );
        //"this.onerror=null; this.src='https://placeimg.com/200/300/animals';"
      });
      setPhotosArr(photoInput);
    }
  }, [review]);

  return (
    <Tile theme={theme}>
      <User>
        <div>
          <UserIcon>
            <span>{review.reviewer_name.slice(0, 1).toUpperCase()}</span>
          </UserIcon>
          <span>{review.reviewer_name}</span>
        </div>
        <span
          style={{
            color: "rgb(125, 120, 161)",
          }}
        >
          {date.toLocaleDateString()}
        </span>
      </User>
      <Rating>
        <StarComponent productID={productID} avg={review.rating} />
        {review.recommend === true && (
          <div
            style={{
              color: "rgb(125, 120, 161)",
            }}
          >
            ✔ I recommend this
          </div>
        )}
      </Rating>
      <Sum>{review.summary}</Sum>
      <Body>
        {review.body.slice(0, 249)}
        {review.body.length > 250 && more === false && (
          <div
            onClick={handleMore}
            style={{ color: "gray", cursor: "pointer" }}
          >
            ...more
          </div>
        )}
        {more && <span>{review.body.slice(249)}</span>}
        {more === true && (
          <div
            onClick={handleMore}
            style={{ color: "gray", cursor: "pointer" }}
          >
            ...less
          </div>
        )}
      </Body>
      {photosArr.length > 0 && <PhotoCont>{photosArr}</PhotoCont>}
      {review.response && (
        <Response>
          <span>Response:</span>
          <div>{review.response}</div>
        </Response>
      )}
      <Vote style={{ marginBottom: "0px" }}>
        Helpful? <a onClick={handleVote}>Yes</a> ({review.helpfulness}) |{" "}
        <a onClick={handleReport}>Report</a>
      </Vote>
      <div style={{ marginBottom: "0px" }}>
        <ImgView style={imgViewStyle} setStyle={setImgViewStyle} url={imgUrl} />
      </div>
    </Tile>
  );
};

export default ReviewTile;

const Tile = styled.div`
  // height: 50%;
  background-color: ${(props) => props.theme.bg};
  padding: 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div {
    margin-bottom: 10px;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  & > span {
    color: gray;
  }
`;

const UserIcon = styled.div`
  border: 2px solid rgb(182, 172, 255);
  // background-color: rgb(182, 172, 255);
  background-color: rgb(125, 120, 161);
  color: white;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  margin-right: 5px;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > div {
    font-size: 12px;
    color: gray;
  }
`;
const Sum = styled.div`
  font-size: 25px;
  word-wrap: break-word;
`;

const Body = styled.div`
  font-size: 15px;
  word-wrap: break-word;
`;
const PhotoCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  & div {
    margin-rigth: 3px;
  }
`;

const Vote = styled.div`
  color: gray;
  font-size: 12px;
  color: rgb(125, 120, 161);
`;

const Response = styled.div`
  background-color: lightgray;
  margin: 0px 20px 10px 20px;
  font-size: 15px;
  color: #5e5e5e;
`;

export const Athumbnails = styled.img`
  border: solid rgb(229, 229, 229) 0.5px;
  position: relative;
  width: 75px;
  height: 75px;
  object-fit: cover;
`;

// color:rgb(125, 120, 161);
