export const getVoice = (description, isVisible, setVisible) =>{

    description = description.replace(/(\r\n|\n|\r)/gm, " ");
    const synth = window.speechSynthesis;
    let voices= synth.getVoices();
    let utterThis = new SpeechSynthesisUtterance(description);
    utterThis.voice = voices[6];
    utterThis.pitch = 0.8;
    utterThis.rate = 1;
    utterThis.onend =() => {
        setVisible(isVisible)
    }
    //synth.speak(utterThis);

}

export const stop = () =>{
    window.speechSynthesis.cancel();
}
