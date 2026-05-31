'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// ── Circle sprite ──────────────────────────────────────────────────────────
function makeCircleTexture(size = 64): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx  = canvas.getContext('2d')!
  const half = size / 2
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half)
  grad.addColorStop(0,   'rgba(255,255,255,1)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.85)')
  grad.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(half, half, half, 0, Math.PI * 2)
  ctx.fill()
  return new THREE.CanvasTexture(canvas)
}

// ── Palettes ───────────────────────────────────────────────────────────────
const DARK_COLORS = [
  0x18181b, 0x404040, 0x71717a, 0xca8a04, 0x7c2d12, 
  0xfb923c, 0x1f2937, 0xf97316, 0xea580c, 0xc2410c, 0x9a3412
];

const LIGHT_COLORS = [
  0x8b5cf6, 0xa78bfa, 0xc4b5fd, 0xffffff, 0xf0f0ff, 
  0x3b82f6, 0x60a5fa, 0xf43f5e, 0xfb7185, 0xa855f7, 0xd946ef
]

// ── DYNAMIC SHAPE BUILDERS (Accepting variable dynamic count) ───────────────────────
function buildGalaxy(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const arm = Math.floor(Math.random() * 5)
    const radius = Math.pow(Math.random(), 0.45) * 4.5
    const angle = arm * (Math.PI * 2 / 5) + radius * 2.2 + (Math.random() - 0.5) * 0.5
    const spread = (1 - radius / 4.5) * 0.22
    pos[i3]     = Math.cos(angle) * radius + (Math.random() - 0.5) * spread * 2
    pos[i3 + 1] = (Math.random() - 0.5) * spread * 2.5
    pos[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread * 2
  }
  return pos
}

function buildHelix(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const strand = i % 3
    const t = (i / count) * Math.PI * 28 - Math.PI * 14
    const phase = strand * (Math.PI * 2 / 3)
    const r = 1.5 + (Math.random() - 0.5) * 0.05
    pos[i3]     = Math.cos(t + phase) * r + (Math.random() - 0.5) * 0.025
    pos[i3 + 1] = t * 0.13 + (Math.random() - 0.5) * 0.025
    pos[i3 + 2] = Math.sin(t + phase) * r + (Math.random() - 0.5) * 0.025
  }
  return pos
}

function buildSphere(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const shellRand = Math.random()
    const r = shellRand < 0.6 ? 1.68 : shellRand < 0.85 ? 1.12 : 2.1
    const noise = (Math.random() - 0.5) * 0.056
    pos[i3]     = (r + noise) * Math.sin(phi) * Math.cos(theta)
    pos[i3 + 1] = (r + noise) * Math.sin(phi) * Math.sin(theta)
    pos[i3 + 2] = (r + noise) * Math.cos(phi)
  }
  return pos
}

function buildTorusKnot(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const p = 5, q = 7
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const t = (i / count) * Math.PI * 2 * p * 12
    const r = Math.cos(q * t / p) + 2.4
    const noise = (Math.random() - 0.5) * 0.05
    pos[i3]     = r * Math.cos(t) + noise
    pos[i3 + 1] = r * Math.sin(t) + noise
    pos[i3 + 2] = -Math.sin(q * t / p) * 1.4 + noise
  }
  return pos
}

function buildRing(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const angle = Math.random() * Math.PI * 2
    const ringRand = Math.random()
    const r = ringRand < 0.33 ? 1.8 + Math.random() * 0.4
            : ringRand < 0.66 ? 2.5 + Math.random() * 0.35
            : 3.1 + Math.random() * 0.3
    const tilt = (Math.random() - 0.5) * 0.12
    pos[i3]     = Math.cos(angle) * r
    pos[i3 + 1] = tilt + Math.sin(angle) * 0.04
    pos[i3 + 2] = Math.sin(angle) * r
  }
  return pos
}

function buildCube(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const size = 2.4
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const face = Math.floor(Math.random() * 6)
    const u = (Math.random() - 0.5) * size
    const v = (Math.random() - 0.5) * size
    const h = size / 2
    const edgeFactor = Math.random() < 0.25 ? 1 : 0
    const eu = edgeFactor ? (Math.random() < 0.5 ? h : -h) : u
    if      (face === 0) { pos[i3]=h;  pos[i3+1]=eu; pos[i3+2]=v }
    else if (face === 1) { pos[i3]=-h; pos[i3+1]=eu; pos[i3+2]=v }
    else if (face === 2) { pos[i3]=u;  pos[i3+1]=h;  pos[i3+2]=v }
    else if (face === 3) { pos[i3]=u;  pos[i3+1]=-h; pos[i3+2]=v }
    else if (face === 4) { pos[i3]=u;  pos[i3+1]=v;  pos[i3+2]=h }
    else                 { pos[i3]=u;  pos[i3+1]=v;  pos[i3+2]=-h}
  }
  return pos
}

