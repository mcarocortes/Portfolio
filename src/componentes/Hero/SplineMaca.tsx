import Spline from '@splinetool/react-spline';

interface SplineMacaProps {
  onSceneLoad?: () => void;
}
        console.log("cargando spline")


export default function SplineMaca({ onSceneLoad }: SplineMacaProps) {
  return (
    <>

    <Spline
      scene="https://prod.spline.design/mXYOAUV6ziXwYtIV/scene.splinecode"
      onLoad={onSceneLoad}
    />
    </>
  );
}