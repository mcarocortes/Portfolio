import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useCloseOnRouteChange(callback: () => void) {

  const location = useLocation();

  useEffect(() => {
    callback();
  }, [location]);

}