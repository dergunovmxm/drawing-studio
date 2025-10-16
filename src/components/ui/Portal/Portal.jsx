import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const el = document.getElementById('modal-root');
  if (!el) return null;
  return createPortal(children, el);
};

export default Portal;
