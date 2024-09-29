import React from 'react';

const PinataImage = ({ cid }) => {
  const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

  return (
    <div>
      <h2>Image from IPFS</h2>
      <img src={ipfsUrl} alt="IPFS Content" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default PinataImage;
