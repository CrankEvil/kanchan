import React, { useEffect, useMemo, useRef, useState } from "react";
import Kanchan1 from "./assets/kanchan1.jpg";
import Kanchan2 from "./assets/kanchan2.jpg";
import music from "./assets/music.mp3";

const constellationWords = [
  "Hope",
  "Happiness",
  "Strength",
  "Kindness",
  "Dreams",
  "Confidence",
  "Success",
  "Joy",
  "Beauty",
  "Friendship",
  "Courage",
  "Love",
];

const heartMessages = [
  "You are appreciated.",
  "You are amazing.",
  "You are strong.",
  "You are special.",
  "You are valued.",
  "You are enough.",
  "You deserve happiness.",
  "You deserve beautiful memories.",
];

const wishTreeMessages = [
  "May happiness always find you.",
  "May every dream come true.",
  "May every year be brighter.",
  "May your smile never fade.",
  "May success follow your path.",
  "May wonderful memories surround you.",
];

const awards = [
  "Kind Heart Award",
  "Beautiful Soul Award",
  "Golden Smile Award",
  "Dream Chaser Award",
  "Future Star Award",
  "Happiness Creator Award",
  "Most Precious Person Award",
];

const giftMessages = [
  "A sky full of birthday wishes for Kanchan.",
  "A year filled with love, peace, and laughter.",
  "A future overflowing with success and beautiful memories.",
  "A heart wrapped in appreciation and light.",
  "A universe where every dream finds its way to you.",
  "A reminder that you are deeply valued and loved.",
];

const introLines = [
  "Some people leave footprints.",
  "Some leave memories.",
  "And some leave light wherever they go.",
  "Today is a celebration of one such person.",
];

const finalLinesData = [
  "Among billions of stars...",
  "Some shine brighter.",
  "Among billions of stories...",
  "Some are unforgettable.",
  "Among billions of smiles...",
  "Some make the world happier.",
  "Thank you for being you.",
  "Happy Birthday Kanchan ❤️",
  "May every dream find its way to you.",
];

