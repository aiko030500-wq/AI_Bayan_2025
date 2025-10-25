import React,{useEffect,useState} from 'react'
export const Card=({className='',children})=>(<div className={`rounded-2xl shadow-lg bg-white/92 backdrop-blur p-5 ${className}`}>{children}</div>)
export const Button=({children,className='',...p})=>(<button className={`px-4 py-2 rounded-2xl shadow hover:shadow-md transition active:scale-[0.99] ${className}`} {...p}>{children}</button>)
export const Pill=({children,className=''})=>(<span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${className}`}>{children}</span>)
export const GirlLogo=()=>(<img alt='AI Bayan' src='/favicon.svg' className='w-20 h-20'/>)

export function speakUK(text){
  if(!text) return
  const vs = window.speechSynthesis.getVoices()
  const v = vs.find(x=>/en-GB|United Kingdom|British/i.test(`${x.lang} ${x.name}`)) || vs.find(x=>/en/i.test(x.lang))
  const u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g,' ').trim())
  if(v) u.voice=v; u.lang=(v&&v.lang)||'en-GB'; u.rate=1; u.pitch=1; window.speechSynthesis.speak(u)
}
export const SpeakBtn=({text})=>(<Button onClick={()=>speakUK(text)} className='text-white bg-[#0f2e63]'>🔊 Play Voice (UK)</Button>)
