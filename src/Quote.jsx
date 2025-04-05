import React, { useState } from 'react'

export default function Quote({ quoteId, quote, author }) {
    const [popup, setPopup] = useState(false);
    return (
        <>
        <div role="button" className='bg-success-subtle p-2 rounded quote-div' onClick={()=> {setPopup(true)}}>
            <p>{quoteId}. {quote}</p>
            <p>Written by {author}</p>
        </div>
        {popup && 
        <div className='popup-div p-3 bg-info-subtle rounded-3'>
            <h2 className='text-decoration-underline'>{author}</h2>
            <p className='quote-detail'>“{quote}”</p>
            <button className='btn btn-primary' onClick={()=> {setPopup(false)}}>Close</button>
        </div>
        }
        </>
    )
}
