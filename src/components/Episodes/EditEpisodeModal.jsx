import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EpisodeForm from '../shared/EpisodeForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateEpisode } from '../../api/episode'

const EditEpisodeModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, podcast } = props
    const [episode, setEpisode] = useState(props.episode)

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
        updateEpisode(user, podcast, episode)
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .then(() => setEpisode(props.episode))
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose} className='dark-modal'>
            <Modal.Header closeButton />
            <Modal.Body>
                <EpisodeForm 
                    episode={episode}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Episode"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditEpisodeModal