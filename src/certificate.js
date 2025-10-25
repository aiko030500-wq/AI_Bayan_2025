export function downloadCertificate({name, level, moduleTitle, score, teacher='Created with AI Bayan 2025 — Kazakhstan Edition • Verified (Code 2361)'}={}){
  const canvas=document.createElement('canvas'); canvas.width=1240; canvas.height=1754; const ctx=canvas.getContext('2d')
  const grd=ctx.createLinearGradient(0,0,0,canvas.height); grd.addColorStop(0,'#f7d77a'); grd.addColorStop(1,'#e6b34d'); ctx.fillStyle=grd; ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.strokeStyle='#0f2e63'; ctx.lineWidth=18; ctx.strokeRect(40,40,canvas.width-80,canvas.height-80)
  ctx.fillStyle='#0f2e63'; ctx.textAlign='center'
  ctx.font='bold 72px system-ui, sans-serif'; ctx.fillText('Certificate of Achievement', canvas.width/2, 220)
  ctx.font='36px system-ui, sans-serif'; ctx.fillText(`Awarded to: ${name||'Student'}`, canvas.width/2, 360)
  ctx.fillText(level||'Excellent Performance', canvas.width/2, 420)
  ctx.fillText(moduleTitle||'Module', canvas.width/2, 480)
  ctx.fillText(`Score: ${score||'—'}%`, canvas.width/2, 540)
  ctx.font='28px system-ui, sans-serif'; ctx.fillText('AI Bayan — Your English Friend 2025', canvas.width/2, 1020)
  ctx.font='22px system-ui, sans-serif'; const d=new Date().toLocaleDateString(); ctx.fillText(`Date: ${d}   |   ${teacher}`, canvas.width/2, 1080)
  const link=document.createElement('a'); link.download=`Certificate_${(name||'Student').replace(/\s+/g,'_')}.png`; link.href=canvas.toDataURL('image/png'); link.click()
}