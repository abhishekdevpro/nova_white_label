
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 400px;
  border: 0.5px solid #1C2957;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   background-color: #000;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  gap: 10px;
`;

const RecordButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ recording }) => (recording ? '#dc3545' : '#28a745')};
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

export default function VideoRecorder({ onRecordingComplete }) {
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const [mediaBlob, setMediaBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current?.stop();
    };
  }, []);

  const startRecording = () => {
    const stream = streamRef.current;
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setMediaBlob(blob);
      onRecordingComplete(blob);
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <VideoContainer>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <Controls>
        {!isRecording ? (
          <button className='site-button bg-success' onClick={startRecording}>Start Recording</button>
        ) : (
          <button className='site-button bg-danger' recording onClick={stopRecording}>Stop Recording</button>
        )}
      </Controls>
    </VideoContainer>
  );
}
