import { useState, useEffect } from 'react'
import { getAllPodcasts } from '../api/podcast'
import LoadingScreen from '../components/shared/LoadingScreen'

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
        return <p>No podcasts yet, go add some!</p>
    }


	return (
		<>
			<h2>Listen!</h2>
			{podcasts === null ? <p>Loading...</p> : <p>{podcasts[0].name}</p>}
		</>
	)
}

export default Home
