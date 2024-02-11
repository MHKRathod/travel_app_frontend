import { createContext,useContext,useState } from "react";

 const initalValue = "National Park"   

const CategoryContext = createContext(initalValue);

const CategoryProvider = ({children}) => {

    const [hotelCategory,setHotelCategory] = useState(initalValue);


    return(
        <CategoryContext.Provider value={{hotelCategory,setHotelCategory}}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategory = () => useContext(CategoryContext);

export {useCategory,CategoryProvider};