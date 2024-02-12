import { useState } from 'react'
import PodcastForm from '../shared/PodcastForm'

const PodcastCreate = (props) => {
    const { msgAlert, user } = props
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
    console.log('the podcast inside create', podcast)

    return (
        <PodcastForm 
            podcast={podcast}
            handleChange={onChange}
            handleSubmit={() => {console.log('handleSubmit')}}
            heading='Add a new Podcast'
        />
    )
}

export default PodcastCreate