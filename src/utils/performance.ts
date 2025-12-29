export class PerformanceMonitor {
  private frameTimestamps: number[] = []
  private memorySnapshots: number[] = []
  private readonly maxSamples = 60

  recordFrame(timestamp: number): void {
    this.frameTimestamps.push(timestamp)
    if (this.frameTimestamps.length > this.maxSamples) {
      this.frameTimestamps.shift()
    }
  }

  recordMemory(): void {
    if ('memory' in performance) {
      const mem = (performance as any).memory
      if (mem && mem.usedJSHeapSize) {
        this.memorySnapshots.push(mem.usedJSHeapSize)
        if (this.memorySnapshots.length > this.maxSamples) {
          this.memorySnapshots.shift()
        }
      }
    }
  }

  getAverageFPS(): number {
    if (this.frameTimestamps.length < 2) return 60

    const timeDiffs: number[] = []
    for (let i = 1; i < this.frameTimestamps.length; i++) {
      timeDiffs.push(this.frameTimestamps[i] - this.frameTimestamps[i - 1])
    }

    const avgTimeDiff = timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length
    return Math.round(1000 / avgTimeDiff)
  }

  getMinFPS(): number {
    if (this.frameTimestamps.length < 2) return 60

    const timeDiffs: number[] = []
    for (let i = 1; i < this.frameTimestamps.length; i++) {
      timeDiffs.push(this.frameTimestamps[i] - this.frameTimestamps[i - 1])
    }

    const maxTimeDiff = Math.max(...timeDiffs)
    return Math.round(1000 / maxTimeDiff)
  }

  getMemoryUsage(): { current: number; average: number } {
    if (this.memorySnapshots.length === 0) {
      return { current: 0, average: 0 }
    }

    const current = this.memorySnapshots[this.memorySnapshots.length - 1]
    const average = this.memorySnapshots.reduce((a, b) => a + b, 0) / this.memorySnapshots.length

    return {
      current: Math.round(current / 1048576), // Convert to MB
      average: Math.round(average / 1048576),
    }
  }

  getPerformanceReport(): PerformanceReport {
    const fps = this.getAverageFPS()
    const minFps = this.getMinFPS()
    const memory = this.getMemoryUsage()

    let rating: 'excellent' | 'good' | 'fair' | 'poor'
    if (fps >= 55 && minFps >= 45) {
      rating = 'excellent'
    } else if (fps >= 45 && minFps >= 30) {
      rating = 'good'
    } else if (fps >= 30) {
      rating = 'fair'
    } else {
      rating = 'poor'
    }

    return {
      fps,
      minFps,
      memory,
      rating,
      suggestions: this.getSuggestions(fps, minFps, memory),
    }
  }

  private getSuggestions(fps: number, minFps: number, memory: { current: number; average: number }): string[] {
    const suggestions: string[] = []

    if (fps < 55) {
      suggestions.push('Consider enabling Battery Saver mode in settings')
    }

    if (minFps < 30) {
      suggestions.push('Performance drops detected. Close other browser tabs')
    }

    if (memory.current > 150) {
      suggestions.push('High memory usage. Try refreshing the page')
    }

    if (fps < 30) {
      suggestions.push('Set Graphics Quality to Low in settings')
    }

    if (suggestions.length === 0) {
      suggestions.push('Performance is optimal!')
    }

    return suggestions
  }

  reset(): void {
    this.frameTimestamps = []
    this.memorySnapshots = []
  }
}

export interface PerformanceReport {
  fps: number
  minFps: number
  memory: {
    current: number
    average: number
  }
  rating: 'excellent' | 'good' | 'fair' | 'poor'
  suggestions: string[]
}

export const performanceMonitor = new PerformanceMonitor()
