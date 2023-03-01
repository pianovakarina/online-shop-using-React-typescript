import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../models";

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addProduct = (product: IProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  const fetchProducts = async () => {
    try {
      setError("");
      setLoading(true);
      // const response = await axios.get<IProduct[]>(
      //   "https://fakestoreapi.com/products?limit=5"
      // );
      const response = await axios.request<IProduct[]>({
        method: "get",
        url: "https://fakestoreapi.com/products?limit=5",
      });

      setProducts(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { error, loading, products, addProduct };
};

export default useProducts;
