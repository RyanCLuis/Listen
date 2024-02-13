import { Card, Button } from 'react-bootstrap'

const formatTime = (lengthInSeconds) => {
    const minutes = Math.floor(lengthInSeconds / 60)
    const seconds = lengthInSeconds % 60
    return { minutes, seconds }
}

const EpisodeShow = (props) => {
    const { episode } = props
    const { minutes, seconds } = formatTime(episode.length)

    return (
        <>
            <Card className='m-2'>
                <Card.Header> {episode.title} </Card.Header>
                <Card.Body>
                    <small> {episode.description} </small> <br />
                    <hr />
                    <img src={episode.thumbnail} alt='' />
                </Card.Body>
                <Card.Footer>
                    <small> {minutes} mins {seconds} secs </small>
                    <small> {episode.views} </small>
                </Card.Footer>
            </Card>
        </>
    )
}

export default EpisodeShow