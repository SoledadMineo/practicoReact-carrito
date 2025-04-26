import { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

declare var bootstrap: any; // Para que TypeScript no se queje

type Props = {
  mensaje: string;
};

const ToastBootstrap = ({ mensaje }: Props) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      const toastInstance = bootstrap.Toast.getOrCreateInstance(
        toastRef.current
      );
      toastInstance.show();
    }
  }, [mensaje]);

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div
        ref={toastRef}
        className="toast align-items-center text-bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{mensaje}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ToastBootstrap;
