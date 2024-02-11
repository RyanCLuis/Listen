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

const Home = (props) => {
	const { msgAlert, user } = props
	const [error, setError] = useState(null)

	const [podcasts, setPodcasts] = useState(null)

	useEffect(() => {
		getAllPodcasts()
			// .then((res) => console.log('this is res.data.podcasts', res.data.podcasts))
			.then(res => {
				setPodcasts(res.data.podcasts)
			})
			.catch((error) => {
				msgAlert({
					heading: 'Podcast Fetch Failed with error: ' + error.message,
					message: 'Please try again later.',
					variant: 'danger',
				})
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
		<Card key={podcast.id} style={{ width: "30%", margin: 5 }}>
			<Card.Header> {podcast.name} </Card.Header>
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
