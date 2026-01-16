const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const rootDir = require("./util/path");

const app = express();
const port = 3000;
const date = new Date().getFullYear();
const age = calculateAge('1997-09-10')

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

// It allows the server to transmit together with the templates (html/ejs files) the css and javascript rules (static files) required by the templates themselves.
app.use(express.static(path.join(rootDir, "public")));
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        path: "/",
        year: date,
        myAge: age,
    });
});

app.listen(port, () => {
    console.log(`Backend server is running on https://localhost:${port}`);
});


/**
 * Calculate Age
 */
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear() - 1;
  const monthDiff = (today.getMonth()) - (birth.getMonth());
  const dayDiff = (today.getDate()) - (birth.getDate()); 

  if (monthDiff === 0 && dayDiff <= 0) {
    age++;
  }

  return age;
}
