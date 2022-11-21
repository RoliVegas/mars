import React from 'react'
import { useEffect, useState } from 'react';
import './Apod.css';

const Apod = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(response => {
                setData(response);
            });
        }
        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, [])

    return (
        <div className='apod-container'>
            { isLoading || !data 
            ? <div>Loading...</div>
            : <div className='content'>
                <h2>Astronomy Picture of the Day:</h2>
                <h3>{data.title}</h3>
                <div className='grid-container'>
                    <div>
                        <img src={data.url} alt='picture'></img>
                    </div>
                    <div>
                        <h3>Description:</h3>
                        <p>{data.explanation}</p>
                    </div>
                </div>
              </div> }
        </div>
    );
}

export default Apod