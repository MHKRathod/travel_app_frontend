import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Fragment,useEffect,useState} from "react";
import {  Navbar } from '../../component';
import {HotelImages,HotelDetails,FinalPrice} from '../../component/index';

import "./SingleHotel.css";

export const SingleHotel = () => {

    const {id} = useParams();
    const [singleHotel,setSingleHotel] = useState([]);


    useEffect(() => {
        (async () => {
            try{
                 const {data} = await axios.get(`https://apptravel-36748aa3fc07.herokuapp.com/api/hotels/${id}`)
                 setSingleHotel(data);
                 console.log({"the single hotel":data})
            }
            catch(err){
                console.log(err)
            }
        })()
    },[id])

    const {name,country} = singleHotel;
    
    return(
           <Fragment>
               <Navbar/>
               <main className="single-hotel-page">
                <p className='hotel-name-add'>
                    {name},{country}
                </p>
                <HotelImages   singleHotel={singleHotel} />
                <div className='d-flex'>
                    <HotelDetails singleHotel={singleHotel}/>
                    <FinalPrice singleHotel={singleHotel}/>
                </div>
               </main>
           </Fragment>
    )
 
        
}