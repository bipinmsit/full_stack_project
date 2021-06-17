import React, { useState } from "react";
import { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";

const AddRestaurants = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("price range");

  const { addNewRestaurants } = useContext(RestaurantContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/v1/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          location: location,
          price_range: priceRange,
        }),
      })
        .then((data) => {
          // console.log(data.json());
          return data.json();
        })
        .then((newData) => {
          console.log(newData);
          addNewRestaurants(newData.data.restaurant);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="form-row">
        <div className="col">
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="text"
            placeholder="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="col">
          <select
            className="custom-select my-1 mr-sm-2"
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          >
            <option disabled>price range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
    </div>
  );
};
export default AddRestaurants;
