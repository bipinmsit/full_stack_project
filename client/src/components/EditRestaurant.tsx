import React, { useState, useContext } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/antd/dist/antd.min.css";
import { Button, Modal } from "antd";
import RestaurantContext from "../context/RestaurantContext";
// import { useHistory } from "react-router-dom";

const EditRestaurant = (props: any) => {
  // let history = useHistory();
  const [visible, setVisible] = useState();
  const [description, setDescription] = useState(props.listedRestaurant);

  const [name, setName] = useState(description.name);
  const [location, setLocation] = useState(description.location);
  const [priceRange, setPriceRange] = useState(description.price_range);

  // const { restaurants, setRestaurants } = useContext(RestaurantContext);

  const handleOk = async (e: any) => {
    e.stopPropagation();
    try {
      await fetch(
        `http://localhost:5000/api/v1/restaurants/${description.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            location: location,
            price_range: priceRange,
          }),
        }
      )
        .then((data) => {
          console.log(data);
          return data.json();
        })
        .then((response) => {
          console.log(response);
          // history.push('/')

          // setRestaurants()
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    // window.location = "/";
    setVisible(false);
    window.location.href = "/";
  };

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={(e: any) => {
            e.stopPropagation();
            setVisible(true);
          }}
        >
          Update
        </Button>
        <Modal
          title="Edit Restaurants"
          centered
          visible={visible}
          onOk={handleOk}
          onCancel={(e: any) => {
            e.stopPropagation();
            setVisible(false);
          }}
        >
          <input
            type="text"
            className="form-control"
            value={name}
            onClick={(e: any) => e.stopPropagation()}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            value={location}
            onClick={(e: any) => e.stopPropagation()}
            onChange={(e: any) => {
              setLocation(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            value={priceRange}
            onClick={(e: any) => e.stopPropagation()}
            onChange={(e: any) => {
              setPriceRange(e.target.value);
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default EditRestaurant;
