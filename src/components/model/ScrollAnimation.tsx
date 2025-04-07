import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Model } from "./Model";

function ScrollAnimation() {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY;
        ref.current.rotation.y = scrollY * 0.001;
        ref.current.position.y = -scrollY * 0.002;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <group ref={ref}>
      <Model />
    </group>
  );
}

export default ScrollAnimation;
