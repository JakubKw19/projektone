var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var path = require("path");
var bodyParser = require("body-parser");
const { table } = require("console");
let users = []
let counter = 0;
let admintrue = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/register.html"))
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/login.html"))
})

app.get("/admin", function (req, res) {
    if (admintrue == true) {
        res.sendFile(path.join(__dirname + "/static/pages/admintrue.html"))
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }
})

app.get("/admintrue", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/admintrue.html"))
})

app.get("/logout", function (req, res) {
    admintrue = false;
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

app.post("/register", function (req, res) {
    counter = counter + 1;
    users.push({ id: counter, login: req.body.login, passwd: req.body.passwd, age: req.body.age, uczen: req.body.uczen, plec: req.body.plec })
    res.send("Witaj " + req.body.login + ", jesteś zarejestrowany")
})

app.post("/admin", function (req, res) {
    condition = false;
    for (i = 0; i < users.length; i++) {
        if (users[i].login == req.body.login && users[i].passwd == req.body.passwd) {
            condition = true;
        }
    }
    if (condition == true) {
        admintrue = true;
        res.redirect("/admin")
    }
})

app.get("/show", function (req, res) {
    if (admintrue == true) {
        tr = "";
        tab = "";
        inputuser = "";
        styles = " style='border: 1px solid orange; padding: 2px; margin: 1px; width: 400px; height: 40px;'"
        for (i = 0; i < users.length; i++) {
            td = "";
            checked = "";
            if (users[i].uczen == "on") {
                checked = "checked";
            }
            inputuser = "<input type='checkbox' name='uczen' " + checked + " disabled>";
            td += "<td" + styles + ">id: " + users[i].id + "</td>"
            td += "<td" + styles + ">user: " + users[i].login + " - " + users[i].passwd + "</td>"
            td += "<td" + styles + ">uczeń: " + inputuser + "</td>"
            td += "<td" + styles + ">wiek: " + users[i].age + "</td>"
            td += "<td" + styles + ">płeć: " + users[i].plec + "</td>"

            tr += "<tr>" + td + "</tr>"
        }
        tab = "<table style='font-size: 20px; margin-top: 20px;'>" + tr + "</table>";
        res.send("<html><head></head><body style='font-family: Courier, monospace; background-color: black; color: white; font-size: 20px;'><a style='color: white; margin: 20px;' href='/sort'>sort</a><a style='color: white; margin: 20px;' href='/gender'>gender</a><a style='color: white; margin: 20px;' href='/show'>show</a>" + tab + "</body></html>")
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }

})

app.get("/gender", function (req, res) {
    if (admintrue == true) {
        trk = "";
        trm = "";
        tabk = "";
        tabm = "";
        styles = " style='border: 1px solid orange; padding: 2px; margin: 1px; width: 400px; height: 40px;'"
        for (i = 0; i < users.length; i++) {
            td = "";
            if (users[i].plec == "k") {
                td += "<td" + styles + ">id: " + users[i].id + "</td>"
                td += "<td" + styles + ">płeć: " + users[i].plec + "</td>"
                trk += "<tr>" + td + "</tr>"
            }
        }
        for (i = 0; i < users.length; i++) {
            td = "";
            if (users[i].plec == "m") {
                td += "<td" + styles + ">id: " + users[i].id + "</td>"
                td += "<td" + styles + ">płeć: " + users[i].plec + "</td>"
                trm += "<tr>" + td + "</tr>"
            }
        }
        tabk = "<table style='font-size: 20px; margin-top: 20px;'>" + trk + "</table>";
        tabm = "<table style='font-size: 20px; margin-top: 20px;'>" + trm + "</table>";
        res.send("<html><head></head><body style='font-family: Courier, monospace; background-color: black; color: white; font-size: 20px;'><a style='color: white; margin: 20px;' href='/sort'>sort</a><a style='color: white; margin: 20px;' href='/gender'>gender</a><a style='color: white; margin: 20px;' href='/show'>show</a>" + tabk + tabm + "</body></html>")
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }

})

function sorting() {
    tr = "";
    tab = "";
    inputuser = "";
    styles = " style='border: 1px solid orange; padding: 2px; margin: 1px; width: 400px; height: 40px;'"

    for (i = 0; i < users.length; i++) {
        td = "";
        checked = "";
        if (users[i].uczen == "on") {
            checked = "checked";
        }
        inputuser = "<input type='checkbox' name='uczen' " + checked + " disabled>";
        td += "<td" + styles + ">id: " + users[i].id + "</td>"
        td += "<td" + styles + ">user: " + users[i].login + " - " + users[i].passwd + "</td>"
        td += "<td" + styles + ">uczeń: " + inputuser + "</td>"
        td += "<td" + styles + ">wiek: " + users[i].age + "</td>"
        td += "<td" + styles + ">płeć: " + users[i].plec + "</td>"

        tr += "<tr>" + td + "</tr>"
    }
    tab = "<table style='font-size: 20px; margin-top: 20px;'>" + tr + "</table>";

}

app.get("/sort", function (req, res) {
    if (admintrue == true) {
        users.sort(function (a, b) {
            return parseFloat(a.age) - parseFloat(b.age)
            console.log(users)
        })
        sorting();
        res.send("<html><head></head><body style='font-family: Courier, monospace; background-color: black; color: white; font-size: 20px;'><a style='color: white; margin: 20px;' href='/sort'>sort</a><a style='color: white; margin: 20px;' href='/gender'>gender</a><a style='color: white; margin: 20px;' href='/show'>show</a><form style='margin-top: 20px;' onchange='this.submit()' action='/sort' method='POST'><input type='radio' name='sort' value='nm' checked>rosnąco</input><input type='radio' name='sort' value='nw'>malejąco</input></form>" + tab + "</body></html>")
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }

})

app.post("/sort", function (req, res) {
    if (req.body.sort == "nm") {
        users.sort(function (a, b) {
            return parseFloat(a.age) - parseFloat(b.age)
            console.log(users)
        })
    } else if (req.body.sort == "nw") {
        users.sort(function (a, b) {
            return parseFloat(b.age) - parseFloat(a.age)
            console.log(users)
        })
    }
    sorting();
    if (req.body.sort == "nm") {
        res.send("<html><head></head><body style='font-family: Courier, monospace; background-color: black; color: white; font-size: 20px;'><a style='color: white; margin: 20px;' href='/sort'>sort</a><a style='color: white; margin: 20px;' href='/gender'>gender</a><a style='color: white; margin: 20px;' href='/show'>show</a><form style='margin-top: 20px;' onchange='this.submit()' method='POST'><input type='radio' name='sort' value='nm' checked>rosnąco</input><input type='radio' name='sort' value='nw'>malejąco</input></form>" + tab + "</body></html>")
    } else if (req.body.sort == "nw") {
        res.send("<html><head></head><body style='font-family: Courier, monospace; background-color: black; color: white; font-size: 20px;'><a style='color: white; margin: 20px;' href='/sort'>sort</a><a style='color: white; margin: 20px;' href='/gender'>gender</a><a style='color: white; margin: 20px;' href='/show'>show</a><form style='margin-top: 20px;' onchange='this.submit()' method='POST'><input type='radio' name='sort' value='nm'>rosnąco</input><input type='radio' name='sort' value='nw' checked>malejąco</input></form>" + tab + "</body></html>")
    }

})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("Start serwera na porcie " + PORT);
})
