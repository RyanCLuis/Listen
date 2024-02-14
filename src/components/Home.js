import { useState, useEffect } from 'react'
import { getAllPodcasts } from '../api/podcast'
import LoadingScreen from '../components/shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

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
        <div className="col-md-3 mb-4" key={podcast._id}>
            <Card className="card" style={{ width: '21rem', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#343a40', color: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '10px' }}>
                <Link to={`/${podcast._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Img variant="top" src={podcast.thumbnail} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Card.Title>{podcast.name}</Card.Title>
                        <Card.Text>{podcast.description.length > MAX_DESCRIPTION_LENGTH ? podcast.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...' : podcast.description}</Card.Text>
                    </Card.Body>
                </Link>
                {podcast.owner && (
                    <Card.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <small style={{ color: "white" }}>Uploaded by: {podcast.owner.username}</small>
                        <small>{podcast.views} Views</small>
                    </Card.Footer>
                )}
            </Card>
        </div>
    ))

	return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
            <h2 className="mt-5 mb-5 text-center">Podcasts</h2>
            <div className="row row-cols-1 g-4 justify-content-center" style={{ width: "60vw" }}>
                {podcastCards}
            </div>
        </div>
    )
}

export default Home
