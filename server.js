const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// helping functions
function getRandomDuration() {
  const hours = Math.floor(Math.random() * 4) + 1; // Random duration between 1 and 4 hours
  const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
  return `${hours}h ${minutes}m`;
}

// Helper function to get a random time (formatted as "HH:MM")
function getRandomTime() {
  const hours = Math.floor(Math.random() * 24); // Random hours between 0 and 23
  const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59

  // Ensure hours are within 0-23 range
  const validHours = hours % 24;

  // Ensure minutes are within 0-59 range
  const validMinutes = minutes % 60;

  const paddedHours = validHours < 10 ? "0" + validHours : validHours; // Ensure hours are two digits
  const paddedMinutes = validMinutes < 10 ? "0" + validMinutes : validMinutes; // Ensure minutes are two digits

  return `${paddedHours}:${paddedMinutes}`;
}

// Helper function to add time in format "HH:MM" and duration in format "Xh Xm"
function addTime(time, duration) {
  const [hoursStr, minutesStr] = time.split(":").map((str) => parseInt(str));
  const [durationHours, durationMinutes] = duration
    .split("h ")
    .map((str) => parseInt(str));
  const totalHours = hoursStr + durationHours;
  const totalMinutes = minutesStr + durationMinutes;
  const newHours = totalHours + Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  const paddedHours = newHours < 10 ? "0" + newHours : newHours; // Ensure hours are two digits
  const paddedMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes; // Ensure minutes are two digits
  return `${paddedHours}:${paddedMinutes}`;
}

// Helper function to get a random price (formatted as "TRY X,XXX")
function getRandomPrice() {
  const price = Math.floor(Math.random() * 8000) + 2000; // Random price between 2000 and 9999 TRY
  return `TRY ${price}`;
}

// Enable CORS for all routes
app.use(cors());

// Your routes and other middleware configurations

// Endpoint to handle GET request with parameters
app.get("/get", (req, res) => {
  // Retrieve parameters from query string
  const { depCity, arrCity, depTime, arrTime } = req.query;

  // Example logic to process parameters and generate response
  const response = getData(depCity, arrCity, depTime, arrTime);

  // Send response with airport name
  res.json({ response });

  console.log(response);
});

