import React, { useState, useEffect, useRef } from 'react';

const SpeechRecognitionForm = () => {
  const [speech, setSpeech] = useState({
    enabled: true,
    listening: false,
    recognition: null,
    text: ''
  });

  const resultRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setSpeech((prevSpeech) => ({
        ...prevSpeech,
        recognition: new window.SpeechRecognition(),
      }));
    }
  }, []);

  useEffect(() => {
    if (speech.recognition) {
      speech.recognition.continuous = true;
      speech.recognition.interimResults = true;
      speech.recognition.lang = 'en-US';

      speech.recognition.addEventListener('result', (event) => {
        const audio = event.results[event.results.length -  1];
        setSpeech((prevSpeech) => ({ ...prevSpeech, text: audio[0].transcript }));

        const tag = document.activeElement.nodeName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') {
          if (audio.isFinal) {
            document.activeElement.value += speech.text;
          }
        }
        resultRef.current.innerText = speech.text;
      });

      toggleRef.current.addEventListener('click', () => {
        setSpeech((prevSpeech) => ({
          ...prevSpeech,
          listening: !prevSpeech.listening,
        }));

        if (speech.listening) {
          toggleRef.current.classList.add('listening');
          toggleRef.current.innerText = 'Listening ...';
          speech.recognition.start();
        } else {
          toggleRef.current.classList.remove('listening');
          toggleRef.current.innerText = 'Toggle listening';
          speech.recognition.stop();
        }
      });
    }
  }, [speech]);

  return (
    <form>
      <fieldset>
        <legend>Fill Out Form With Speech Recognition (Chrome)</legend>
        <code ref={resultRef}>live transcript here ...</code>
        <button ref={toggleRef} type="button" id="toggle">Toggle listening</button>
        <p>Click on “Toggle listening”, then click on the form field, where you want to insert speeched text. Pause a bit after a sentence to process the speech-data. This demo only works with language <strong>“en-US”</strong>, only in Chrome, and only if you allow the microphone on this page!</p>
        <label>Field  1<input /></label>
        <label>Field  2<input /></label>
        <label>Field  3<input /></label>
        <label>Field  4<textarea></textarea></label>
      </fieldset>
    </form>
  );
};

export default SpeechRecognitionForm;