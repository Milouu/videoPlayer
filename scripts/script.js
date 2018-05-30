// Set variables
const $body = document.querySelector('body')
const $player = $body.querySelector('.player')
const $video = $player.querySelector('video')
const $title = $player.querySelector('.title')
const $overlayPlay = $player.querySelector('.overlay.play')
const $overlayPause = $player.querySelector('.overlay.pause')
const $controls = $player.querySelector('.controls')
const $seekBar = $player.querySelector('.seek-bar')
const $fillBar = $seekBar.querySelector('.fill-bar')
const $timeCursor = $seekBar.querySelector('.time-cursor')
const $play = $player.querySelector('button.play')
const $pause = $player.querySelector('button.pause')
const $volumeContainer = $player.querySelector('.volumeContainer')
const $volume1 = $player.querySelector('.volume1')
const $volume2 = $player.querySelector('.volume2')
const $volume3 = $player.querySelector('.volume3')
const $volumeMuted = $player.querySelector('.volumeMuted')
const $volumeBar = $player.querySelector('.volume-bar')
const $currentVolumeBar = $volumeBar.querySelector('.current-volume-bar')
const $videoTime = $player.querySelector('.videoTime p')
const $quality = $player.querySelector('.quality')
const $cinema = $player.querySelector('.cinema')
const $fullScreen = $player.querySelector('.fullScreen')
const $exitFullScreen = $player.querySelector('.exitFullScreen')
let overlayController = false
let buttonAnimationController = false
let volumeSaver = 1
let fullScreenController = false
let qualityChangeController = false


/******** Sets the css for different elements with the use of js ********/

// Calculates correct positionning for the controls 
$controls.style.bottom = `${$player.offsetHeight - $video.offsetHeight}px`

// Sets font-size for textual elements according to the player's width
$videoTime.style.fontSize = `${($player.offsetWidth / 100) * 1.5}px`
$quality.style.fontSize = `${($player.offsetWidth / 100) * 1.5}px`
$title.style.fontSize = `${($player.offsetWidth / 100) * 2}px`

/********** EVENTS *********/

// Listen to mousedown event on volume button
$volume1.addEventListener('mousedown', () =>
{
  $volumeMuted.classList.toggle('active')
  
  // Save current volume when muting and resets it when demuting
  if($volumeMuted.classList.contains('active'))
    {
      volumeSaver = $video.volume
      $video.volume = 0 
      $volume1.classList.remove('active')
      $volume2.classList.remove('active')
      $volume3.classList.remove('active')
    }
  else 
    {
      $video.volume = volumeSaver
      
      // Controls which volume button image is displayed
      if($video.volume == 0)
      {
        $volumeMuted.classList.toggle('active')
      }
      else if(($video.volume > 0) && ($video.volume <= 0.33))
      {
      $volume1.classList.add('active')
      }
      else if(($video.volume > 0.33) && ($video.time <= 0.66))
      {
        $volume2.classList.add('active')
      }
      else
      {
        $volume3.classList.add('active')
      }
    }
  
  // Adjust the currentVolumeBar size 
  $currentVolumeBar.style.transform = `scaleX(${$video.volume})`
})

// Listen to click event on volume bar
$volumeBar.addEventListener('click', (event) =>
{
  event.preventDefault()
  
  // Save the volume before the change
  const oldVolume = $video.volume
  
  // Update video volume
  let volume = (event.clientX - ($player.offsetLeft + $volumeContainer.offsetLeft +$volumeBar.offsetLeft)) / $volumeBar.offsetWidth

  if(volume < 0)
  {
    $video.volume = 0
  } 
  else if((volume > 0) && (volume < 1))
  {
    $video.volume = volume
  } 
  else if(volume > 1)
  {
    $video.volume = 1
  }
  
  // Adjust the currentVolumeBar size 
  $currentVolumeBar.style.transform = `scaleX(${$video.volume})`
  
  // Controls which volume button image is displayed
  if($video.volume == 0)
  {
    $volume1.classList.remove('active')
    $volume2.classList.remove('active')
    $volume3.classList.remove('active')
    $volumeMuted.classList.add('active')
  }
  else if(($video.volume > 0) && ($video.volume <= 0.33))
  {
    $volume1.classList.add('active')
    $volume2.classList.remove('active')
    $volume3.classList.remove('active')
    $volumeMuted.classList.remove('active')
  }
  else if(($video.volume > 0.33) && ($video.volume <= 0.66))
  {
    $volume1.classList.remove('active')
    $volume2.classList.add('active')
    $volume3.classList.remove('active')
    $volumeMuted.classList.remove('active')
  }
  else if($video.volume > 0.66)
  {
    $volume1.classList.remove('active')
    $volume2.classList.remove('active')
    $volume3.classList.add('active')
    $volumeMuted.classList.remove('active')
  }
})

