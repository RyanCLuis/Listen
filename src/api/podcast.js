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

// UPDATE -> Edit a podcast
export const updatePodcast = (user, updatedPodcast) => {
    return axios({
        url: `${apiUrl}/${updatedPodcast._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { podcast: updatedPodcast }
    })
}

// DELETE -> remove a podcast
export const removePodcast = (user, id) => {
    return axios({
        url: `${apiUrl}/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}