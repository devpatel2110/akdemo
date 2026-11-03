import { useEffect, useRef, useState } from "react"

const A = "/assets"

const events = [
  {
    number: "01",
    name: "Mandap Muhurat",
    copy: "A beautiful afternoon filled with sacred rituals, heartfelt blessings, and the promise of forever.",
    date: "10 February 2027",
    time: "09:00 AM",
  },
  {
    number: "02",
    name: "Mameru",
    copy: "A heartfelt celebration of love, family traditions, and blessings from the ones who mean the most.",
    date: "10 February 2027",
    time: "10:30 AM",
  },
  {
    number: "03",
    name: "Haldi",
    copy: "A golden glow of turmeric, endless laughter, and beautiful moments painted in love.",
    date: "10 February 2027",
    time: "03:00 PM",
  },
  {
    number: "04",
    name: "Dandiya Night",
    copy: "An enchanting evening of rhythm, vibrant colors, and joyful hearts dancing as one.",
    date: "10 February 2027",
    time: "09:00 PM",
  },
  {
    number: "05",
    name: "Jaan Aagman",
    copy: "A beautiful afternoon of henna, laughter, blessings and blooming joy.",
    date: "11 February 2027",
    time: "09:00 AM",
  },
]

const rituals = [
  {
    number: "01",
    name: "Agni",
    copy: "The Sacred Witness",
    image: "c0353.png",
  },
  {
    number: "02",
    name: "Gathbandhan",
    copy: "Two Souls Bound Together",
    image: "25c09.png",
  },
  {
    number: "03",
    name: "Phera",
    copy: "Seven Sacred Promises",
    image: "6448c.png",
  },
  {
    number: "04",
    name: "Mangalsutra",
    copy: "A Bond Worn Close to the Heart",
    image: "536f9.png",
  },
  {
    number: "05",
    name: "Sindoor",
    copy: "A Beautiful New Beginning",
    image: "50b02.png",
  },
]

const weddingDate = new Date("2027-02-11T09:00:00+05:30").getTime()

function getCountdown() {
  const distance = Math.max(0, weddingDate - Date.now())
  return {
    Days: Math.floor(distance / 86_400_000),
    Hours: Math.floor((distance / 3_600_000) % 24),
    Minutes: Math.floor((distance / 60_000) % 60),
    Seconds: Math.floor((distance / 1000) % 60),
  }
}

