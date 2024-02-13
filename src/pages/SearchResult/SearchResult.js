
import { HotelCard, Navbar} from "../../component/index"
import { Fragment} from "react";
import  {useEffect,useState} from "react";
import { useDate, useCategory} from "../../context/index";
import axios from "axios";

export const SearchResult = () => {
    const { destination } = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);

 
    
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
  }, [destination, hotelCategory]);

  const filteredSearchResults = hotels.filter(
    ({ city, address, state }) =>
      address.toLowerCase() === destination.toLowerCase() ||
      city.toLowerCase() === destination.toLowerCase() ||
      state.toLowerCase() === destination.toLowerCase()
  );

  console.log({ "filteredSearchResults": filteredSearchResults });
    return(
        <Fragment>
            <Navbar/>
            <section className="main d-flex align-center gap-larger">
        {filteredSearchResults ? (
          filteredSearchResults.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <h3>Nothing Found</h3>
        )}
      </section>

        </Fragment>
    )
}