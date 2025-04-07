import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('Fetch not processed');
                }
                return res.json()
            })
            .then((data) => {
                setData(data.quotes);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }, [url])

    return { data, isLoading, error , setLoading };
}

export default useFetch;