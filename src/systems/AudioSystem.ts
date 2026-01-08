import { useGameStore } from '@/stores/gameStore'

/**
 * Manages game audio including music and sound effects.
 */
export class AudioSystem {
  private gameStore: any
  private context: AudioContext | null = null
  private musicBuffer: AudioBuffer | null = null
  private musicSource: AudioBufferSourceNode | null = null
  private soundBuffers: Map<string, AudioBuffer> = new Map()
  private masterVolume: GainNode | null = null
  private musicVolume: GainNode | null = null
  private sfxVolume: GainNode | null = null

  init() {
    this.gameStore = useGameStore()
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.setupVolumeNodes()
    } catch (e) {
      console.warn('AudioContext not supported', e)
    }
  }

  private setupVolumeNodes() {
    if (!this.context) return

    this.masterVolume = this.context.createGain()
    this.musicVolume = this.context.createGain()
    this.sfxVolume = this.context.createGain()

    this.musicVolume.connect(this.masterVolume)
    this.sfxVolume.connect(this.masterVolume)
    this.masterVolume.connect(this.context.destination)

    this.updateVolumes()
  }

  updateVolumes() {
    if (!this.masterVolume || !this.musicVolume || !this.sfxVolume || !this.gameStore) return

    const { soundEnabled, musicEnabled } = this.gameStore.settings
    this.masterVolume.gain.value = soundEnabled ? 1 : 0
    this.musicVolume.gain.value = musicEnabled ? 0.5 : 0
    this.sfxVolume.gain.value = 0.7
  }

  async loadSound(name: string, url: string) {
    if (!this.context) return
    try {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer)
      this.soundBuffers.set(name, audioBuffer)
    } catch (e) {
      console.error(`Failed to load sound: ${name}`, e)
    }
  }

  playSound(name: string) {
    if (!this.context || !this.sfxVolume || !this.gameStore.settings.soundEnabled) return
    
    const buffer = this.soundBuffers.get(name)
    if (!buffer) return

    const source = this.context.createBufferSource()
    source.buffer = buffer
    source.connect(this.sfxVolume)
    source.start(0)
  }

  playMusic(name: string) {
    if (!this.context || !this.musicVolume || !this.gameStore.settings.musicEnabled) return
    
    this.stopMusic()

    const buffer = this.soundBuffers.get(name)
    if (!buffer) return

    this.musicSource = this.context.createBufferSource()
    this.musicSource.buffer = buffer
    this.musicSource.loop = true
    this.musicSource.connect(this.musicVolume)
    this.musicSource.start(0)
  }

  stopMusic() {
    if (this.musicSource) {
      this.musicSource.stop()
      this.musicSource = null
    }
  }

  // Common sounds
  playAttack() { this.playSound('attack') }
  playLevelUp() { this.playSound('levelup') }
  playAscension() { this.playSound('ascension') }
  playAchievement() { this.playSound('achievement') }
  playPurchase() { this.playSound('purchase') }
}

export const audioSystem = new AudioSystem()
