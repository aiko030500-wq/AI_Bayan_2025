import React,{useEffect,useState} from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Pill, GirlLogo, SpeakBtn, speakUK } from './ui.js'
import AIBayanChat from './AIBayanChat.jsx'
import TeacherPanel from './TeacherPanel.jsx'
import { downloadCertificate } from './certificate.js'

const PIN_CODE='7856'

function Splash({onDone}){
  useEffect(()=>{
    const lines = [
      'Welcome to AI Bayan 2025 — Let’s start learning English together!',
    ]
    speakUK('Hello! I’m AI Bayan — your English friend 2025.')
    setTimeout(onDone, 1800)
  },[])
  return (<div className='min-h-screen bg-[#f0c86a] grid place-items-center px-4'>
    <div className='flex flex-col items-center gap-4'>
      <GirlLogo/>
      <div className='text-xl text-[#0f2e63] text-center font-semibold max-w-md'>
        ✨ Welcome to AI Bayan 2025 — Let’s start learning English together!
      </div>
    </div>
  </div>)
}

function Registration({onDone}){
  const [name,setName]=useState('')
  const [cls,setCls]=useState('')
  const [pwd,setPwd]=useState('')
  const submit=(e)=>{ e.preventDefault(); if(!name||!cls||!pwd) return alert('Fill all fields'); const rows=JSON.parse(localStorage.getItem('ai_bayan_students')||'[]'); const id=Date.now(); rows.push({id,name,cls,status:'pending',score:0}); localStorage.setItem('ai_bayan_students',JSON.stringify(rows)); localStorage.setItem('ai_bayan_current', JSON.stringify({id,name,cls})); speakUK(`Thank you, ${name}. Please wait for your teacher to approve your account.`); onDone() }
  return (<div className='min-h-screen bg-[#f0c86a] grid place-items-center px-4'>
    <div className='w-full max-w-sm bg-white/90 rounded-2xl p-5 shadow'>
      <div className='flex flex-col items-center gap-2 mb-3'><GirlLogo/><div className='text-xl font-semibold text-[#0f2e63]'>AI Bayan 2025 — Registration</div></div>
      <form onSubmit={submit} className='space-y-3'>
        <input className='w-full rounded-xl border p-3' placeholder='Name' value={name} onChange={e=>setName(e.target.value)}/>
        <input className='w-full rounded-xl border p-3' placeholder='Class (e.g., 4A)' value={cls} onChange={e=>setCls(e.target.value)}/>
        <input type='password' className='w-full rounded-xl border p-3' placeholder='Password' value={pwd} onChange={e=>setPwd(e.target.value)}/>
        <Button className='w-full bg-[#0f2e63] text-white'>Register →</Button>
      </form>
      <div className='text-xs text-slate-600 mt-2'>Your teacher will approve your account.</div>
    </div>
  </div>)
}

function PinGate({children}){
  const [ok,setOk]=useState(false); const [pin,setPin]=useState('')
  useEffect(()=>{ const f=localStorage.getItem('ai_bayan_pin_ok')==='1'; if(f) setOk(true); else speakUK('Welcome! Please enter the access code.') },[])
  const submit=(e)=>{ e.preventDefault(); if(pin===PIN_CODE){ localStorage.setItem('ai_bayan_pin_ok','1'); setOk(true); setTimeout(()=>speakUK('Hello! I’m AI Bayan — your English friend 2025.'),200)} else alert('Wrong code') }
  if(ok) return children
  return (<div className='min-h-screen bg-[#f0c86a] grid place-items-center px-4'>
    <div className='w-full max-w-sm'>
      <div className='flex flex-col items-center gap-4'>
        <GirlLogo/>
        <form onSubmit={submit} className='w-full bg-white/90 rounded-2xl p-5 shadow'>
          <div className='text-center text-xl font-semibold text-[#0f2e63] mb-2'>AI Bayan 2025</div>
          <input autoFocus inputMode='numeric' className='w-full rounded-xl border p-3 text-center text-2xl tracking-widest' placeholder='****' value={pin} onChange={e=>setPin(e.target.value)} maxLength={4}/>
          <button className='w-full mt-3 px-4 py-2 rounded-xl bg-[#0f2e63] text-white'>Unlock</button>
        </form>
      </div>
    </div>
  </div>)
}

async function loadJSON(p){ try{ const r=await fetch(p); if(!r.ok) throw 0; return await r.json() }catch{return null} }

