const axios = require("axios");

async function getData(token) {
  try {
    const response = await axios.get(
      "https://gcit-user-management.onrender.com/api/v1/UM/join",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    // Assuming the response data is an array, you can return it directly
    console.log("response ", response);
    return response.data;
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error("Error fetching data:", error);
    return []; // Return an empty array if an error occurred
  }
}

module.exports = getData;
