import axios from "axios";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { IProduct } from "../models";
import ErrorMessage from "./ErrorMessage";

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

const CreateProduct = ({ onCreate }: CreateProductProps) => {
  const [value, setValue] = useState<IProduct>({
    title: "",
    price: 0,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
    rating: {
      rate: 42,
      count: 10,
    },
  });
  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");

  const changeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue((prev) => {
      return { ...prev, title: e.target.value };
    });
    // setValue(e.target.value);
  };

  const changeInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return { ...prev, price: Number(e.target.value) };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    if (value.title.trim().length === 0) {
      setTitleError("Please enter valid title");
      hasError = true;
    } else {
      setTitleError("");
    }
    if (value.price === 0) {
      setPriceError("Please enter valid price");
      hasError = true;
    } else {
      setPriceError("");
    }

    if (hasError) {
      return;
    }
    const response = await axios.post(
      "https://fakestoreapi.com/products",
      value
    );
    onCreate(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        onChange={changeInput}
        value={value.title}
        type="text"
        placeholder="Enter product title..."
        className="border py-2 px-4 mb-2 w-full outline-0"
      />
      {titleError && <ErrorMessage error={titleError} />}
      <input
        type="number"
        value={value.price}
        onChange={changeInputPrice}
        placeholder="Enter product price"
        className="border py-2 px-4 mb-2 w-full outline-0"
      />
      {priceError && <ErrorMessage error={priceError} />}
      <button
        type="submit"
        className="py-2 px-4 border bg-yellow-400 hover:text-white"
      >
        Create
      </button>
    </form>
  );
};

export default CreateProduct;
