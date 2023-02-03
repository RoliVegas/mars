import React, { useEffect, useState } from 'react'

const Camera = () => {

    const [data, setData] = useState({});
    const [camera, setCamera] = useState(undefined);
    const [photo, setPhoto] = useState(undefined);

    const getDateString = () => {
        let date = new Date();
        let dateString = date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDay();
        console.log(dateString);
        return dateString;
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(camera) getImage();
    }, [camera])

    const fetchData = async () => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${getDateString()}&api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(response => {
            setData(response.photos);
        });
    }

    const updateSelection = (type, value) => {
        if(type === 'camera') setCamera(value);
    }

    const getImage = () => {
        const photo = data.find((data) => data.camera.name == camera);
        if(photo) setPhoto(photo);
        else setPhoto(undefined);
        console.log(photo);
    }

    return (
        <div className='container'>
            <div className='content'>
                <h2>Mars Rover Cam:</h2>
                <select name='camera' onChange={ e => updateSelection('camera', e.target.value)}>
                    <option value={''}>Select camera:</option>
                    <option value={'FHAZ'}>Front Hazard Avoidance Camera</option>
                    <option value={'RHAZ'}>Rear Hazard Avoidance Camera</option>
                    <option value={'NAVCAM'}>Navigation Camera</option>
                </select>

                {(photo)
                ? <div>
                    <p>This photo is taken by Curiosity mars rover on {photo.earth_date}.</p>
                    <img src={photo.img_src} alt='photo'></img>
                </div>
                : <div></div>
                }
            </div>
        </div>
    );
}

export default Camera