// Function to get airport name based on city and date (example)
function getData(depCity, arrCity, depTime, arrTime) {
  if (depCity == "Ankara" && arrCity == "Istanbul") {
    response = {
      duration: "1h 10m",
      depCity: "Ankara ESB Airport",
      arrCity: "Istanbul Airport",
      depTime: "00:00",
      arrTime: "01:00",
      price: "TRY 2.500",
      duration1: "1h 00m",
      depCity1: "Ankara ESB Airport",
      arrCity1: "Istanbul Airport",
      depTime1: "10:00",
      arrTime1: "11:00",
      price1: "TRY 3.500",
      duration2: "1h 20m",
      depCity2: "Ankara ESB Airport",
      arrCity2: "Istanbul Airport",
      depTime2: "15:00",
      arrTime2: "16:00",
      price2: "TRY 1.800",
    };
  } else if (depCity == "Ankara" && arrCity == "Izmir") {
    response = {
      duration: "1h 30m",
      depCity: "Ankara ESB Airport",
      arrCity: "Izmir Airport",
      depTime: "00:00",
      arrTime: "01:30",
      price: "TRY 5.500",
      duration1: "1h 40m",
      depCity1: "Ankara ESB Airport",
      arrCity1: "Izmir Airport",
      depTime1: "10:00",
      arrTime1: "11:40",
      price1: "TRY 3.500",
      duration2: "1h 20m",
      depCity2: "Ankara ESB Airport",
      arrCity2: "Izmir Airport",
      depTime2: "15:00",
      arrTime2: "16:20",
      price2: "TRY 2.800",
    };
  } else if (depCity == "Ankara" && arrCity == "Antalya") {
    response = {
      duration: "3h 30m",
      depCity: "Ankara ESB Airport",
      arrCity: "Antalya Airport",
      depTime: "00:00",
      arrTime: "03:30",
      price: "TRY 7.500",
      duration1: "3h 40m",
      depCity1: "Ankara ESB Airport",
      arrCity1: "Antalya Airport",
      depTime1: "10:00",
      arrTime1: "13:40",
      price1: "TRY 5.500",
      duration2: "3h 20m",
      depCity2: "Ankara ESB Airport",
      arrCity2: "Antalya Airport",
      depTime2: "15:00",
      arrTime2: "18:20",
      price2: "TRY 4.800",
    };
  } else if (depCity == "Istanbul" && arrCity == "Ankara") {
    response = {
      duration: "1h 20m",
      depCity: "Istanbul Airport",
      arrCity: "Ankara ESB Airport",
      depTime: "00:00",
      arrTime: "01:20",
      price: "TRY 2.500",
      duration1: "1h 30m",
      depCity1: "Istanbul Airport",
      arrCity1: "Ankara ESB Airport",
      depTime1: "10:00",
      arrTime1: "11:30",
      price1: "TRY 5.500",
      duration2: "1h 20m",
      depCity2: "Istanbul Airport",
      arrCity2: "Ankara ESB Airport",
      depTime2: "15:00",
      arrTime2: "16:20",
      price2: "TRY 4.800",
    };
  } else if (depCity == "Istanbul" && arrCity == "Antalya") {
    response = {
      duration: getRandomDuration(),
      depCity: "Istanbul Airport",
      arrCity: "Antalya Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Istanbul Airport",
      arrCity1: "Antalya Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Istanbul Airport",
      arrCity2: "Antalya Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  } else if (depCity == "Istanbul" && arrCity == "Izmir") {
    response = {
      duration: getRandomDuration(),
      depCity: "Istanbul Airport",
      arrCity: "Izmir Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Istanbul Airport",
      arrCity1: "Izmir Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Istanbul Airport",
      arrCity2: "Izmir Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  } else if (depCity == "Izmir" && arrCity == "Ankara") {
    response = {
      duration: getRandomDuration(),
      depCity: "Izmir Airport",
      arrCity: "Ankara ESB Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Izmir Airport",
      arrCity1: "Ankara ESB Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Izmir Airport",
      arrCity2: "Ankara ESB Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  } else if (depCity == "Izmir" && arrCity == "Antalya") {
    response = {
      duration: getRandomDuration(),
      depCity: "Izmir Airport",
      arrCity: "Antalya Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Izmir Airport",
      arrCity1: "Antalya Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Izmir Airport",
      arrCity2: "Antalya Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  } else if (depCity == "Izmir" && arrCity == "Istanbul") {
    response = {
      duration: getRandomDuration(),
      depCity: "Izmir Airport",
      arrCity: "Istanbul Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Izmir Airport",
      arrCity1: "Istanbul Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Izmir Airport",
      arrCity2: "Istanbul Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  } else if (depCity == "Antalya" && arrCity == "Istanbul") {
    response = {
      duration: getRandomDuration(),
      depCity: "Antalya Airport",
      arrCity: "Istanbul Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Antalya Airport",
      arrCity1: "Istanbul Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Antalya Airport",
      arrCity2: "Istanbul Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  } else if (depCity == "Antalya" && arrCity == "Izmir") {
    response = {
      duration: getRandomDuration(),
      depCity: "Antalya Airport",
      arrCity: "Izmir Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Antalya Airport",
      arrCity1: "Izmir Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Antalya Airport",
      arrCity2: "Izmir Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  } else if (depCity == "Antalya" && arrCity == "Ankara") {
    response = {
      duration: getRandomDuration(),
      depCity: "Antalya Airport",
      arrCity: "Ankara ESB Airport",
      depTime: getRandomTime(),
      arrTime: addTime(getRandomTime(), "1h 20m"), // Add 1 hour 20 minutes to departure time
      price: getRandomPrice(),
      duration1: getRandomDuration(),
      depCity1: "Antalya Airport",
      arrCity1: "Ankara ESB Airport",
      depTime1: addTime(getRandomTime(), "10h 00m"), // Add 10 hours to departure time
      arrTime1: addTime(getRandomTime(), "11h 20m"), // Add 11 hours 20 minutes to departure time
      price1: getRandomPrice(),
      duration2: getRandomDuration(),
      depCity2: "Antalya Airport",
      arrCity2: "Ankara ESB Airport",
      depTime2: addTime(getRandomTime(), "15h 00m"), // Add 15 hours to departure time
      arrTime2: addTime(getRandomTime(), "16h 20m"), // Add 16 hours 20 minutes to departure time
      price2: getRandomPrice(),
    };
  }
  return response;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
