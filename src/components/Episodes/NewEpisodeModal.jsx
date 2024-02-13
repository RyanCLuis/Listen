import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import EpisodeForm from '../shared/EpisodeForm'
import messages from '../shared/AutoDismissAlert/messages'
import { createEpisode } from '../../api/episode'

const NewEpisodeModal = (props) => {
    const { user, podcast, show, handleClose, msgAlert, triggerRefresh } = props
    const [episode, setEpisode] = useState({
        title: '',
        description: '',
        length: '',
        thumbnail: '',
        views: 0
    })

    
    const onChange = (e) => {
        e.persist()
        setEpisode(prevEpisode => {
            const updatedName = e.target.name
            let updatedValue  = e.target.value
            
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedEpisode = { [updatedName] : updatedValue }

            return {
                ...prevEpisode, ...updatedEpisode
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createEpisode(user, podcast, episode)
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .then(() => {
                setEpisode({
                    title: '',
                    description: '',
                    length: '',
                    thumbnail: '',
                    views: 0
            })
        })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <EpisodeForm 
                    episode={episode}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${podcast.name} an episode!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewEpisodeModal