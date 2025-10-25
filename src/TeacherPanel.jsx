import React,{useState} from 'react'
import { Card, Button } from './ui.js'
const TEACHER_CODE='2361'
function readDB(){ try{ return JSON.parse(localStorage.getItem('ai_bayan_students')||'[]') }catch{return []} }
function writeDB(rows){ localStorage.setItem('ai_bayan_students', JSON.stringify(rows)) }
export default function TeacherPanel(){
  const [ok,setOk]=useState(false); const [code,setCode]=useState('')
  const [rows,setRows]=useState(readDB())
  const approve=(id)=>{ const r=rows.map(x=>x.id===id?{...x,status:'confirmed'}:x); setRows(r); writeDB(r) }
  if(!ok) return (<Card><div className='text-xl font-semibold mb-2'>Teacher Login</div><input value={code} onChange={e=>setCode(e.target.value)} className='border rounded-xl px-3 py-2' placeholder='Enter teacher code' /><Button className='ml-2 bg-[#0f2e63] text-white' onClick={()=>{ if(code===TEACHER_CODE) setOk(true) else alert('Wrong code') }}>Unlock</Button></Card>)
  return (<Card>
    <div className='text-xl font-semibold mb-2'>Teacher Panel</div>
    <div className='text-sm text-slate-600 mb-3'>Approve students to enable scores and certificates.</div>
    <div className='overflow-auto'>
      <table className='w-full text-sm'><thead><tr className='text-left'><th className='p-2'>Name</th><th className='p-2'>Class</th><th className='p-2'>Status</th><th className='p-2'>Score</th><th className='p-2'>Action</th></tr></thead>
      <tbody>{rows.map(r=>(<tr key={r.id} className='odd:bg-white even:bg-white/70'><td className='p-2'>{r.name}</td><td className='p-2'>{r.cls}</td><td className='p-2'>{r.status}</td><td className='p-2'>{r.score||0}%</td><td className='p-2'>{r.status!=='confirmed'?<Button onClick={()=>approve(r.id)} className='bg-emerald-600 text-white'>Approve</Button>:'—'}</td></tr>))}</tbody></table>
    </div>
  </Card>)
}
