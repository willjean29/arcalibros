import React, { useEffect } from "react";
import { useJitsi } from "react-jutsu";
import LoadingJitsi from "../loading/LoadingJitsi";

import imgLogo from '../../assets/images/logo.png';


const StreamArca = (props) => {

  const domain = 'meet.jit.si';
  const roomName = props.streamRoom;
  const username = props.name;
  const perfilImg = props.profileImg;
  const password = props.streamPassword;
  const streamName = props.streamRoomName;
  const parentNode = document.querySelector('#jitsi-container');
  const configOverwrite = {
    defaultLanguage: 'es',
  }
  const interfaceConfigOverwrite = {
    filmStripOnly: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    SHOW_JITSI_WATERMARK: false,
    ENABLE_FEEDBACK_ANIMATION: true,
    DEFAULT_REMOTE_DISPLAY_NAME: username,
    DEFAULT_LOCAL_DISPLAY_NAME: "yo",
  };
  const options = {roomName, parentNode, interfaceConfigOverwrite, configOverwrite };
  const jitsi = useJitsi(domain,options);
  useEffect(() => {
    if (jitsi) {
        jitsi.addEventListener("videoConferenceJoined", () => {
        jitsi.executeCommand("avatarUrl", perfilImg); 
        jitsi.executeCommand("displayName", username);
        jitsi.executeCommand("subject", streamName);
        jitsi.executeCommand("role", "participant");
      });
      jitsi.addEventListener("videoConferenceLeft", () => {
        window.close();
      });
    }
    return () => jitsi && jitsi.dispose();
  }, [jitsi, username, perfilImg, streamName]);

  return (
    <>
      <LoadingJitsi></LoadingJitsi>
      <div id="jitsi-container">
        <div href="https://arcadepapel.net" target="_blank" className="logo-streamming">
          <img src={imgLogo} alt=""/>  
        </div>
      </div>
    </>
  );
};

export default StreamArca;
