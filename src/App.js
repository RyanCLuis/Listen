// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import Footer from './components/Footer'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import PodcastShow from './components/podcasts/PodcastShow'
import PodcastCreate from './components/podcasts/PodcastCreate'

const App = () => {
    const [user, setUser] = useState(null)
    const [msgAlerts, setMsgAlerts] = useState([])
	const [audioSrc, setAudioSrc] = useState('')

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user')
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser)
			setUser(foundUser)
		}
	}, [])

    console.log('user in app', user)


	const clearUser = () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
    )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
            		<Route
            			path='/sign-out'
            			element={
              			<RequireAuth user={user}>
                			<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
              			</RequireAuth>
            			}
          			/>
          			<Route
            			path='/change-password'
            			element={
              			<RequireAuth user={user}>
                			<ChangePassword msgAlert={msgAlert} user={user} />
              			</RequireAuth>}
          			/>
          			<Route
            			path='/create-podcast'
            			element={
              			<RequireAuth user={user}>
                			<PodcastCreate msgAlert={msgAlert} user={user} />
              			</RequireAuth>}
          			/>
					<Route 
						path='/:podcastId'
						element={
							<PodcastShow setAudioSrc={setAudioSrc} msgAlert={msgAlert} user={user} />
						}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
				<Footer audioSrc={audioSrc} />
			</Fragment>
		)
}

export default App
