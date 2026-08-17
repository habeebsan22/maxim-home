// Operation-video: ping-pong playback for the hero sky video.
// Was in js/main.js, between the header-backdrop block and the
// email-capture form-submit block.
//
// Ping-pong the hero sky video: play forward natively, then scrub back to
// the start on a rAF loop instead of looping — since the last frame of the
// reverse pass is always the first frame of the forward pass, there's no
// jump-cut at the seam (native <video loop> can't play in reverse, so a
// straight loop would visibly "blink" back to frame 0).
const heroSkyVideo = document.getElementById('hero-sky-video');
if (heroSkyVideo) {
  let reverseFrameId = null;
  let lastTimestamp = null;

  const stepReverse = (timestamp) => {
    if (lastTimestamp === null) lastTimestamp = timestamp;
    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    const nextTime = heroSkyVideo.currentTime - deltaSeconds;

    if (nextTime <= 0) {
      heroSkyVideo.currentTime = 0;
      lastTimestamp = null;
      reverseFrameId = null;
      heroSkyVideo.play();
      return;
    }
    heroSkyVideo.currentTime = nextTime;
    reverseFrameId = requestAnimationFrame(stepReverse);
  };

  heroSkyVideo.addEventListener('ended', () => {
    if (reverseFrameId !== null) return;
    lastTimestamp = null;
    reverseFrameId = requestAnimationFrame(stepReverse);
  });
}
