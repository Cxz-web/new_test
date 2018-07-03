<template>
  <div>
    <video-player class="vjs-custom-skin full-screen"
                  ref="myvideoPlayer"
                  :options="playerOptions"
                  @ended="onPlayerEnded($event)"
                  @playing="onPlayerPlaying($event)"
                  @ready="playerReadied($event)"
                  @canplay="onPlayerCanplay($event)">
    </video-player>
  </div>
</template>

<script>
import {videoPlayer} from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'

window.videojs = videojs

export default {
  components: {
    videoPlayer
  },
  computed: {
    player () {
      return this.$refs.myvideoPlayer.player
    }
  },
  methods: {
    onPlayerEnded (player) {
      this.playIndex++
      this.exChangeVideo(player)
    },
    playerReadied (player) {
    },
    onPlayerPlaying (player) {
    },
    onPlayerCanplay (player) {
      player.play()
    },
    exChangeVideo () {
      let videos = this.videos
      if (this.playIndex >= videos.length) {
        this.playIndex = 0
      }
      this.$set(this.playerOptions.sources, 0, {
        type: 'video/mp4',
        src: videos[this.playIndex]
      })
      this.playerOptions.autoplay = true
    }
  },
  created () {
    this.videos = ['http://rb-pili-qiniu.strongwind.cn/20182282247_b9c0dbc3994b0de1b314536ee9668311.mp4',
      'http://rb-pili-qiniu.strongwind.cn/2017121196_7f581ddbb0b747390c15c7a978196246.mp4',
      'http://rb-pili-qiniu.strongwind.cn/20182272153_598075d8c68b102970537f366538d31e.mp4']
    this.exChangeVideo()
  },
  data: function () {
    return {
      playerOptions: {
        sources: [{
          withCredentials: false,
          type: 'video/mp4'
        }, {
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
        }],
        html5: {hls: {withCredentials: false}},
        autoplay: true,
        controls: true
      },
      videos: [],
      playIndex: 0
    }
  }
}
</script>

<style scoped>
  .full-screen {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

</style>
