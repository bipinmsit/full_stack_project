import React, { useState } from "react";

export const RestaurantContext = React.createContext();

const RestaurantContextProvider = (props: any) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);

  const addNewRestaurants = (restaurant_added: any) => {
    setRestaurants([...restaurants, restaurant_added]);
  };

  return (
    <div>
      <RestaurantContext.Provider
        value={{
          restaurants,
          setRestaurants,
          addNewRestaurants,
          selectedRestaurant,
          setSelectedRestaurant,
        }}
      >
        {props.children}
      </RestaurantContext.Provider>
    </div>
  );
};
export default RestaurantContextProvider;
