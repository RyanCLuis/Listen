import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeEpisode } from '../../api/episode'
import EditEpisodeModal from './EditEpisodeModal'
import messages from '../shared/AutoDismissAlert/messages'

const formatTime = (lengthInSeconds) => {
    const minutes = Math.floor(lengthInSeconds / 60)
    const seconds = lengthInSeconds % 60
    return { minutes, seconds }
}

const EpisodeShow = (props) => {
    const { episode, podcast, user, msgAlert, triggerRefresh  } = props
    const { minutes, seconds } = formatTime(episode.length)
    const [editModalShow, setEditModalShow] = useState(false)

    const deleteEpisode = () => {
        removeEpisode(user, podcast._id, episode._id)
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className='m-2'>
                <Card.Header> {episode.title} </Card.Header>
                <Card.Body>
                    <small> {episode.description} </small> <br />
                    <hr />
                    <img src={episode.thumbnail} alt='' />
                </Card.Body>
                <Card.Footer>
                    <small> {minutes} mins {seconds} secs </small>
                    {
                        user && podcast.owner && user._id === podcast.owner._id
                        ?
                        <>
                            <Button
                                className='m-2'
                                variant='info'
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Episode
                            </Button>
                            <Button
                                className='m-2'
                                variant='danger'
                                onClick={deleteEpisode}
                            >
                                Delete Episode
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditEpisodeModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                triggerRefresh={triggerRefresh}
                podcast={podcast}
                episode={episode}
            />
        </>
    )
}

export default EpisodeShow