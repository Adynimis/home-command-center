const express = require("express");
const cors = require("cors");

const fs = require("fs");
const app = express();
app.use(cors());

app.use(express.json());

// Load JSON
function loadStorage() {
    return JSON.parse(fs.readFileSync("storage.json", "utf8"));
}

// Save JSON
function saveStorage(data) {
    fs.writeFileSync("storage.json", JSON.stringify(data, null, 2));
}

// Add a task
app.post("/add-task", (req, res) => {
    const data = loadStorage();
    const newTask = req.body;

    data.tasklist.push(newTask);

    saveStorage(data);

    res.json({ message: "Task added", task: newTask });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