const cakeWishes = [
  "May your heart always stay happy.",
  "May your future glow with success.",
  "May beautiful memories find you everywhere.",
  "May your smile never lose its magic.",
  "May love and peace always surround you.",
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function App() {
  const [loading, setLoading] = useState(0);
  const [phase, setPhase] = useState("loading");
  const [introIndex, setIntroIndex] = useState(0);
  const [finalIndex, setFinalIndex] = useState(0);

  const [showLetter, setShowLetter] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);
  const [revealedStars, setRevealedStars] = useState([]);
  const [selectedWish, setSelectedWish] = useState("Click a glowing leaf to reveal a wish.");
  const [selectedHeart, setSelectedHeart] = useState(null);
  const [openedGiftBoxes, setOpenedGiftBoxes] = useState([]);
  const [litCandles, setLitCandles] = useState([]);
  const [showCelebrationBlast, setShowCelebrationBlast] = useState(false);
  const [showFinalBlessing, setShowFinalBlessing] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const [musicStarted, setMusicStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);

  const audioRef = useRef(null);

  const bgParticles = useMemo(() => {
    return Array.from({ length: 260 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 16 + 8,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.7 + 0.15,
    }));
  }, []);

  const floatingOrbs = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      size: random(120, 280),
      left: random(-10, 90),
      top: random(-10, 85),
      duration: random(16, 28),
      delay: random(0, 8),
      color: [
        "rgba(255, 182, 193, 0.11)",
        "rgba(205, 180, 255, 0.12)",
        "rgba(255, 230, 180, 0.11)",
        "rgba(118, 155, 255, 0.10)",
      ][i % 4],
    }));
  }, []);

  const heartGardenItems = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: random(4, 94),
      top: random(10, 86),
      msg: heartMessages[i % heartMessages.length],
      delay: random(0, 6),
      duration: random(5, 12),
    }));
  }, []);

  const giftBoxList = useMemo(() => {
    return giftMessages.map((msg, i) => ({
      id: i,
      message: msg,
    }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading((prev) => {
        const next = prev + Math.floor(Math.random() * 7) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase("gateway"), 700);
          return 100;
        }
        return next;
      });
    }, 140);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase !== "gateway") return;
    if (introIndex >= introLines.length - 1) return;

    const timer = setTimeout(() => {
      setIntroIndex((v) => v + 1);
    }, 1800);

    return () => clearTimeout(timer);
  }, [phase, introIndex]);

  useEffect(() => {
    if (phase !== "finale") return;
    if (finalIndex >= finalLinesData.length - 1) {
      const t = setTimeout(() => setShowFinalBlessing(true), 1700);
      return () => clearTimeout(t);
    }

    const timer = setTimeout(() => {
      setFinalIndex((v) => v + 1);
    }, 1900);

    return () => clearTimeout(timer);
  }, [phase, finalIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTime = () => {
      setProgress(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    const handleLoaded = () => {
      setDuration(audio.duration || 0);
    };

    audio.volume = volume;
    audio.muted = muted;

    audio.addEventListener("timeupdate", handleTime);
    audio.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      audio.removeEventListener("timeupdate", handleTime);
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [volume, muted]);

  useEffect(() => {
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });

      const id = Date.now() + Math.random();
      const point = { id, x: e.clientX, y: e.clientY };
      setSparkles((prev) => [...prev.slice(-18), point]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (litCandles.length === cakeWishes.length) {
      setShowCelebrationBlast(true);
    }
  }, [litCandles]);

  const startMusic = async () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.volume = 0.01;
      await audioRef.current.play();
      setPlaying(true);
      setMusicStarted(true);

      let current = 0.01;
      const fade = setInterval(() => {
        current += 0.03;
        if (current >= volume) {
          current = volume;
          clearInterval(fade);
        }
        if (audioRef.current) audioRef.current.volume = current;
      }, 100);
    } catch (e) {}
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setPlaying(true);
        setMusicStarted(true);
      } catch (e) {}
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const seekAudio = (value) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const enterUniverse = async () => {
    await startMusic();
    setPhase("universe");
  };

  const revealStar = (word) => {
    setSelectedStar(word);
    if (!revealedStars.includes(word)) {
      setRevealedStars((prev) => [...prev, word]);
    }
  };

  const toggleGift = (id) => {
    if (!openedGiftBoxes.includes(id)) {
      setOpenedGiftBoxes((prev) => [...prev, id]);
    }
  };

  const toggleCandle = (i) => {
    if (!litCandles.includes(i)) {
      setLitCandles((prev) => [...prev, i]);
    }
  };

  const backgroundStyle = {
    transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px) scale(1.03)`,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040510] text-white">
      <audio ref={audioRef} src={music} loop preload="auto" />

      <div
        className="pointer-events-none fixed inset-0 z-0 transition-transform duration-500"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#18203a_0%,#070b18_45%,#020307_100%)]" />

        <div className="absolute inset-0 aurora-layer" />

        <div className="absolute left-[-220px] top-[-180px] h-[700px] w-[700px] rounded-full bg-pink-400/10 blur-[170px]" />
        <div className="absolute bottom-[-260px] right-[-260px] h-[860px] w-[860px] rounded-full bg-violet-400/10 blur-[190px]" />
        <div className="absolute left-[35%] top-[8%] h-[340px] w-[340px] rounded-full bg-blue-400/10 blur-[140px]" />

        <div className="moon absolute right-[8%] top-[7%] h-[150px] w-[150px] rounded-full" />

        {floatingOrbs.map((orb) => (
          <span
            key={orb.id}
            className="absolute rounded-full blur-[50px] orbFloat"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              background: orb.color,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}

        {bgParticles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white particleFloat"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: "0 0 10px rgba(255,255,255,.92)",
            }}
          />
        ))}

        {Array.from({ length: 180 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white twinkleStar"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 5}s`,
              boxShadow: "0 0 14px rgba(255,255,255,.9)",
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[120]">
        {sparkles.map((p) => (
          <span
            key={p.id}
            className="absolute sparkleFade h-3 w-3 rounded-full"
            style={{
              left: p.x,
              top: p.y,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,192,203,0.7) 45%, transparent 72%)",
              boxShadow:
                "0 0 18px rgba(255,255,255,.9), 0 0 30px rgba(255,182,193,.5)",
            }}
          />
        ))}
      </div>

      {phase !== "loading" && (
        <MusicControls
          playing={playing}
          onTogglePlay={togglePlay}
          muted={muted}
          setMuted={setMuted}
          volume={volume}
          setVolume={setVolume}
          progress={progress}
          duration={duration}
          onSeek={seekAudio}
          musicStarted={musicStarted}
        />
      )}

      <div className="relative z-10">
        {phase === "loading" && <LoadingScreen loaded={loading} />}

        {phase === "gateway" && (
          <GatewayScreen
            lines={introLines}
            introIndex={introIndex}
            onEnter={enterUniverse}
          />
        )}

        {phase === "universe" && (
          <>
            <FloatingNav />

            <SectionWrap id="constellation">
              <ConstellationSection
                words={constellationWords}
                selectedStar={selectedStar}
                revealedStars={revealedStars}
                onReveal={revealStar}
              />
            </SectionWrap>

            <SectionWrap id="photos">
              <PhotoMasterpieceSection
                photos={[
                  {
                    src: Kanchan1,
                    title: "Some smiles make the world brighter.",
                    subtitle: "Photo One",
                  },
                  {
                    src: Kanchan2,
                    title: "Some hearts leave kindness wherever they go.",
                    subtitle: "Photo Two",
                  },
                ]}
                onOpen={setActivePhoto}
              />
            </SectionWrap>

            <SectionWrap id="letter">
              <MagicLetterSection
                showLetter={showLetter}
                setShowLetter={setShowLetter}
              />
            </SectionWrap>

            <SectionWrap id="hearts">
              <HeartGardenSection
                items={heartGardenItems}
                onHeartClick={setSelectedHeart}
                selectedHeart={selectedHeart}
              />
            </SectionWrap>

            <SectionWrap id="wish-tree">
              <WishTreeSection
                selectedWish={selectedWish}
                setSelectedWish={setSelectedWish}
              />
            </SectionWrap>

            <SectionWrap id="palace">
              <BirthdayPalaceSection />
            </SectionWrap>

            <SectionWrap id="cake">
              <BirthdayCakeSection
                litCandles={litCandles}
                onLight={toggleCandle}
                showCelebrationBlast={showCelebrationBlast}
              />
            </SectionWrap>

            <SectionWrap id="celebration">
              <GrandCelebrationSection photos={[Kanchan1, Kanchan2]} />
            </SectionWrap>

            <SectionWrap id="awards">
              <AwardsSection />
            </SectionWrap>

            <SectionWrap id="gifts">
              <GiftBoxesSection
                giftBoxList={giftBoxList}
                openedGiftBoxes={openedGiftBoxes}
                onOpenGift={toggleGift}
              />
            </SectionWrap>

            <SectionWrap id="dream-world">
              <DreamWorldSection />
            </SectionWrap>

            <SectionWrap id="finale">
              <FinalEndingSection
                lines={finalLinesData}
                finalIndex={finalIndex}
                showFinalBlessing={showFinalBlessing}
                photos={[Kanchan1, Kanchan2]}
              />
            </SectionWrap>
          </>
        )}

        {activePhoto && (
          <PhotoModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
        )}
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes auroraMove {
          0% { transform: translate(-80px, -30px) scale(1); }
          50% { transform: translate(80px, 40px) scale(1.08); }
          100% { transform: translate(-80px, -30px) scale(1); }
        }

        @keyframes moonFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0); }
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 0.2; transform: scale(0.95); }
        }

        @keyframes particleFloat {
          0% { transform: translateY(0px); opacity: .25; }
          50% { transform: translateY(-25px); opacity: 1; }
          100% { transform: translateY(0px); opacity: .25; }
        }

        @keyframes orbFloat {
          0% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-25px) scale(1.08); }
          100% { transform: translate(0,0) scale(1); }
        }

        @keyframes sparkleFade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(255,255,255,.25); }
          50% { box-shadow: 0 0 35px rgba(255,210,230,.6); }
          100% { box-shadow: 0 0 15px rgba(255,255,255,.25); }
        }

        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: .1; }
        }

        @keyframes fireworksPop {
          0% { transform: scale(.25); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        @keyframes floatSlow {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }

        @keyframes petalFall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: .9; }
          100% { transform: translateY(110vh) translateX(50px) rotate(290deg); opacity: .05; }
        }

        .aurora-layer {
          background:
            radial-gradient(circle at 20% 20%, rgba(255,90,180,.16), transparent 35%),
            radial-gradient(circle at 80% 30%, rgba(120,90,255,.16), transparent 35%),
            radial-gradient(circle at 40% 80%, rgba(255,220,120,.10), transparent 40%),
            radial-gradient(circle at 60% 50%, rgba(110,180,255,.10), transparent 35%);
          filter: blur(90px);
          animation: auroraMove 18s ease-in-out infinite;
        }

        .moon {
          background: radial-gradient(circle, #ffffff, #fff8dd, #ffe7a8);
          box-shadow: 0 0 120px rgba(255,255,220,.55);
          animation: moonFloat 8s ease-in-out infinite;
        }

        .particleFloat {
          animation-name: particleFloat;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .orbFloat {
          animation-name: orbFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .twinkleStar {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .sparkleFade {
          animation: sparkleFade .7s ease-out forwards;
        }

        .fadeUp {
          animation: fadeUp 1s ease forwards;
        }

        .glass {
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 20px 80px rgba(0,0,0,.28);
        }

        .luxury-border {
          border: 1px solid rgba(255, 240, 220, 0.18);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.04) inset,
            0 0 60px rgba(255,220,180,.06);
        }

        .glow-pulse {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }

        .section-title {
          background: linear-gradient(90deg, #fbe2f0 0%, #fff6d8 50%, #d8e4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
}

function SectionWrap({ id, children }) {
  return (
    <section id={id} className="relative min-h-screen px-6 py-24">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function MusicControls({
  playing,
  onTogglePlay,
  muted,
  setMuted,
  volume,
  setVolume,
  progress,
  duration,
  onSeek,
  musicStarted,
}) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[140] w-[94%] max-w-4xl -translate-x-1/2">
      <div className="glass luxury-border rounded-[1.8rem] px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-white transition hover:bg-white/20"
            >
              {playing ? "Pause" : "Play"}
            </button>

            <button
              onClick={() => setMuted((v) => !v)}
              className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-white transition hover:bg-white/20"
            >
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>

          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full accent-pink-300"
            />
            <div className="mt-1 flex justify-between text-xs text-white/65">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">
              {musicStarted ? "Music On" : "Music Ready"}
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-28 accent-amber-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen({ loaded }) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.6em] text-rose-200/80">
          Preparing Kanchan's Universe...
        </p>

        <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_70px_rgba(255,220,180,0.15)]">
          <div className="text-4xl font-black section-title">{Math.min(loaded, 100)}%</div>
        </div>

        <div className="mx-auto h-[7px] w-full max-w-md overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-300 via-amber-200 to-violet-300 transition-all duration-300"
            style={{ width: `${Math.min(loaded, 100)}%` }}
          />
        </div>

        <p className="mt-8 text-white/65">
          Stars are gathering. Petals are waking. A universe is taking shape.
        </p>
      </div>
    </section>
  );
}

function GatewayScreen({ lines, introIndex, onEnter }) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="max-w-5xl">
        <div className="mx-auto mb-8 h-5 w-5 rounded-full bg-white shadow-[0_0_35px_10px_rgba(255,255,255,.85)]" />

        <div className="space-y-5">
          {lines.slice(0, introIndex + 1).map((line) => (
            <p
              key={line}
              className="fadeUp text-xl font-light tracking-wide text-white/90 md:text-3xl"
            >
              {line}
            </p>
          ))}
        </div>

        <h1 className="mt-12 text-5xl font-semibold tracking-[0.28em] section-title md:text-8xl">
          KANCHAN ❤️
        </h1>

        <button
          onClick={onEnter}
          className="mt-12 rounded-full border border-white/20 bg-white/10 px-10 py-4 text-sm uppercase tracking-[0.35em] text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
        >
          Enter The Universe
        </button>
      </div>
    </section>
  );
}

