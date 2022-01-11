import { lazy } from 'react'

//dev:false(開發完成); dev:true(開發中)
export const pollyDog  = {name:'PollyDog',Component: lazy(() => import('./PollyDog.js')),camLightTest:true}
export const ponyCartoon    = {name:'PonyCartoon',Component: lazy(() => import('./PonyCartoon.js')),camLightTest:false}
export const no001    = {name:'No001',Component: lazy(() => import('./No001.js')),camLightTest:false}
export const no001interior    = {name:'No001Interior',Component: lazy(() => import('./No001Interior.js')),camLightTest:true}
export const scifiCorridor    = {name:'ScifiCorridor',Component: lazy(() => import('./ScifiCorridor.js')),camLightTest:true}
export const alphaTest    = {name:'AlphaTest',Component: lazy(() => import('./AlphaTest.js')),camLightTest:true}
export const transmissionTest    = {name:'TransmissionTest',Component: lazy(() => import('./TransmissionTest.js')),camLightTest:true}