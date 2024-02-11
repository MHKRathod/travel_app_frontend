import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { useCategory } from "../../context/category-context";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [numberOfCategoriesToShow, setNumberOfCategoriesToShow] = useState(0);
    const { hotelCategory,setHotelCategory} = useCategory(); // Adjusted to directly access state and setState

    const handRightButtonCLick = () => {
        setNumberOfCategoriesToShow((prev) => prev + 10);
    };

    const handLeftButtonCLick = () => {
        setNumberOfCategoriesToShow((prev) => prev - 10);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("https://apptravel-36748aa3fc07.herokuapp.com/api/categorydata");
                const categoriesToShow = data.slice(
                    numberOfCategoriesToShow + 10 > data.length ? data.length - 10 : numberOfCategoriesToShow,
                    numberOfCategoriesToShow > data.length ? data.length : numberOfCategoriesToShow + 10
                );
                setCategories(categoriesToShow);
                console.log(categoriesToShow);
                console.log({ "hotel category": hotelCategory });
            } catch (error) {
                console.log(error);
            }
        })();
    }, [numberOfCategoriesToShow,hotelCategory]);

    const handleCategoryClick = (category) => {
        setHotelCategory(category);
    };



    return (
        <section className="categories d-flex gap-large cursor-pointer">
            {numberOfCategoriesToShow >= 10 && (
                <button
                    className="button btn-category btn-left  cursor-pointer"
                    onClick={handLeftButtonCLick}
                >
                    <span className="material-icons-outlined">chevron_left</span>
                </button>
            )}
            {categories &&
                categories.map(({ _id, category }) => (
                    <span className={`${category === hotelCategory ? "border-bottom" : ""}`}
                     key={_id} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </span>
                ))}
            {numberOfCategoriesToShow - 10 < categories.length && (
                <button
                    className="button btn-category btn-right  cursor-pointer"
                    onClick={handRightButtonCLick}
                >
                    <span className="material-icons-outlined">chevron_right</span>
                </button>
            )}
        </section>
    );
};