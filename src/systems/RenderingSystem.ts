import * as PIXI from 'pixi.js'

export class RenderingSystem {
  private app: PIXI.Application | null = null
  private playerSprite: PIXI.Sprite | null = null
  private enemySprite: PIXI.Sprite | null = null
  private initialized: boolean = false

  async init(container: HTMLElement): Promise<void> {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1a1a2e,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    })

    container.appendChild(this.app.view as HTMLCanvasElement)
    this.initialized = true

    this.setupScene()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  private setupScene(): void {
    if (!this.app) return

    const centerX = this.app.screen.width / 2
    const centerY = this.app.screen.height / 2

    const background = new PIXI.Graphics()
    background.beginFill(0x0f0f1e)
    background.drawRect(0, 0, this.app.screen.width, this.app.screen.height)
    background.endFill()
    this.app.stage.addChild(background)

    const playerGraphics = new PIXI.Graphics()
    playerGraphics.beginFill(0x4a90e2)
    playerGraphics.drawCircle(0, 0, 40)
    playerGraphics.endFill()
    playerGraphics.x = centerX - 150
    playerGraphics.y = centerY
    this.app.stage.addChild(playerGraphics)
    this.playerSprite = playerGraphics as any

    const playerText = new PIXI.Text('HERO', {
      fontSize: 16,
      fill: 0xffffff,
      align: 'center',
    })
    playerText.anchor.set(0.5)
    playerText.x = playerGraphics.x
    playerText.y = playerGraphics.y - 60
    this.app.stage.addChild(playerText)

    const enemyGraphics = new PIXI.Graphics()
    enemyGraphics.beginFill(0xe74c3c)
    enemyGraphics.drawCircle(0, 0, 50)
    enemyGraphics.endFill()
    enemyGraphics.x = centerX + 150
    enemyGraphics.y = centerY
    this.app.stage.addChild(enemyGraphics)
    this.enemySprite = enemyGraphics as any

    const enemyText = new PIXI.Text('ENEMY', {
      fontSize: 16,
      fill: 0xffffff,
      align: 'center',
    })
    enemyText.anchor.set(0.5)
    enemyText.x = enemyGraphics.x
    enemyText.y = enemyGraphics.y - 70
    this.app.stage.addChild(enemyText)
  }

  update(_deltaTime: number): void {
    if (!this.app || !this.initialized) return

    if (this.playerSprite) {
      this.playerSprite.rotation += 0.01
    }

    if (this.enemySprite) {
      this.enemySprite.rotation -= 0.01
    }
  }

  animateAttack(): void {
    if (!this.playerSprite || !this.enemySprite) return

    const originalX = this.playerSprite.x
    const targetX = originalX + 50

    const duration = 200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (progress < 0.5) {
        this.playerSprite!.x = originalX + (targetX - originalX) * (progress * 2)
      } else {
        this.playerSprite!.x = targetX - (targetX - originalX) * ((progress - 0.5) * 2)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        this.playerSprite!.x = originalX
      }
    }

    animate()
  }

  animateHit(damage: number): void {
    if (!this.enemySprite || !this.app) return

    this.enemySprite.tint = 0xff0000
    setTimeout(() => {
      if (this.enemySprite) {
        this.enemySprite.tint = 0xffffff
      }
    }, 100)

    const damageText = new PIXI.Text(damage.toString(), {
      fontSize: 32,
      fill: 0xffff00,
      fontWeight: 'bold',
    })
    damageText.anchor.set(0.5)
    damageText.x = this.enemySprite.x
    damageText.y = this.enemySprite.y - 100
    this.app.stage.addChild(damageText)

    const startY = damageText.y
    const endY = startY - 50
    const startTime = Date.now()
    const duration = 1000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      damageText.y = startY + (endY - startY) * progress
      damageText.alpha = 1 - progress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        this.app!.stage.removeChild(damageText)
      }
    }

    animate()
  }

  private handleResize(): void {
    if (!this.app) return
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
  }

  destroy(): void {
    if (this.app) {
      window.removeEventListener('resize', this.handleResize.bind(this))
      this.app.destroy(true)
      this.app = null
    }
  }

  getApp(): PIXI.Application | null {
    return this.app
  }
}

export const renderingSystem = new RenderingSystem()
