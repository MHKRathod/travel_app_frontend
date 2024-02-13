import "./SearchStayWithDate.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { DateSelector } from "../index";
import { useDate,useCategory } from "../../context/index";
import { useNavigate } from "react-router-dom";

export const SearchStayWithDate = () => {
    const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();

                  useEffect(() => {
                    (async () => {
                      try {
                        const { data } = await axios.get(
                          `https://apptravel-36748aa3fc07.herokuapp.com/api/hotels?category=${hotelCategory}`
                        );
                        setHotels(data);
                      } catch (err) {
                        console.log(err);
                      }
                    })();
                  }, [hotelCategory]);        
              
        

    const handleDestinationChange = (event) => {
        dateDispatch({
          type: "DESTINATION",
          payload: event.target.value,
        });
      };
    

      const handleGuestChange = (event) => {
        dateDispatch({
          type: "GUESTS",
          payload: event.target.value,
        });
      };

      const handleDestinationFocus = () => {
        dateDispatch({
          type: "SHOW_SEARCH_RESULT",
        });
      };
    
      
  const handleSearchResultClick = (address) => {
    dateDispatch({
      type: "DESTINATION",
      payload: address,
    });
  };
      const handleSearchButtonClick = () => {
        dateDispatch({
          type: "CLOSE_SEARCH_MODAL"
        });
        navigate(`/hotels/${destination}`);
      };
    
      const handleSearchCloseClick = () => {
        dateDispatch({
          type: "CLOSE_SEARCH_MODAL"
        })
      }

      const destinationOptions = hotels.filter(
        ({ address, city, state, country }) =>
          address.toLowerCase().includes(destination.toLowerCase()) ||
          city.toLowerCase().includes(destination.toLowerCase()) ||
          state.toLowerCase().includes(destination.toLowerCase()) ||
          country.toLowerCase().includes(destination.toLowerCase())
      );


   

    return (
<div className="destination-container">
      <div className="destionation-options d-flex align-center absolute">
        <div className="location-container">
          <label className="label">Where</label>
          <input
          value={destination}
            onChange={handleDestinationChange}
            onFocus={handleDestinationFocus}
            className="input search-dest"
          placeholder="Search Destination"
          autoFocus>
          </input>
          </div>
          <div className="location-container">
          <label className="label">Check in</label>
          <DateSelector placeholder="Check in" checkIntype="in" />
        </div>
        <div className="location-container">
          <label className="label">Check out</label>
          <DateSelector placeholder="Check out" checkIutype="out" />
        </div>
        <div className="location-container">
          <label className="label">No. of Guests</label>
          <input
          value={guests}
          onChange={handleGuestChange}
          placeholder="Search Destination">
          </input>
          </div>
          <div
          className="search-container d-flex align-center cursor"  onClick={handleSearchButtonClick}>
          <span className="material-icons-outlined">search</span>
          <span>Search</span>
          </div>
         <button className="button absolute close-search-dest"><span onClick={handleSearchCloseClick} className="highlight material-icons-outlined">
          highlight_off
        </span></button>
      </div>
      {isSearchResultOpen && (
        <div className="search-result-container absolute">
          {destinationOptions &&
            destinationOptions.map(({ address, city }) => (
              <p
                className="p cursor-pointer"
                onClick={() => handleSearchResultClick(address)}
              >
                {address}, {city}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
       
