import React from 'react'

const BnbPhotos = ({bnb, index=0, className=null} ) => {
    if (bnb.photos?.lenght) {
        return '';
    }
    if (!className) {
        className = 'object-cover';
    }
return (
        <img className={className} src={'http://localhost:4000/uploads/'+bnb.photos[index]} alt="" />
  )
}

export default BnbPhotos