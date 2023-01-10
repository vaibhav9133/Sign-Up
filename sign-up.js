const express = require("express")
const request = require("request")
const bodyParse = require('body-parser')
const https = require("https")
const app = express();
app.use(express.static("public"))
app.use(bodyParse.urlencoded({ extended: true }))
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/sign-up.html")
})
app.post("/", function(req, res) {
    var firstName = req.body.fname
    var lastName = req.body.lname
    var emailid = req.body.email
    var data = {
        members: [{
            email_address: emailid,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/83308f5035";
    const options = {
        method: "POST",
        auth: "vaibhav1:192f73f36cf888d404681d7e2c5d7819-us21"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();
    console.log(firstName, lastName, emailid)
})
app.post("/failure", function(req, res) {
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function() {
        console.log("Server is running on port 3000")
    })
    //83308f5035

//api //192f73f36cf888d404681d7e2c5d7819-us21
//us21.api.mailchimp.com/3.0/lists/83308f5035/members/192f73f36cf888d404681d7e2c5d7819-us21