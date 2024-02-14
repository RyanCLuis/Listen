import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPodcast, removePodcast, updatePodcast } from '../../api/podcast'
import LoadingScreen from '../shared/LoadingScreen'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditPodcastModal from './EditPodcastModal'
import EpisodeShow from '../Episodes/EpisodeShow'
import NewEpisodeModal from '../Episodes/NewEpisodeModal'
import { AiTwotoneDelete } from "react-icons/ai"
import { GrEdit } from "react-icons/gr"

const PodcastShow = (props) => {
    const { podcastId } = useParams()
    const { msgAlert, user, setAudioSrc } = props

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
                        setAudioSrc={setAudioSrc}
                        podcast={podcast}
                        user={user}
                        messageAlert={msgAlert}
                        triggerRefresh={() => setUpdated(prev => !prev)} 
                        key={episode._id}
                        episode={episode}
                    />
                ))
            } else {
                episodeCards = (
                    <div style={{ textAlign: 'center' }}>
                        <p>No episodes, go add some!</p>
                    </div>
                )
            }
        }

    if (!podcast) {
        return <LoadingScreen />
    }

    return (
        <div>
            {
                podcast.owner && user && podcast.owner._id === user._id
                ?
                <>
            <Button
                className='m-2'
                variant='danger'
                onClick={() => deletePodcast()}
                style={{ position: 'relative', float: 'right'}}
            >
                <AiTwotoneDelete />
            </Button>
                <Button
                    className='m-2'
                    variant='warning'
                    onClick={() => setEditModalShow(true)}
                    style={{ position: 'relative', float: 'right'}}
                >
                    <GrEdit />
                </Button>
                </>
                :
                null
            }
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center' , 
                    margin: '3% 1% 1% 1%' 
                    }}>
            <div 
                style={{ 
                    display: 'inline-block' 
                }}>
              <img 
                src={podcast.thumbnail} 
                alt='' 
                style={{ width: '300px', margin: '1% 1% 1% 1%', display: 'inline-block' }} 
              />
            </div>
            <div style={{ display: 'inline-block', marginLeft: '1%' }}>
                <h2>{podcast.name}</h2>
                <p>{podcast.description}</p>
                <div style={{ background: 'grey', borderRadius: '20px', fontSize: "20px", marginBottom: "1%", marginLeft: "1%", display: "inline-block", padding: ".5rem"}}>
                    {podcast.type}
                </div>
                <p>{podcast.views} Views</p>
                { podcast.owner ?
                    <p> Uploaded by: { podcast.owner.username } </p>
                :
                null
                }
            </div>
            </div>
            <h2 style={{marginLeft: "1rem"}}>All Episodes:</h2>
                { episodeCards }
            { user ?
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
                className='m-2'
                onClick={() => setEpisodeModalShow(true)}
                variant='info'
                style={{ width: '200px' }}
            >
                Add Episode
            </Button>
        </div>
        :
        null
        }
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