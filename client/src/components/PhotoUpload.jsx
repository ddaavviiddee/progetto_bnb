import React, { useState } from 'react'
import axios from 'axios';

const PhotoUpload = ({ addedPhotos, onChange }) => {


    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoLink(e) {

        e.preventDefault();
        const { data: filename } = await axios.post('/uploadlink', { link: photoLink })
        // Questo serve a comporre il rullino delle foto aggiunte comprese le foto già aggiunte
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');

    };

    function removePhoto(e, link) {
        e.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== link)]);
    }

    function selectMainPhoto(e, link) {
        e.preventDefault();

        onChange([link, ...addedPhotos.filter(photo => photo !== link)]);
    }
    // 4:45, ma va sistemata la pagina dei bnb
    async function uploadPhoto(e) {
        const files = e.target.files;
        // Questo serve a mandare più di una foto come coppie chiave valore in un array come se fosse un form
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        const response = await axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }); // Da qui viene settato il content type per accettare il form data

        // Estrae il nome del file dalla risposta http e lo setta nell'array
        const { data: filenames } = response;

        onChange(prev => {
            return [...prev, ...filenames];
        });



    }
    return (
        <>
            <div className='flex gap-2'>
                <input value={photoLink}
                    onChange={e => setPhotoLink(e.target.value)}
                    type="text" placeholder='Aggiungi usando un link ...jpg' />
                <button onClick={addPhotoLink} className='bg-primary text-white px-2 m-2 rounded-2xl'>Inserisci</button>
            </div>

            <p className='text-gray-500 text-sm mt-4'>Oppure inserisci delle foto dal tuo dispositivo.</p>

            <div className='mt-4 grid grid-cols-3 md:grid-col-4 lg:grid-cols-6 gap-2'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className='h-48 flex relative' key={link}>
                        <img className='rounded-2xl object-cover w-full' src={"http://localhost:4000/uploads/" + link} alt="" />
                        <button onClick={(e) => removePhoto(e, link)} className='absolute bottom-1 right-1 p-1 bg-white bg-opacity-60 rounded-2xl cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <button onClick={(e) => selectMainPhoto(e, link)} className='absolute bottom-1 left-1 p-1 text-red-600 bg-white bg-opacity-60 rounded-2xl cursor-pointer'>
                            {link === addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                              
                            )}
                            {link !== addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>)}
                            
                        </button>
                    </div>
                ))}
                <label className='flex items-center justify-center border bg-transparent border-black rounded-2xl py-4 px-6 cursor-pointer'>
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataslot="icon" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                </label>
            </div>
        </>
    )
}

export default PhotoUpload