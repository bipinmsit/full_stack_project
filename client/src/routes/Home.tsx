import React from "react";
import AddRestaurants from "../components/AddRestaurants";
import RestaurantsList from "../components/RestaurantsList";

const Home = () => {
  return (
    <div>
      <div className="font-weight-light display-1 p-5 text-center">
        Restaurant Finder
      </div>

      <AddRestaurants />
      <RestaurantsList />
    </div>
  );
};
export default Home;
