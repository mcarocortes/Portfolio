import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { memo, useMemo, useRef, type RefObject } from "react"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { scrollTransition } from "../../lib/scrollTransitionState"

/**VARIABLE GLOBAL**/
const cursorWorldPosition = new THREE.Vector3()
const FACE_Y_OFFSET = -0.35

/**    CURSOR WAVE VISUAL **/
function CursorWave() {

  const ref = useRef<THREE.Mesh>(null!)
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const intersection = new THREE.Vector3()

  useFrame((state) => {
    state.raycaster.ray.intersectPlane(plane, intersection)
    intersection.y -= FACE_Y_OFFSET
    ref.current.position.copy(intersection)
    cursorWorldPosition.copy(intersection)
  })

  return (
    <mesh ref={ref}>
    </mesh>
  )
}

/*** FACE PARTICLES ***/
function FaceParticles() {

  const pivotRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.PointsMaterial>(null!)

  const { scene } = useGLTF("/Portfolio/face.glb")

  const particleTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load("/Portfolio/particle-glow5.png")
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    return texture
  }, [])

  const { size } = useThree()

  const viewportWidth = size.width > 100 ? size.width : window.innerWidth

  const modelPosition = useMemo<[number, number, number]>(() => {
    if (viewportWidth < 768) {
      return [0.02, 0, 0]
    } else if (viewportWidth < 991) {
      return [0.5, 0, 0]
    } else if (viewportWidth < 1024) {
      return [0.6, 0, 0]
    } else if (viewportWidth < 1280) {
      return [0.7, 0, 0]
    } else if (viewportWidth < 1536) {
      return [1.0, 0, 0]
    }
    return [0.8, 0, 0]
  }, [viewportWidth])

  const modelPositionRef = useRef(modelPosition)
  modelPositionRef.current = modelPosition

  const isMobile = viewportWidth < 768

  const particlesGeometry = useMemo(() => {
    const brightnessVariation: number[] = []
    const positions: number[] = []
    const colors: number[] = []
    const originalColors: number[] = []

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const arr = mesh.geometry.attributes.position.array as ArrayLike<number>

        for (let i = 0; i < arr.length; i += 3 * 4) {
          const x = arr[i]
          const y = arr[i + 1]
          const z = arr[i + 2]

          if (z > -20) {
            const isFrontFace = z > 0.01
            const repeat = isFrontFace ? 1 : 0.1

            for (let r = 0; r < repeat; r++) {
              positions.push(x, y, z)
              colors.push(0.631, 0.502, 0.823)
              originalColors.push(0.631, 0.502, 0.823)
              brightnessVariation.push(0.6 + Math.random() * 0.4)
            }
          }
        }
      }
    })

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    )
    geometry.userData.originalColors = new Float32Array(originalColors)
    geometry.userData.brightnessVariation = new Float32Array(brightnessVariation)

    geometry.computeBoundingBox()
    const center = new THREE.Vector3()
    geometry.boundingBox!.getCenter(center)
    geometry.translate(-center.x, -center.y, -center.z)

    geometry.computeBoundingSphere()
    const radius = geometry.boundingSphere!.radius

    let scaleFactor = 1.3 / radius

    if (viewportWidth < 479) {
      scaleFactor = 0.91 / radius
    } else if (viewportWidth < 768) {
      scaleFactor = 0.97 / radius
    } else if (viewportWidth < 991) {
      scaleFactor = 1 / radius
    } else if (viewportWidth < 1024) {
      scaleFactor = 1.1 / radius
    } else if (viewportWidth < 1280) {
      scaleFactor = 1.2 / radius
    } else if (viewportWidth < 1536) {
      scaleFactor = 1.3 / radius
    }

    geometry.scale(scaleFactor, scaleFactor, scaleFactor)

    return geometry
  }, [scene, viewportWidth])

  useFrame((state) => {
    if (!pivotRef.current) return

    const currentAct1 = isMobile ? scrollTransition.act1 * 0.3 : scrollTransition.act1
    const currentAct2 = scrollTransition.act2
    const [baseX, baseY, baseZ] = modelPositionRef.current
    const isTransitioning = currentAct1 > 0.001 || currentAct2 > 0.001

    /* Solo alterar posición/escala durante el scroll */
    if (isTransitioning) {
      const currentX = baseX + (0 - baseX) * currentAct1
      pivotRef.current.position.set(currentX, baseY, baseZ)
      pivotRef.current.scale.setScalar(1 + currentAct2 * 0.6)

      if (materialRef.current) {
        materialRef.current.opacity = Math.max(0, 0.95 * (1 - currentAct2))
      }
    }

    if (currentAct2 >= 1) return

    const geometry = particlesGeometry
    const time = state.clock.elapsedTime
    const variation = geometry.userData.brightnessVariation as Float32Array
    const pos = geometry.attributes.position.array as Float32Array
    const colors = geometry.attributes.color.array as Float32Array
    const originalColors = geometry.userData.originalColors as Float32Array

    const cursor = cursorWorldPosition.clone()
    pivotRef.current.worldToLocal(cursor)

    const rotationBlend = 1 - currentAct1 * 0.85

    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i]
      const y = pos[i + 1]
      const dx = x - cursor.x
      const dy = y - cursor.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - dist * 2.5)
      const organic = Math.sin(time * 4.0 + i * 0.1) * 0.25
      const glow = 0.8 + influence * 2.5 * variation[i / 3] + organic

      colors[i] += (originalColors[i] * glow - colors[i]) * 0.15
      colors[i + 1] += (originalColors[i + 1] * glow - colors[i + 1]) * 0.15
      colors[i + 2] += (originalColors[i + 2] * glow - colors[i + 2]) * 0.15
    }

    geometry.attributes.color.needsUpdate = true

    if (isMobile) {
      pivotRef.current.rotation.x = 0
      pivotRef.current.rotation.y = 0
    } else {
      const cursorLocal = cursorWorldPosition.clone()
      pivotRef.current.worldToLocal(cursorLocal)

      const targetY = cursorLocal.x * 0.8 * rotationBlend
      const targetX = (cursorLocal.y * FACE_Y_OFFSET) * 0.3 * rotationBlend

      pivotRef.current.rotation.y += (targetY - pivotRef.current.rotation.y) * 0.08
      pivotRef.current.rotation.x += (targetX - pivotRef.current.rotation.x) * 0.08
    }
  })

  return (
    <group ref={pivotRef} position={modelPosition}>
      <points geometry={particlesGeometry} position={[0, FACE_Y_OFFSET, 0]}>
        <pointsMaterial
          ref={materialRef}
          map={particleTexture}
          vertexColors
          size={0.013}
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={true}
          alphaTest={0.001}
        />
      </points>
    </group>
  )
}

function HeroParticles({
  eventSource,
}: {
  eventSource?: RefObject<HTMLElement | null>;
}) {
  return (
    <div className="heroParticles">
      <Canvas
        eventSource={eventSource}
        camera={{
          position: [0, -0.2, 3.2],
          fov: 32
        }}
        dpr={[1, 2]}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
          pointerEvents: "none",
        }}
      >
        <CursorWave />
        <FaceParticles />

        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default memo(HeroParticles)
