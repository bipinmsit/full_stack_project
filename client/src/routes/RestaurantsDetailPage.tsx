import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddReview from "../AddReview";
import Review from "../Review";
import StarRating from "../StarRating";
import { RestaurantContext } from "./../context/RestaurantContext";

const RestaurantsDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantContext
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:5000/api/v1/restaurants/${id}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((myData) => {
            console.log(myData.data);
          setSelectedRestaurant(myData.data.restaurant);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <Review />
      </div>
      <AddReview />
    </>
  );
};
export default RestaurantsDetailPage;