function Home({mods}){
  const navigate=useNavigate()
  useEffect(()=>{
    const phrases=[
      'Learn, explore, and shine with AI Bayan!',
      'Believe in yourself — you can do it!',
      'Every lesson makes you stronger!',
      'Keep learning, keep growing!',
      'English is fun when we learn together!',
      'You’re doing great — I’m proud of you!'
    ]
    const t=phrases[Math.floor(Math.random()*phrases.length)]
    speakUK(t)
  },[])
  return (<Card>
    <div className='grid sm:grid-cols-2 gap-3'>
      {mods.map((m,mi)=>(
        <button key={m.id} onClick={()=>navigate(`/module/${mi+1}`)} className='text-left rounded-xl border bg-white p-5 hover:shadow-lg'>
          <div className='text-[#0f2e63] font-bold'>{m.title}</div>
          <div className='text-slate-600 text-sm'>4 lessons • tap to open</div>
        </button>
      ))}
    </div>
    <div className='text-center text-[#0f2e63] mt-4'>Choose a module to start learning!</div>
  </Card>)
}

function ModulePage({mods}){
  const {m}=useParams(); const i=Math.max(0,Math.min(mods.length-1,(parseInt(m||'1')-1))); const mod=mods[i]; const nav=useNavigate()
  return (<Card>
    <div className='flex items-center justify-between'>
      <div className='text-xl font-semibold text-[#0f2e63]'>{mod.title}</div>
      <Button onClick={()=>nav('/')} className='bg-white text-[#0f2e63] border'>← Back</Button>
    </div>
    <div className='grid sm:grid-cols-2 gap-3 mt-4'>
      {mod.lessons.map((l,li)=>(
        <button key={l.id} onClick={()=>nav(`/module/${i+1}/lesson/${li+1}`)} className='rounded-xl border bg-white p-4 text-left hover:shadow'>
          <div className='font-semibold text-slate-800'>{l.title}</div>
          <div className='text-slate-500 text-sm italic'>{l.grammarTopic}</div>
        </button>
      ))}
    </div>
  </Card>)
}

const sectionKeyMap={grammar:'Grammar',vocabulary:'Vocabulary',phonics:'Phonics',cross:'Cross-curricular',listening:'Listening',reading:'Reading the text',dictation:'Dictation',writing:'Writing',speaking:'Speaking'}
const tabs=Object.keys(sectionKeyMap)

function LessonView({mods}){
  const {m,l}=useParams(); const mi=Math.max(0,Math.min(mods.length-1,(parseInt(m||'1')-1))); const li=Math.max(0,Math.min(mods[mi].lessons.length-1,(parseInt(l||'1')-1)))
  const [tab,setTab]=useState('reading'); const [ans,setAns]=useState({}); const [score,setScore]=useState({correct:0,total:0}); const nav=useNavigate()
  const mod=mods[mi]; const les=mod.lessons[li]; const items=les.sections[tab]||[]
  const onCheck=()=>{ let c=0,t=0; items.forEach((it,i)=>{const k=`${les.id}:${tab}:${i}`; if(it.type==='mcq'){t++; if(String(ans[k])===String(it.answer)) c++} if(it.type==='train-writing'||it.type==='train-speaking'){t++; const v=(ans[k]||'').trim(); if(v.split(/[.!?]/).filter(Boolean).length>=3) c++}}); setScore({correct:c,total:t}) }
  const nextEx=()=>{ const i=tabs.indexOf(tab); if(i<tabs.length-1){ setTab(tabs[i+1]); speakUK(['Great work!','Excellent! Let’s go on!','Keep it up!'][i%3]) } else nextLesson() }
  const prevEx=()=>{ const i=tabs.indexOf(tab); if(i>0) setTab(tabs[i-1]) }
  const nextLesson=()=>{ if(li<mod.lessons.length-1) nav(`/module/${mi+1}/lesson/${li+2}`); else if(mi<mods.length-1) nav(`/module/${mi+2}/lesson/1`); else nav('/certificate/final') }
  return (<Card>
    <div className='flex items-center justify-between gap-3'>
      <div>
        <div className='text-xl font-semibold text-[#0f2e63]'>{mod.title}</div>
        <p className='text-sm text-slate-700'>{les.title} — <span className='italic'>{les.grammarTopic}</span></p>
      </div>
      <div className='flex gap-2'>
        <Button onClick={()=>nav(`/module/${mi+1}`)} className='bg-white text-[#0f2e63] border'>← Lessons</Button>
        <Button onClick={nextLesson} className='bg-[#0f2e63] text-white'>Next Lesson →</Button>
      </div>
    </div>

    <div className='mt-4 flex flex-wrap gap-2'>
      {tabs.map(k=>(<Button key={k} onClick={()=>setTab(k)} className={`${tab===k?'bg-[#0f2e63] text-white':'bg-white text-[#0f2e63] border'}`}>{sectionKeyMap[k]}</Button>))}
    </div>

    <div className='mt-4 space-y-4'>
      {(items.length?items:[{type:'read',prompt:'No content yet',content:''}]).map((it,i)=>{
        const k=`${les.id}:${tab}:${i}`
        const set=v=>setAns(p=>({...p,[k]:v}))
        return (<div key={k} className='border rounded-xl p-4 bg-white/70'>
          <div className='flex items-center justify-between'>
            <div className='font-medium text-slate-800'>Task {i+1}: {it.prompt}</div>
            {it.content && <SpeakBtn text={it.content}/>}
          </div>
          {it.type==='read' && (<div className='mt-3 text-slate-800 whitespace-pre-wrap leading-relaxed'>{it.content}</div>)}
          {it.type==='text' && (<div className='mt-3 text-slate-800 whitespace-pre-wrap'>{it.content}</div>)}
          {it.type==='mcq' && (<div className='mt-3 grid grid-cols-2 gap-2'>
            {it.options.map((opt,idx)=>(<label key={idx} className='flex items-center gap-2 p-2 rounded-lg border cursor-pointer'>
              <input type='radio' name={k} value={idx} onChange={e=>set(e.target.value)}/><span>{opt}</span>
            </label>))}
          </div>)}
          {(it.type==='train-writing'||it.type==='train-speaking') && (
            <div className='mt-3'>
              <textarea className='w-full rounded-lg border p-2' rows={6} placeholder='Write or speak (describe here)...' onChange={e=>set(e.target.value)}/>
              <div className='text-xs text-slate-600 mt-2'>Советы: 3+ предложения для зачёта. Используй слова раздела.</div>
            </div>
          )}
        </div>)
      })}

      <div className='flex items-center gap-3 pt-2'>
        <Button onClick={prevEx} className='bg-white text-[#0f2e63] border'>◀ Назад</Button>
        <Button onClick={onCheck} className='bg-emerald-600 text-white'>✅ Проверить</Button>
        <Pill className='bg-emerald-500/20 ring-1 ring-emerald-400/40 text-emerald-900'>Score: {score.correct} / {score.total}</Pill>
        <Button onClick={nextEx} className='bg-[#0f2e63] text-white ml-auto'>Далее ▶</Button>
      </div>
    </div>
  </Card>)
}

