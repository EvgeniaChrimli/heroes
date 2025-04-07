import * as THREE from "three";
import React, { JSX, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh;
    Object_8: THREE.SkinnedMesh;
    Object_9: THREE.SkinnedMesh;
    Object_10: THREE.SkinnedMesh;
    Object_11: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    ["01_-_Default"]: THREE.MeshStandardMaterial;
    ["01_-_Default_0"]: THREE.MeshStandardMaterial;
    ["01_-_Default_1"]: THREE.MeshStandardMaterial;
    ["01_-_Default_2"]: THREE.MeshStandardMaterial;
    ["01_-_Default_3"]: THREE.MeshStandardMaterial;
  };
};

console.log(import.meta.env.BASE_URL);
export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null!);
  const { nodes, materials, animations } = useGLTF(
    import.meta.env.BASE_URL + "models/scene.gltf"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const [isScroll, setIsScroll] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (!isScroll) setIsScroll(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScroll]);

  React.useEffect(() => {
    if (actions && animations.length > 0) {
      const firstaction = actions[animations[0].name];
      firstaction
        ?.reset()
        .setLoop(THREE.LoopRepeat, Infinity)
        .fadeIn(0.5)
        .play();
    }
  }, [isScroll, actions, animations]);

  const animationName = animations[0]?.name;
  const action = animationName && actions[animationName];
  const handleClick = () => {
    if (action && action.isRunning()) {
      action.stop();
    } else if (action) {
      action.play();
    }
  };

  React.useEffect(() => {
    actions[0]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="22e0dc656e264d7b90006479b60155cffbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.005, 0.005, 0.009]}
            position={[0, -1, 0]}
            onClick={handleClick}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials["01_-_Default"]}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials["01_-_Default_0"]}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials["01_-_Default_1"]}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials["01_-_Default_2"]}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials["01_-_Default_3"]}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="axe_base" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(import.meta.env.BASE_URL + "models/scene.gltf");
