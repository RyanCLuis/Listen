import apiUrl from '../apiConfig'
import axios from 'axios'

// GET -> Index
export const getAllPodcasts = () => {
    return axios(`${apiUrl}/`)
}

// GET -> Show
export const getPodcast = (id) => {
    return axios(`${apiUrl}/${id}`)
}

// CREATE -> Add a podcast
export const createPodcast = ( newPodcast, user) => {
    return axios({
        url: `${apiUrl}/`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { podcast: newPodcast },
    })
}

// PATCH -> Adjust a podcast
// DELETE -> delete a podcast