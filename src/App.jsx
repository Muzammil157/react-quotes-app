import { useEffect, useState } from 'react'
import './App.css'
import Quote from './Quote'
import Search from './Search';
import useFetch from './useFetch';

function App() {
  const [value, setValue] = useState('');
  const [skip, setSkip] = useState(0);
  const {data: quotes, isLoading, error, setLoading} = useFetch(`https://dummyjson.com/quotes?limit=10&skip=${skip}`)
  function changeValue(getValue) {
    setValue(getValue);
  }

  function goNext() {
    setSkip(skip + 10);
    setLoading(true);
  }

  function goPrevious(e) {
    if(skip == 0) {
      e.target.disabled = true;
    } else {
      setSkip(skip - 10);
    }
  }

  const filteredQuotes = quotes?.filter(quote => {
    return quote.author.toLowerCase().includes(value.toLowerCase());
  });
  return (
    <>
      <div className="main container">
        <h1 className='text-center bg-primary-subtle p-2 rounded mt-2'>Quotes</h1>
        <Search value={value} newValue={changeValue} />
        <div className="d-flex flex-column row-gap-2 my-3">
          {error && <p className='text-center text-danger fw-medium fs-3'>{error}</p>}
          {isLoading && <p className='text-center'>Loading...</p>}
          {filteredQuotes && filteredQuotes.map(quote =>
            <Quote author={quote.author} quoteId={quote.id} quote={quote.quote} key={quote.id} />
          )}
        </div>
        <div className="pagination-btns d-flex gap-2 justify-content-center mb-3">
          <div className="btn btn-primary" onClick={goPrevious}>Previous</div>
          <div className="btn btn-primary" onClick={goNext}>Next</div>
        </div>
      </div>
    </>
  )
}

export default App
