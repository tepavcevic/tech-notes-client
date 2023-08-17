import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default function FullScreenLoader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100dvh', width: '100%' }}
    >
      <PulseLoader />
    </div>
  );
}
