const axios = require("axios");

exports.Logins = async (req, res) => {
  const response = await axios.post(
    "https://gcit-user-management.onrender.com/api/v1/UM/login",
    {
      username: "group12",
      password: "group12",
    }
  );

  console.log(response.data.token);
};
