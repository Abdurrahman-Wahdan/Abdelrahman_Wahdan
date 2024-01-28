import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autosuggest from "react-autosuggest";
// icons
import { FaPlaneDeparture, FaPlaneArrival, FaCalendar } from "react-icons/fa";
import { PiAirplaneInFlightDuotone } from "react-icons/pi";

var containerCheck = 1;
const renderSuggestionsContainer = ({ containerProps, children, query }) => {
  // Only render the container if there are suggestions and there is input in the search bar
  if (query.trim().length === 0 || containerCheck === 0) {
    return null;
  }

  return (
    <div {...containerProps} className="autosuggest-container">
      {children}
    </div>
  );
};

const Search = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [response1, setResponse1] = useState(null);

  // Destinations with city name and airport code
  const destinations = [
    { city: "Istanbul", code: "IST" },
    { city: "Ankara", code: "ESB" },
    { city: "Antalya", code: "AYT" },
    { city: "Izmir", code: "ADB" },
  ];

  // Autosuggest functions for departure and arrival
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : destinations.filter(
          (destination) =>
            destination.city.toLowerCase().slice(0, inputLength) ===
              inputValue ||
            destination.code.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => `${suggestion.city}`;

  const renderSuggestion = (suggestion) => (
    <div>{`${suggestion.city} (${suggestion.code})`}</div>
  );

  // State and functions for departure and arrival autosuggest
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setDepartureSuggestions(getSuggestions(value));
    setArrivalSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setDepartureSuggestions([]);
    setArrivalSuggestions([]);
    containerCheck = 0;
  };

  const onDepartureChange = (event, { newValue }) => {
    setDepartureLocation(newValue);
    containerCheck = 1;
  };

  const onArrivalChange = (event, { newValue }) => {
    setArrivalLocation(newValue);
    containerCheck = 1;
  };

  const departureInputProps = {
    placeholder: "From",
    value: departureLocation,
    onChange: onDepartureChange,
  };

  const arrivalInputProps = {
    placeholder: "To",
    value: arrivalLocation,
    onChange: onArrivalChange,
  };

  // Function to handle change in return date
  const handleReturnDateChange = (date) => {
    if (departureDate && date < departureDate) {
      setReturnDate(null);
      alert("Return date should be after or equal to departure date");
    } else {
      setReturnDate(date);
    }
  };

  const handleSearch = () => {
    // Check if departure and arrival destinations are the same
    if (
      departureLocation.trim().toLowerCase() ===
      arrivalLocation.trim().toLowerCase()
    ) {
      alert("Departure and arrival destinations cannot be the same.");
      return;
    }

    if (
      tripType === "oneWay" &&
      (!departureDate || !departureLocation || !arrivalLocation)
    ) {
      alert("Please fill in all the required fields.");
      return;
    } else if (
      tripType === "roundTrip" &&
      (!departureDate || !returnDate || !departureLocation || !arrivalLocation)
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Prepare the data to send to the API
    const requestData = {
      depCity: departureLocation,
      arrCity: arrivalLocation,
      depTime: departureDate.toISOString(), // Convert to ISO string format
      arrTime: returnDate ? returnDate.toISOString() : null, // Convert to ISO string format if returnDate is provided
    };

    // Construct the query parameters
    const queryParams = new URLSearchParams(requestData).toString();

    // Construct the final URL
    const apiUrl = `http://localhost:5000/get?${queryParams}`;

    // Make the GET request to your API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data.response.duration);
        setResponse1(data); // Update response1 with the fetched data
        setSearched(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div className="btns flex">
          <div
            className={`singleBtn ${tripType === "oneWay" ? "active" : ""}`}
            onClick={() => setTripType("oneWay")}
          >
            <span>One Way</span>
          </div>
          <div
            className={`singleBtn ${tripType === "roundTrip" ? "active" : ""}`}
            onClick={() => setTripType("roundTrip")}
          >
            <span>Round Trip</span>
          </div>
        </div>

        <div className="searchInputs flex">
          {/* Departure */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <FaPlaneDeparture className="icon" />
            </div>
            <div className="texts">
              <h4>Departure</h4>
              <Autosuggest
                suggestions={departureSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={departureInputProps}
                renderSuggestionsContainer={renderSuggestionsContainer}
                shouldRenderSuggestions={(value) => value.trim().length > 0}
              />
            </div>
          </div>
          {/* Arrival */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <FaPlaneArrival className="icon" />
            </div>
            <div className="texts">
              <h4>Arrival</h4>
              <Autosuggest
                suggestions={arrivalSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={arrivalInputProps}
                renderSuggestionsContainer={renderSuggestionsContainer}
                shouldRenderSuggestions={(value) => value.trim().length > 0}
              />
            </div>
          </div>
          {/* Departure Date */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <FaCalendar className="icon" />
            </div>
            <div className="texts">
              <h4>Departure Date</h4>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                placeholderText="Select Departure Date"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          {/* Return Date */}
          {tripType === "roundTrip" && (
            <div className="singleInput flex">
              <div className="iconDiv">
                <FaCalendar className="icon" />
              </div>
              <div className="texts">
                <h4>Return Date</h4>
                <DatePicker
                  selected={returnDate}
                  onChange={handleReturnDateChange}
                  placeholderText="Select Return Date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
          )}
          <button className="btn btnBlock flex" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {searched && (
        <div className="info section">
          <div className="infoContainer container">
            <div className="titleDiv flex">
              <h2>Available Flights</h2>
            </div>
            <div className="cardsDiv grid">
              <div className="singleCard grid">
                <p className="price">
                  Flight Duration <b>{response1.response.duration}</b>
                </p>
                <span className="cardTitle">
                  {response1.response.depCity}
                  <br />
                  {response1.response.depTime}
                </span>
                <div className="iconDiv flex">
                  <PiAirplaneInFlightDuotone className="icon" />
                </div>
                <span className="cardTitle">
                  {response1.response.arrCity}
                  <br />
                  {response1.response.arrTime}
                </span>
                <p className="price">
                  Price <b>{response1.response.price}</b>
                </p>
              </div>
              <div className="singleCard grid">
                <p className="price">
                  Flight Duration <b>{response1.response.duration1}</b>
                </p>
                <span className="cardTitle">
                  {response1.response.depCity1}
                  <br />
                  {response1.response.depTime1}
                </span>
                <div className="iconDiv flex">
                  <PiAirplaneInFlightDuotone className="icon" />
                </div>
                <span className="cardTitle">
                  {response1.response.arrCity1}
                  <br />
                  {response1.response.arrTime1}
                </span>
                <p className="price">
                  Price <b>{response1.response.price1}</b>
                </p>
              </div>
              <div className="singleCard grid">
                <p className="price">
                  Flight Duration <b>{response1.response.duration2}</b>
                </p>
                <span className="cardTitle">
                  {response1.response.depCity2}
                  <br />
                  {response1.response.depTime2}
                </span>
                <div className="iconDiv flex">
                  <PiAirplaneInFlightDuotone className="icon" />
                </div>
                <span className="cardTitle">
                  {response1.response.arrCity2}
                  <br />
                  {response1.response.arrTime2}
                </span>
                <p className="price">
                  Price <b>{response1.response.price2}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
