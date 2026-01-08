import * as PIXI from 'pixi.js'
import { renderingSystem } from './RenderingSystem'

interface ParticleOptions {
  x: number
  y: number
  color: number
  size: number
  velocity: { x: number; y: number }
  life: number
  gravity?: number
}

class Particle extends PIXI.Graphics {
  velocity: { x: number; y: number }
  life: number
  maxLife: number
  gravity: number

  constructor(options: ParticleOptions) {
    super()
    this.beginFill(options.color)
    this.drawCircle(0, 0, options.size)
    this.endFill()
    this.x = options.x
    this.y = options.y
    this.velocity = options.velocity
    this.life = options.life
    this.maxLife = options.life
    this.gravity = options.gravity || 0
  }

  update(dt: number) {
    this.velocity.y += this.gravity * dt
    this.x += this.velocity.x * dt
    this.y += this.velocity.y * dt
    this.life -= dt
    this.alpha = this.life / this.maxLife
    this.scale.set(this.alpha)
  }
}

/**
 * Visual effects engine using PIXI.js for high performance.
 */
export class ParticleSystem {
  private particles: Particle[] = []
  private container: PIXI.Container | null = null

  init() {
    const app = renderingSystem.getApp()
    if (app) {
      this.container = new PIXI.Container()
      app.stage.addChild(this.container)
    }
  }

  update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.update(dt)
      if (p.life <= 0) {
        this.container?.removeChild(p)
        this.particles.splice(i, 1)
        p.destroy()
      }
    }
  }

  emit(options: ParticleOptions) {
    if (!this.container) return
    const p = new Particle(options)
    this.particles.push(p)
    this.container.addChild(p)
  }

  createExplosion(x: number, y: number, color: number, count: number = 20) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 5 + 2
      this.emit({
        x,
        y,
        color,
        size: Math.random() * 4 + 2,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        life: Math.random() * 500 + 500,
        gravity: 0.1
      })
    }
  }

  createLevelUpEffect(x: number, y: number) {
    this.createExplosion(x, y, 0xffd700, 50)
  }

  createDamagePop(x: number, y: number, isCrit: boolean) {
    this.createExplosion(x, y, isCrit ? 0xff0000 : 0xffffff, 10)
  }
}

export const particleSystem = new ParticleSystem()
