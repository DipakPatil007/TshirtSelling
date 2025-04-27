import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  // console.log("API Is", API);

  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        console.log(data);
        setproducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirts Store">
      <div className="row text-center">
        {/* <h2 className="text-white"> All of Tshirt</h2> */}
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-3 offset-1 mb-4">
                <Card product={product}/>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
