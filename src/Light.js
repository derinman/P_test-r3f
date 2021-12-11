import React, { useState, useEffect, useRef } from "react";

import { Html } from "@react-three/drei";

import styled from "styled-components";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import { SketchPicker } from "react-color";

const GuiCompBtn = styled.div`
  border-bottom: 1px solid #000;
  margin: 1rem;
  display: flex;
`;
const GuiCompWrapper = styled.div`
  border: 2px solid #555;
  margin: 0.5rem;
`;

const GuiCheckBox = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  margin-bottom: 0.2rem;
  background-color: ${(props) => (props.visible ? "#555" : "#fff")};
  border: 1px solid #555;
`;

const LightLabel = styled.div`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.2rem;
  border-radius: 0.3rem;
  font-size:1.5rem;
  &:hover{
    font-size:7rem;
    border-radius: 1.5rem;
  }
`;

//1
// Three.js what causes shadow acne(ripple) and how to fix it?
// https://stackoverflow.com/questions/56034734/three-js-what-causes-shadow-acne-and-how-to-fix-it
// ans: directionalLight.shadow.bias = - 0.01;

//2
// pointLight有設distance才有陰影

const HTML_TEXT_FACTOR = 3;
const Light_SPHERE_ARGS = [0.05, 16, 16];

const PointLight = (props) => {
  const { name, pointLightConfig } = props;
  const targetRef = useRef();
  const tmp = useRef();

  // useEffect(() => console.log(name, ":", tmp.current),[]);
  // useEffect(() => console.log(name, ":", tmp.current));

  return (
    <>
      <pointLight
        ref={tmp}
        castShadow={pointLightConfig.castShadow}
        color={pointLightConfig.color}
        decay={pointLightConfig.decay}
        distance={pointLightConfig.distance}
        intensity={pointLightConfig.intensity}
        name={pointLightConfig.name}
        position={[pointLightConfig.x, pointLightConfig.y, pointLightConfig.z]}
        visible={pointLightConfig.visible}
        shadow-bias={-0.01}
      />
      <mesh
        position={[pointLightConfig.x, pointLightConfig.y, pointLightConfig.z]}
        visible={pointLightConfig.visible}
      >
        <sphereGeometry attach="geometry" args={Light_SPHERE_ARGS} />
        <meshStandardMaterial
          attach="material"
          color={pointLightConfig.color}
          wireframe={true}
        />
        {pointLightConfig.visible && (
          <Html distanceFactor={HTML_TEXT_FACTOR}>
            <LightLabel>{pointLightConfig.name}</LightLabel>
          </Html>
        )}
      </mesh>
    </>
  );
};

const PointLightGUI = (props) => {
  const { pointLightConfig, setPointLightConfig } = props;
  const [isClose, setIsClose] = useState(true);

  return (
    <>
      <GuiCompBtn>
        <GuiCheckBox
          visible={pointLightConfig.visible}
          onClick={() => {
            setPointLightConfig({
              ...pointLightConfig,
              visible: !pointLightConfig.visible,
            });
          }}
        />
        <div onClick={() => setIsClose((c) => !c)}>{pointLightConfig.name}</div>
      </GuiCompBtn>

      {!isClose && (
        <GuiCompWrapper>
          <div onClick={() => console.log(JSON.stringify(pointLightConfig))}>
            snapshot
          </div>
          <br />
          castShadow
          <GuiCheckBox
            visible={pointLightConfig.castShadow}
            onClick={() =>
              setPointLightConfig({
                ...pointLightConfig,
                castShadow: !pointLightConfig.castShadow,
              })
            }
          />
          color
          <SketchPicker
            color={pointLightConfig.color}
            onChangeComplete={(e) =>
              setPointLightConfig({ ...pointLightConfig, color: e.hex })
            }
            presetColors={[]}
          />
          decay
          <Slider
            tooltip={true}
            value={pointLightConfig.decay}
            step={0.25}
            max={5}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setPointLightConfig({ ...pointLightConfig, decay: e })
            }
          />
          Distance
          <Slider
            tooltip={true}
            value={pointLightConfig.distance}
            step={0.25}
            max={20}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setPointLightConfig({ ...pointLightConfig, distance: e })
            }
          />
          intensity
          <Slider
            tooltip={true}
            value={pointLightConfig.intensity}
            step={0.25}
            max={50}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setPointLightConfig({ ...pointLightConfig, intensity: e })
            }
          />
          X
          <Slider
            tooltip={true}
            value={pointLightConfig.x}
            step={0.25}
            max={20}
            min={-20}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, x: e })}
          />
          Y
          <Slider
            tooltip={true}
            value={pointLightConfig.y}
            step={0.25}
            max={20}
            min={-20}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, y: e })}
          />
          Z
          <Slider
            tooltip={true}
            value={pointLightConfig.z}
            step={0.25}
            max={20}
            min={-20}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, z: e })}
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const SpotLight = (props) => {
  const { spotLightConfig } = props;

  const tmp = useRef();
  const targetRef = useRef();
  // useEffect(() => console.log(spotLightConfig.name, ":", tmp.current), []);
  // useEffect(() => console.log(spotLightConfig.name, ":", tmp.current));
  return (
    <>
      <spotLight
        ref={tmp}
        angle={spotLightConfig.angle} //upper bound is Math.PI/2
        castShadow={spotLightConfig.castShadow}
        color={spotLightConfig.color}
        decay={spotLightConfig.decay}
        distance={spotLightConfig.distance} //Default is 0 (no limit)
        intensity={spotLightConfig.intensity} //Default is 1
        penumbra={spotLightConfig.penumbra} //values between zero and 1. Default is zero.
        position={[spotLightConfig.x, spotLightConfig.y, spotLightConfig.z]}
        target={targetRef.current}
        visible={spotLightConfig.visible}
      />
      <mesh
        position={[spotLightConfig.x, spotLightConfig.y, spotLightConfig.z]}
        visible={spotLightConfig.visible}
      >
        <sphereGeometry attach="geometry" args={Light_SPHERE_ARGS} />
        <meshStandardMaterial
          attach="material"
          color={spotLightConfig.color}
          wireframe={true}
        />
        {spotLightConfig.visible && (
          <Html distanceFactor={HTML_TEXT_FACTOR}>
            <LightLabel>{spotLightConfig.name}</LightLabel>
          </Html>
        )}
      </mesh>
      <mesh
        ref={targetRef}
        position={[
          spotLightConfig.targetX,
          spotLightConfig.targetY,
          spotLightConfig.targetZ,
        ]}
        visible={spotLightConfig.visible}
      >
        <sphereGeometry attach="geometry" args={Light_SPHERE_ARGS} />
        <meshStandardMaterial
          attach="material"
          color={spotLightConfig.color}
          wireframe={true}
        />
        {spotLightConfig.visible && (
          <Html distanceFactor={HTML_TEXT_FACTOR}>
            <LightLabel>
              {spotLightConfig.name}
              <br />
              target
            </LightLabel>
          </Html>
        )}
      </mesh>
    </>
  );
};

const SpotLightGUI = (props) => {
  const { spotLightConfig, setSpotLightConfig } = props;
  const [isClose, setIsClose] = useState(true);

  return (
    <>
      <GuiCompBtn>
        <GuiCheckBox
          visible={spotLightConfig.visible}
          onClick={() => {
            setSpotLightConfig({
              ...spotLightConfig,
              visible: !spotLightConfig.visible,
            });
          }}
        />
        <div onClick={() => setIsClose((c) => !c)}>{spotLightConfig.name}</div>
      </GuiCompBtn>
      {!isClose && (
        <GuiCompWrapper>
          <div onClick={() => console.log(JSON.stringify(spotLightConfig))}>
            snapshot
          </div>
          Angle
          <Slider
            tooltip={false}
            value={spotLightConfig.angle}
            step={0.1}
            max={Math.PI / 2}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, angle: e })
            }
          />
          CastShadow
          <GuiCheckBox
            visible={spotLightConfig.castShadow}
            onClick={() =>
              setSpotLightConfig({
                ...spotLightConfig,
                castShadow: !spotLightConfig.castShadow,
              })
            }
          />
          <SketchPicker
            color={spotLightConfig.color}
            onChangeComplete={(e) =>
              setSpotLightConfig({ ...spotLightConfig, color: e.hex })
            }
            presetColors={[]}
          />
          decay
          <Slider
            tooltip={false}
            value={spotLightConfig.decay}
            step={0.25}
            max={5}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, decay: e })
            }
          />
          Distance
          <Slider
            tooltip={false}
            value={spotLightConfig.distance}
            step={0.25}
            max={5}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, distance: e })
            }
          />
          intensity
          <Slider
            tooltip={false}
            value={spotLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, intensity: e })
            }
          />
          Penumbra
          <Slider
            tooltip={false}
            value={spotLightConfig.penumbra}
            step={0.1}
            max={1}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, penumbra: e })
            }
          />
          X
          <Slider
            tooltip={false}
            value={spotLightConfig.x}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setSpotLightConfig({ ...spotLightConfig, x: e })}
          />
          Y
          <Slider
            tooltip={false}
            value={spotLightConfig.y}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setSpotLightConfig({ ...spotLightConfig, y: e })}
          />
          Z
          <Slider
            tooltip={false}
            value={spotLightConfig.z}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setSpotLightConfig({ ...spotLightConfig, z: e })}
          />
          TargetX
          <Slider
            tooltip={false}
            value={spotLightConfig.targetX}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, targetX: e })
            }
          />
          TargetY
          <Slider
            tooltip={false}
            value={spotLightConfig.targetY}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, targetY: e })
            }
          />
          TargetZ
          <Slider
            tooltip={false}
            value={spotLightConfig.targetZ}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, targetZ: e })
            }
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const AmbientLight = (props) => {
  const { ambientLightConfig } = props;
  const tmp = useRef();

  // useEffect(() => console.log(ambientLightConfig.name, ":", tmp.current), []);
  // useEffect(() => console.log(ambientLightConfig.name, ":", tmp.current));

  return (
    <ambientLight
      ref={tmp}
      color={ambientLightConfig.color}
      intensity={ambientLightConfig.intensity}
      visible={ambientLightConfig.visible}
    />
  );
};

const AmbientLightGUI = (props) => {
  const { ambientLightConfig, setAmbientLightConfig } = props;
  const [isClose, setIsClose] = useState(true);

  return (
    <>
      <GuiCompBtn>
        <GuiCheckBox
          visible={ambientLightConfig.visible}
          onClick={() => {
            setAmbientLightConfig({
              ...ambientLightConfig,
              visible: !ambientLightConfig.visible,
            });
          }}
        />
        <div onClick={() => setIsClose((c) => !c)}>
          {ambientLightConfig.name}
        </div>
      </GuiCompBtn>

      {!isClose && (
        <GuiCompWrapper>
          <div onClick={() => console.log(JSON.stringify(ambientLightConfig))}>
            snapshot
          </div>
          Color
          <SketchPicker
            color={ambientLightConfig.color}
            onChangeComplete={(e) =>
              setAmbientLightConfig({ ...ambientLightConfig, color: e.hex })
            }
            presetColors={[]}
          />
          Intensity
          <Slider
            tooltip={false}
            value={ambientLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setAmbientLightConfig({ ...ambientLightConfig, intensity: e })
            }
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const HemisphereLight = (props) => {
  const { hemisphereLightConfig } = props;
  const tmp = useRef();

  // useEffect(() => console.log(hemisphereLightConfig.name, ":", tmp.current), []);
  // useEffect(() => console.log(hemisphereLightConfig.name, ":", tmp.current));

  return (
    <hemisphereLight
      ref={tmp}
      color={hemisphereLightConfig.color}
      groundColor={hemisphereLightConfig.groundColor}
      intensity={hemisphereLightConfig.intensity}
      skyColor={hemisphereLightConfig.skyColor}
      visible={hemisphereLightConfig.visible}
    />
  );
};

const HemisphereLightGUI = (props) => {
  const { hemisphereLightConfig, setHemisphereLightConfig } = props;
  const [isClose, setIsClose] = useState(true);

  return (
    <>
      <GuiCompBtn>
        <GuiCheckBox
          visible={hemisphereLightConfig.visible}
          onClick={() => {
            setHemisphereLightConfig({
              ...hemisphereLightConfig,
              visible: !hemisphereLightConfig.visible,
            });
          }}
        />
        <div onClick={() => setIsClose((c) => !c)}>
          {hemisphereLightConfig.name}
        </div>
      </GuiCompBtn>

      {!isClose && (
        <GuiCompWrapper>
          <div
            onClick={() => console.log(JSON.stringify(hemisphereLightConfig))}
          >
            snapshot
          </div>
          Color
          <SketchPicker
            color={hemisphereLightConfig.color}
            onChangeComplete={(e) =>
              setHemisphereLightConfig({
                ...hemisphereLightConfig,
                color: e.hex,
              })
            }
            presetColors={[]}
          />
          SkyColor
          <SketchPicker
            color={hemisphereLightConfig.skyColor}
            onChangeComplete={(e) =>
              setHemisphereLightConfig({
                ...hemisphereLightConfig,
                skyColor: e.hex,
              })
            }
            presetColors={[]}
          />
          GroundColor
          <SketchPicker
            color={hemisphereLightConfig.groundColor}
            onChangeComplete={(e) =>
              setHemisphereLightConfig({
                ...hemisphereLightConfig,
                groundColor: e.hex,
              })
            }
            presetColors={[]}
          />
          Intensity
          <Slider
            tooltip={false}
            value={hemisphereLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setHemisphereLightConfig({
                ...hemisphereLightConfig,
                intensity: e,
              })
            }
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const DirectionalLight = (props) => {
  const { directionalLightConfig } = props;
  const tmp = useRef();
  const targetRef = useRef();

  // useEffect(() => console.log(directionalLightConfig.name, ":", tmp.current),[]);
  // useEffect(() => console.log(directionalLightConfig.name, ":", tmp.current));

  return (
    <>
      <directionalLight
        ref={tmp}
        castShadow={directionalLightConfig.castShadow}
        color={directionalLightConfig.color}
        intensity={directionalLightConfig.intensity}
        position={[
          directionalLightConfig.x,
          directionalLightConfig.y,
          directionalLightConfig.z,
        ]}
        target={targetRef.current}
        visible={directionalLightConfig.visible}
        shadow-bias={-0.01}
      />
      <mesh
        position={[
          directionalLightConfig.x,
          directionalLightConfig.y,
          directionalLightConfig.z,
        ]}
        visible={directionalLightConfig.visible}
      >
        <sphereGeometry attach="geometry" args={Light_SPHERE_ARGS} />
        <meshStandardMaterial
          attach="material"
          color={directionalLightConfig.color}
          wireframe={true}
        />
        {directionalLightConfig.visible && (
          <Html distanceFactor={HTML_TEXT_FACTOR}>
            <LightLabel>{directionalLightConfig.name}</LightLabel>
          </Html>
        )}
      </mesh>
      <mesh
        ref={targetRef}
        position={[
          directionalLightConfig.targetX,
          directionalLightConfig.targetY,
          directionalLightConfig.targetZ,
        ]}
        visible={directionalLightConfig.visible}
      >
        <sphereGeometry attach="geometry" args={Light_SPHERE_ARGS} />
        <meshStandardMaterial
          attach="material"
          color={directionalLightConfig.color}
          wireframe={true}
        />
        {directionalLightConfig.visible && (
          <Html distanceFactor={HTML_TEXT_FACTOR}>
            <LightLabel>
              {directionalLightConfig.name}
              <br />
              target
            </LightLabel>
          </Html>
        )}
      </mesh>
    </>
  );
};

const DirectionalLightGUI = (props) => {
  const { directionalLightConfig, setDirectionalLightConfig } = props;
  const [isClose, setIsClose] = useState(true);

  return (
    <>
      <GuiCompBtn>
        <GuiCheckBox
          visible={directionalLightConfig.visible}
          onClick={() => {
            setDirectionalLightConfig({
              ...directionalLightConfig,
              visible: !directionalLightConfig.visible,
            });
          }}
        />
        <div onClick={() => setIsClose((c) => !c)}>
          {directionalLightConfig.name}
        </div>
      </GuiCompBtn>
      {!isClose && (
        <GuiCompWrapper>
          <div
            onClick={() => console.log(JSON.stringify(directionalLightConfig))}
          >
            snapshot
          </div>
          CastShadow
          <GuiCheckBox
            visible={directionalLightConfig.castShadow}
            onClick={() =>
              setDirectionalLightConfig({
                ...directionalLightConfig,
                castShadow: !directionalLightConfig.castShadow,
              })
            }
          />
          <SketchPicker
            color={directionalLightConfig.color}
            onChangeComplete={(e) =>
              setDirectionalLightConfig({
                ...directionalLightConfig,
                color: e.hex,
              })
            }
            presetColors={[]}
          />
          intensity
          <Slider
            tooltip={false}
            value={directionalLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setDirectionalLightConfig({
                ...directionalLightConfig,
                intensity: e,
              })
            }
          />
          X
          <Slider
            tooltip={false}
            value={directionalLightConfig.x}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setDirectionalLightConfig({ ...directionalLightConfig, x: e })
            }
          />
          Y
          <Slider
            tooltip={false}
            value={directionalLightConfig.y}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setDirectionalLightConfig({ ...directionalLightConfig, y: e })
            }
          />
          Z
          <Slider
            tooltip={false}
            value={directionalLightConfig.z}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setDirectionalLightConfig({ ...directionalLightConfig, z: e })
            }
          />
          TargetX
          <Slider
            tooltip={false}
            value={directionalLightConfig.targetX}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setDirectionalLightConfig({
                ...directionalLightConfig,
                targetX: e,
              })
            }
          />
          TargetY
          <Slider
            tooltip={false}
            value={directionalLightConfig.targetY}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setDirectionalLightConfig({
                ...directionalLightConfig,
                targetY: e,
              })
            }
          />
          TargetZ
          <Slider
            tooltip={false}
            value={directionalLightConfig.targetZ}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setDirectionalLightConfig({
                ...directionalLightConfig,
                targetZ: e,
              })
            }
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const RectAreaLight = (props) => {
  const { rectAreaLightConfig } = props;
  const tmp = useRef();

  // useEffect(() => console.log(directionalLightConfig.name, ":", tmp.current),[]);
  // useEffect(() => console.log(rectAreaLightConfig.name, ":", tmp.current));

  return (
    <>
      <rectAreaLight
        ref={tmp}
        color={rectAreaLightConfig.color}
        intensity={rectAreaLightConfig.intensity}
        height={rectAreaLightConfig.height}
        width={rectAreaLightConfig.width}
        position={[
          rectAreaLightConfig.x,
          rectAreaLightConfig.y,
          rectAreaLightConfig.z,
        ]}
        rotation={[
          rectAreaLightConfig.rotationX,
          rectAreaLightConfig.rotationY,
          0
        ]}
        visible={rectAreaLightConfig.visible}
      />
      <mesh
        position={[
          rectAreaLightConfig.x,
          rectAreaLightConfig.y,
          rectAreaLightConfig.z
        ]}
        rotation={[
          rectAreaLightConfig.rotationX,
          rectAreaLightConfig.rotationY,
          0
        ]}
        visible={rectAreaLightConfig.visible}
      >
        <planeGeometry 
          attach="geometry" 
          args={[rectAreaLightConfig.width, rectAreaLightConfig.height]} />
        <meshStandardMaterial
          attach="material"
          color={rectAreaLightConfig.color}
          wireframe={true}
        />
        {rectAreaLightConfig.visible && (
          <Html distanceFactor={HTML_TEXT_FACTOR}>
            <LightLabel>{rectAreaLightConfig.name}</LightLabel>
          </Html>
        )}
      </mesh>
    </>
  );
};

const RectAreaLightGUI = (props) => {
  const { rectAreaLightConfig, setRectAreaLightConfig } = props;
  const [isClose, setIsClose] = useState(true);

  return (
    <>
      <GuiCompBtn>
        <GuiCheckBox
          visible={rectAreaLightConfig.visible}
          onClick={() => {
            setRectAreaLightConfig({
              ...rectAreaLightConfig,
              visible: !rectAreaLightConfig.visible,
            });
          }}
        />
        <div onClick={() => setIsClose((c) => !c)}>
          {rectAreaLightConfig.name}
        </div>
      </GuiCompBtn>
      {!isClose && (
        <GuiCompWrapper>
          <div
            onClick={() => console.log(JSON.stringify(rectAreaLightConfig))}
          >
            snapshot
          </div>
          <SketchPicker
            color={rectAreaLightConfig.color}
            onChangeComplete={(e) =>
              setRectAreaLightConfig({
                ...rectAreaLightConfig,
                color: e.hex,
              })
            }
            presetColors={[]}
          />
          intensity
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({
                ...rectAreaLightConfig,
                intensity: e,
              })
            }
          />
          height
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.height}
            step={0.25}
            max={20}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({
                ...rectAreaLightConfig,
                height: e,
              })
            }
          />
          width
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.width}
            step={0.25}
            max={20}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({
                ...rectAreaLightConfig,
                width: e,
              })
            }
          />
          X
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.x}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({ ...rectAreaLightConfig, x: e })
            }
          />
          Y
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.y}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({ ...rectAreaLightConfig, y: e })
            }
          />
          Z
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.z}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({ ...rectAreaLightConfig, z: e })
            }
          />
          RotationX
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.rotationX}
            step={0.25}
            max={Math.PI*2}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({
                ...rectAreaLightConfig,
                rotationX: e,
              })
            }
          />
          RotationY
          <Slider
            tooltip={false}
            value={rectAreaLightConfig.rotationY}
            step={0.25}
            max={Math.PI*2}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setRectAreaLightConfig({
                ...rectAreaLightConfig,
                rotationY: e,
              })
            }
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

export {
  PointLight,
  PointLightGUI,
  SpotLight,
  SpotLightGUI,
  AmbientLight,
  AmbientLightGUI,
  HemisphereLight,
  HemisphereLightGUI,
  DirectionalLight,
  DirectionalLightGUI,
  RectAreaLight,
  RectAreaLightGUI,
};
