import { useState } from 'react'

const PodcastCreate = (props) => {
    const { msgAlert, user } = props
    const [podcast, setPodcast] = useState({
        name: '',
        description: '',
        thumbnail: '',
        tags: '',
        type: '',
        views: '',
        favorite: false,
    })

    return (
        <h1>Create Podcast Component</h1>
    )
}

export default PodcastCreate