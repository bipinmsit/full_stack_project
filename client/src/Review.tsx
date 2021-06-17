import React from "react";
import StarRating from "./StarRating";

const Review = () => {
  return (
    <div>
      <div className="row mb-2">
        <div className="col-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header d-flex justify-content-between">
              <span>bipin</span>
              <span>
                <StarRating rating={4} />
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">Restaurant feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
