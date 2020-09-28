const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

let mediaStream = null;
let isCameraOff = false;
let isAudioOff = false;

function unselectUsersFromList() {
  const alreadySelectedUser = document.querySelectorAll(
    ".active-user.active-user--selected"
  );

  alreadySelectedUser.forEach((element) => {
    element.setAttribute("class", "active-user");
  });
}

function updateUsersList(socketIds) {
  const activeUsersContainer = document.getElementById("active-user-container");

  socketIds.forEach((socketId) => {
    const alreadyExistingUsers = document.getElementById(socketId);
    if (!alreadyExistingUsers) {
      const userContainerEl = createUserItemContainer(socketId);
      activeUsersContainer.append(userContainerEl);
    }
  });
}

function createUserItemContainer(socketId) {
  const userContainerElement = document.createElement("div");

  const userNameElement = document.createElement("p");
  userContainerElement.setAttribute("class", "active-user");
  userContainerElement.setAttribute("id", socketId);
  userNameElement.setAttribute("class", "username");
  userNameElement.innerHTML = `Socket : ${socketId}`;

  userContainerElement.appendChild(userNameElement);

  userContainerElement.addEventListener("click", () => {
    unselectUsersFromList();
    userContainerElement.setAttribute(
      "class",
      "active-user active-user--selected"
    );

    const talkingWith = document.getElementById("talking-with-info");
    talkingWith.innerHTML = `Talking with Socket ${socketId}`;
    callUser(socketId);
  });
  return userContainerElement;
}

async function callUser(socketId) {
  console.log(`Calling User with SocketId : ${socketId}`);

  // Basically creating a WebRTC connection by creating offer and waiting for an answer

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

  socket.emit("call-user", {
    offer,
    to: socketId,
  });
}

// Make a WebSocket Connection

const socket = io.connect("192.168.1.7:5000");
let isAlreadyCalling = false;

// Whenever a new user-joins we receive this call

socket.on("update-user-list", ({ users }) => {
  updateUsersList(users);
});

// Remove the user on disconnection
socket.on("remove-user", ({ socketId }) => {
  const elementToRemove = document.getElementById(socketId);

  if (elementToRemove) {
    elementToRemove.remove();
  }
});

socket.on("call-made", async (data) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit("make-answer", {
    answer,
    to: data.socket,
  });
});

socket.on("answer-made", async (data) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.answer)
  );

  if (!isAlreadyCalling) {
    callUser(data.socket);
    isAlreadyCalling = true;
  }
});

peerConnection.ontrack = function ({ streams: [stream] }) {
  const remoteVideo = document.getElementById("remote-video");
  if (remoteVideo) {
    remoteVideo.srcObject = stream;
  }
};

function toggleVideoCamera() {
  isCameraOff = !isCameraOff;
  if (isCameraOff) {
    document.getElementById("camera-off").style.display = "block";
    document.getElementById("video-control").src = "./img/video-camera.png";
    this.mediaStream.getTracks().forEach((track) => {
      if (track.readyState === "live" && track.kind === "video") {
        track.enabled = false;
      }
    });
  } else {
    this.mediaStream.getTracks().forEach((track) => {
      if (track.readyState === "live" && track.kind === "video") {
        track.enabled = true;
      }
    });
    document.getElementById("camera-off").style.display = "none";
    document.getElementById("video-control").src =
      "./img/video-camera-hide.png";
  }
}

function toggleAudio() {
  isAudioOff = !isAudioOff;
  this.mediaStream.getAudioTracks()[0].enabled = !this.mediaStream.getAudioTracks()[0]
    .enabled;
  if (isAudioOff) {
    document.getElementById("audio-control").src =
      "./img/microphone-black-shape.png";
  } else {
    document.getElementById("audio-control").src = "./img/no-sound.png";
  }
}

function getUserMedia() {
  navigator.getUserMedia(
    { video: true, audio: true },
    (stream) => {
      const localVideo = document.getElementById("local-video");
      if (localVideo) {
        localVideo.srcObject = stream;
      }

      // Add Local Audio and Video tracks to the Peer Connection...
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      this.mediaStream = stream;
    },
    (error) => {
      console.warn(error.message);
    }
  );
}

getUserMedia(); // Get the user media 