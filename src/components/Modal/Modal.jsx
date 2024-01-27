import { useEffect } from 'react';
import { ModalContainer, ModalBox } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const handleClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, []);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalContainer onClick={handleBackdropClick}>
      <ModalBox>{children}</ModalBox>
    </ModalContainer>,
    modalRoot
  );
};

// export class Modal extends Component {
//   handleClose = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleClose);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleClose);
//   }

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <ModalContainer onClick={this.handleBackdropClick}>
//         <ModalBox>{this.props.children}</ModalBox>
//       </ModalContainer>,
//       modalRoot
//     );
//   }
// }
