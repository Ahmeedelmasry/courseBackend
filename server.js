//Settings
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

//Create our express app
const app = express();

//Handle Cors and Middleware
app.use((req, res, next) => {
  res
    .header("Access-Control-Allow-Origin", "http://localhost:8080")
    .header("Access-Control-Allow-Methods", "GET, POST, HEAD, PUT, DELETE")
    .header(
      "Access-Control-Allow-Headers",
      "auth-token, Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  next();
});

//Config
app.use(bodyParser.json());

//Students
let students = [
  {
    id: 1,
    name: "Ahmed Elsayed",
    age: 13,
    grade: "First Grade",
    gender: "Male",
    favouritSports: ["Tennis", "Bascketball"],
  },
  {
    id: 2,
    name: "Eman Mohamed",
    age: 14,
    grade: "Second Grade",
    gender: "Female",
    favouritSports: ["Bascketball", "Swimming"],
  },
  {
    id: 3,
    name: "Mohamed Ibrahim",
    age: 12,
    grade: "First Grade",
    gender: "Male",
    favouritSports: ["Tennis", "Football"],
  },
  {
    id: 4,
    name: "Mai Othman",
    age: 15,
    grade: "Fourth Grade",
    gender: "Female",
    favouritSports: ["Bascketball"],
  },
  {
    id: 5,
    name: "Yassmin Osama",
    age: 14,
    grade: "Third Grade",
    gender: "Female",
    favouritSports: ["Skateboarding", "Swimming"],
  },
  {
    id: 6,
    name: "Moataz Ahmed",
    age: 15,
    grade: "Fourth Grade",
    gender: "Male",
    favouritSports: ["Scootering", "Gymnastics"],
  },
];

const attachId = (arr) => {
  arr.forEach((item, i) => {
    item.id = i + 1;
  });
};

app.get("/", (req, res) => {
  try {
    attachId(students);
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});

app.post("/add-student", (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.id = students.length + 1;
    students.push(reqBody);
    attachId(students);
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});
app.post("/update-student/:id", (req, res) => {
  try {
    students.forEach((st) => {
      if (st.id == req.params.id) {
        for (let [key, val] of Object.entries(req.body)) {
          if (st[key]) {
            st[key] = val;
          }
        }
      }
    });
    attachId(students);
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});
app.delete("/delete-student/:id", (req, res) => {
  try {
    students.forEach((st, i) => {
      if (st.id == req.params.id) {
        students.splice(i, 1);
      }
    });
    attachId(students);
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});

//Starting server
app.listen(process.env.PORT, () => {
  console.log(students);
  console.log(`Listining at port ${process.env.PORT || 3000}`);
});
