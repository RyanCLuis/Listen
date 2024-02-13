import apiUrl from '../apiConfig'
import axios from 'axios'


// GET -> Show
export const getAudio = (user, podcastId) => {
    return axios({
        url: `${apiUrl}/audio/${podcastId}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}