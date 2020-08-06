import { addZero } from './supScript.js'

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoProgress = document.querySelector('.video-progress')
    const videoTimeTotal = document.querySelector('.video-time__total')
    const playButton = document.querySelector('.play-button')
    const videoVolume = document.querySelector('.video-volume')
    const volumeOff = document.querySelector('.volume-off')
    const videoIconDown = document.querySelector('.video-icon-down')
    const videoIconUp = document.querySelector('.video-icon-up')
    const videoFullScreen = document.querySelector('.video-fullscreen')

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.add('fa-play')
            videoButtonPlay.classList.remove('fa-pause')
        } else {
            videoButtonPlay.classList.add('fa-pause')
            videoButtonPlay.classList.remove('fa-play')
        }
    }

    const togglePlayer = () => {
        if (videoPlayer.paused) {
            videoPlayer.play()
            playButton.style.display = 'none'
        } else {
            videoPlayer.pause()
            playButton.style.display = 'block'
        }
    }

    const stopPlay = () => {
        videoPlayer.pause()
        videoPlayer.currentTime = 0.1
        playButton.style.display = 'block'
    }

    videoPlayer.currentTime = 0.1

    videoPlayer.addEventListener('click', togglePlayer)
    videoButtonPlay.addEventListener('click', togglePlayer)
    playButton.addEventListener('click', togglePlayer)

    videoPlayer.addEventListener('play', toggleIcon)
    videoPlayer.addEventListener('pause', toggleIcon)
    
    videoButtonStop.addEventListener('click', stopPlay)

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime
        const duration = videoPlayer.duration

        videoProgress.value = (currentTime / duration) * 100

        let minutePassed = Math.floor(currentTime / 60)
        let secondsPassed = Math.floor(currentTime % 60)

        let minuteTotal = Math.floor(duration / 60)
        let secondsTotal = Math.floor(duration % 60)

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`

    })

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration
        const value = videoProgress.value

        videoPlayer.currentTime = (value * duration) / 100
    })

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100
        videoVolume.value = videoPlayer.volume * 100
    })

    volumeOff.addEventListener('click', () => {
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
            videoVolume.value = videoPlayer.volume * 100
        } else {
            videoPlayer.muted = true;
            videoVolume.value = 0
        }
    })

    videoIconDown.addEventListener('click', () => {
        videoPlayer.volume = 0
        videoVolume.value = videoPlayer.volume * 100
    })

    videoIconUp.addEventListener('click', () => {
        videoPlayer.volume = 1
        videoVolume.value = videoPlayer.volume * 100
    })

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen()
    })

    videoPlayerInit.pause = () => {
        if (!videoPlayer.paused) {
            videoPlayer.pause()
        }
    }
}