import React, { useContext } from "react";
import CreateProduct from "../components/CreateProduct";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Product from "../components/Product";
import { ModalContext } from "../context/ModalContext";
import useProducts from "../hooks/useProducts";
import { IProduct } from "../models";

const ProductPage = () => {
  const { error, loading, products, addProduct } = useProducts();

  const { close, modal, open } = useContext(ModalContext);

  const createHandler = (product: IProduct) => {
    close();
    addProduct(product);
  };

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
      {modal && (
        <Modal title="Create new product" onClose={close}>
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}
      <button
        className="fixed bottom-5 right-5 rounded-full bg-yellow-700 text-white text-2xl px-4 py-2"
        onClick={open}
      >
        +
      </button>
    </div>
  );
};

export default ProductPage;
