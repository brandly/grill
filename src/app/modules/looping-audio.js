// TODO: figure out why this lags when the tab isn't focused

export default class LoopingAudio {
  constructor(path) {
    this.a = new Audio(path)
    this.b = new Audio(path)
    this.timeout = null
  }

  play() {
    this._playA()
  }

  _playA() {
    this.a.play()
    this.timeout = setTimeout(() => {
      this._playB()
    }, this.a.duration * 1000)
  }

  _playB() {
    this.b.play()
    this.timeout = setTimeout(() => {
      this._playA()
    }, this.b.duration * 1000)
  }

  stop() {
    this.a.pause()
    this.b.pause()
    this.a.currentTime = 0
    this.b.currentTime = 0
    clearTimeout(this.timeout)
  }
}
