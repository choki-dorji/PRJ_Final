const axios = require("axios");
const { route } = require("../routes/chart");

const LOGIN = process.env.LEGSHAY_API_LOGIN;

exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await axios.post(LOGIN, {
      username,
      password,
    });
    const user = response.data;

    let token;

    if (user && user.token) {
      const roleid = user.data.user.rows[0].roleid;

      // res.cookie("token", user.token, { httpOnly: true });
      token = user.token;
      res.cookie("tokenABC", token);
      console.log("token", req.cookies.tokenABC);

      const userData = user.data.user.rows[0];
      res.cookie("userData", JSON.stringify(userData));

      if (roleid === 3) {
        res.redirect(`/dashboard/dash?token=${user.token}`);
      } else {
        res.redirect(
          `/students?username=${user.data.user.rows[0].name}&token=${user.token}`
        );
      }
    } else if (!token) {
      res.redirect("/login");
    } else {
      res.redirect("/login?error=Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/login?error=An error occurred, please try again later");
  }
};

// Handle GET requests to the login page
exports.loginpage = async (req, res) => {
  const error = req.query.error; // get the error message from the query parameters
  res.render("Login/index", { error }); // render the login page HTML and pass the error message as a local variable
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