function buildPyramid(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const H = 3.6, R = 2.2
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const face = Math.floor(Math.random() * 4)
    const y = Math.random() * H - H / 2
    const rAtY = R * (1 - (y + H / 2) / H)
    const a = face * (Math.PI / 2) + Math.random() * (Math.PI / 2)
    pos[i3]     = Math.cos(a) * rAtY + (Math.random() - 0.5) * 0.035
    pos[i3 + 1] = y
    pos[i3 + 2] = Math.sin(a) * rAtY + (Math.random() - 0.5) * 0.035
  }
  return pos
}

function buildWave(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const W = 6, D = 6
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const x = (Math.random() - 0.5) * W
    const z = (Math.random() - 0.5) * D
    const y = Math.sin(x * 1.8) * 0.45
            + Math.sin(z * 1.4) * 0.4
            + Math.sin((x + z) * 0.9) * 0.28
            + Math.sin(x * 3.2 + z * 2.1) * 0.12
            + (Math.random() - 0.5) * 0.04
    pos[i3]     = x
    pos[i3 + 1] = y
    pos[i3 + 2] = z
  }
  return pos
}

function buildButterfly(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const t = (i / count) * Math.PI * 32
    const r = Math.exp(Math.cos(t)) - 2.2 * Math.cos(4 * t) + Math.pow(Math.sin(t / 12), 5)
    const scale = 1.05
    pos[i3]     = r * Math.cos(t) * scale + (Math.random() - 0.5) * 0.035
    pos[i3 + 1] = r * Math.sin(t) * scale * 0.65 + (Math.random() - 0.5) * 0.035
    pos[i3 + 2] = Math.sin(t * 3) * 0.55 + Math.cos(t * 1.5) * 0.3 + (Math.random() - 0.5) * 0.035
  }
  return pos
}

function buildBlackHole(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const angle = Math.random() * Math.PI * 2
    const r = 0.7 + Math.pow(Math.random(), 0.35) * 3.2
    const tilt = (1 / (r * r)) * 0.9
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    const y = (Math.random() - 0.5) * 0.1 + Math.sin(angle * 4) * tilt * 0.35
    pos[i3]     = x
    pos[i3 + 1] = y
    pos[i3 + 2] = z
  }
  return pos
}

function buildMobius(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const u = (i / count) * Math.PI * 2
    const v = (Math.random() - 0.5) * 1.4
    const R = 2.2
    pos[i3]     = (R + v * Math.cos(u / 2)) * Math.cos(u) + (Math.random()-0.5)*0.025
    pos[i3 + 1] = (R + v * Math.cos(u / 2)) * Math.sin(u) + (Math.random()-0.5)*0.025
    pos[i3 + 2] = v * Math.sin(u / 2)                      + (Math.random()-0.5)*0.025
  }
  return pos
}

function buildInfinityKnot(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const t = (i / count) * Math.PI * 2 * 10
    const scale = 1.9
    pos[i3]     = scale * (Math.cos(t) + 2 * Math.cos(2 * t)) / 3 + (Math.random()-0.5)*0.04
    pos[i3 + 1] = scale * (Math.sin(t) - 2 * Math.sin(2 * t)) / 3 + (Math.random()-0.5)*0.04
    pos[i3 + 2] = scale * Math.sin(3 * t) / 2.2                    + (Math.random()-0.5)*0.04
  }
  return pos
}

function buildHypercube(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const verts4D: number[][] = []
  for (let b = 0; b < 16; b++) {
    verts4D.push([b&1?1:-1, b&2?1:-1, b&4?1:-1, b&8?1:-1])
  }
  const edges: [number,number][] = []
  for (let a = 0; a < 16; a++)
    for (let b = a+1; b < 16; b++) {
      let diff = 0
      for (let d = 0; d < 4; d++) if (verts4D[a][d] !== verts4D[b][d]) diff++
      if (diff === 1) edges.push([a, b])
    }
  const perEdge = Math.floor(count / edges.length)
  let idx = 0
  const w = 2.5
  for (const [a, b] of edges) {
    for (let k = 0; k < perEdge; k++) {
      const t = k / perEdge
      const i3 = idx * 3
      const lerpW = 1 / (w - (verts4D[a][3] + (verts4D[b][3]-verts4D[a][3])*t))
      const scale = 1.5 * lerpW
      pos[i3]     = (verts4D[a][0] + (verts4D[b][0]-verts4D[a][0])*t) * scale + (Math.random()-0.5)*0.03
      pos[i3 + 1] = (verts4D[a][1] + (verts4D[b][1]-verts4D[a][1])*t) * scale + (Math.random()-0.5)*0.03
      pos[i3 + 2] = (verts4D[a][2] + (verts4D[b][2]-verts4D[a][2])*t) * scale + (Math.random()-0.5)*0.03
      idx++
    }
  }
  while (idx < count) {
    const i3 = idx * 3
    pos[i3] = (Math.random()-0.5)*3; pos[i3+1] = (Math.random()-0.5)*3; pos[i3+2] = (Math.random()-0.5)*3
    idx++
  }
  return pos
}

