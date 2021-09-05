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

const HTML_TEXT_FACTOR = 3;

const PointLight = (props) => {
  const { name, pointLightConfig } = props;
  const targetRef = useRef();
  const tmp = useRef();

  // useEffect(() => console.log(name, ":", tmp.current), []);

  return (
    <>
      <pointLight
        ref={tmp}
        position={[pointLightConfig.x, pointLightConfig.y, pointLightConfig.z]}
        distance={pointLightConfig.distance}
        color={pointLightConfig.color}
        intensity={pointLightConfig.intensity} //Default is 1
        decay={2}
        castShadow
        shadow-mapSize-height={1024 / 512} //試試1024/500~1024
        shadow-mapSize-width={1024 / 512} //試試1024/500~1024
        shadow-bias={0.05} //試試0.01~0.07
        shadow-focus={0.001} //試試0.1~2
        visible={pointLightConfig.visible}
      />
      <mesh
        position={[pointLightConfig.x, pointLightConfig.y, pointLightConfig.z]}
        rotation={[0, 0, 0]}
        castShadow
        visible={pointLightConfig.visible}
      >
        <sphereGeometry attach="geometry" args={[0.1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color={pointLightConfig.color}
          wireframe={true}
        />
        <Html distanceFactor={HTML_TEXT_FACTOR}>
          <div>{name}</div>
        </Html>
      </mesh>
    </>
  );
};

const PointLightGUI = (props) => {
  const { name, pointLightConfig, setPointLightConfig } = props;
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
        <div onClick={() => setIsClose((c) => !c)}>{name}</div>
      </GuiCompBtn>

      {!isClose && (
        <GuiCompWrapper>
          <div onClick={() => console.log(pointLightConfig)}>snapshot</div>
          <Slider
            tooltip={false}
            handleLabel={pointLightConfig.x}
            value={pointLightConfig.x}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, x: e })}
          />
          <Slider
            tooltip={false}
            handleLabel={pointLightConfig.y}
            value={pointLightConfig.y}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, y: e })}
          />
          <Slider
            tooltip={false}
            handleLabel={pointLightConfig.z}
            value={pointLightConfig.z}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setPointLightConfig({ ...pointLightConfig, z: e })}
          />
          intensity
          <Slider
            tooltip={false}
            handleLabel={pointLightConfig.intensity}
            value={pointLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setPointLightConfig({ ...pointLightConfig, intensity: e })
            }
          />
          Distance
          <Slider
            tooltip={false}
            handleLabel={pointLightConfig.distance}
            value={pointLightConfig.distance}
            step={0.25}
            max={5}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setPointLightConfig({ ...pointLightConfig, distance: e })
            }
          />
          <SketchPicker
            color={pointLightConfig.color}
            onChangeComplete={(e) =>
              setPointLightConfig({ ...pointLightConfig, color: e.hex })
            }
            presetColors={[]}
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const SpotLight = (props) => {
  const { name, spotLightConfig } = props;
  const targetRef = useRef();
  const tmp = useRef();

  // useEffect(() => console.log(name, ":", tmp.current), []);

  return (
    <>
      <spotLight
        //ref={}
        position={[spotLightConfig.x, spotLightConfig.y, spotLightConfig.z]}
        color={spotLightConfig.color}
        distance={spotLightConfig.distance} //Default is 0 (no limit)
        penumbra={spotLightConfig.penumbra} //values between zero and 1. Default is zero.
        angle={spotLightConfig.angle} //upper bound is Math.PI/2
        intensity={spotLightConfig.intensity} //Default is 1
        decay={2}
        castShadow
        shadow-mapSize-height={1024 / 512} //試試1024/500~1024
        shadow-mapSize-width={1024 / 512} //試試1024/500~1024
        shadow-bias={0.05} //試試0.01~0.07
        shadow-focus={0.001} //試試0.1~2
        target={targetRef.current}
        visible={spotLightConfig.visible}
      />
      <mesh
        ref={tmp}
        visible
        position={[spotLightConfig.x, spotLightConfig.y, spotLightConfig.z]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <sphereGeometry attach="geometry" args={[0.1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color={spotLightConfig.color}
          wireframe={true}
        />
        <Html distanceFactor={HTML_TEXT_FACTOR}>
          <div>{name}</div>
        </Html>
      </mesh>
      <mesh
        ref={targetRef}
        visible
        position={[
          spotLightConfig.targetX,
          spotLightConfig.targetY,
          spotLightConfig.targetZ,
        ]}
        castShadow
      >
        <sphereGeometry attach="geometry" args={[0.1, 16, 16]} />
        <meshStandardMaterial
          ref={tmp}
          attach="material"
          color={spotLightConfig.color}
          wireframe={true}
        />
        <Html distanceFactor={HTML_TEXT_FACTOR}>
          <div>
            {name}
            <br />
            target
          </div>
        </Html>
      </mesh>
    </>
  );
};

const SpotLightGUI = (props) => {
  const { name, spotLightConfig, setSpotLightConfig } = props;
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
        <div onClick={() => setIsClose((c) => !c)}>{name}</div>
      </GuiCompBtn>

      {!isClose && (
        <GuiCompWrapper>
          <div onClick={() => console.log(spotLightConfig)}>snapshot</div>
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.x}
            value={spotLightConfig.x}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setSpotLightConfig({ ...spotLightConfig, x: e })}
          />
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.y}
            value={spotLightConfig.y}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setSpotLightConfig({ ...spotLightConfig, y: e })}
          />
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.z}
            value={spotLightConfig.z}
            step={0.25}
            max={20}
            min={-10}
            orientation="horizontal"
            onChange={(e) => setSpotLightConfig({ ...spotLightConfig, z: e })}
          />
          intensity
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.intensity}
            value={spotLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, intensity: e })
            }
          />
          Distance
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.distance}
            value={spotLightConfig.distance}
            step={0.25}
            max={5}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, distance: e })
            }
          />
          Penumbra
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.penumbra}
            value={spotLightConfig.penumbra}
            step={0.1}
            max={1}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, penumbra: e })
            }
          />
          Angle
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.angle}
            value={spotLightConfig.angle}
            step={0.1}
            max={Math.PI / 2}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, angle: e })
            }
          />
          Target
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.targetX}
            value={spotLightConfig.targetX}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, targetX: e })
            }
          />
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.targetY}
            value={spotLightConfig.targetY}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, targetY: e })
            }
          />
          <Slider
            tooltip={false}
            handleLabel={spotLightConfig.targetZ}
            value={spotLightConfig.targetZ}
            step={0.25}
            max={10}
            min={-10}
            orientation="horizontal"
            onChange={(e) =>
              setSpotLightConfig({ ...spotLightConfig, targetZ: e })
            }
          />
          <SketchPicker
            color={spotLightConfig.color}
            onChangeComplete={(e) =>
              setSpotLightConfig({ ...spotLightConfig, color: e.hex })
            }
            presetColors={[]}
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const AmbientLight = (props) => {
  const { ambientLightConfig } = props;
  const tmp = useRef();

  // useEffect(() => console.log(name, ":", tmp.current), []);

  return (
    <ambientLight
      ref={tmp}
      intensity={ambientLightConfig.intensity}
      color={ambientLightConfig.color}
      visible={ambientLightConfig.visible}
    />
  );
};

