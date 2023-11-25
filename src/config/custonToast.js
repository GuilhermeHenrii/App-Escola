import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustonToast() {
  const CustomCloseButton = ({ closeToast }) => {
    <button type="button" className="custom-close-buton" onClick={closeToast}>
      X
    </button>;
  };

  const notify = () => {
    toast.info('Uma mensagem aleatória qualquer', {
      closeButton: <CustomCloseButton />,
    });
  };

  return (
    <div>
      <button type="button" onClick={notify}>
        Mostrar notificação
      </button>
    </div>
  );
}

export default CustonToast;
