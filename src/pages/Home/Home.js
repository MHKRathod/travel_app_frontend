import { Fragment,useEffect,useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {Navbar,HotelCard,Categories,SearchStayWithDate,Filter} from "../../component/index";
import { useCategory, useDate,useFilter } from "../../context/index";
import { getHotelsByPrice,getHotelsByRoomsAndBeds,getHotelsByPropertyType,getHotelsByRatings } from "../../utils/index";
import "./Home.css";


export const Home = () => {

    const [hasMore, setHasMore] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(16);
    const [testData, setTestData] = useState([]);
    const [hotels, setHotels] = useState([]);
    const { hotelCategory } = useCategory();
    const {isSearchModalOpen} = useDate();
    const{isFilterModalOpen,priceRange, noOfBathrooms,
        noOfBedrooms,
        noOfBeds,propertyType,traveloRating} = useFilter();

    console.log({"before api": hotelCategory})

   useEffect(() => {
    (async () => {
        try {
            const {data}= await axios.get(`https://apptravel-36748aa3fc07.herokuapp.com/api/hotels?category=${hotelCategory}`);
            console.log({"the dta in api":`https://apptravel-36748aa3fc07.herokuapp.com/api/hotels?category=${hotelCategory}`})
            console.log({"the data inside the useeffect":data})
          
            setTestData(data);
            setHotels(data ? data.slice(0, 16) : []);
        }
        catch(err) {
            console.log({"the error is ":err})
        }
        console.log({"after api": hotelCategory})
        
    })()
   },[hotelCategory])

   const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
        setHasMore(false);
        return;
      }
      setTimeout(() => {
        if (hotels && hotels.length > 0) {
          setHotels(
            hotels.concat(testData.slice(currentIndex, currentIndex + 16))
          );
          setCurrentIndex((prev) => prev + 16);
        } else {
          setHotels([]);
        }
      }, 1000);
    };

    const filteredHotelsByPrice = getHotelsByPrice(hotels, priceRange);
    const filteredHotelsByBedsAndRooms = getHotelsByRoomsAndBeds(
        filteredHotelsByPrice,
        noOfBathrooms,
        noOfBedrooms,
        noOfBeds
      );
      const filteredHotelsByPropertyType = getHotelsByPropertyType(
        filteredHotelsByBedsAndRooms,
        propertyType
      );
      
  const filteredHotelsByRatings = getHotelsByRatings(
    filteredHotelsByPropertyType,
    traveloRating
  );
    return (
        <Fragment>
            <Navbar />
            <Categories />
            {hotels && hotels.length > 0 ? (
                <InfiniteScroll
                    dataLength={hotels.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={hotels.length > 0 && <h3 className="alert-text">loading</h3>}
                    endMessage={<p className="alert-text">you have seen all</p>}
                >
                    <main className="main d-flex align-center wrap gap-larger">
                        {filteredHotelsByBedsAndRooms &&
                            filteredHotelsByBedsAndRooms.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
                    </main>
                </InfiniteScroll>
            ) : (
                <></>
            )}
            {
                isSearchModalOpen && <SearchStayWithDate />
            }
            {
                isFilterModalOpen && <Filter/>
            }

        </Fragment>
    );
};