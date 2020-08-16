const app = require("express")();
const appId = process.env.APPID;

app.get("/", (req, res) => 
    res.send(`appId ${appId} home page: says hello!`))

app.get("/app1", (req, res) =>
    res.send(`appId: ${appId} app1 page: says hello!`))

app.get("/app2", (req, res) =>
    res.send(`appId: ${appId} app2 page: says hello!`))

app.get("/admin", (req, res) => 
    res.send(`appId: ${appId} ADMIN page: very few people should see this`))

app.listen(8888, () => console.log(`${appId} is listening on 8888`))