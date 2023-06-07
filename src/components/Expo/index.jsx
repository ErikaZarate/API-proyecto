import { useEffect, useState } from "react"
const api_key = "J1QGvogS33v1UR0TCRZBEeS53d8UcekPP5wSvwLcr6w5U9mBB6bKcE50"

export default function Expo () {
    const [query, setQuery ] = useState("people")
    const [loading, setLoading ] = useState(true)
    const [data, setData] = useState([])
    const getPhotos = async () => {
        setLoading(true)
        await fetch(
                `https://api.pexels.com/v1/search?query=${query}`,{
                    headers: {
                        Authorization: api_key,
                    }
        })
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            setLoading(false)
            setData(data.photos)
        })         
    }

    useEffect(() => {
        //Efecto
        getPhotos()  
        },
        []
    )
    const onKeyDownHandler = (e) => {
        if (e.keyCode == 13) {
            getPhotos()
        }
    }

    return (
        <div>   
            <input 
                className="inputSearch"
                onKeyDown={onKeyDownHandler}
                placeholder="Search photos..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            {loading && <h1>Fetching...</h1>}
            <div className="container">
                {data?.map((item, index) => {
                    return (
                        <div className="box" key={index}>
                            <img src={item.src.medium} alt={item.id} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}