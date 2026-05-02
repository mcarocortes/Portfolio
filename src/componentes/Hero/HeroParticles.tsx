import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useRef } from "react"
import { EffectComposer, Bloom } from "@react-three/postprocessing"


/**VARIABLE GLOBAL**/
//Guarda la posición del cursor en mundo 3D
const cursorWorldPosition = new THREE.Vector3()
const FACE_Y_OFFSET = -0.35

/**    CURSOR WAVE VISUAL **/
//Solo muestra el círculo y guarda la posición del cursor
function CursorWave() {

  const ref = useRef<THREE.Mesh>(null!)

  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  // compensación manual correcta DE BRILLO CON LA POSICION DEL POINTS

  const intersection = new THREE.Vector3()

  useFrame((state) => {

    /* obtener posición exacta en mundo */
    state.raycaster.ray.intersectPlane(plane, intersection)

    /* compensar offset del rostro */
    intersection.y -= FACE_Y_OFFSET

    ref.current.position.copy(intersection)

    /* guardar global */
    cursorWorldPosition.copy(intersection)
  })

  return (
    <mesh ref={ref}>
    </mesh>
  )

}


/*** FACE PARTICLES ***/
//Convierte face.glb en partículas con glow dinámico
function FaceParticles() {

  const pivotRef = useRef<THREE.Group>(null!)

  const { scene } = useGLTF("/Portfolio/face.glb")


  /***TEXTURA DE PARTICULA SUAVE ***/

  const particleTexture = useMemo(() => {

    const loader = new THREE.TextureLoader()
    const texture = loader.load("/Portfolio/particle-glow5.png")

    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter


    return texture

  }, [])

  const { size } = useThree()

  const modelPosition = useMemo<[number, number, number]>(() => {

   if (size.width < 768) {
      return [0.02, 0, 0]
    } else if (size.width < 991) {
          return [0.5, 0, 0]
    } else if (size.width < 1024) {
          return [0.6, 0, 0]

    } else if (size.width < 1280) {
          return [0.7, 0, 0]

    } else if (size.width < 1536) {
          return [1.0, 0, 0]

    }

    return [0.8, 0, 0]

  }, [size.width])

  const isMobile = size.width < 768


  /*** CREAR GEOMETRIA ***/
  //Incluye posiciones y colores

  const particlesGeometry = useMemo(() => {

    //const density = 2
    const brightnessVariation: number[] = []
    const positions: number[] = []
    const colors: number[] = []
    const originalColors: number[] = []

    scene.traverse((child) => {

      if ((child as THREE.Mesh).isMesh) {

        const mesh = child as THREE.Mesh

        const arr =
          mesh.geometry.attributes.position.array as ArrayLike<number>

        for (let i = 0; i < arr.length; i += 3 * 2) { //controlar cantidad de puntos 3*2 

          const x = arr[i]
          const y = arr[i + 1]
          const z = arr[i + 2]


          if (z > -20) {

            // Determinar si es zona frontal del rostro
            const isFrontFace = z > 0.01

            // Si es zona frontal, repetir 2 veces (más densidad)
            const repeat = isFrontFace ? 1 : 0.1

            for (let r = 0; r < repeat; r++) {

              positions.push(x, y, z)

              colors.push(0.631, 0.502, 0.823)

              originalColors.push(0.631, 0.502, 0.823)

              brightnessVariation.push(
                0.6 + Math.random() * 0.4
              )
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

    geometry.userData.originalColors =
      new Float32Array(originalColors)

    geometry.userData.brightnessVariation =
      new Float32Array(brightnessVariation)

    /* centrar modelo */
    geometry.computeBoundingBox()

    const center = new THREE.Vector3()

    geometry.boundingBox!.getCenter(center)

    geometry.translate(-center.x, -center.y, -center.z)


    /* escalar modelo */
    geometry.computeBoundingSphere()

    const radius = geometry.boundingSphere!.radius

    let scaleFactor = 1.3 / radius;

    if (size.width < 479) {
      scaleFactor = 0.91 / radius;
    }else if (size.width < 768) {
      scaleFactor = 0.97 / radius;
    }else if (size.width < 991) {
      scaleFactor = 1 / radius;
    } else if (size.width < 1024) {
      scaleFactor = 1.1 / radius;
    } else if (size.width < 1280) {
      scaleFactor = 1.2 / radius;
    } else if (size.width < 1536) {
      scaleFactor = 1.3 / radius;
    }



    geometry.scale(
      scaleFactor,
      scaleFactor,
      scaleFactor
    )

    return geometry

  }, [scene, size])



  /***** FRAME LOOP ***/
  //Aquí ocurre el GLOW REAL
  useFrame((state) => {

    if (!pivotRef.current) return


    const geometry = particlesGeometry
    const time = state.clock.elapsedTime
    const variation = geometry.userData.brightnessVariation as Float32Array
    const pos =
      geometry.attributes.position.array as Float32Array

    const colors =
      geometry.attributes.color.array as Float32Array

    const originalColors =
      geometry.userData.originalColors as Float32Array

    const cursor = cursorWorldPosition.clone()
    pivotRef.current.worldToLocal(cursor)



    /* glow por proximidad */
    for (let i = 0; i < pos.length; i += 3) {

      const x = pos[i]
      const y = pos[i + 1]

      const dx = x - cursor.x
      const dy = y - cursor.y

      const dist =
        Math.sqrt(dx * dx + dy * dy)

      /* glow radio */
      const influence = Math.max(0, 1 - dist * 2.5)

      /* glow fuerte */

      /****** GLOW CON VARIACION NATURAL + MOVIMIENTO ORGANICO *****/
      const organic =
        Math.sin(time * 4.0 + i * 0.1) * 0.25

      const glow =
        0.8 +
        influence * 2.5 *
        variation[i / 3] +
        organic

      const r =
        originalColors[i] * glow

      const g =
        originalColors[i + 1] * glow

      const b =
        originalColors[i + 2] * glow


      /* interpolación suave */
      colors[i] +=
        (r - colors[i]) * 0.15

      colors[i + 1] +=
        (g - colors[i + 1]) * 0.15

      colors[i + 2] +=
        (b - colors[i + 2]) * 0.15

    }

    geometry.attributes.color.needsUpdate = true



    /* rotación rostro */
    if (isMobile) {

      pivotRef.current.rotation.x = 0
      pivotRef.current.rotation.y = 0

    } else {
      const cursor = cursorWorldPosition.clone() /* CENTRALIZAR PIVOT DE ACUERDO A LA POSICION DEL 3D */
      pivotRef.current.worldToLocal(cursor)

      const targetY = cursor.x * 0.8
      const targetX = (cursor.y * FACE_Y_OFFSET) * 0.3

      pivotRef.current.rotation.y +=
        (targetY - pivotRef.current.rotation.y) * 0.08

      pivotRef.current.rotation.x +=
        (targetX - pivotRef.current.rotation.x) * 0.08
    }

  })



  return (

    <group ref={pivotRef} position={modelPosition}> {/* ESTE POSITION MUEVE TODO EL 3D */}

      <points geometry={particlesGeometry} position={[0, FACE_Y_OFFSET, 0]}> {/*-0.35 DEBE SER EL MISMO DEL CURSOR */}

        {/***  MATERIAL SOFT PARTICLES *****/}
        <pointsMaterial
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



/********  HERO PRINCIPAL *******/
export default function HeroParticles() {

  return (

    <div className="heroParticles">

      <Canvas
        camera={{
          position: [0, -0.2, 3.2],
          fov: 32
        }}
      >

        <CursorWave />

        <FaceParticles />

        {/* POSTPROCESSING GLOW REAL */}
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