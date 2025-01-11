import {useEffect, useRef, useState} from 'react'
import './App.css'
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

function App() {
    const [bpm, setBpm] = useState<number>(120);
    const [playing, setIsPlaying] = useState<boolean>(false);
    const intervalRef = useRef<number | null>(null);
    const audioContext = useRef<AudioContext | null>(null);

    const playBeep = () => {
        if (!audioContext.current) {
            audioContext.current = new AudioContext();
        }

        const osc = audioContext.current.createOscillator();
        const gain = audioContext.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioContext.current.currentTime);
        gain.gain.setValueAtTime(0.1, audioContext.current.currentTime); // Lower the volume
        osc.connect(gain).connect(audioContext.current.destination);

        osc.start();
        osc.stop(audioContext.current.currentTime + 0.1); // Beep duration
    };

    const startMetronome = () => {
        if (!playing) {
            setIsPlaying(true);
        }
    }

    const stopMetronome = () => {
        if (playing) {
            setIsPlaying(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }

    const updateInterval = () => {
        if (playing) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            const interval = 60000 / bpm;
            intervalRef.current = window.setInterval(() => {
                playBeep()
            }, interval);
        }
    }

    // Effect to handle BPM changes while playing
    useEffect(() => {
        updateInterval();
    }, [bpm]);

    // Effect to start or stop metronome based on playing state
    useEffect(() => {
        if (playing) {
            updateInterval();
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [playing]);

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (audioContext.current) {
                audioContext.current.close();
            }
        };
    }, []);


    return (
        <>
            <div>
                <header>
                    <h1>Rhythm Trainer</h1>

                    {/* Metronome*/}
                    <div>
                        {/*BPM and Play Button*/}
                        <div style={{display: "flex"}}>

                            {/**/}
                            <div>
                                <p>{bpm} <span>BPM</span></p>
                            </div>

                            <button onClick={() => (playing ? stopMetronome() : startMetronome())}>
                                {playing ? "Stop" : "Play"}
                            </button>

                        </div>
                        <div>
                            <div>
                                <button onClick={() => setBpm(bpm - 1)}>Down</button>
                                <button onClick={() => setBpm(bpm + 1)}>Up</button>
                            </div>
                        </div>


                    </div>
                    <p>Beat duration: {60000 / bpm} ms</p>
                    <p>Quarter Note = {60000 / bpm} ms</p>
                    <p>Eight Note = {(60000 / bpm) / 2} ms</p>
                    <p>Sixteenth Note = {(60000 / bpm) / 4} ms</p>
                    <p>Is playing: {playing ? "yes" : "no"}</p>
                </header>
            </div>
        </>
    )
}

export default App
