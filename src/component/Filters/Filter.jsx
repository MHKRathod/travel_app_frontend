import { PriceRange,PropertyType,RoomsAndBeds,Ratings,FreeCancel } from "./index";
import {useFilter} from "../../context/index";
import "./Filters.css";

export const Filter=() => {

     const {filterDispatch} = useFilter();
    const handleFilterModalClose = () => {
      console.log("clickfilter")
        filterDispatch({
            type: "SHOW_FILTER_MODAL"
        })
    }
    // console.log({"clicksssss" : handleFilterModalClose})

    return(
        <div className="filter-modal">
      <div className="filter-page shadow">
        <div className="d-flex align-center justify-space-between">
          {/* <span className="filter-label">Filter</span> */}
          <button
            className="button btn-filter-close cursor-pointer d-flex align-center justify-center" onClick={handleFilterModalClose}
          >
            <span className="material-icons-outlined">filter</span>
          </button>
          <button
            className="button btn-filter-close cursor-pointer d-flex align-center justify-center" onClick={handleFilterModalClose}
          >
            <span className="material-icons-outlined">close</span>
          </button>
          </div>
          <PriceRange/>
          <RoomsAndBeds/>
          <PropertyType/>
          <Ratings/>
          <FreeCancel/>
          <div className="d-flex align-center justify-space-between">
            <button className="button cursor btn-link-primary">clear all</button>
            <button className="button cursor btn-primary btn-apply">apply all</button>
          </div>
          </div>
          </div>
    )
}