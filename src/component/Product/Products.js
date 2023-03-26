import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import { Box, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const navData = [
  {
    url: "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
    text: "Grocery",
  },
  {
    url: "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
    text: "SmartPhones",
  },
  {
    url: "https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100",
    text: "Fashion",
  },
  {
    url: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    text: "Laptop",
  },
  {
    url: "https://etimg.etb2bimg.com/photo/74881928.cms",
    text: "Sports",
  },
  {
    url: "https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
    text: "Appliances",
  },
  {
    url: "https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100",
    text: "Travel",
  },
  {
    url: "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
    text: "Beauty, Toys & More",
  },
];

const useStyle = makeStyles((theme) => ({
  component: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5rem 13rem 0 13rem",
    overflowX: "overlay",
    [theme.breakpoints.down("md")]: {
      margin: "5rem 3rem 0 13rem",
    },
  },
  container: {
    padding: "1rem 1rem",
    textAlign: "center",
  },
  image: {
    width: 64,
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "inherit",
  },
}));

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const classes = useStyle();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000])
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <Box className={classes.component} >
            {navData.map((temp) => (
              <Box key={temp.url} className={classes.container} onClick={()=>setCategory(temp.text)}>
                <img src={temp.url} className={classes.image} />
                <Typography className={classes.text}>{temp.text}</Typography>
              </Box>
            ))}
          </Box>
          
          <h2 className="productsHeading">Products</h2>
          
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />

         

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div> 
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
