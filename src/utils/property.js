export const getHotelsByPropertyType = (hotels, propertyType) => {
    console.log("hey Property type:", propertyType);
    if (propertyType === "Any") {
      console.log("Returning all hotels");
      return hotels;
    }
    const filteredHotels = hotels.filter(
      (hotel) => hotel.propertyType === propertyType
    );
    console.log("Filtered hotels:", filteredHotels);
    return filteredHotels;
  };