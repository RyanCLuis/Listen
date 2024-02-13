import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPodcast, removePodcast, updatePodcast } from '../../api/podcast'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditPodcastModal from './EditPodcastModal'
import EpisodeShow from '../Episodes/EpisodeShow'
import NewEpisodeModal from '../Episodes/NewEpisodeModal'

const episodeCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}


const PodcastShow = (props) => {
    const { podcastId } = useParams()
    const { msgAlert, user } = props

    const [podcast, setPodcast] = useState(null)
    const [EditModalShow, setEditModalShow] = useState(false)
    const [episodeModalShow, setEpisodeModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()


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
    }, [updated, podcastId, msgAlert, user])

    const deletePodcast = () => {
        removePodcast(user, podcast._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deletePodcastSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    let episodeCards
    if (podcast) {
        if (podcast.episodes.length > 0) {
            episodeCards = podcast.episodes.map(episode => (
                <EpisodeShow
                    podcast={podcast}
                    user={user}
                    messageAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)} 
                    key={episode._id}
                    episode={episode}
                />
            ))
        } else {
            episodeCards = <p>No episodes, go add some!</p>
        }
    }

    if (!podcast) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Container className='m-2'>
                <Card>
                    <Card.Header> {podcast.name} </Card.Header>
                    <Card.Body>
                        <Card.Text> 
                            {podcast.description} <br />
                            { podcast.tags }<br />
                            <img src={podcast.thumbnail} alt='' />
                            {podcast.type} <br />
                            {podcast.views} <br />
                        </Card.Text>
                        { user  ? 
                        <Button
                            className='m-2'
                            variant='info'
                            onClick={() => setEpisodeModalShow(true)}
                        >
                            Give {podcast.name} an episode!
                        </Button>
                        :
                        null
                        }
                        {
                            podcast.owner && user && podcast.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Podcast
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => deletePodcast()}
                                >
                                    Remove Podcast
                                </Button>
                            </>
                            :
                            null
                        }
                        { podcast.owner ?
                            <Card.Footer> Owner: { podcast.owner.username } </Card.Footer>
                            :
                            null
                        }
                    </Card.Body>
                </Card>
            </Container>
            <Container className='m-2' style={ episodeCardContainerLayout }>
                { episodeCards }
            </Container>
            <EditPodcastModal 
                user={user}
                show={EditModalShow}
                updatePodcast={updatePodcast}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                podcast={podcast}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            <NewEpisodeModal 
                user={user}
                show={episodeModalShow}
                podcast={podcast}
                handleClose={() => setEpisodeModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </div>
    )
}

export default PodcastShow