function FloatingNav() {
  const items = [
    ["constellation", "Constellation"],
    ["photos", "Photos"],
    ["letter", "Letter"],
    ["hearts", "Heart Garden"],
    ["wish-tree", "Wish Tree"],
    ["palace", "Palace"],
    ["cake", "Cake"],
    ["celebration", "Celebration"],
    ["awards", "Awards"],
    ["gifts", "Gift Boxes"],
    ["dream-world", "Dream World"],
    ["finale", "Finale"],
  ];

  return (
    <div className="fixed right-4 top-1/2 z-[130] hidden -translate-y-1/2 xl:block">
      <div className="glass rounded-[1.4rem] p-3">
        <div className="flex flex-col gap-2">
          {items.map(([id, label]) => (
            <button
              key={id}
              onClick={() =>
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-xl px-3 py-2 text-left text-sm text-white/72 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConstellationSection({ words, selectedStar, revealedStars, onReveal }) {
  const positions = [
    { left: "10%", top: "68%" },
    { left: "17%", top: "34%" },
    { left: "25%", top: "66%" },
    { left: "34%", top: "22%" },
    { left: "43%", top: "70%" },
    { left: "48%", top: "38%" },
    { left: "56%", top: "69%" },
    { left: "63%", top: "22%" },
    { left: "73%", top: "63%" },
    { left: "81%", top: "38%" },
    { left: "89%", top: "62%" },
    { left: "52%", top: "10%" },
  ];

  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        The Kanchan Constellation
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Every star reveals a part of her light.
      </h2>

      <div className="glass luxury-border relative mt-14 overflow-hidden rounded-[2rem] p-6 md:p-10">
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 h-full w-full opacity-40"
          preserveAspectRatio="none"
        >
          <polyline
            points="120,340 170,200 250,330 350,130 430,340 480,210 560,340 620,130 720,320 810,210 900,320"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="2"
            strokeDasharray="8 10"
          />
        </svg>

        <div className="relative h-[460px] w-full">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
            <h3 className="text-5xl font-black tracking-[0.45em] section-title md:text-8xl">
              KANCHAN
            </h3>
          </div>

          {words.map((word, i) => {
            const active = revealedStars.includes(word);
            return (
              <button
                key={word}
                onClick={() => onReveal(word)}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition hover:scale-110"
                style={positions[i]}
              >
                <div
                  className={`glow-pulse h-5 w-5 rounded-full ${
                    active ? "bg-white" : "bg-white/70"
                  }`}
                  style={{
                    boxShadow: active
                      ? "0 0 26px rgba(255,255,255,.95), 0 0 48px rgba(255,200,230,.5)"
                      : "0 0 14px rgba(255,255,255,.45)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <div className="glass rounded-[1.6rem] p-6 text-center">
          <div className="mb-2 text-xs uppercase tracking-[0.35em] text-white/55">
            Revealed Light
          </div>
          <div className="text-2xl text-white">
            {selectedStar || "Tap a star to reveal its meaning."}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoMasterpieceSection({ photos, onOpen }) {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Photo Masterpiece
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Not a gallery. A constellation of memories.
      </h2>

      <div className="mt-16 grid gap-14">
        {photos.map((photo, index) => (
          <div
            key={photo.title}
            className={`grid items-center gap-10 lg:grid-cols-2 ${
              index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative mx-auto w-full max-w-xl">
              <ButterfliesOverlay count={7} />
              <PetalsOverlay count={16} />
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,_rgba(255,210,170,0.18),_transparent_55%)] blur-3xl" />
              <div className="glass luxury-border relative overflow-hidden rounded-[2rem] p-4">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-[560px] w-full cursor-pointer rounded-[1.5rem] object-cover"
                  onClick={() => onOpen(photo)}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.18),transparent_35%)]" />
              </div>
            </div>

            <div className="glass rounded-[2rem] p-8 md:p-10">
              <p className="text-sm uppercase tracking-[0.45em] text-amber-100/70">
                {photo.subtitle}
              </p>
              <p className="mt-5 text-2xl leading-relaxed text-white/90 md:text-4xl">
                {photo.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MagicLetterSection({ showLetter, setShowLetter }) {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.55em] text-rose-200/75">
        The Magic Letter
      </p>

      <h2 className="mt-5 text-4xl font-black text-white md:text-6xl">
        A luxury envelope holding a handwritten wish.
      </h2>

      {!showLetter ? (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowLetter(true)}
            className="relative rounded-[2rem] border border-amber-100/20 bg-gradient-to-br from-amber-100/15 via-rose-100/10 to-violet-200/10 px-10 py-10 backdrop-blur-2xl transition hover:scale-105"
          >
            <div className="absolute inset-x-0 top-0 mx-auto h-1/2 rounded-t-[2rem] border-b border-white/10 bg-gradient-to-b from-amber-100/30 to-transparent" />
            <p className="relative z-10 text-sm uppercase tracking-[0.5em] text-amber-100/70">
              Click to open
            </p>
            <p className="relative z-10 mt-4 text-3xl font-semibold text-white">
              The Envelope for Kanchan
            </p>
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-16 max-w-4xl glass rounded-[2rem] p-8 text-left md:p-12">
          <div className="mx-auto max-w-3xl rounded-[1.5rem] bg-white/90 px-8 py-10 text-stone-700 shadow-2xl">
            <div className="mb-6 text-3xl font-serif text-pink-700">
              Happy Birthday Kanchan ❤️
            </div>

            <div className="space-y-4 text-lg leading-8 font-serif">
             <p>
  Today is not just another day, today is a reminder that someone as special as
  you came into this world.
</p>

<p>
  I hope you know how much happiness your presence brings, even in ways you may
  never notice. Sometimes the smallest moments, a simple smile, a small
  conversation, or just seeing you happy can make an ordinary day feel a little
  brighter.
</p>

<p>
  Maybe you don't realize how much you mean to me. Maybe you don't see yourself
  the way I see you. But there is something about you that makes you different.
  Your kindness, your personality, your little habits, and the way you make
  people around you feel comfortable are things that make you truly special.
</p>

<p>
  I know life does not always go exactly how we imagine. People change, moments
  pass, and sometimes feelings are not always the same from both sides. But
  even then, you remain someone I genuinely care about. You don't have to be
  perfect, and you don't have to be anything else. Being yourself is already
  enough.
</p>

<p>
  Even if I am not the person you think about first, even if I am not someone
  who holds the biggest place in your world, you are still one of my favourite
  people. Not because of what you do for me, but simply because you are you.
</p>

<p>
  I hope this new year of your life brings you everything you secretly wish for.
  I hope you find happiness in unexpected places, achieve every dream you chase,
  and always have reasons to smile. I hope you meet people who appreciate your
  heart and remind you how valuable you are.
</p>

<p>
  Never forget that your existence matters. The world feels a little different
  because you are part of it. Your laughter, your memories, and the moments you
  create are things that make life more beautiful.
</p>

<p>
  Thank you for being the person you are. Thank you for the little moments, the
  memories, and the happiness you have unknowingly given. Some people leave a
  mark on our lives without even trying, and you are one of those people.
</p>

<p>
  So today, forget everything that worries you. Enjoy your day, enjoy every
  smile, every wish, and every beautiful moment coming your way.
</p>

<p>
  Happy Birthday. I hope this year becomes your best chapter yet. Keep shining,
  keep growing, and always remember that you are someone truly special.
</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HeartGardenSection({ items, onHeartClick, selectedHeart }) {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Heart Garden
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Thousands of hearts. One sky full of appreciation.
      </h2>

      <div className="glass luxury-border relative mt-14 min-h-[660px] overflow-hidden rounded-[2rem] p-8">
        {items.map((heart) => (
          <button
            key={heart.id}
            onClick={() => onHeartClick(heart.msg)}
            className="absolute rounded-full border border-white/20 bg-pink-200/15 px-4 py-2 text-sm text-white backdrop-blur transition hover:scale-105 hover:bg-pink-200/20"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animation: `floatSlow ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
            }}
          >
            ❤️ {heart.msg}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <div className="glass rounded-[1.6rem] p-6 text-center">
          <div className="mb-2 text-xs uppercase tracking-[0.35em] text-white/55">
            Heart Message
          </div>
          <div className="text-2xl text-white">
            {selectedHeart || "Tap any heart to reveal its message."}
          </div>
        </div>
      </div>
    </div>
  );
}

function WishTreeSection({ selectedWish, setSelectedWish }) {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Wish Tree
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        A magical tree carrying glowing wishes.
      </h2>

      <div className="glass luxury-border mt-14 rounded-[2rem] p-6 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="relative mx-auto h-[540px] w-full max-w-[540px]">
            <div className="absolute left-1/2 top-[20%] h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="absolute left-1/2 top-[42%] h-[250px] w-[70px] -translate-x-1/2 rounded-full bg-amber-700/60" />

            {new Array(16).fill(0).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const radius = 120 + (i % 3) * 18;
              const x = 50 + (Math.cos(angle) * radius) / 5.2;
              const y = 32 + (Math.sin(angle) * radius) / 6;

              return (
                <button
                  key={i}
                  onClick={() =>
                    setSelectedWish(wishTreeMessages[i % wishTreeMessages.length])
                  }
                  className="absolute h-8 w-8 rounded-full bg-emerald-300/75 glow-pulse transition hover:scale-110"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    boxShadow: "0 0 20px rgba(110,231,183,.7)",
                  }}
                />
              );
            })}
          </div>

          <div className="glass rounded-[2rem] p-8">
            <div className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
              Revealed Wish
            </div>
            <div className="text-2xl leading-10 text-white">{selectedWish}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BirthdayPalaceSection() {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Birthday Palace
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Moonlight, lanterns, fireflies, aurora.
      </h2>

      <div className="glass luxury-border relative mt-14 overflow-hidden rounded-[2rem] p-10">
        <FirefliesOverlay count={38} />

        <div className="absolute inset-x-0 top-10 flex justify-center gap-6">
          {new Array(8).fill(0).map((_, i) => (
            <span
              key={i}
              className="float-slow h-16 w-10 rounded-full bg-amber-100/40 blur-[0.2px]"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="relative h-[460px]">
            <div className="absolute bottom-0 left-1/2 h-[240px] w-[420px] -translate-x-1/2 rounded-t-[8rem] border border-white/20 bg-white/10" />
            <div className="absolute bottom-[140px] left-1/2 h-[180px] w-[220px] -translate-x-1/2 rounded-t-[4rem] border border-white/20 bg-white/10" />
            <div className="absolute bottom-0 left-[18%] h-[250px] w-[70px] rounded-t-[2rem] border border-white/20 bg-white/10" />
            <div className="absolute bottom-0 right-[18%] h-[250px] w-[70px] rounded-t-[2rem] border border-white/20 bg-white/10" />
            <div className="absolute bottom-[240px] left-[18%] h-[140px] w-[46px] rounded-t-full border border-white/20 bg-white/10" />
            <div className="absolute bottom-[240px] right-[18%] h-[140px] w-[46px] rounded-t-full border border-white/20 bg-white/10" />

            <div className="absolute inset-x-0 top-10 text-center">
              <h3 className="text-4xl font-bold section-title md:text-7xl">
                HAPPY BIRTHDAY KANCHAN ❤️
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BirthdayCakeSection({ litCandles, onLight, showCelebrationBlast }) {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Interactive Birthday Cake
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Light every candle to unlock the grand magic.
      </h2>

      <div className="glass luxury-border relative mt-14 rounded-[2rem] p-8 md:p-10">
        {showCelebrationBlast && (
          <>
            <ConfettiOverlay count={70} />
            <FireworksOverlay count={12} />
            <PetalsOverlay count={20} />
            <ButterfliesOverlay count={8} />
          </>
        )}

        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="relative mx-auto h-[430px] w-full max-w-[470px]">
            <div className="absolute bottom-0 left-1/2 h-36 w-80 -translate-x-1/2 rounded-[3rem] bg-gradient-to-b from-pink-100 to-pink-300 shadow-[0_20px_80px_rgba(255,182,193,0.25)]" />
            <div className="absolute bottom-24 left-1/2 h-28 w-64 -translate-x-1/2 rounded-[2rem] bg-gradient-to-b from-amber-100 to-amber-200" />
            <div className="absolute bottom-40 left-1/2 h-20 w-48 -translate-x-1/2 rounded-[1.7rem] bg-gradient-to-b from-white to-rose-100" />

            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => onLight(i)}
                className="absolute"
                style={{ left: `${22 + i * 14}%`, top: "25%" }}
              >
                <div className="relative h-20 w-4 rounded-full bg-white/80">
                  {litCandles.includes(i) && (
                    <div
                      className="absolute -top-5 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-yellow-300 blur-[1px]"
                      style={{
                        boxShadow:
                          "0 0 22px rgba(253,224,71,.95), 0 0 40px rgba(251,191,36,.6)",
                      }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {cakeWishes.map((wish, i) => (
              <div
                key={wish}
                className={`rounded-2xl border p-4 text-white transition ${
                  litCandles.includes(i)
                    ? "border-yellow-200/50 bg-yellow-100/15"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="mb-1 text-xs uppercase tracking-[0.25em] text-white/60">
                  Candle {i + 1}
                </div>
                <div className="text-lg">
                  {litCandles.includes(i) ? wish : "Light this candle to reveal a wish."}
                </div>
              </div>
            ))}

            {showCelebrationBlast && (
              <div className="rounded-3xl border border-pink-200/30 bg-pink-100/15 p-6 text-center text-white fadeUp">
                Final candle awakened the celebration.
                <div className="mt-3 text-2xl">
                  Fireworks • Confetti • Rose Petals • Butterflies • Golden Sparkles
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GrandCelebrationSection({ photos }) {
  return (
    <div className="text-center">
      <ConfettiOverlay count={55} />
      <FireworksOverlay count={10} />
      <ButterfliesOverlay count={8} />

      <p className="text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Grand Celebration
      </p>

      <h2 className="mt-6 text-5xl font-black section-title md:text-8xl">
        HAPPY BIRTHDAY KANCHAN ❤️
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-white/75">
        A crown of light above beautiful memories, with the whole universe celebrating.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {photos.map((src, i) => (
          <div key={src} className="relative">
            <div className="glass luxury-border overflow-hidden rounded-[2rem] p-4 transition hover:-translate-y-2">
              <div className="absolute left-1/2 top-2 -translate-x-1/2 text-5xl float-slow">
                👑
              </div>
              <img
                src={src}
                alt={`Kanchan celebration ${i + 1}`}
                className="h-[520px] w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsSection() {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Achievement Awards
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Titles made for a precious soul.
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {awards.map((award, i) => (
          <div key={award} className="glass rounded-[1.8rem] p-6 fadeUp" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="mb-3 text-3xl">🏆</div>
            <div className="text-2xl text-white">{award}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GiftBoxesSection({ giftBoxList, openedGiftBoxes, onOpenGift }) {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Secret Gift Boxes
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Hidden blessings scattered across the universe.
      </h2>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {giftBoxList.map((box) => {
          const open = openedGiftBoxes.includes(box.id);
          return (
            <button
              key={box.id}
              onClick={() => onOpenGift(box.id)}
              className="glass rounded-[1.8rem] p-6 text-center transition hover:scale-[1.02]"
            >
              <div className="mb-4 text-5xl">{open ? "✨" : "🎁"}</div>
              <div className="mb-3 text-xl text-white">
                {open ? "Gift Opened" : "Mystery Gift"}
              </div>
              <div className="text-white/75">
                {open ? box.message : "Click to reveal a hidden birthday blessing."}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DreamWorldSection() {
  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Dream World
      </p>

      <h2 className="mt-5 text-center text-4xl font-black text-white md:text-6xl">
        Floating islands, clouds, stars, and magic dust.
      </h2>

      <div className="glass luxury-border relative mt-14 min-h-[560px] overflow-hidden rounded-[2rem] p-8">
        <div className="absolute left-[10%] top-[18%] h-28 w-56 rounded-full bg-white/15 blur-sm" />
        <div className="absolute left-[60%] top-[14%] h-24 w-48 rounded-full bg-white/15 blur-sm" />
        <div className="absolute left-[18%] top-[55%] h-36 w-64 rounded-[4rem] bg-purple-200/15" />
        <div className="absolute left-[55%] top-[45%] h-40 w-72 rounded-[4rem] bg-blue-200/15" />
        <div className="absolute left-[34%] top-[30%] h-28 w-56 rounded-[4rem] bg-pink-200/15" />

        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div className="max-w-4xl text-3xl leading-tight text-white md:text-5xl">
            "May your future be filled with happiness, adventure, success, and beautiful memories."
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalEndingSection({ lines, finalIndex, showFinalBlessing, photos }) {
  return (
    <div className="text-center">
      <ButterfliesOverlay count={7} />
      <PetalsOverlay count={18} />

      <p className="text-sm uppercase tracking-[0.55em] text-rose-200/75">
        Final Ending
      </p>

      <div className="mt-16 space-y-6">
        {lines.slice(0, finalIndex + 1).map((line) => (
          <p key={line} className="fadeUp text-2xl leading-relaxed text-white/88 md:text-4xl">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="glass overflow-hidden rounded-[2rem] p-4">
          <img
            src={photos[0]}
            alt="Kanchan final 1"
            className="h-[420px] w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div className="glass overflow-hidden rounded-[2rem] p-4">
          <img
            src={photos[1]}
            alt="Kanchan final 2"
            className="h-[420px] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>

      {showFinalBlessing && (
        <div className="mt-16 fadeUp">
          <p className="text-4xl font-black section-title md:text-6xl">
            FOR KANCHAN ❤️
          </p>
          <p className="mt-4 text-xl tracking-[0.25em] text-white/72 md:text-2xl">
            WITH BEST WISHES
          </p>

          <div className="mx-auto mt-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.95),_rgba(244,114,182,0.24),_transparent_68%)] blur-sm" />

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            May every year ahead bring more smiles, more peace, more love,
            and more beautiful reasons to believe in life.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-10 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-white backdrop-blur-xl transition hover:scale-105"
          >
            Replay
          </button>
        </div>
      )}
    </div>
  );
}

function PhotoModal({ photo, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-4xl rounded-[2rem] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-h-[75vh] w-full rounded-[1.5rem] object-cover"
        />
        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-100/70">
              {photo.subtitle}
            </p>
            <p className="mt-2 text-2xl text-white/90">{photo.title}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ButterfliesOverlay({ count = 8 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute text-pink-100/70"
          style={{
            left: `${random(5, 90)}%`,
            top: `${random(10, 86)}%`,
            fontSize: `${random(16, 24)}px`,
            animation: `floatSlow ${random(5, 10)}s ease-in-out ${random(0, 4)}s infinite`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

function PetalsOverlay({ count = 16 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-[-20px] rounded-full bg-pink-200/75"
          style={{
            left: `${random(0, 100)}%`,
            width: `${random(10, 18)}px`,
            height: `${random(8, 14)}px`,
            animation: `petalFall ${random(6, 12)}s linear ${random(0, 8)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function FirefliesOverlay({ count = 30 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-yellow-200"
          style={{
            left: `${random(0, 100)}%`,
            top: `${random(0, 100)}%`,
            boxShadow: "0 0 16px rgba(253,224,71,.9)",
            animation: `floatSlow ${random(4, 10)}s ease-in-out ${random(0, 4)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ConfettiOverlay({ count = 60 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-[-12px]"
          style={{
            left: `${random(0, 100)}%`,
            width: `${random(6, 12)}px`,
            height: `${random(10, 20)}px`,
            background: ["#ffd6ea", "#fff0b3", "#cdb4ff", "#bde0fe"][i % 4],
            animation: `confettiFall ${random(3, 7)}s linear ${random(0, 2)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function FireworksOverlay({ count = 10 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full border border-white/50"
          style={{
            left: `${random(10, 90)}%`,
            top: `${random(8, 55)}%`,
            width: `${random(24, 60)}px`,
            height: `${random(24, 60)}px`,
            boxShadow: "0 0 30px rgba(255,220,180,.45)",
            animation: `fireworksPop ${random(1.8, 2.8)}s ease-out ${random(0, 2)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function formatTime(sec) {
  if (!sec || Number.isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}