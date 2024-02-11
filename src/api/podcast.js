import apiUrl from '../apiConfig'
import axios from 'axios'

// GET -> Index
export const getAllPodcasts = () => {
    return axios(`${apiUrl}/`)
}

// GET -> Show
// CREATE -> Add a podcast
// PATCH -> Adjust a podcast
// DELETE -> delete a podcast