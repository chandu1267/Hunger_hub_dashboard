import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
// import { ThreeCircles } from "react-loader-spinner";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not authenticated");
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);

      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm added Successfully");
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm Exists 🥗. Only 1 firm can be added  ");
      } else {
        alert("Failed to add Firm");
      }

      const mango = data.firmId;
      const vendorRestuarant = data.vendorFirmName;

      localStorage.setItem("firmId", mango);
      localStorage.setItem("firmName", vendorRestuarant);
      window.location.reload();
    } catch (error) {
      console.error("failed to add Firm");
      alert("failed to add Firm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      {!loading && (
        <form class="mb-3 margin_left" onSubmit={handleFirmSubmit}>
          <h3>Add Firm</h3>
          <label for="exampleInputEmail1" class="form-label"><h6>Firm Name</h6></label>
          <input
            type="text"
            name="firmName"
            class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
          />
          <label for="exampleInputprice" class="form-label"><h6>Area</h6></label>
          <input
            type="text"
            name="area"
            class="form-control"
            id="exampleInputprice"
            aria-describedby="emailHelp"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <div className="checkInp">
            <label><h6>Category</h6></label>
            <div className="inputsContainer">
              <div className="checboxContainer">
                <label><h6>Veg</h6></label>
                <input
                  type="checkbox"
                  checked={category.includes("veg")}
                  value="veg"
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="checboxContainer">
                <label><h6>Non-Veg</h6></label>
                <input
                  type="checkbox"
                  checked={category.includes("non-veg")}
                  value="non-veg"
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>
          <label class="form-label"><h6>Offer</h6></label>
          <input
            type="text"
            name="offer"
            class="form-control"
            id="exampleInputprice"
            aria-describedby="emailHelp"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          <div className="checkInp">
            <label><h6>Region</h6></label>
            <div className="inputsContainer">
              <div className="regBoxContainer">
                <label><h6>South Indian</h6></label><br />
                <input
                  type="checkbox"
                  value="south-indian"
                  checked={region.includes("south-indian")}
                  onChange={handleRegionChange}
                  id="southcheck"
                />
              </div>
              <div className="regBoxContainer">
                <label><h6>North-Indian</h6></label><br />
                <input
                  type="checkbox"
                  value="north-indian"
                  checked={region.includes("north-indian")}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label><h6>Chinese</h6></label><br />
                <input
                  type="checkbox"
                  value="chinese"
                  checked={region.includes("chinese")}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label><h6>Bakery</h6></label><br />
                <input
                  type="checkbox"
                  value="bakery"
                  checked={region.includes("bakery")}
                  onChange={handleRegionChange}
                />
              </div>
            </div>
          </div>
          <br />
          <label><h6>Firm Image</h6></label>
          <input type="file" onChange={handleImageUpload} class="form-control" />
          <br />
          <div className="btnSubmit">
            <button type="submit" class="btn btn-primary margin_left">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
