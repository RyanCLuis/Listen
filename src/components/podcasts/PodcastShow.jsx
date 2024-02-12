import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPodcast, removePodcast, updatePodcast } from '../../api/podcast'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditPodcastModal from './EditPodcastModal'


const PodcastShow = (props) => {
    const { podcastId } = useParams()
    const { msgAlert, user } = props

    const [podcast, setPodcast] = useState(null)
    const [EditModalShow, setEditModalShow] = useState(false)
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
    }, [updated])

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
            <EditPodcastModal 
                user={user}
                show={EditModalShow}
                updatePodcast={updatePodcast}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                podcast={podcast}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </div>
    )
}

export default PodcastShow