// Listen to mousedown event on volume bar
$volumeBar.addEventListener('mousedown', (event) =>
{                         
  // Prevent default event (text selection)
  event.preventDefault() //permet d'empêcher l'événement par défaut -> ici ça empêche au clic de faire une sélection 
  
  // Save the volume before the change
  const oldVolume = $video.volume
  let draggable = true
  
  // Listen to mousemove event on the document
  document.addEventListener('mousemove', (event) =>
  {
    // Protect the volume from being dragged when mouseup event has occured 
    if(draggable == true)
    {
      // Update video volume
     let volume = (event.clientX - ($player.offsetLeft + $volumeContainer.offsetLeft +$volumeBar.offsetLeft)) / $volumeBar.offsetWidth
      
     if(volume < 0)
     {
       $video.volume = 0
     } 
     else if((volume > 0) && (volume < 1))
     {
       $video.volume = volume
     } 
     else if(volume > 1)
     {
       $video.volume = 1
     }
      
      // Adjust the currentVolumeBar size 
      $currentVolumeBar.style.transform = `scaleX(${$video.volume})`
    }
    
    // Controls which volume button image is displayed
    if($video.volume == 0)
    {
      $volume1.classList.remove('active')
      $volume2.classList.remove('active')
      $volume3.classList.remove('active')
      $volumeMuted.classList.add('active')
    }
    else if(($video.volume > 0) && ($video.volume <= 0.33))
    {
      $volume1.classList.add('active')
      $volume2.classList.remove('active')
      $volume3.classList.remove('active')
      $volumeMuted.classList.remove('active')
    }
    else if(($video.volume > 0.33) && ($video.volume <= 0.66))
    {
      $volume1.classList.remove('active')
      $volume2.classList.add('active')
      $volume3.classList.remove('active')
      $volumeMuted.classList.remove('active')
    }
    else if($video.volume > 0.66)
    {
      $volume1.classList.remove('active')
      $volume2.classList.remove('active')
      $volume3.classList.add('active')
      $volumeMuted.classList.remove('active')
    }
  })
  
  // Listen to mouseup event on document
  document.addEventListener('mouseup', () =>
  {
    draggable = false
  })
})

// Listen to mousedown event on pause button (same area as play button)
$pause.addEventListener('mousedown', () =>
{
  // Controls if video should be paused or played when clicking the pause/play buttons area
  if($pause.classList.contains('paused'))
  {
    $video.pause()
  }
  else
  {
    $video.play()
  }
  
  
  // Controls the appearance and animations of the pause and play buttons
  if(buttonAnimationController == false)
    {
      $play.classList.toggle('playing')
      // Used to hide the play button the first time the animation is played
      $play.classList.remove('tempHiding')
      $pause.classList.toggle('playing')
      $pause.classList.toggle('paused')
      buttonAnimationController = true
    }
  else
  {
    $play.classList.toggle('playing')
    $play.classList.toggle('paused')
    $pause.classList.toggle('playing')
    $pause.classList.toggle('paused')
  }
})

// Listen to mousedown event on overlay
$overlayPause.addEventListener('mousedown', () =>
{
  if($pause.classList.contains('paused'))
  {
    $video.pause()
  }
  else
  {
    $video.play()
  }
  
  // Controls the appearance and animations of the pause and play buttons
  if(buttonAnimationController == false)
    {
      $play.classList.toggle('playing')
      // Used to hide the play button the first time the animation is played
      $play.classList.remove('tempHiding')
      $pause.classList.toggle('playing')
      $pause.classList.toggle('paused')
      buttonAnimationController = true
    }
  else
  {
    $play.classList.toggle('playing')
    $play.classList.toggle('paused')
    $pause.classList.toggle('playing')
    $pause.classList.toggle('paused')
  }
})

