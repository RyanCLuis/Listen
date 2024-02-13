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
// Delete episode