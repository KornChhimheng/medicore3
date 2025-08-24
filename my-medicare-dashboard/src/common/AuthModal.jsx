import React from "react";

const AuthModal = ({ isOpen, onClose, onSignIn, onSignOut }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Account Options</h2>
        <button onClick={onSignIn}>Sign In</button>
        <button onClick={onSignOut}>Sign Out</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;
