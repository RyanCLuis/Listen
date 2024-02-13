import { Form, Button, Container } from 'react-bootstrap'

const PodcastForm = (props) => {
    const { podcast, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        placeholder='What is the name of the podcast?'
                        type='name'
                        name='name'
                        value={podcast.name}
                        onChange={handleChange}
                        required
                     />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        placeholder='What is the podcast about?'
                        type='description'
                        name='description'
                        value={podcast.description}
                        onChange={handleChange}
                        required
                     />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Thumbnail:</Form.Label>
                    <Form.Control
                        placeholder='Input the thumbnail URL'
                        type='thumbnail'
                        name='thumbnail'
                        value={podcast.thumbnail}
                        onChange={handleChange}
                     />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Tags:</Form.Label>
                    <Form.Control
                        placeholder='Input tags for the podcast that are comma separated like "funny, stand-up"'
                        type='tags'
                        name='tags'
                        value={podcast.tags}
                        onChange={handleChange}
                     />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Type:</Form.Label>
                    <Form.Select
                        name='type'
                        value={podcast.type}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value='Culture'>Culture</option>
                        <option value='Business'>Business</option>
                        <option value='Education'>Education</option>
                        <option value='Health'>Health</option>
                        <option value='Comedy'>Comedy</option>
                        <option value='News'>News</option>
                        <option value='Science'>Science</option>
                        <option value='History'>History</option>
                        <option value='Development'>Development</option>
                        <option value='Sports'>Sports</option>
                        <option value='Crime'>Crime</option>
                        <option value='Horror'>Horror</option>
                        <option value='Religion'>Religion</option>
                        <option value='Music'>Music</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Views:</Form.Label>
                    <Form.Control
                        placeholder='Input the number of views'
                        type='number'
                        name='views'
                        id='views'
                        value={podcast.views}
                        onChange={handleChange}
                     />
                </Form.Group>
                <Button className='m-2' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default PodcastForm