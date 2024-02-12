import { useState } from 'react'
import PodcastForm from '../shared/PodcastForm'
import { createPodcast } from '../../api/podcast'
import { useNavigate } from 'react-router-dom'

const PodcastCreate = (props) => {
    const { msgAlert, user } = props
    const navigate = useNavigate()
    const [podcast, setPodcast] = useState({
        name: '',
        description: '',
        thumbnail: '',
        tags: '',
        type: 'News',
        views: '',
        favorite: false,
    })

    const onChange = (e) => {
        e.persist()
        setPodcast(prevPodcast => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            if (e.target.type === 'views') {
                updatedValue = parseInt(e.target.value)
            }
            if (updatedName === 'favorite' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'favorite' && !e.target.checked) {
                updatedValue = false
            }
            const updatedPodcast = { [updatedName]: updatedValue }
            return { ...prevPodcast, ...updatedPodcast }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createPodcast(podcast, user)
            .then(res => { navigate(`/${res.data.podcast._id}`) })
            .then(() => {
                msgAlert({
                    heading: 'Podcast Created Successfully',
                    message: 'You have added a new podcast',
                    variant: 'success',
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Podcast Create Failed with error: ' + error.message,
                    message: 'Please try again',
                    variant: 'danger',
                })
            })
    }

    return (
        <PodcastForm 
            podcast={podcast}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading='Add a new Podcast'
        />
    )
}

export default PodcastCreate