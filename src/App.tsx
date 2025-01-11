import {useState} from 'react'
import './App.css'

function App() {
    const [bpm, setBpm] = useState<number>(120);
    const [playing, setIsPlaying] = useState<boolean>(false);
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

                            <button onClick={() => setIsPlaying(!playing)}>
                                play
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
