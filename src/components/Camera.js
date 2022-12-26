import React, { useEffect, useState } from 'react'

const Camera = () => {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [camera, setCamera] = useState(undefined);
    const [rover, setRover] = useState(undefined);

    const getDateString = () => {
        let date = new Date();
        let dateString = date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDay();
        console.log(dateString);
        return dateString;
    }

    const fetchData = async () => {
        setIsLoading(true);
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${getDateString()}&api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(response => {
            setData(response);
            console.log(response);
        });
        setIsLoading(false);
    }

    const updateSelection = (type, value) => {

        if(type === 'camera') setCamera(value);
        if(type === 'rover') setRover(value);

        if(rover && camera) {
            fetchData();
        } 
    }

    const getImage = () => {
        console.log('Getting image');
    }

    return (
        <div className='apod-container'>
            <div className='content'>
                <h2>Mars Rover Cam:</h2>
                <select name='camera' onChange={ e => updateSelection('camera', e.target.value)}>
                    <option value={'fhaz'}>Front Hazard Avoidance Camera</option>
                    <option value={'rhaz'}>Rear Hazard Avoidance Camera</option>
                    <option value={'navcam'}>Navigation Camera</option>
                </select>

                <select name='rover' onChange={e => updateSelection('rover', e.target.value)}>
                    <option value={'curiosity'}>Curiosity</option>
                    <option value={'opportunity'}>Opportunity</option>
                    <option value={'spirit'}>Spirit</option>
                </select>

                {(rover && camera && data && !isLoading) 
                ? <div>
                    {getImage()}
                    <img src='' alt='photo'></img>
                </div>
                : <div></div>
                }
            </div>
        </div>
    );
}

export default Camera