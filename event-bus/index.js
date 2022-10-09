const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())

const events = []

app.post("/events", (req, res) => {
    const event = req.body;

    events.push(event)


    axios.post("http://posts-clusterip-srv:4000/events", event).catch(err => console.log("Posts Service Error", err))//Posts service
    axios.post("http://comments-srv:4001/events", event).catch(err => console.log("Comments Service Error", err))//Comments service
    axios.post("http://query-srv:4002/events", event).catch(err => console.log("Query Service Error", err))//Query service
    axios.post("http://moderation-srv:4003/events", event).catch(err => console.log("Moderation Service Error", err))//Moderation service


    res.send({ status: "OK" })
})

app.get("/events", (req, res) => {
    res.send(events)
})

app.listen(4005, () => console.log(`Listening on http://localhost:4005`))