import React, { useEffect } from "react";
import { useJitsi } from "react-jutsu";
import LoadingJitsi from "../loading/LoadingJitsi";

import imgLogo from "../../assets/images/logo.png";

const Stream = (props) => {
  // const type = props.type;
  // const domain = "transmision.arcavirtual.net";
  const roomName = props.streamRoom;
  const username = props.name;
  const perfilImg = props.profileImg;
  const password = props.streamPassword;
  const streamName = props.streamRoomName;
  const parentNode = "jitsi-container";
  const configOverwrite = {
    defaultLanguage: "es",
  };
  const interfaceConfigOverwrite = {
    filmStripOnly: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    SHOW_JITSI_WATERMARK: false,
    ENABLE_FEEDBACK_ANIMATION: true,
    DEFAULT_REMOTE_DISPLAY_NAME: username,
    DEFAULT_LOCAL_DISPLAY_NAME: "yo",
  };
  const jitsi = useJitsi({
    roomName,
    parentNode,
    interfaceConfigOverwrite,
    configOverwrite,
  });

  // let jitsiID = "";
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
      <div id={parentNode}>
        <div
          href="https://arcadepapel.net"
          target="_blank"
          className="logo-streamming"
        >
          <img src={imgLogo} alt="" />
        </div>
      </div>
    </>
  );
};

export default Stream;
