import { title } from "process";
import React, { PropsWithChildren } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
}
const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  onClose,
}) => {
  return (
    <>
      <div
        className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
        onClick={onClose}
      />
      <div className="w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2">
        <h1 className="text-center text-2xl mb-2">{title}</h1>
        {children}
      </div>
    </>
  );
};

export default Modal;