const AmbientLightGUI = (props) => {
  const { name, ambientLightConfig, setAmbientLightConfig } = props;
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
        <div onClick={() => setIsClose((c) => !c)}>{name}</div>
      </GuiCompBtn>

      {!isClose && (
        <GuiCompWrapper>
          <div onClick={() => console.log(ambientLightConfig)}>snapshot</div>
          intensity
          <Slider
            tooltip={false}
            handleLabel={ambientLightConfig.intensity}
            value={ambientLightConfig.intensity}
            step={0.25}
            max={10}
            min={0}
            orientation="horizontal"
            onChange={(e) =>
              setAmbientLightConfig({ ...ambientLightConfig, intensity: e })
            }
          />
          <SketchPicker
            color={ambientLightConfig.color}
            onChangeComplete={(e) =>
              setAmbientLightConfig({ ...ambientLightConfig, color: e.hex })
            }
            presetColors={[]}
          />
        </GuiCompWrapper>
      )}
    </>
  );
};

const HemisphereLight = (props) => {
  const { hemisphereLightConfig } = props;
  const tmp = useRef();

  // useEffect(() => console.log(name, ":", tmp.current), []);

  return (
    <hemisphereLight
      ref={tmp}
      intensity={hemisphereLightConfig.intensity}
      skyColor={hemisphereLightConfig.skyColor}
      groundColor={hemisphereLightConfig.groundColor}
      visible={hemisphereLightConfig.visible}
    />
  );
};

const HemisphereLightGUI = (props) => {
  const { name, hemisphereLightConfig, setHemisphereLightConfig } = props;
  const [isClose, setIsClose] = useState(true);

  return (
    <>
      <GuiCompBtn >
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
          {name}
        </div> 
      </GuiCompBtn>

      {!isClose && (
        <GuiCompWrapper>
          <div onClick={() => console.log(hemisphereLightConfig)}>snapshot</div>
          intensity
          <Slider
            tooltip={false}
            handleLabel={hemisphereLightConfig.intensity}
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
