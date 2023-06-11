const HttpError = require("../../models/httperror");
const axios = require("axios");

const Logins = async () => {
  const response1 = await axios.post(
    "https://gcit-user-management.onrender.com/api/v1/UM/login",
    {
      username: "group12",
      password: "group12",
    }
  );

  console.log(response1.data.token);

  try {
    const response = await axios.get(
      "https://gcit-user-management.onrender.com/api/v1/UM/join",
      {
        headers: {
          Authorization: "Bearer " + response1.data.token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("server down");
  }
};

exports.GetAllStudents = async (req, res) => {
  const token = req.cookies.tokenABC;
  console.log("token ", token);

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
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("server down");
  }
};

exports.GetStudents = async (years) => {
  const STUDENTS = await Logins();
  let students = STUDENTS.filter(
    (student) => student.year === String(years) && student.disability !== true
  );
  students = students.sort(() => Math.random() - 0.5);
  return students;
};

exports.countStudentsByYear = async (years) => {
  let maleCount = 0;
  let femaleCount = 0;
  const STUDENTS = await Logins();
  const students = STUDENTS;

  // Iterate over each student
  students.forEach((student) => {
    // Check if the student's year matches the specified year
    if (student.year === years) {
      // Increment the corresponding count based on the student's gender
      if (student.gender === "M") {
        maleCount++;
      } else if (student.gender === "F") {
        femaleCount++;
      }
    }
  });

  // Return an object with the male and female counts
  return { male: maleCount, female: femaleCount };
};

exports.GetAllStudents = async () => {
  const STUDENTS = await Logins();
  return STUDENTS;
};

exports.TotalAllStudents = async (req, res) => {
  const STUDENTS = await Logins();
  res.json(STUDENTS);
};

exports.studentsbyName = async (req, res) => {
  const stdname = req.params.id;
  const STUDENTS = await Logins();
  let students = STUDENTS.filter((student) => student.name === stdname);
  res.json(students);
};

// //////////
exports.countStudentsByYearDisable = async (req, res, years) => {
  let maleCount = 0;
  let femaleCount = 0;

  const students = await Logins();
  // console.log("students ", students);

  // Iterate over each student
  students.forEach((student) => {
    // Check if the student's year matches the specified year
    if (student.year == years) {
      // Increment the corresponding count based on the student's gender
      if (student.gender == "M") {
        maleCount++;
      } else if (student.gender == "F") {
        femaleCount++;
      }
    }
  });
  console.log(maleCount, femaleCount);

  return { male: maleCount, female: femaleCount };
};