function buildStrangeAttractor(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  let x = 0.1, y = 0, z = 0
  const sigma = 10, rho = 28, beta = 8/3, dt = 0.005
  const scale = 0.08
  for (let i = 0; i < count; i++) {
    const dx = sigma * (y - x)
    const dy = x * (rho - z) - y
    const dz = x * y - beta * z
    x += dx * dt; y += dy * dt; z += dz * dt
    const i3 = i * 3
    pos[i3]     = x * scale + (Math.random()-0.5)*0.02
    pos[i3 + 1] = (z - 25) * scale + (Math.random()-0.5)*0.02
    pos[i3 + 2] = y * scale + (Math.random()-0.5)*0.02
  }
  return pos
}

function buildIcosphere(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const phi = (1 + Math.sqrt(5)) / 2
  const raw = [
    [-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],
    [0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],
    [phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]
  ]
  const norm = raw.map(v => { const l = Math.hypot(v[0],v[1],v[2]); return [v[0]/l,v[1]/l,v[2]/l] })
  const radii = [2.5, 1.8, 3.1]
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const base = norm[Math.floor(Math.random() * norm.length)]
    const theta = Math.random() * Math.PI * 2
    const phi2 = Math.acos(2 * Math.random() - 1)
    const r = radii[Math.floor(Math.random() * radii.length)] + (Math.random() - 0.5) * 0.08
    pos[i3]     = r * Math.sin(phi2) * Math.cos(theta)
    pos[i3 + 1] = r * Math.sin(phi2) * Math.sin(theta)
    pos[i3 + 2] = r * Math.cos(phi2)
  }
  return pos
}

function buildS3D(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const W = 900, H = 280
  const cvs = document.createElement('canvas')
  cvs.width = W; cvs.height = H
  const ctx = cvs.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 240px Arial Black, Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('S3D', W / 2, H / 2)

  const imgData = ctx.getImageData(0, 0, W, H).data
  const litPixels: [number, number][] = []
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      if (imgData[(py * W + px) * 4] > 128) litPixels.push([px, py])
    }
  }

  const scale = 7.0 / W
  const offX  = -W / 2
  const offY  = -H / 2

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const [px, py] = litPixels[Math.floor(Math.random() * litPixels.length)]
    pos[i3]     = (px + offX) * scale      + (Math.random() - 0.5) * 0.015
    pos[i3 + 1] = -(py + offY) * scale * (H / W) + (Math.random() - 0.5) * 0.015
    pos[i3 + 2] = (Math.random() - 0.5) * 0.18
  }
  return pos
}

function buildScatter(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 4.5 + Math.random() * 3.5
    pos[i3]     = r * Math.sin(phi) * Math.cos(theta)
    pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos[i3 + 2] = r * Math.cos(phi)
  }
  return pos
}

const SHAPE_BUILDERS = [
  buildGalaxy, buildHelix, buildSphere, buildTorusKnot, buildRing, buildCube,
  buildPyramid, buildWave, buildButterfly, buildBlackHole, buildMobius,
  buildInfinityKnot, buildHypercube, buildStrangeAttractor, buildIcosphere, buildS3D,
]

const ROTATIONS: ((e: number, p: THREE.Points) => void)[] = [
  (e,p)=>{ p.rotation.y=e*0.08; p.rotation.x=Math.sin(e*0.04)*0.15 },
  (e,p)=>{ p.rotation.y=e*0.15; p.rotation.z=e*0.05 },
  (e,p)=>{ p.rotation.y=e*0.1;  p.rotation.x=e*0.07 },
  (e,p)=>{ p.rotation.y=e*0.12; p.rotation.x=e*0.08; p.rotation.z=e*0.04 },
  (e,p)=>{ p.rotation.y=e*0.06; p.rotation.z=Math.sin(e*0.03)*0.2 },
  (e,p)=>{ p.rotation.y=e*0.1;  p.rotation.x=e*0.06; p.rotation.z=e*0.06 },
  (e,p)=>{ p.rotation.y=e*0.09; p.rotation.z=e*0.03 },
  (e,p)=>{ p.rotation.y=e*0.04; p.rotation.z=Math.sin(e*0.05)*0.1 },
  (e,p)=>{ p.rotation.y=e*0.05; p.rotation.z=e*0.08 },
  (e,p)=>{ p.rotation.y=e*0.18; p.rotation.x=Math.sin(e*0.02)*0.08 },
  (e,p)=>{ p.rotation.y=e*0.13; p.rotation.x=e*0.05; p.rotation.z=e*0.07 },
  (e,p)=>{ p.rotation.y=e*0.11; p.rotation.z=e*0.09 },
  (e,p)=>{ p.rotation.y=e*0.08; p.rotation.x=e*0.08; p.rotation.z=e*0.05 },
  (e,p)=>{ p.rotation.y=e*0.07; p.rotation.x=Math.sin(e*0.06)*0.12 },
  (e,p)=>{ p.rotation.y=e*0.1;  p.rotation.x=e*0.06; p.rotation.z=e*0.04 },
  (e,p)=>{ p.rotation.y=e*0.06; p.rotation.x=Math.sin(e*0.03)*0.05 },
]

