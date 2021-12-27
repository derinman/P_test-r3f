import { lazy } from 'react'

//dev:false(開發完成); dev:true(開發中)
export const pollyDog  = {name:'PollyDog',Component: lazy(() => import('./PollyDog.js')),dev:false,default:true}
export const ponyCartoon    = {name:'PonyCartoon',Component: lazy(() => import('./PonyCartoon.js')),dev:false,default:false}
export const no001    = {name:'No001',Component: lazy(() => import('./No001.js')),dev:false,default:false}
export const scifiCorridor    = {name:'ScifiCorridor',Component: lazy(() => import('./ScifiCorridor.js')),dev:false,default:false}
export const alphaTest    = {name:'AlphaTest',Component: lazy(() => import('./AlphaTest.js')),dev:false,default:false}
export const transmissionTest    = {name:'TransmissionTest',Component: lazy(() => import('./TransmissionTest.js')),dev:false,default:false}