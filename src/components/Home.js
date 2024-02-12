import { useState, useEffect } from 'react'
import { getAllPodcasts } from '../api/podcast'
import LoadingScreen from '../components/shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const cardContainerLayout = {
	display: 'flex',
	flexWrap: 'row wrap',
	justifyContent: 'center',
}

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
		<Card key={podcast._id} style={{ width: "30%", margin: 5 }}>
			<Card.Header>
				<Link to={`/${podcast._id}`}>
				{podcast.name} 
				</Link> 
			</Card.Header>
			<Card.Body>
				<Card.Text> 
					{podcast.description} 
				</Card.Text>
				{ podcast.owner ?
					<Card.Footer> { podcast.owner.username } </Card.Footer>
					:
					null
				}
			</Card.Body>
		</Card>
	))

	return (
		<div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
			<h2>Listen!</h2>
			<div className='container-md' style={ cardContainerLayout }>
				{ podcastCards }
			</div>
		</div>
	)
}

export default Home