function Heading({
  eyebrow,
  children,
  light = false,
}: {
  eyebrow: string
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <header
      className={`section-heading ${light ? "section-heading--light" : ""}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
    </header>
  )
}

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown)
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)
  const toneRef = useRef<{
    oscillators: OscillatorNode[]
    gain: GainNode
  } | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    return () => {
      toneRef.current?.oscillators.forEach((oscillator) => oscillator.stop())
      void audioRef.current?.close()
    }
  }, [])

  const toggleMusic = () => {
    if (musicOn) {
      toneRef.current?.gain.gain.exponentialRampToValueAtTime(
        0.0001,
        (audioRef.current?.currentTime ?? 0) + 0.4,
      )
      window.setTimeout(() => {
        toneRef.current?.oscillators.forEach((oscillator) => oscillator.stop())
        toneRef.current = null
      }, 450)
      setMusicOn(false)
      return
    }

    const context = audioRef.current ?? new AudioContext()
    audioRef.current = context
    const gain = context.createGain()
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.8)
    gain.connect(context.destination)
    const oscillators = [196, 293.66].map((frequency, index) => {
      const oscillator = context.createOscillator()
      oscillator.type = "sine"
      oscillator.frequency.value = frequency
      oscillator.detune.value = index ? 4 : -4
      oscillator.connect(gain)
      oscillator.start()
      return oscillator
    })
    toneRef.current = { oscillators, gain }
    setMusicOn(true)
  }

  const saveDate = () => {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20270211T033000Z",
      "DTEND:20270211T113000Z",
      "SUMMARY:Kelsi & Abhi Wedding",
      "LOCATION:Shri Leuva Patel Samaj, Pipaliya, Rajkot, Gujarat",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
    const link = document.createElement("a")
    link.href = URL.createObjectURL(
      new Blob([calendar], { type: "text/calendar" }),
    )
    link.download = "kelsi-and-abhi-wedding.ics"
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <main className="invitation">
      <section className="hero">
        <img className="hero__background" src={`${A}/c01e9.png`} alt="" />
        <img
          className="hero__mist hero__mist--one"
          src={`${A}/deb6c.svg`}
          alt=""
        />
        <img
          className="hero__mist hero__mist--two"
          src={`${A}/42090.svg`}
          alt=""
        />
        <img className="hero__clouds" src={`${A}/7a93b.png`} alt="" />
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="eyebrow">
            WITH THE BLESSINGS OF MAHADEV &amp; MAA PARVATI
          </p>
          <h1>
            <span>Kelsi</span>
            <small>Weds</small>
            <span>Abhi</span>
          </h1>
          <p className="hero__tagline">Two Souls. One Sacred Journey.</p>
          <p className="hero__date">11 February 2027</p>
        </div>
      </section>

      <section className="blessings paper-section">
        <div className="medallion-row">
          <img src={`${A}/3e2b8.png`} alt="" />
          <img
            className="medallion"
            src={`${A}/1ab4b.png`}
            alt="Shiv and Parvati symbolic medallion"
          />
          <img src={`${A}/c55c0.png`} alt="" />
        </div>
        <p className="devanagari">ॐ नमः शिवाय</p>
        <h2>With Divine Blessings</h2>
        <p>
          With the blessings of Mahadev and Maa Parvati, may this sacred union
          be filled with devotion, strength, harmony and everlasting love.
        </p>
      </section>

      <section className="couple paper-section">
        <article className="person">
          <img
            src={`${A}/e0eaf.png`}
            alt="Parvati inspired bridal mehndi hand"
          />
          <div>
            <p className="eyebrow">THE BRIDE</p>
            <h2>Kelsi Javiya</h2>
            <p className="kin">Daughter of Mrs. Dakshaben Javiya</p>
            <p>
              Grace in her heart, devotion in her soul and a beautiful new
              journey ahead.
            </p>
          </div>
        </article>
        <article className="person person--reverse">
          <img src={`${A}/7020d.png`} alt="Shiva inspired rudraksha hand" />
          <div>
            <p className="eyebrow">THE GROOM</p>
            <h2>Abhi Bangoriya</h2>
            <p className="kin">
              Son of Mrs. Sarojben &amp; Mr. Harshadbhai Bangoriya
            </p>
            <p>
              Strength in his heart, blessings by his side and a promise of
              forever ahead.
            </p>
          </div>
        </article>
      </section>

      <section className="events paper-section">
        <Heading eyebrow="WEDDING CEREMONIES">Under One Sacred Sky</Heading>
        <div className="event-list">
          {events.map((event) => (
            <article className="event" key={event.number}>
              <div className="event__portrait">
                <img src={`${A}/d1e4f.png`} alt="Mehendi celebration" />
              </div>
              <div className="event__copy">
                <span className="event__number">{event.number}</span>
                <h3>{event.name}</h3>
                <p>{event.copy}</p>
                <dl>
                  <div>
                    <dt>Date</dt>
                    <dd>{event.date}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{event.time}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="save-date paper-section">
        <Heading eyebrow="MARK YOUR CALENDAR">Save Our Date</Heading>
        <p className="date-lockup">
          <strong>11</strong>
          <span>February</span>
          <em>2027</em>
        </p>
        <p>Kelsi Javiya &amp; Abhi Bangoriya</p>
        <button className="pill" type="button" onClick={saveDate}>
          Save the Moment
        </button>
        <div className="sweet-invite">
          <span>A SWEET INVITATION</span>
          <strong>Harshiv</strong>
        </div>
      </section>

      <section className="venue paper-section">
        <img className="venue__cloud" src={`${A}/b0a00.png`} alt="" />
        <img className="venue__ornament" src={`${A}/cfbf7.png`} alt="" />
        <Heading eyebrow="MAIN VENUE">Shri Leuva Patel Samaj</Heading>
        <div className="venue__photo">
          <img src={`${A}/b409d.png`} alt="Shri Leuva Patel Samaj venue" />
          <img src={`${A}/e02de.png`} alt="" />
        </div>
        <p>
          Shri Leuva Patel Samaj, Sadak, Pipaliya,
          <br />
          Rajkot, Gujarat – 360311, India
          <br />
          10 &amp; 11 February 2027
        </p>
        <a
          className="pill"
          href="https://www.google.com/maps/search/?api=1&query=Shri+Leuva+Patel+Samaj+Pipaliya+Rajkot"
          target="_blank"
          rel="noreferrer"
        >
          View Location
        </a>
      </section>

      <section className="rituals">
        <Heading eyebrow="SACRED RITUALS" light>
          Five Steps. One Sacred Forever.
        </Heading>
        <p className="rituals__intro">
          Around the sacred fire, beneath blessings from above, every promise
          brings two souls closer to one shared life.
        </p>
        <div className="ritual-list">
          {rituals.map((ritual, index) => (
            <article className="ritual" key={ritual.number}>
              <img src={`${A}/${ritual.image}`} alt={ritual.name} />
              <div>
                <span>{ritual.number}</span>
                <h3>{ritual.name}</h3>
                <p>{ritual.copy}</p>
                {index === 0 && (
                  <img className="ritual__mark" src={`${A}/7523a.png`} alt="" />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="countdown">
        <Heading eyebrow="UNTIL OUR SACRED FOREVER BEGINS" light>
          Counting the Moments
        </Heading>
        <div className="countdown__grid" aria-live="polite">
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="finale">
        <img className="finale__texture" src={`${A}/33dbb.png`} alt="" />
        <img className="finale__cloud" src={`${A}/05b41.png`} alt="" />
        <div className="finale__copy">
          <p className="eyebrow">AND SO OUR SACRED FOREVER BEGINS...</p>
          <h2>Kelsi Javiya &amp; Abhi Bangoriya</h2>
          <p>
            With love in our hearts, blessings above us and our families beside
            us, we look forward to beginning this beautiful journey with you.
          </p>
          <strong>11 February 2027</strong>
          <p>Rajkot</p>
        </div>
        <img
          className="finale__couple"
          src={`${A}/90126.png`}
          alt="Symbolic divine couple"
        />
      </section>

      <button
        className={`music ${musicOn ? "music--playing" : ""}`}
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicOn}
        aria-label={`${musicOn ? "Pause" : "Play"} background ambience`}
      >
        ♪
      </button>
      <a
        className="whatsapp"
        href="https://wa.me/?text=Kelsi%20and%20Abhi%20wedding%20invitation"
        target="_blank"
        rel="noreferrer"
        aria-label="Share invitation on WhatsApp"
      >
        <img src={`${A}/cf832.svg`} alt="" />
      </a>
    </main>
  )
}
