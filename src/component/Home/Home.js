import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

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
      margin: "5rem 1rem 0 1rem",
    },
  },
  container: {
    padding: "12px 8px",
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

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const classes = useStyle();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct("", 1, [0, 250000], category, 0));
  }, [dispatch, category, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Ecommerce Website"} />

          <Box className={classes.component} >
            {navData.map((temp) => (
              <Box key={temp.url} className={classes.container} onClick={()=>setCategory(temp.text)}>
                <img src={temp.url} alt="img" className={classes.image} />
                <Typography className={classes.text}>{temp.text}</Typography>
              </Box>
            ))}
          </Box>

          <div className="banner">
            <h1>Welcome to Ecommerce</h1>

          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
