import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PodcastForm from '../shared/PodcastForm'
import messages from '../shared/AutoDismissAlert/messages'
import './EditPodcastModal.css'

const EditPodcastModal = (props) => {
    const { user, show, handleClose, updatePodcast, msgAlert, triggerRefresh } = props
    const [podcast, setPodcast] = useState(props.podcast)

    const onChange = (e) => {
        e.persist()

        setPodcast(prevPodcast => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }
            const updatedPodcast = { [updatedName] : updatedValue }
            return {
                ...prevPodcast, ...updatedPodcast
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updatePodcast(user, podcast)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Yay!',
                    message: messages.updatePodcastSuccess,
                    variant: 'success'
                })
            })
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
        <Modal show={show} onHide={handleClose} className='dark-modal'>
            <Modal.Header closeButton />
            <Modal.Body>
                <PodcastForm 
                    podcast={podcast}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Podcast"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPodcastModal