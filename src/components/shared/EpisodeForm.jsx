import { Form, Button, Container } from 'react-bootstrap'

const EpisodeForm = (props) => {

    const { episode, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What is the title of the episode?"
                        id="title"
                        name="title"
                        value={ episode.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control 
                        placeholder="What is this episode about?"
                        id="description"
                        name="description"
                        value={ episode.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Length: </Form.Label>
                    <Form.Control 
                        placeholder="How long is this episode? (in seconds)"
                        id="length"
                        name="length"
                        value={ episode.length }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Thumbnail:</Form.Label>
                    <Form.Control
                        placeholder='Input the thumbnail URL'
                        type='thumbnail'
                        name='thumbnail'
                        value={episode.thumbnail}
                        onChange={handleChange}
                     />
                </Form.Group>
                <Form.Label>Audio File:</Form.Label>
                <Form.Control
                    placeholder='Input the audio file URL'
                    type='text'
                    name='audio'
                    id='audio'
                    value={episode.audio}
                    onChange={handleChange}
                    />
                <Button className="m-2" type="submit">Submit</Button>
                <Form.Group className='m-2'>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default EpisodeForm