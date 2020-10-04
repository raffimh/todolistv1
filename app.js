const express = require("express")
const ejs = require("ejs")
const app = express()
const bodyParser = require("body-parser")

const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    const day = today.toLocaleDateString("en-US", options)



    res.render("list", {
        listTitle: day,
        newListItems: items
    })
})

app.post("/", (req, res) => {

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })
})

app.post("/work", (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})