// Listen to keydown event on space bar
document.addEventListener('keydown', (e) =>
{
  // Play or pause the video when using space bar
  if (e.keyCode == 32)
  {
    if($pause.classList.contains('paused'))
    {
      $video.pause()
    }
    else
    {
      $video.play()
    }
    
    // Controls the appearance and animations of the pause and play buttons
    if(buttonAnimationController == false)
      {
        $play.classList.toggle('playing')
        // Used to hide the play button the first time the animation is played
        $play.classList.remove('tempHiding')
        $pause.classList.toggle('playing')
        $pause.classList.toggle('paused')
        buttonAnimationController = true
      }
    else
    {
      $play.classList.toggle('playing')
      $play.classList.toggle('paused')
      $pause.classList.toggle('playing')
      $pause.classList.toggle('paused')
    }
  }
})

// Listen to play event on video
$video.addEventListener('play', () =>
{
  // Prevents pause & play shadows from appearing when the video starts playing when the page is opened or refreshed
  if(overlayController == true)
  {
    // Stops pause & play shadows from appearing when switching the video quality
    if(qualityChangeController == false)
    {
      $overlayPlay.classList.toggle('status')
      $overlayPause.classList.toggle('status')
    }
    else
    {
      qualityChangeController = false
    }
  }  
})


// Listen to pause event on video
$video.addEventListener('pause', () =>
{
  
  // Prevents pause & play shadows from appearing at the same time the first time the animation is triggered
  if(overlayController == false)
    {
      $overlayPause.classList.toggle('status')
      overlayController = true
    }
  else
    {
      $overlayPlay.classList.toggle('status')
      $overlayPause.classList.toggle('status')
    }
})

// Listen to click event on seek bar
$seekBar.addEventListener('click', (event) =>
{                         
  // Prevent default event (text selection)
  event.preventDefault() 
   
  // Update video current time
  const ratio = (event.clientX - ($seekBar.offsetLeft + $player.offsetLeft)) / $seekBar.offsetWidth 
  const videoTime = ratio * $video.duration

  $video.currentTime = videoTime
  $timeCursor.style.transform = `translateX(${event.clientX - ($seekBar.offsetLeft + $player.offsetLeft)}px)`
})

// Listen to mousedown event on seek bar
$seekBar.addEventListener('mousedown', (event) =>
{                         
  // Prevent default event (text selection)
  event.preventDefault() 
  
  let draggable = true
  
  // Listen to mousemove event on document
  document.addEventListener('mousemove', (event) =>
  {
    event.preventDefault()
    
    // Prevents seek bar from being dragged after the mouseup event on document
    if(draggable == true)
    { 
      // Update video current time
      const ratio = (event.clientX - ($seekBar.offsetLeft + $player.offsetLeft)) / $seekBar.offsetWidth 
      const videoTime = ratio * $video.duration

      $video.currentTime = videoTime
      $timeCursor.style.transform = `translateX(${event.clientX - ($seekBar.offsetLeft + $player.offsetLeft)}px)`
    }
  })
  
  // Listen to mouseup event on document
  document.addEventListener('mouseup', (event) =>
  {
    draggable = false
  })
})

// Listen to timeupdate event on video 
$video.addEventListener('timeupdate', () =>
{
  // Update fill bar size with time
  const ratio = $video.currentTime / $video.duration
  $fillBar.style.transform = `scaleX(${ratio})`
  
  // Update time cursor position with time
  $timeCursor.style.transform = `translateX(${ratio * $seekBar.offsetWidth}px)`
  
  // Display video current time
  let currentTime, currentTimeHours, currentTimeMinutes, currentTimeSeconds
  let duration, durationHours, durationMinutes, durationSeconds
  
  currentTimeHours = `${Math.floor($video.currentTime / 3600)}`
  if(currentTimeHours < 10)
    {
      currentTimeHours = `0${currentTimeHours}`
    }  
  durationHours = `${Math.floor($video.duration / 3600)}`
  if(durationHours < 10)
    {
      durationHours = `0${durationHours}`
    }
  
  currentTimeMinutes = `${Math.floor(($video.currentTime % 3600) / 60)}`
  if(currentTimeMinutes < 10)
    {
      currentTimeMinutes = `0${currentTimeMinutes}`
    }
  durationMinutes = `${Math.floor(($video.duration % 3600) / 60)}`
  if(durationMinutes < 10)
    {
      durationMinutes = `0${durationMinutes}`
    }

  currentTimeSeconds = `${Math.floor(($video.currentTime % 3600) % 60)}`
  if(currentTimeSeconds < 10)
    {
      currentTimeSeconds = `0${currentTimeSeconds}`
    }
  durationSeconds = `${Math.floor(($video.duration % 3600) % 60)}`
  if(durationSeconds < 10)
    {
      durationSeconds = `0${durationSeconds}`
    }

  if($video.duration > 3600)
  { 
    currentTime = `${currentTimeHours}:${currentTimeMinutes}:${currentTimeSeconds}`
    duration = `${durationHours}:${durationMinutes}:${durationSeconds}`
  }
  else
    {
    currentTime = `${currentTimeMinutes}:${currentTimeSeconds}`
    duration = `${durationMinutes}:${durationSeconds}`
      
    }
  
  $videoTime.innerHTML = `${currentTime}/${duration}`
})

