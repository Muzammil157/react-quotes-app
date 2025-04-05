import { useEffect, useState } from 'react'
import './App.css'
import Quote from './Quote'
import Search from './Search';

function App() {
  const [quotes, setQuotes] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');
  function changeValue(getValue) {
    setValue(getValue);
  }

  const filteredQuotes = quotes?.filter(quote => {
    return quote.author.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    fetch('/data.json')
      .then(res => {
        if (!res.ok) {
          throw Error('Fetch not processed');
        }
        return res.json()
      })
      .then((data) => {
        setQuotes(data.quotes);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      })
  }, [])
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
      </div>
    </>
  )
}

export default App
