import apiUrl from '../apiConfig'
import axios from 'axios'

// Create episode
// POST	/episodes/:podcastId	
export const createEpisode = (user, podcast, newEpisode) => {
    return axios({
        url: `${apiUrl}/episodes/${podcast._id}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { episode: newEpisode }
    })
}

// Update episode
// PATCH	/episodes/:podcastId/:episodeId	
export const updateEpisode = (user, podcast, updatedEpisode) => {
    return axios({
        url: `${apiUrl}/episodes/${podcast._id}/${updatedEpisode._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { episode: updatedEpisode }
    })
}

// Delete episode
// DELETE	/episodes/:podcastId/:episodeId	
export const removeEpisode = (user, podcastId, episodeId) => {
    return axios({
        url: `${apiUrl}/episodes/${podcastId}/${episodeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}