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
// PATCH -> Adjust a podcast
// DELETE -> delete a podcast