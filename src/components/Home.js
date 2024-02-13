import { useState, useEffect } from 'react'
import { getAllPodcasts } from '../api/podcast'
import LoadingScreen from '../components/shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MAX_DESCRIPTION_LENGTH = 100

const Home = () => {
	const [error, setError] = useState(null)
	const [podcasts, setPodcasts] = useState(null)

	useEffect(() => {
		getAllPodcasts()
			.then(res => {
				setPodcasts(res.data.podcasts)
			})
			.catch((error) => {
				setError(error)
			})
	}, [])

	if (error) {
        return <LoadingScreen />
    }
	    if (!podcasts) {
        return <LoadingScreen />
    // what if the expected array is empty?
    } else if (podcasts.length === 0) {
        return <p>No podcasts, go add some!</p>
    }

	const podcastCards = podcasts.map(podcast => (
        <div className="col-md-4 mb-4" key={podcast._id}>
            <Card className="h-100">
                <Link to={`/${podcast._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                        <img src={podcast.thumbnail} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="" />
                        <div style={{ flexGrow: 1, marginTop: '10px' }}>
                            <h5>{podcast.name}</h5>
                            <p>{podcast.description.length > MAX_DESCRIPTION_LENGTH ? podcast.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...' : podcast.description}</p>
                        </div>
                        {podcast.owner && (
                            <Card.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>Uploaded by: {podcast.owner.username}</div>
                                <div>{podcast.views} Views</div>
                            </Card.Footer>
                        )}
                    </Card.Body>
                </Link>
            </Card>
        </div>
	))

	return (
		<div className="container">
            <h2 className="mt-5 mb-3">Podcasts:</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {podcastCards}
            </div>
        </div>
	)
}

export default Home
