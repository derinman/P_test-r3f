import React, { useState, useRef, Suspense, useEffect } from "react";

import { Canvas } from "@react-three/fiber";

import styled from "styled-components";

import {
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
} from "./devModel/light/Light.js";

import * as work from "./devModel";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  overflow: hidden;
  //border:1px solid #000;
`;

const GuiWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  border: 2px solid #555;
  border-radius: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  //border: 1px solid #000;
`;

const GuiCompBtn = styled.div`
  border-bottom: 1px solid #000;
  margin: 1rem;
  display: flex;
`;

const GuiCheckBox = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  margin-bottom: 0.2rem;
  background-color: ${(props) => (props.visible ? "#555" : "#fff")};
  border: 1px solid #555;
`;

const App = () => {
  const [isLightTest, setIsLightTest] = useState(true);
  const [isGUIClose, setIsGUIClose] = useState(false);
  const [modelGuiWidth, setModelGuiWidth] = useState("200");
  const [lightGuiWidth, setLightGuiWidth] = useState("250");

  const [currentModel, setCurrentModel] = useState("No003");

  const [pointLight1, setPointLight1] = useState({});
  const [pointLight2, setPointLight2] = useState({});
  const [pointLight3, setPointLight3] = useState({});
  const [pointLight4, setPointLight4] = useState({});
  const [pointLight5, setPointLight5] = useState({});
  const [pointLight6, setPointLight6] = useState({});

  const [spotLight1, setSpotLight1] = useState({});
  const [spotLight2, setSpotLight2] = useState({});
  const [spotLight3, setSpotLight3] = useState({});

  const [ambientLight1, setAmbientLight1] = useState({});

  const [hemisphereLight1, setHemisphereLight1] = useState({});

  const [directionalLight1, setDirectionalLight1] = useState({});

  const [rectAreaLight1, setRectAreaLight1] = useState({});

  const canvasRef = useRef();
  const axesHelperRef = useRef();

  const Model = Object.entries(work).filter(
    (data) => data[1].name === currentModel
  )[0][1].Component;

  const modelsList = Object.entries(work)
    .filter((data) => !data[1].dev)
    .map((data) => data[1].name);

  useEffect(() => {
    // console.log(work)
    // console.log(Object.entries(work).filter(data=>!data[1].dev&&(data[1].name ===currentModel))[0][1])
    // console.log(Object.entries(work).filter(data=>!data[1].dev))
    // console.log(Object.entries(work).filter(data=>!data[1].dev).map(data=>data[1].name))
    // console.log('canvasRef:',canvasRef)
    // console.log(axesHelperRef)
  }, []);

  useEffect(() => {
    setIsLightTest(
      Object.entries(work).filter((data) => data[1].name === currentModel)[0][1]
        .camLightTest
    );
  }, [currentModel]);

  useEffect(() => {
    async function loadLight() {
      const [
        pointLightJson,
        spotLightJson,
        ambientLightJson,
        hemisphereLightJson,
        directionalLightJson,
        rectAreaLightJson,
      ] = await Promise.all([
        import(`./devModel/camLightConfig/${currentModel}/pointLight.json`),
        import(`./devModel/camLightConfig/${currentModel}/spotLight.json`),
        import(`./devModel/camLightConfig/${currentModel}/ambientLight.json`),
        import(
          `./devModel/camLightConfig/${currentModel}/hemisphereLight.json`
        ),
        import(
          `./devModel/camLightConfig/${currentModel}/directionalLight.json`
        ),
        import(`./devModel/camLightConfig/${currentModel}/rectAreaLight.json`),
      ]);
      setPointLight1(pointLightJson.pointLight1);
      setPointLight2(pointLightJson.pointLight2);
      setPointLight3(pointLightJson.pointLight3);
      setPointLight4(pointLightJson.pointLight4);
      setPointLight5(pointLightJson.pointLight5);
      setPointLight6(pointLightJson.pointLight6);
      setSpotLight1(spotLightJson.spotLight1);
      setSpotLight2(spotLightJson.spotLight2);
      setSpotLight3(spotLightJson.spotLight3);
      setAmbientLight1(ambientLightJson.ambientLight1);
      setHemisphereLight1(hemisphereLightJson.hemisphereLight1);
      setDirectionalLight1(directionalLightJson.directionalLight1);
      setRectAreaLight1(rectAreaLightJson.rectAreaLight1);
    }
    loadLight();
  }, [currentModel]);

  return (
    <Wrapper>
      <Canvas
        ref={canvasRef}
        concurrent={true}
        colorManagement={true}
        shadows={true}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <axesHelper
          ref={axesHelperRef}
          scale={[1, 1, 1]}
          up={[0, 1, 0]} //?????????????????????
        />
        {isLightTest && (
          <group>
            <PointLight pointLightConfig={pointLight1} />
            <PointLight pointLightConfig={pointLight2} />
            <PointLight pointLightConfig={pointLight3} />
            <PointLight pointLightConfig={pointLight4} />
            <PointLight pointLightConfig={pointLight5} />
            <PointLight pointLightConfig={pointLight6} />
            <SpotLight spotLightConfig={spotLight1} />
            <SpotLight spotLightConfig={spotLight2} />
            <SpotLight spotLightConfig={spotLight3} />
            <AmbientLight ambientLightConfig={ambientLight1} />
            <HemisphereLight hemisphereLightConfig={hemisphereLight1} />
            <DirectionalLight directionalLightConfig={directionalLight1} />
            <RectAreaLight rectAreaLightConfig={rectAreaLight1} />
          </group>
        )}
      </Canvas>

      {/* model GUI */}
      <div
        style={{
          position: "absolute",
          width: "1rem",
          height: "1rem",
          top: 0,
          left: "2.5vh",
          border: "1px solid #000",
          borderRadius:'0.5rem',
          background: "red",
        }}
        onClick={()=>{setIsGUIClose(!isGUIClose)}}
      />

      { !isGUIClose &&  
      <GuiWrapper
        style={{
          top: "2.5vh",
          left: "2.5vh",
          width: `${modelGuiWidth}px`,
          height: "50%",
        }}
      >
        <div style={{ margin: "1rem" }}>
          Gui Width
          <input
            style={{
              width: "75px",
              borderRadius: "10px",
              marginLeft: "0.5rem",
            }}
            value={modelGuiWidth}
            onChange={(e) => setModelGuiWidth(e.target.value)}
          />
        </div>

        {modelsList.map((data) => (
          <GuiCompBtn key={data}>
            <GuiCheckBox
              visible={data === currentModel}
              onClick={() => setCurrentModel(data)}
            />
            {data}
          </GuiCompBtn>
        ))}
      </GuiWrapper>
      }

      {/* light GUI */}
      {(isLightTest && !isGUIClose)&& (
        <GuiWrapper
          style={{
            top: "2.5vh",
            right: "2.5vh",
            width: `${lightGuiWidth}px`,
            height: "95%",
          }}
        >
          <div style={{ margin: "1rem" }}>
            Gui Width
            <input
              style={{
                width: "75px",
                borderRadius: "10px",
                marginLeft: "0.5rem",
              }}
              value={lightGuiWidth}
              onChange={(e) => setLightGuiWidth(e.target.value)}
            />
          </div>
          <PointLightGUI
            pointLightConfig={pointLight1}
            setPointLightConfig={setPointLight1}
          />
          <PointLightGUI
            pointLightConfig={pointLight2}
            setPointLightConfig={setPointLight2}
          />
          <PointLightGUI
            pointLightConfig={pointLight3}
            setPointLightConfig={setPointLight3}
          />
          <PointLightGUI
            pointLightConfig={pointLight4}
            setPointLightConfig={setPointLight4}
          />
          <PointLightGUI
            pointLightConfig={pointLight5}
            setPointLightConfig={setPointLight5}
          />
          <PointLightGUI
            pointLightConfig={pointLight6}
            setPointLightConfig={setPointLight6}
          />
          <SpotLightGUI
            spotLightConfig={spotLight1}
            setSpotLightConfig={setSpotLight1}
          />
          <SpotLightGUI
            spotLightConfig={spotLight2}
            setSpotLightConfig={setSpotLight2}
          />
          <SpotLightGUI
            spotLightConfig={spotLight3}
            setSpotLightConfig={setSpotLight3}
          />
          <AmbientLightGUI
            ambientLightConfig={ambientLight1}
            setAmbientLightConfig={setAmbientLight1}
          />
          <HemisphereLightGUI
            hemisphereLightConfig={hemisphereLight1}
            setHemisphereLightConfig={setHemisphereLight1}
          />
          <DirectionalLightGUI
            directionalLightConfig={directionalLight1}
            setDirectionalLightConfig={setDirectionalLight1}
          />
          <RectAreaLightGUI
            rectAreaLightConfig={rectAreaLight1}
            setRectAreaLightConfig={setRectAreaLight1}
          />
        </GuiWrapper>
      )}
    </Wrapper>
  );
};

export default App;
