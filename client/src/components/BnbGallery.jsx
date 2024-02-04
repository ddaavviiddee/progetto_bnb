import React, { useState } from 'react'

const BnbGallery = ({ bnb }) => {

    const [showAll, setShowAll] = useState(false);

    // Mostra le foto del bnb
    if (showAll) {
        return (
            <div className='absolute bg-white min-w-full min-h-full inset-0'>
                <div className='p-8 grid gap-4' >
                    <div>
                        <h2 className='text-2xl mr-48'>Ecco le foto di {bnb.title}</h2>
                        <button onClick={() => { setShowAll(false) }} className='fixed flex gap-1 py-2 px-4 rounded-2xl bg-gray-500 text-white right-8 top-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            Chiudi galleria
                        </button>
                    </div>
                    {bnb?.photos?.length > 0 && bnb.photos.map(photo => (
                        <div key={photo}>
                            <img src={"http://localhost:4000/uploads/" + photo} alt="" />
                        </div>
                    ))}
                </div>

            </div>
        )
    }

    return (

        <div className='relative'>
            <div className='grid gap-2 md:grid-cols-[2fr_1fr] lg:grid-cols-[6fr_3fr] rounded-2xl overflow-hidden'>
                <div className='grow object-cover'>
                    {bnb.photos?.[0] && (
                        <div>
                            <img onClick={() => { setShowAll(true) }} className='aspect-square object-cover cursor-pointer grow' src={'http://localhost:4000/uploads/' + bnb.photos[0]} alt="" />
                        </div>
                    )}
                </div>
                <div className='grid'>
                    {bnb.photos?.[1] && (
                        <img onClick={() => { setShowAll(true) }} className='aspect-square object-cover cursor-pointer' src={'http://localhost:4000/uploads/' + bnb.photos[1]} alt="" />
                    )}

                    <div className='overflow-hidden'>
                        {bnb.photos?.[2] && (
                            <img onClick={() => { setShowAll(true) }} className='aspect-square object-cover relative top-2 cursor-pointer' src={'http://localhost:4000/uploads/' + bnb.photos[2]} alt="" />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAll(true)} className='absolute bottom-2 right-2 py-1 px-3 bg-white bg-opacity-80 rounded-2xl cursor-pointer flex gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Mostra di più
            </button>
        </div>

    )
}

export default BnbGallery