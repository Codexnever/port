"use client"

import { useEffect, useRef } from "react"

export function NetworkParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get current time to determine color scheme
    const currentHour = new Date().getHours()
    const isDaytime = currentHour >= 6 && currentHour < 18

    // Color schemes based on time of day
    const colorScheme = {
      // Morning/day colors (brighter, more vibrant)
      day: {
        background: "linear-gradient(to bottom, #041E42, #1A3A6A)",
        particleColors: [
          "rgba(135, 206, 250, 0.7)", // Light blue
          "rgba(176, 224, 230, 0.6)", // Powder blue
          "rgba(173, 216, 230, 0.7)", // Light blue
          "rgba(240, 248, 255, 0.6)", // Alice blue
          "rgba(135, 206, 235, 0.7)", // Sky blue
        ],
        lineColor: "rgba(135, 206, 250, 0.5)",
        exhaustColors: [
          "rgba(255, 165, 0, 0.9)", // Orange
          "rgba(255, 215, 0, 0.8)", // Gold
          "rgba(255, 255, 255, 0.9)", // White
          "rgba(255, 69, 0, 0.8)", // Red-orange
        ],
        starBrightness: 0.5,
      },
      // Night colors (darker, more mysterious)
      night: {
        background: "linear-gradient(to bottom, #000000, #0f172a)",
        particleColors: [
          "rgba(99, 102, 241, 0.7)", // Indigo
          "rgba(139, 92, 246, 0.5)", // Purple
          "rgba(147, 197, 253, 0.6)", // Light blue
          "rgba(196, 181, 253, 0.5)", // Lavender
          "rgba(59, 130, 246, 0.6)", // Blue
        ],
        lineColor: "rgba(99, 102, 241, 0.5)",
        exhaustColors: [
          "rgba(255, 69, 0, 0.9)", // Red-orange
          "rgba(255, 165, 0, 0.8)", // Orange
          "rgba(255, 215, 0, 0.7)", // Gold
          "rgba(255, 255, 255, 0.8)", // White
        ],
        starBrightness: 0.8,
      },
    }

    // Select color scheme based on time
    const colors = isDaytime ? colorScheme.day : colorScheme.night

    // Set canvas dimensions
    function resizeCanvas() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Reinitialize when resizing
      initializeParticles()
      initializeRockets()
      initializeStars()
    }

    // Star class for background
    class Star {
      x: number
      y: number
      size: number
      brightness: number
      twinkleSpeed: number
      twinklePhase: number

      constructor() {
        if (!canvas) {
          this.x = 0
          this.y = 0
        } else {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
        this.size = Math.random() * 1.5 + 0.5
        this.brightness = Math.random() * 0.5 + colors.starBrightness
        this.twinkleSpeed = Math.random() * 0.01 + 0.005
        this.twinklePhase = Math.random() * Math.PI * 2
      }

      draw(ctx: CanvasRenderingContext2D) {
        this.twinklePhase += this.twinkleSpeed
        const twinkleFactor = 0.7 + Math.sin(this.twinklePhase) * 0.3

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * twinkleFactor, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness * twinkleFactor})`
        ctx.fill()
      }
    }

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      speed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 3 + 1
        this.density = Math.random() * 30 + 1
        // Reduce speed for slower movement
        this.speed = Math.random() * 0.03 + 0.01

        // Use color scheme based on time of day
        this.color = colors.particleColors[Math.floor(Math.random() * colors.particleColors.length)]
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update(mouseX: number, mouseY: number) {
        // Distance between mouse and particle
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Repulsion force (move away from mouse)
        if (distance < 100) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = 100
          const force = (maxDistance - distance) / maxDistance

          // Move away from mouse (slower movement)
          const directionX = forceDirectionX * force * this.density * -0.5
          const directionY = forceDirectionY * force * this.density * -0.5

          this.x += directionX
          this.y += directionY
        } else {
          // Return to original position (slower)
          if (this.x !== this.baseX) {
            const dx = this.baseX - this.x
            this.x += dx * this.speed
          }
          if (this.y !== this.baseY) {
            const dy = this.baseY - this.y
            this.y += dy * this.speed
          }
        }
      }
    }

    // Exhaust Particle class for rocket trails
    class ExhaustParticle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      life: number
      maxLife: number

      constructor(x: number, y: number, angle: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 2 + 1.5

        // Spread the exhaust particles in a cone behind the rocket
        const spreadAngle = (Math.random() - 0.5) * 0.5 // Narrow cone for realistic exhaust
        const finalAngle = angle + Math.PI + spreadAngle // Opposite direction of rocket + spread

        // Slower speed for more realistic exhaust
        const speed = Math.random() * 1.5 + 0.8
        this.speedX = Math.cos(finalAngle) * speed
        this.speedY = Math.sin(finalAngle) * speed

        // Use exhaust colors from time-based scheme
        this.color = colors.exhaustColors[Math.floor(Math.random() * colors.exhaustColors.length)]

        this.alpha = 1
        // Longer life for slower dissipation
        this.maxLife = Math.random() * 60 + 40
        this.life = 0
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.globalAlpha = 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++

        // Fade out as life increases
        this.alpha = 1 - this.life / this.maxLife

        // Shrink size over time
        this.size = Math.max(0.1, this.size * 0.99)

        return this.life < this.maxLife // Return true if particle is still alive
      }
    }

    // Rocket class
    class Rocket {
      x: number
      y: number
      width: number
      height: number
      angle: number
      speed: number
      turnSpeed: number
      targetX: number
      targetY: number
      exhaustParticles: ExhaustParticle[]
      bodyColor: string = "#fff"
      thrusterIntensity: number
      lastExhaustTime: number
      exhaustInterval: number
      isAccelerating: boolean

      constructor() {
        if (!canvas) {
          this.x = 0
          this.y = 0
          this.angle = 0
          this.targetX = 0
          this.targetY = 0
        } else {
          // Start from edge of screen
          const side = Math.floor(Math.random() * 4)

          if (side === 0) {
            this.x = Math.random() * canvas.width
            this.y = -30
            this.angle = Math.PI / 2 
          } else if (side === 1) {
            this.x = canvas.width + 30
            this.y = Math.random() * canvas.height
            this.angle = Math.PI 
          } else if (side === 2) {
            this.x = Math.random() * canvas.width
            this.y = canvas.height + 30
            this.angle = -Math.PI / 2 
          } else {
            this.x = -30
            this.y = Math.random() * canvas.height
            this.angle = 0 
          }
          this.targetX = Math.random() * canvas.width
          this.targetY = Math.random() * canvas.height
        }

        this.width = 16
        this.height = 16

        this.speed = Math.random() * 0.3 + 0.2
        this.turnSpeed = Math.random() * 0.01 + 0.005 

        this.exhaustParticles = []

        this.thrusterIntensity = 1
        this.lastExhaustTime = 0
        this.exhaustInterval = 5 
        this.isAccelerating = true 
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle - (- 0.6))
        ctx.shadowColor = "#fff"
        const fontSize = window.innerWidth < 600 ? 24 : 35
        ctx.font = `${fontSize}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("🚀", 0, 0)
        ctx.shadowBlur = 0
        ctx.restore()
        for (let i = 0; i < this.exhaustParticles.length; i++) {
          this.exhaustParticles[i].draw(ctx)
        }
      }

      update(frame: number) {
        // Calculate angle to target
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        const targetAngle = Math.atan2(dy, dx)

        // Gradually turn towards target
        let angleDiff = targetAngle - this.angle

        // Handle angle wrapping
        if (angleDiff > Math.PI) angleDiff -= Math.PI * 2
        if (angleDiff < -Math.PI) angleDiff += Math.PI * 2

        // Turn towards target
        this.angle += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), this.turnSpeed)

        // Move forward in current direction
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Fixed thruster intensity for all rockets
        this.thrusterIntensity = 1

        // Create exhaust particles with standardized burst
        if (frame - this.lastExhaustTime > this.exhaustInterval) {
          // Create 5 particles per burst for all rockets
          const particleCount = 5
          for (let i = 0; i < particleCount; i++) {
           
            const exhaustX = this.x - Math.cos(this.angle) * 10
            const exhaustY = this.y - Math.sin(this.angle) * 10
            this.exhaustParticles.push(new ExhaustParticle(exhaustX, exhaustY, this.angle))
          }
          this.lastExhaustTime = frame
        }

        this.exhaustParticles = this.exhaustParticles.filter((particle) => particle.update())

        // Check if rocket reached target or went off screen
        const distanceToTarget = Math.sqrt(dx * dx + dy * dy)
        let isOffScreen = false
        if (canvas) {
          isOffScreen = this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50
        }

        if (distanceToTarget < 50 || isOffScreen) {
          if (isOffScreen && canvas) {
            const side = Math.floor(Math.random() * 4)
            if (side === 0) {
              this.x = Math.random() * canvas.width
              this.y = -30
              this.angle = Math.PI / 2 + 0.15
            } else if (side === 1) {
              this.x = canvas.width + 30
              this.y = Math.random() * canvas.height
              this.angle = Math.PI + 0.15
            } else if (side === 2) {
              this.x = Math.random() * canvas.width
              this.y = canvas.height + 30
              // Point upward initially
              this.angle = -Math.PI / 2 + 0.15
            } else {
              this.x = -30
              this.y = Math.random() * canvas.height
              // Point rightward initially
              this.angle = 0.15
            }
          }

          if (canvas) {
            // Set new target
            this.targetX = Math.random() * canvas.width
            this.targetY = Math.random() * canvas.height
          }
        }
      }
    }

    let particles: Particle[] = []
    let rockets: Rocket[] = []
    let stars: Star[] = []
    let mouseX = 0
    let mouseY = 0
    let frameCount = 0

    // Initialize stars
    function initializeStars() {
      stars = []
      // More stars at night, fewer during day
      const starCount = isDaytime ? 100 : 300

      for (let i = 0; i < starCount; i++) {
        stars.push(new Star())
      }
    }

    // Initialize particles
    function initializeParticles() {
      particles = []
      const numberOfParticles = Math.min((window.innerWidth * window.innerHeight) / 9000, 150)

      // Create grid of particles
      for (let i = 0; i < numberOfParticles; i++) {
        if (!canvas) return
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new Particle(x, y))
      }
    }

    // Initialize rockets
    function initializeRockets() {
      rockets = []
      // Create 2-4 rockets based on screen size
      const numberOfRockets = Math.min(Math.max(Math.floor(window.innerWidth / 600), 2), 4)

      for (let i = 0; i < numberOfRockets; i++) {
        rockets.push(new Rocket())
      }
    }

    // Mouse move event
    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Touch move event for mobile
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].draw(ctx)
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY)
        particles[i].draw(ctx)
      }

      // Connect particles with lines
      connectParticles()

      // Update and draw rockets
      for (let i = 0; i < rockets.length; i++) {
        rockets[i].update(frameCount)
        rockets[i].draw(ctx)
      }

      requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    function connectParticles() {
      if (!ctx) return
      const maxDistance = 150
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Opacity based on distance
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = colors.lineColor.replace(/[\d.]+\)$/, `${opacity * 0.5})`)
            ctx.lineWidth = 0.5

            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Initialize
    resizeCanvas()
    initializeStars()
    initializeParticles()
    initializeRockets()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10" />
    </div>
  )
}
