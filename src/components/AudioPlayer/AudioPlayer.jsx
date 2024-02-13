import React, {useState, useRef, useEffect}  from "react"
import styles from './AudioPlayer.module.css'
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from "react-icons/fa"


const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioPlayer = useRef()
    const progressBar = useRef()
    const animationRef = useRef()

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying
        setIsPlaying(!prevValue)
        if (!prevValue) {
            audioPlayer.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value - 30)
        changeRange()
    }
    
    const forwardThirty = () => {
        progressBar.current.value = Number(progressBar.current.value + 30)
        changeRange()
    }

    return (
        <div className={styles.audioPlayer}>
            <audio ref={audioPlayer} src="https://dcs.megaphone.fm/GLT6207580082.mp3?key=fdcaf74486dbe2ede82cfb9874f6285d&request_event_id=49e2fcc9-4827-460b-acc0-d7c0dd375305" preload="metadata"></audio>


            <button className={styles.forwardBackward} onClick={backThirty}><FaArrowLeft /> 30</button>


            <button onClick={togglePlayPause} className={styles.playPause}>
                {isPlaying ? <FaPause /> : <FaPlay className={styles.play}/>}
            </button>


            <button className={styles.forwardBackward} onClick={forwardThirty}>30 <FaArrowRight /></button>

            <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

            <div>
                <input type="range" className={styles.progressBar} defaultValue={0} ref={progressBar} onChange={changeRange}/>
            </div>

            <div className={styles.duration}>{duration && !isNaN(duration) && calculateTime(duration)}</div>
        </div>
    )
}

export default AudioPlayer