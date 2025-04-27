// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// GET route at '/api/:date?' where 'date' is an optional parameter, thus we use ?
app.get("/api/:date?", async (req, res) => {
  // Extract 'date' from route parameters
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    // If no 'date' parameter is provided, we use the current system date and time
    parsedDate = new Date();
  } else if (!isNaN(Number(date))) {
    // If 'date' can be converted to a valid number, we treat it as a Unix timestamp (milliseconds)
    parsedDate = new Date(Number(date));
  } else {
    // Otherwise, we assume 'date' is a date string and try parsing it directly
    parsedDate = new Date(date);
  }

  // Here we validate that 'parsedDate' is a real, valid date
  // 'instanceof Date' checks if it's a Date object
  // 'isNaN(parsedDate.getTime())' check if the Date object represents an invalid date, and if so we return Invalid Date
  if (parsedDate instanceof Date && isNaN(parsedDate.getTime())) {
    // If invalid we respond with an error message in JSON format
    return res.json({ error: "Invalid Date" });
  }

  // If valid, we respond with a JSON object containing the folowing:
  // - 'unix': timestamp in milliseconds
  // - 'utc': UTC string representation of the date
  return res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
