import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeEpisode } from '../../api/episode'
import EditEpisodeModal from './EditEpisodeModal'
import messages from '../shared/AutoDismissAlert/messages'
import { AiTwotoneDelete } from "react-icons/ai"
import { GrEdit } from "react-icons/gr"

const formatTime = (lengthInSeconds) => {
    const minutes = Math.floor(lengthInSeconds / 60)
    const seconds = lengthInSeconds % 60
    return { minutes, seconds }
}

const EpisodeShow = (props) => {
    const { episode, podcast, user, msgAlert, triggerRefresh, setAudioSrc  } = props
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

    const setAudio = () => {
        setAudioSrc(episode.audio)
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Card
                        className='m-1'
                        style={{ 
                            position: 'relative', 
                            backgroundColor: 'rgba(28, 28, 28, 0.8)', 
                            color: 'white', 
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            cursor: 'pointer' // Change cursor to pointer to indicate clickability
                        }}
                        onClick={(setAudio)} // Call setAudio function when the card is clicked
                    >
                        {user && podcast.owner && user._id === podcast.owner._id &&
                            <div style={{ position: 'absolute', top: '20px', right: '30px', display: 'flex', alignItems: 'flex-end'}}>
                                <Button
                                    className='m-1'
                                    variant='warning'
                                    size='sm'
                                    onClick={() => setEditModalShow(true)}
                                    style={{ borderRadius: '12px' }}
                                >
                                    <GrEdit />
                                </Button>
                                <Button
                                    className='m-1'
                                    variant='danger'
                                    size='sm'
                                    onClick={deleteEpisode}
                                    style={{ borderRadius: '12px' }}
                                >
                                    <AiTwotoneDelete />
                                </Button>
                            </div>
                        }
                        <div className="row align-items-center">
                            <div className="col-md-3" style={{ maxWidth: '300px', marginRight: '1rem' }}>
                                <img 
                                    src={episode.thumbnail} 
                                    alt=''
                                    style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '1rem'}} 
                                />
                            </div>
                            <div className="col-md-5">
                                <div>
                                    <h3 style={{marginTop: "1rem"}}>
                                        {episode.title}
                                    </h3>
                                    <p>{episode.description}</p>
                                    <p>{minutes} mins {seconds} secs </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
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