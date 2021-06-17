import React, { useEffect, useContext, useState } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import EditRestaurant from "./EditRestaurant";
import { useHistory } from "react-router-dom";

const RestaurantsList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const [rowBgColor, setRowBgColor] = useState("");
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:5000/api/v1/restaurants", { method: "GET" })
        .then((response) => {
          // console.log(response.json())
          return response.json();
        })
        .then((actualData) => {
          setRestaurants(actualData.data.restaurants);
          // console.log(actualData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  // Deleting a restaurants
  const handleDelete = async (e: any, id: number) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:5000/api/v1/restaurants/${id}`, {
        method: "DELETE",
      })
        .then((data) => {
          // console.log(data)
          return data;
        })
        .then((response) => {
          console.log(response);
          setRestaurants(
            restaurants.filter((restaurant: any) => {
              return restaurant.id !== id;
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestaurantSelect = (id: number) => {
    history.push(`/restaurant/${id}`);
  };

  const changeBackground = (e: any) => {
    console.log(e.target.style.backgroundColor="red");
  };

  return (
    <div>
      <table className="table table-dark mt-3">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((rests: any) => {
              return (
                <tr
                  onMouseOver={changeBackground}
                  onClick={() => handleRestaurantSelect(rests.id)}
                  key={rests.id}
                >
                  <td>{rests.name}</td>
                  <td>{rests.location}</td>
                  <td>{"$".repeat(rests.price_range)}</td>
                  <td>reviews</td>
                  <td>
                    <EditRestaurant listedRestaurant={rests} />
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, rests.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default RestaurantsList;
