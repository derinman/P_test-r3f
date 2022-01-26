import { lazy } from "react";

//dev:false(開發完成); dev:true(開發中)

export const ponyCartoon = {
  name: "PonyCartoon",
  Component: lazy(() => import("./PonyCartoon.js")),
  camLightTest: false,
};
export const no001 = {
  name: "No001",
  Component: lazy(() => import("./No001.js")),
  camLightTest: false,
};
export const no002 = {
  name: "No002",
  Component: lazy(() => import("./No002.js")),
  camLightTest: false,
};
export const no003 = {
  name: "No003",
  Component: lazy(() => import("./No003.js")),
  camLightTest: false,
};
export const no004 = {
  name: "No004",
  Component: lazy(() => import("./No004.js")),
  camLightTest: false,
};
export const no005= {
  name: "No005",
  Component: lazy(() => import("./No005.js")),
  camLightTest: true,
};
export const pollyDog = {
  name: "PollyDog",
  Component: lazy(() => import("./PollyDog.js")),
  camLightTest: true,
};
export const transmissionTest = {
  name: "TransmissionTest",
  Component: lazy(() => import("./TransmissionTest.js")),
  camLightTest: true,
};
