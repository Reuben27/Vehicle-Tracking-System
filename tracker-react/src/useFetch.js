import { useState, useEffect } from "react";

//custom hooks in react need to start with 'use'
const useFetch = (url) =>{
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(true);
  
    useEffect(() => {
      const abortCont = new AbortController();

      fetch(url, {signal: abortCont.signal})
        .then((res) => {
          if(!res.ok){
            throw Error('The data could not be fetched');
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data); //State Hook wont cause infinte loops here due to the empty dependency [] in the useEffect.
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err.message);
          if(err.name === 'AbortError'){
            console.log('Fetch Aborted');
          }
          else{
            setError(err.message);
            setIsPending(false);
          }
        });

      return () => {
        console.log('cleanup');
        abortCont.abort();
      };

    }, [url]);

    return {data, isPending, error};
}

export default useFetch;