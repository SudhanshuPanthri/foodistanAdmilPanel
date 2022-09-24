import { useState } from "react";
import "./addfood.css";
import { db, storage } from "../Firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "./Navbar/Navbar";

const AddFood = () => {
  //food Data

  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [foodImageURL, setFoodImageURL] = useState("");
  const [foodType, setFoodType] = useState("");
  const [mealType, setMealType] = useState("");
  const [foodAddOn, setFoodAddOn] = useState("");
  const [foodAddOnPrice, setFoodAddOnPrice] = useState("");

  //restaurant data

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantNumber, setRestaurantNumber] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantAddressBuilding, setRestaurantAddressBuilding] =
    useState("");
  const [restaurantAddressStreet, setRestaurantAddressStreet] = useState("");
  const [restaurantAddressCity, setRestaurantAddressCity] = useState("");
  const [restaurantAddressPincode, setRestaurantAddressPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (foodImage == null) {
      alert("Please select an image");
      return;
    } else {
      const imageRef = ref(storage, `FoodImages/${foodImage.name}`);
      uploadBytes(imageRef, foodImage)
        .then(() => {
          alert("Image uploaded successfully");
          getDownloadURL(imageRef).then((url) => {
            setFoodImageURL(url);
            const foodData = {
              foodName,
              foodDescription,
              foodPrice,
              foodCategory,
              foodImageURL: url,
              foodType,
              mealType,
              foodAddOn,
              foodAddOnPrice,
              restaurantName,
              restaurantNumber,
              restaurantEmail,
              restaurantAddressBuilding,
              restaurantAddressStreet,
              restaurantAddressCity,
              restaurantAddressPincode,
              id: new Date().getTime().toString(),
            };
            try {
              const docRef = addDoc(collection(db, "FoodData"), foodData);
              alert("Data added successfully", docRef.id);
            } catch (error) {
              alert("Failed to upload data", error);
            }
          });
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container1">
        <h1>Add Food Data</h1>
        <form>
          <label>Food Name</label>
          <input
            type="text"
            name="food_name"
            onChange={(e) => setFoodName(e.target.value)}
          />
          <label>Food Description</label>
          <input
            type="text"
            name="food_description"
            onChange={(e) => setFoodDescription(e.target.value)}
          />
          <label>Food Price</label>
          <input
            type="number"
            name="food_price"
            onChange={(e) => setFoodPrice(e.target.value)}
          />
          <label>Food Type</label>
          <select onChange={(e) => setFoodType(e.target.value)}>
            <option value="null">Select Food Type</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          <label>Food Category</label>
          <select onChange={(e) => setFoodCategory(e.target.value)}>
            <option value="null">Select Food Category</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="american">American</option>
            <option value="japenese">Japenese</option>
          </select>
          <label>Meal Type</label>
          <select onChange={(e) => setMealType(e.target.value)}>
            <option value="null">Select Meal Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="starters">Starters</option>
            <option value="liquid">Liquid</option>
          </select>
          <label>Add On Name</label>
          <input
            type="text"
            name="food_addOnName"
            onChange={(e) => setFoodAddOn(e.target.value)}
          />
          <label>Add On Price</label>
          <input
            type="text"
            name="food_addOnPrice"
            onChange={(e) => setFoodAddOnPrice(e.target.value)}
          />
          <label>Food Image</label>
          <input
            type="file"
            name="food_image"
            onChange={(e) => setFoodImage(e.target.files[0])}
          />
          <label>Restaurant Name</label>
          <input
            type="text"
            name="restaurant_name"
            onChange={(e) => setRestaurantName(e.target.value)}
          />
          <label>Restaurant Phone Number</label>
          <input
            type="number"
            name="restaurant_number "
            onChange={(e) => setRestaurantNumber(e.target.value)}
          />
          <label>Restaurant Email</label>
          <input
            type="email"
            name="restaurant_email "
            onChange={(e) => setRestaurantEmail(e.target.value)}
          />
          <label>Restaurant Building Number/Name</label>
          <input
            type="text"
            name="restaurant_buildingAddress"
            onChange={(e) => setRestaurantAddressBuilding(e.target.value)}
          />
          <label>Restaurant StreetNumber/Name</label>
          <input
            type="text"
            name="restaurant_buildingStreet"
            onChange={(e) => setRestaurantAddressStreet(e.target.value)}
          />
          <label>Restaurant City Name</label>
          <input
            type="text"
            name="restaurant_cityAddress"
            onChange={(e) => setRestaurantAddressCity(e.target.value)}
          />
          <label>Restaurant Pincode</label>
          <input
            type="number"
            name="restaurant_pincode"
            onChange={(e) => setRestaurantAddressPincode(e.target.value)}
          />
          <button onClick={handleSubmit}>Add Food</button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
