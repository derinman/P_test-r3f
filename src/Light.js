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
  color:#fff;
  background-color: rgba(0, 0, 0, 0.3);
  padding:0.2rem;
  border-radius:0.3rem;
`

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
          <div onClick={() => console.log(JSON.stringify(pointLightConfig))}>snapshot</div>
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
            tooltip={false}
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
            tooltip={false}
            value={pointLightConfig.distance}
            step={0.25}
            max={5}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setPointLightConfig({ ...pointLightConfig, distance: e })
            }
          />
          intensity
          <Slider
            tooltip={false}
            value={pointLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setPointLightConfig({ ...pointLightConfig, intensity: e })
            }
          />
          X
          <Slider
            tooltip={false}
            value={pointLightConfig.x}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, x: e })}
          />
          Y
          <Slider
            tooltip={false}
            value={pointLightConfig.y}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, y: e })}
          />
          Z
          <Slider
            tooltip={false}
            value={pointLightConfig.z}
            step={0.25}
            max={20}
            min={-10}
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
          <div onClick={() => console.log(JSON.stringify(spotLightConfig))}>snapshot</div>
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
      castShadow={ambientLightConfig.castShadow}
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
          <div onClick={() => console.log(JSON.stringify(ambientLightConfig))}>snapshot</div>
          CastShadow
          <GuiCheckBox
            visible={ambientLightConfig.castShadow}
            onClick={() =>
              setAmbientLightConfig({
                ...ambientLightConfig,
                castShadow: !ambientLightConfig.castShadow,
              })
            }
          />
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
      castShadow={hemisphereLightConfig.castShadow}
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
          <div onClick={() => console.log(JSON.stringify(hemisphereLightConfig))}>snapshot</div>
          CastShadow
          <GuiCheckBox
            visible={hemisphereLightConfig.castShadow}
            onClick={() =>
              setHemisphereLightConfig({
                ...hemisphereLightConfig,
                castShadow: !hemisphereLightConfig.castShadow,
              })
            }
          />
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

export {
  PointLight,
  PointLightGUI,
  SpotLight,
  SpotLightGUI,
  AmbientLight,
  AmbientLightGUI,
  HemisphereLight,
  HemisphereLightGUI,
};
