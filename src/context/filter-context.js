import {createContext,useContext,useReducer} from "react";
import {filterReducer} from "../reducer/index";

const InitialValue= {
    isFilterModalOpen: false,
    priceRange: [300, 20000],
    noOfBathrooms: "Any",
    noOfBedrooms: "Any",
    noOfBeds: "Any",
    propertyType: "Any",
    traveloRating: 1
}
const FilterContext = createContext(InitialValue);


const FilterProvider = ({children}) => {


    const [{isFilterModalOpen,priceRange,noOfBathrooms,
        noOfBedrooms,
        noOfBeds, propertyType, traveloRating},filterDispatch] = useReducer(filterReducer,InitialValue)
    return(
        <FilterContext.Provider value={{isFilterModalOpen,priceRange,noOfBathrooms,
            noOfBedrooms,
            noOfBeds, propertyType, traveloRating,filterDispatch}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter = () => useContext(FilterContext);

export {useFilter,FilterProvider};