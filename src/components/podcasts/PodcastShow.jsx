import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPodcast } from '../../api/podcast'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'


const PodcastShow = (props) => {
    const { podcastId } = useParams()
    const { msgAlert, user } = props

    const [podcast, setPodcast] = useState(null)

    useEffect(() => {
        getPodcast(podcastId)
            .then((res) => {
                setPodcast(res.data.podcast)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Podcast Show Failed with error: ' + error.message,
                    message: 'Please try again',
                    variant: 'danger',
                })
            })
    }, [])

    console.log('podcast', podcast)

    if (!podcast) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Container>
                <Card>
                    <Card.Header> {podcast.name} </Card.Header>
                    <Card.Body>
                        <Card.Text> 
                            {podcast.description} <br />
                            { podcast.tags }<br />
                            <img src={podcast.thumbnail} alt='' />
                            {podcast.type} <br />
                            {podcast.views} <br />
                            {podcast.episodes} <br />
                        </Card.Text>
                        { podcast.owner ?
                            <Card.Footer> Owner: { podcast.owner.username } </Card.Footer>
                            :
                            null
                        }
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default PodcastShow