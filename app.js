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

app.use(bodyParser.urlencoded({ extended: false }));

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

// app.get("/home", (req, res) => {
//     res.render("homePage.ejs", {
//         pageTitle: "Home Page",
//         text: "This is home page!",
//         path: "/home",
//         year: date,
//     });
// });

// app.get("/news", (req, res) => {
//     res.render("news.ejs", {
//         pageTitle: "News",
//         path: "/news",
//         year: date,
//     });
// });

// app.get("/contact", (req, res) => {
//     res.render("contact.ejs", {
//         pageTitle: "Contact",
//         path: "/contact",
//         year: date,
//     });
// });

// app.post("/search", (req, res) => {
//     const title = [req.body.title];
//     console.log(title);
//     res.render("index.ejs", {
//         pageTitle: "Home Page",
//         text: "Welcome on my website!",
//         title: req.body.title,
//         path: "/search",
//         year: date,
//     });
// });

// app.use((req, res) => {
//     res.status(404).render("404.ejs", {
//         pageTitle: "Page Not Found!",
//         message: `The URL "${req.rawHeaders[1]}${req.originalUrl}" doesn't exist`,
//         path: "/contact",
//     });
//     console.error("Failed to make request. Status code:", res.statusCode, "(Page not found)");
// });

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
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
