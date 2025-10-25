import React,{useState} from 'react'
import { Button, speakUK } from './ui.js'
export default function AIBayanChat(){
  const [open,setOpen]=useState(false)
  const [msgs,setMsgs]=useState([{role:'ai',text:'Hello! How can I help you?'}])
  const [inp,setInp]=useState('')
  const reply=(q)=>{
    const t=q.toLowerCase()
    if(t.includes('can')) return 'We use “can” for ability. Example: I can swim.'
    if(t.includes('there is')) return 'There is / There are → There is a desk. There are two books.'
    if(t.includes('must')) return 'Must / mustn’t → You must do homework. You mustn’t run in class.'
    if(t.includes('present simple')) return 'Present Simple: I/You/We/They play. He/She/It plays.'
    return 'Great question! Keep going — you can do it!'
  }
  const send=()=>{ const t=inp.trim(); if(!t) return; setMsgs(m=>[...m,{role:'you',text:t}]); setInp(''); const a=reply(t); setTimeout(()=>{ setMsgs(m=>[...m,{role:'ai',text:a}]); speakUK(a)},200) }
  return (<div className='fixed right-4 bottom-4 z-50'>
    {open?(
      <div className='w-[320px] rounded-2xl shadow-xl bg-white text-slate-800'>
        <div className='px-4 py-3 border-b flex items-center justify-between'>
          <div className='font-semibold'>AI Bayan — Online Assistant</div>
          <button onClick={()=>setOpen(false)} className='text-slate-500'>✕</button>
        </div>
        <div className='p-3 h-64 overflow-auto space-y-2'>
          {msgs.map((m,i)=>(<div key={i} className={m.role==='ai'?'text-slate-800':'text-indigo-700 text-right'}>
            <div className={'inline-block px-3 py-2 rounded-xl '+(m.role==='ai'?'bg-slate-100':'bg-indigo-50')}>{m.text}</div>
          </div>))}
        </div>
        <div className='p-3 border-t flex gap-2'>
          <input value={inp} onChange={e=>setInp(e.target.value)} className='flex-1 border rounded-xl px-3 py-2' placeholder='Type your question...'/>
          <Button onClick={send} className='bg-[#0f2e63] text-white'>Send</Button>
        </div>
      </div>
    ):(<button onClick={()=>{setOpen(true); speakUK('Hello! How can I help you?')}} className='rounded-full shadow-xl bg-[#0f2e63] text-white px-4 py-3'>💬 Ask AI Bayan</button>)}
  </div>)}
