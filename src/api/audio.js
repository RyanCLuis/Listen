import apiUrl from '../apiConfig'
import axios from 'axios'


// GET -> Show
export const getAudio = (podcastId) => {
    return axios({
        url: `${apiUrl}/${podcastId}`,
        method: 'GET',
    })
}