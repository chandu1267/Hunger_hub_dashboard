import React, { use, useState } from "react";
import { API_URL } from "../../data/apiPath";

const Addproducts = () => {

  const [productName,setProductName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const [bestseller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null);
  const [description,setDescription]=useState("");


    const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };


  const handlebestSeller = (event)=>{
    const value = event.target.value === "true"
    setBestSeller(value)
  }

    const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleProductAdd = async(e)=>{
    e.preventDefault();
    try{
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId')

      if(!loginToken || firmId){
        console.log("user not athentication")
      }
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      category.forEach((value) => {
        formData.append("category", value);
      });


      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body: formData
      })

      const data = await response.json()

      if(response.ok){
        alert("Product added succesfully...")
      }
          setProductName("")
            setPrice("");
            setCategory([])
            setBestSeller(false);
            setImage(null);
            setDescription("")

    }catch(err){
      return console.log("error in add product")
      alert("failed ")

    }
  }

  return (
    <>
      <form onSubmit={handleProductAdd}>
        <div class="mb-3 margin_left">
          <label for="exampleInputEmail1" class="form-label">
            <h6>Product_Name</h6>
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Chicken Biriyani"
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
          />
        </div>
        <div class="mb-3 margin_left">
          <label for="exampleInputprice" class="form-label">
            <h6>Price</h6>
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleInputprice"
            aria-describedby="emailHelp"
            placeholder="310"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />
        </div>
        <div className=" mb-3 margin_left checkInp">
          <label>
            <h6>Category</h6>
          </label>
          <div className="inputsContainer">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="non-veg"
                id="checkDefaultnon-veg"
                checked={category.includes('non-veg')}
                onChange={handleCategoryChange}
                
                />
              <label class="form-check-label" for="checkDefault">
                Non-veg
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="veg"
                id="checkDefaultveg"
                checked={category.includes('veg')}
                onChange={handleCategoryChange}
              />
              <label class="form-check-label" for="checkDefault">
                veg
              </label>
            </div>
          </div>
        </div>
        <div class="mb-3 margin_left">
          <label for="exampleInputPassword1" class="form-label">
            <h6>Best_Seller</h6>
          </label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault1"
              value="yes"
              checked = {bestseller === true}
              onChange={handlebestSeller}
            />
            <label class="form-check-label" for="radioDefault2">
              Yes
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault2"
              value="no"
              checked = {bestseller === false}
              onChange={handlebestSeller}
              
            />
            <label class="form-check-label" for="radioDefault2">
              No
            </label>
          </div>
        </div>
        <div class="mb-3 margin_left">
          <label for="exampleInputPassword1" class="form-label">
            <h6>Description</h6>
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Delicious Chicken biryani under 350/-"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>
        <div class="mb-3 margin-right margin_left">
          <label for="formFile" class="form-label">
            <h6>Image of Dish</h6>
          </label>
          <input class="form-control" type="file" id="formFile" onChange={handleImageUpload} />
        </div>
        <button type="submit" class="btn btn-primary margin_left">
          Submit
        </button>
      </form>
    </>
  );
};

export default Addproducts;