// Listen to click event on quality button
$quality.addEventListener('click', () =>
{
  // Save video current time before the quality change
  const timeSaver = $video.currentTime
  
  // Recognize the fact that the video is doing a quality change (used to not trigger play & pause shadow animation over the video)
  qualityChangeController = true
  $quality.classList.toggle('sd')
  
  // Load the new video document corresponding to the quality chosen
  if($quality.classList.contains('sd'))
  {
    $video.setAttribute('src','videos/video360p.mp4')
  }
  else
  {
    $video.setAttribute('src','videos/video.mp4')
  }
  
  // Resets the video time after the quality change
  $video.currentTime = timeSaver
})

// Listen to mousedown event on cinema button
$cinema.addEventListener('mousedown', () =>
{
  // Sets cinema mode settings on the body & player
  $body.classList.toggle('cinemaMode')
  $player.classList.toggle('cinemaMode')
})

// Listen to mousedown event on fullScreen button
$fullScreen.addEventListener('mousedown', () =>
{
  // Controls if the video has to request for the entry or exit of the fullscreen mode
  if(fullScreenController == false){
    $video.webkitRequestFullscreen()
    fullScreenController = true
  }
  else
  {
    $video.webkitExitFullscreen()
    fullScreenController = false
  }
  
  $timeCursor.classList.toggle('fullScreen')
})

// Listen to fullscreenchange event on video
$video.addEventListener('webkitfullscreenchange', () =>
{
  // Adjust the font-size for textual elements according to player's width
  $videoTime.style.fontSize = `${($player.offsetWidth / 100) * 1.5}px`
  $quality.style.fontSize = `${($player.offsetWidth / 100) * 1.5}px`
  $title.style.fontSize = `${($player.offsetWidth / 100) * 2}px`
  
  // Changes which of the fullScreen or exitFullScreen buttons is visible
  $fullScreen.classList.toggle('active')
  $exitFullScreen.classList.toggle('active')
})

// Listen to mouseenter event on player
$player.addEventListener('mouseenter', () =>
{
  // Instant reappearance of the controls and title if the mouse leaves the player
  $title.classList.remove('instantFade')
  $controls.classList.remove('instantFade')
})

// Listen to mouseleave event on player
$player.addEventListener('mouseleave', () =>
{
  // Instant disappearance of the controls and title if the mouse leaves the player
  $title.classList.add('instantFade')
  $controls.classList.add('instantFade')
})

// Listen to mousemove event on player
$player.addEventListener('mousemove', () =>
{
  // Removes the timedFade animation if the mouse is moving 
  $title.classList.remove('timedFade')
  $controls.classList.remove('timedFade')
  
  // Re-launch timedFade animation if the mouse is not moving
  let timeout
  clearTimeout(timeout)
  timeout = setTimeout(() => 
    {
    $title.classList.add('timedFade')
    $controls.classList.add('timedFade')
    }, 5000)
})

// Listen to click event on player
$player.addEventListener('click', () =>
{
  // Removes the timedFade animation if a click is made on the document
  $title.classList.remove('timedFade')
  $controls.classList.remove('timedFade')
  
  // Re-launch timedFade animation no click is made
  let timeout
  clearTimeout(timeout)
  timeout = setTimeout(() => 
    {
    $title.classList.add('timedFade')
    $controls.classList.add('timedFade')
    }, 5000)
})