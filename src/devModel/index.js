import { lazy } from 'react'

//dev:false(開發完成); dev:true(開發中)
export const pollyDog  = {name:'Polly Dog',Component: lazy(() => import('./PollyDog.js')),dev:false,default:true}
export const ponyCartoon    = {name:'Pony Cartoon',Component: lazy(() => import('./PonyCartoon.js')),dev:false,default:false}
export const no001    = {name:'NO 001',Component: lazy(() => import('./No001.js')),dev:false,default:false}