import { useEffect, useRef, useState, useCallback } from 'react';

import { ToolCall } from '@/shared/types';

import styles from './audio-chat.module.scss';

const BASE_URL = 'https://api.openai.com/v1/realtime';
const MODEL = 'gpt-4o-mini-realtime-preview-2024-12-17';

export type AudioChatProps = {
  onToolCall: (toolCall: ToolCall) => void;
  tools: any[];
  systemPrompt: string;
}

export function AudioChat(props: AudioChatProps) {
  const { onToolCall, tools, systemPrompt, ...otherProps } = props;
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const tracks = useRef<RTCRtpSender[] | null>(null);

  async function startSession() {
    try {
      if (!isSessionStarted) {
        setIsSessionStarted(true);
        
        const session = await fetch('/api/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json());
        
        const sessionToken = session.client_secret.value;
        const sessionId = session.id;

        console.log('Session id:', sessionId);

        const pc = new RTCPeerConnection();

        if (!audioElement.current) {
          audioElement.current = document.createElement('audio');
        }
        audioElement.current.autoplay = true;
        pc.ontrack = (e) => {
          if (audioElement.current) {
            audioElement.current.srcObject = e.streams[0];
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        stream.getTracks().forEach((track) => {
          const sender = pc.addTrack(track, stream);
          if (sender) {
            tracks.current = [...(tracks.current || []), sender];
          }
        });

        const dc = pc.createDataChannel('oai-events');
        setDataChannel(dc);

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const sdpResponse = await fetch(`${BASE_URL}?model=${MODEL}`, {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            'Content-Type': 'application/sdp',
          },
        });

        const answer: RTCSessionDescriptionInit = {
          type: 'answer',
          sdp: await sdpResponse.text(),
        };
        await pc.setRemoteDescription(answer);

        peerConnection.current = pc;
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  }

  function stopSession() {
    if (dataChannel) {
      dataChannel.close();
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    setIsSessionStarted(false);
    setIsSessionActive(false);
    setDataChannel(null);
    peerConnection.current = null;
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
    setAudioStream(null);
    setIsListening(false);
  }

  async function startRecording() {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAudioStream(newStream);

      if (tracks.current) {
        const micTrack = newStream.getAudioTracks()[0];
        tracks.current.forEach((sender) => {
          sender.replaceTrack(micTrack);
        });
      } else if (peerConnection.current) {
        newStream.getTracks().forEach((track) => {
          const sender = peerConnection.current?.addTrack(track, newStream);
          if (sender) {
            tracks.current = [...(tracks.current || []), sender];
          }
        });
      }

      setIsListening(true);
      console.log('Microphone started.');
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  function stopRecording() {
    setIsListening(false);

    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
    setAudioStream(null);

    if (tracks.current) {
      const placeholderTrack = createEmptyAudioTrack();
      tracks.current.forEach((sender) => {
        sender.replaceTrack(placeholderTrack);
      });
    }
  }

  function createEmptyAudioTrack(): MediaStreamTrack {
    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();
    return destination.stream.getAudioTracks()[0];
  }

  const sendClientEvent = useCallback(
    (message: any) => {
      if (dataChannel) {
        message.event_id = message.event_id || crypto.randomUUID();
        dataChannel.send(JSON.stringify(message));
      } else {
        console.error('Failed to send message - no data channel available', message);
      }
    },
    [dataChannel]
  );

  useEffect(() => {
    async function handleToolCall(output: any) {
      const toolCall: ToolCall = {
        name: output.name,
        arguments: output.arguments,
      };
      
      console.log('Tool call:', toolCall);
      
      // Call the parent handler first
      onToolCall(toolCall);

      // Initialize toolCallOutput with a default response
      const toolCallOutput: any = {
        response: `Tool call ${toolCall.name} executed successfully.`,
      };

      sendClientEvent({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: output.call_id,
          output: JSON.stringify(toolCallOutput),
        },
      });

      // Force a model response
      sendClientEvent({
        type: 'response.create',
      });
    }

    if (dataChannel) {
      dataChannel.addEventListener('message', (e) => {
        const event = JSON.parse(e.data);
        if (event.type === 'response.done') {
          const output = event.response.output[0];
          if (output?.type === 'function_call') {
            handleToolCall(output);
          }
        }
      });

      dataChannel.addEventListener('open', () => {
        setIsSessionActive(true);
        setIsListening(true);
        
        const sessionUpdate = {
          type: 'session.update',
          session: {
            tools: tools,
            instructions: systemPrompt,
          },
        };
        sendClientEvent(sessionUpdate);
        console.log('Session update sent:', sessionUpdate);
      });
    }
  }, [dataChannel, sendClientEvent, onToolCall, tools, systemPrompt]);

  // Separate effect to handle real-time updates to systemPrompt and tools
  useEffect(() => {
    // Only send updates if session is active and we have a data channel
    if (isSessionActive && dataChannel && sendClientEvent) {
      const sessionUpdate = {
        type: 'session.update',
        session: {
          tools: tools,
          instructions: systemPrompt,
        },
      };
      sendClientEvent(sessionUpdate);
      console.log('Real-time session update sent:', sessionUpdate);
    }
  }, [systemPrompt, tools, isSessionActive, dataChannel, sendClientEvent]);

  const handleConnectClick = async () => {
    if (isSessionActive) {
      console.log('Stopping session.');
      stopSession();
    } else {
      console.log('Starting session.');
      startSession();
    }
  };

  const handleMicToggleClick = async () => {
    if (isListening) {
      console.log('Stopping microphone.');
      stopRecording();
    } else {
      console.log('Starting microphone.');
      startRecording();
    }
  };

  return (
    <section className={styles.container} {...otherProps}>
      <div className={styles.statusIndicator} data-status={isSessionActive ? 'connected' : 'disconnected'}>
        {isSessionActive ? 'Connected' : 'Disconnected'}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.button}
          data-variant="connect"
          data-connected={isSessionActive}
          onClick={handleConnectClick}
          disabled={isSessionStarted && !isSessionActive}
        >
          {'🔌'}
        </button>

        <button
          className={styles.button}
          data-variant="microphone"
          data-recording={isListening}
          onClick={handleMicToggleClick}
        >
          {isListening ? '🎤' : '🔇'}
        </button>
      </div>
    </section>
  );
}