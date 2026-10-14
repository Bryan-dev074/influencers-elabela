import { useEffect, useRef, useState } from 'react'
import { Play, Volume2 } from 'lucide-react'
import './ExplainerVideo.css'

const VIDEO_URL = '/media/cupon-influencer-v1.mp4'

export default function ExplainerVideo({ text, introActive }) {
  const video = useRef(null)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (introActive) video.current?.pause()
  }, [introActive])

  const play = async () => {
    try {
      await video.current?.play()
    } catch (error) {
      if (error.name !== 'AbortError') setFailed(true)
    }
  }

  return (
    <section
      className="explainer-section page-width scroll-reveal"
      id="video-explicacion"
      aria-labelledby="explainer-title"
    >
      <div className="explainer-copy">
        <p className="eyebrow">
          <span />
          {text.videoEyebrow}
        </p>
        <h2 id="explainer-title">{text.videoTitle}</h2>
        <p className="explainer-description">{text.videoDescription}</p>
        <span className="explainer-sound">
          <Volume2 size={18} strokeWidth={1.5} aria-hidden="true" />
          {text.videoSound}
        </span>
      </div>
      <figure className="explainer-figure">
        <div className="explainer-player">
          <video
            ref={video}
            controls
            playsInline
            preload="none"
            poster="/media/cupon-influencer-poster-v1.jpg"
            width="720"
            height="1280"
            aria-label={text.videoLabel}
            aria-describedby="explainer-summary"
            onPlay={() => {
              setStarted(true)
              setFailed(false)
              if (introActive) video.current?.pause()
            }}
            onEnded={() => setStarted(false)}
            onError={() => setFailed(true)}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            <a href={VIDEO_URL}>{text.videoOpen}</a>
          </video>
          {!started && !failed && (
            <button className="explainer-play" type="button" onClick={play}>
              <span className="explainer-play-icon" aria-hidden="true">
                <Play size={25} strokeWidth={1.5} fill="currentColor" />
              </span>
              <span>{text.videoPlay}</span>
            </button>
          )}
          <span className="explainer-duration" aria-hidden="true">
            0:48
          </span>
        </div>
        <figcaption id="explainer-summary">{text.videoSummary}</figcaption>
        {failed && (
          <p className="explainer-error" role="status">
            {text.videoError}{' '}
            <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer">
              {text.videoOpen}
            </a>
          </p>
        )}
      </figure>
    </section>
  )
}