function computeTransition(
  count: number,
  from: Float32Array,
  to: Float32Array,
  scatter: Float32Array,
  t: number,
  out: Float32Array
) {
  if (t < 0.4) {
    const s = easeInOutCubic(t / 0.4)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      out[i3]     = from[i3]     + (scatter[i3]     - from[i3])     * s
      out[i3 + 1] = from[i3 + 1] + (scatter[i3 + 1] - from[i3 + 1]) * s
      out[i3 + 2] = from[i3 + 2] + (scatter[i3 + 2] - from[i3 + 2]) * s
    }
  } else {
    const s = easeInOutCubic((t - 0.4) / 0.6)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      out[i3]     = scatter[i3]     + (to[i3]     - scatter[i3])     * s
      out[i3 + 1] = scatter[i3 + 1] + (to[i3 + 1] - scatter[i3 + 1]) * s
      out[i3 + 2] = scatter[i3 + 2] + (to[i3 + 2] - scatter[i3 + 2]) * s
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
export default function GalaxyBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return

    // CHANGED: Determine mobile dynamic state
    const isMobile = window.innerWidth < 768
    const currentCount = isMobile ? 75000 : 90000 // Decreased counting safely on mobile

    const isDark  = resolvedTheme === 'dark'
    const palette = isDark ? LIGHT_COLORS : DARK_COLORS
    const sprite  = makeCircleTexture(64)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    
    // CHANGED: Pushed camera further back on mobile (5.5) vs desktop (4.0) to dynamically scale shapes smaller
    camera.position.z = isMobile ? 5.0 : 4.0

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Pass the calculated loop total down inside instantiation block
    const shapes = SHAPE_BUILDERS.map(fn => fn(currentCount))
    const scatter = buildScatter(currentCount)
    const N = shapes.length

    const colorsBuf = new Float32Array(currentCount * 3)
    for (let i = 0; i < currentCount; i++) {
      const col = new THREE.Color(palette[Math.floor(Math.random() * palette.length)])
      colorsBuf[i*3]     = col.r
      colorsBuf[i*3 + 1] = col.g
      colorsBuf[i*3 + 2] = col.b
    }

    const geo     = new THREE.BufferGeometry()
    const livePos = new Float32Array(shapes[0])
    geo.setAttribute('position', new THREE.BufferAttribute(livePos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colorsBuf, 3))

    // CHANGED: Mobile gets even smaller base particle sizes (0.008) to look super crisp on retina phones
    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.008 : 0.012,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      sizeAttenuation: true,
      alphaTest: 0.001,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let rawScroll = 0
    const onScroll = () => { rawScroll = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      const vh      = window.innerHeight
      const section = rawScroll / (vh * 1.6)
      const fromIdx = Math.floor(section) % N
      const toIdx   = (fromIdx + 1) % N
      const t       = section - Math.floor(section)

      const from = shapes[fromIdx]
      const to   = shapes[toIdx]
      const pos  = geo.attributes.position.array as Float32Array

      computeTransition(currentCount, from, to, scatter, t, pos)
      geo.attributes.position.needsUpdate = true

      const rotFrom = ROTATIONS[fromIdx]
      const rotTo   = ROTATIONS[toIdx % ROTATIONS.length]
      rotFrom(elapsed, points)
      const rx = points.rotation.x, ry = points.rotation.y, rz = points.rotation.z
      rotTo(elapsed, points)
      points.rotation.x = rx + (points.rotation.x - rx) * t
      points.rotation.y = ry + (points.rotation.y - ry) * t
      points.rotation.z = rz + (points.rotation.z - rz) * t

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      // Dynamic scaling refresh on client-side viewport changes
      const currentMobileState = window.innerWidth < 768
      camera.position.z = currentMobileState ? 5.5 : 4.0
      mat.size = currentMobileState ? 0.008 : 0.012
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      sprite.dispose(); geo.dispose(); mat.dispose(); renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [resolvedTheme])

  return (
    <div ref={mountRef} className="fixed inset-0 w-full h-screen -z-10 pointer-events-none" />
  )
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}