function CertificatesPage(){
  const cur=JSON.parse(localStorage.getItem('ai_bayan_current')||'{}')
  const name=cur.name||'Student'; const score=Math.round(Math.random()*20)+80
  const level=score>=95?'Excellent Performance':score>=85?'Great Achievement':'Good Progress'
  return (<Card>
    <div className='text-xl font-semibold text-[#0f2e63] mb-2'>Certificates</div>
    <div className='space-y-3'>
      <Button onClick={()=>downloadCertificate({name,level,moduleTitle:'Module Certificate',score})} className='bg-[#0f2e63] text-white'>Download Module Certificate</Button>
      <Button onClick={()=>downloadCertificate({name,level:'AI Bayan Master',moduleTitle:'Final Certificate',score:100})} className='bg-amber-600 text-white'>Download Final Certificate</Button>
    </div>
  </Card>)
}

export default function App(){
  const [mods,setMods]=useState([])
  const [registered,setRegistered]=useState(!!localStorage.getItem('ai_bayan_current'))
  const [splashDone,setSplashDone]=useState(false)
  useEffect(()=>{ (async()=>{ const d=await (await fetch('/content.json')).json(); setMods(d.modules||[]) })() },[])
  if(!splashDone) return <Splash onDone={()=>setSplashDone(true)}/>
  if(!registered) return <Registration onDone={()=>setRegistered(true)}/>
  return (<PinGate>
    <div className='min-h-screen bg-[#f0c86a]'>
      <header className='max-w-6xl mx-auto px-4 py-6 flex items-center gap-4'>
        <GirlLogo/>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold tracking-tight text-[#0f2e63]'>AI Bayan 2025</h1>
          <p className='text-[#0f2e63]/80'>Welcome to learning</p>
        </div>
        <div className='ml-auto'>
          <Link to='/teacher' className='underline text-[#0f2e63]'>👩‍🏫 Teacher</Link>
        </div>
      </header>
      <main className='max-w-6xl mx-auto px-4 pb-20'>
        {mods.length===0?(<div>Loading…</div>):(<Routes>
          <Route path='/' element={<Home mods={mods}/>}/>
          <Route path='/module/:m' element={<ModulePage mods={mods}/>}/>
          <Route path='/module/:m/lesson/:l' element={<LessonView mods={mods}/>}/>
          <Route path='/certificate/final' element={<CertificatesPage/>}/>
          <Route path='/teacher' element={<TeacherPanel/>}/>
          <Route path='*' element={<Home mods={mods}/>}/>
        </Routes>)}
      </main>
      <AIBayanChat/>
    </div>
  </PinGate>)
}
