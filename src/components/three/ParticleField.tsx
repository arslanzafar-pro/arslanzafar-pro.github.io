import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'

/**
 * Ambient 3D particle field for the hero background.
 *
 * Performance notes:
 *  - lazy-loaded (three.js lives in its own chunk, see vite.config.ts)
 *  - pixel ratio capped at 2, fewer particles on small screens
 *  - animation pauses when the tab is hidden or the hero leaves the viewport
 *  - renders a single static frame when `prefers-reduced-motion` is set
 */
export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDark = resolvedTheme === 'dark'
    const isSmallScreen = window.innerWidth < 768

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      100,
    )
    camera.position.z = 10

    const disposables: Array<{ dispose: () => void }> = []

    const makeCloud = (count: number, color: number, size: number, spread: number) => {
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < positions.length; i++) {
        positions[i] = (Math.random() - 0.5) * spread
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const material = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity: isDark ? 0.75 : 0.5,
        sizeAttenuation: true,
        depthWrite: false,
        // Additive glow only works on dark backgrounds
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      })
      const points = new THREE.Points(geometry, material)
      scene.add(points)
      disposables.push(geometry, material)
      return points
    }

    const base = isSmallScreen ? 350 : 900
    const cloudA = makeCloud(base, isDark ? 0x818cf8 : 0x4f46e5, 0.05, 24)
    const cloudB = makeCloud(Math.round(base * 0.6), isDark ? 0x22d3ee : 0x0e7490, 0.035, 20)

    // Mouse parallax target (normalized -1..1)
    const mouse = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    let rafId = 0
    let running = false
    let inView = true

    const renderFrame = (time: number) => {
      cloudA.rotation.y = time * 0.02
      cloudA.rotation.x = time * 0.008
      cloudB.rotation.y = -time * 0.014
      camera.position.x += (mouse.x * 0.9 - camera.position.x) * 0.04
      camera.position.y += (-mouse.y * 0.6 - camera.position.y) * 0.04
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }

    const loop = (now: number) => {
      renderFrame(now / 1000)
      rafId = window.requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduceMotion) return
      running = true
      rafId = window.requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      window.cancelAnimationFrame(rafId)
    }

    if (reduceMotion) {
      renderFrame(12) // single static frame
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      start()
    }

    // Pause when the hero scrolls out of view or the tab is hidden
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView && !document.hidden) start()
      else stop()
    })
    intersection.observe(mount)

    const onVisibility = () => {
      if (document.hidden || !inView) stop()
      else start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const resize = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = mount
      camera.aspect = clientWidth / Math.max(clientHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
      if (reduceMotion) renderFrame(12)
    })
    resize.observe(mount)

    return () => {
      stop()
      intersection.disconnect()
      resize.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [resolvedTheme])

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 overflow-hidden" />
}
