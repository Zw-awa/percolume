import './style.css';

const KEY='pixel-flow-state';
const today=new Date();
const fmt=(d)=>d.toISOString().slice(0,10);
const seed=()=>({goal:'读完《置身事内》',size:10,unit:'今天努力了 1 小时',days:{},filled:[],streak:0,created:fmt(today)});
let state=JSON.parse(localStorage.getItem(KEY)||'null')||seed();
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const app=document.querySelector('#app');
function daysGrid(){
 let html=''; const start=new Date(today); start.setDate(start.getDate()-83);
 for(let i=0;i<84;i++){const d=new Date(start);d.setDate(start.getDate()+i);const key=fmt(d);const v=state.days[key]||0;html+=`<span class="day l${Math.min(v,4)}" title="${key} · ${v? v+' 次记录':'未记录'}"></span>`}
 return html;
}
function flowGrid(){const n=state.size,total=n*n;return Array.from({length:total},(_,i)=>`<button class="flow-cell ${state.filled.includes(i)?'on':''}" data-i="${i}" aria-label="第${i+1}格"></button>`).join('')}
function render(){
 const total=state.size*state.size, done=state.filled.length, pct=Math.round(done/total*100);
 app.innerHTML=`<div class="shell"><header><div class="brand"><span class="mark">✦</span><span>PERCOLUME · 渗行</span></div><div class="date">${today.toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'})}</div></header>
 <main><section class="intro"><p class="kicker">A SMALL PRACTICE FOR BIG THINGS</p><h1>把每一次微小的前进，<em>变成看得见的光。</em></h1><p class="sub">今天也为自己点亮一格。持续渗流，直到目标被彻底打通。</p></section>
 <section class="card log-card"><div class="card-head"><div><span class="label">01 / DAILY RHYTHM</span><h2>每日记录</h2></div><div class="streak"><b>${state.streak}</b><span>天连续</span></div></div><div class="contrib"><div class="months"><span>六月</span><span>七月</span><span>八月</span><span>九月</span></div><div class="week"><span>一</span><span>三</span><span>五</span><span>日</span></div><div class="days">${daysGrid()}</div></div><div class="log-actions"><span>浅色代表轻轻经过，亮色代表全力以赴。</span><button id="log" class="primary">+ 记录今天</button></div></section>
 <section class="card goal-card"><div class="card-head"><div><span class="label">02 / THE FLOW</span><h2>${state.goal}</h2></div><button id="edit" class="icon-btn">编辑目标　↗</button></div><div class="flow-wrap"><div class="flow-grid" style="--n:${state.size}">${flowGrid()}</div><div class="flow-side"><div class="percent">${pct}<small>%</small></div><p>已渗入 ${done} / ${total} 格</p><div class="bar"><i style="width:${pct}%"></i></div><p class="hint">每一次努力，水流都会找到新的路径。<br/>直到从上到下，彻底打通。</p><button id="wash" class="secondary">重新洗牌 <span>↻</span></button></div></div></section>
 <footer><span>LOCAL · PRIVATE · YOURS</span><span>所有数据只保存在你的设备上</span></footer></main></div>`;
 document.querySelector('#log').onclick=()=>{const k=fmt(today);state.days[k]=(state.days[k]||0)+1;state.streak=Math.max(state.streak, Object.keys(state.days).length); addCell();save();render()};
 document.querySelector('#wash').onclick=()=>{state.filled=[];save();render()};
 document.querySelector('#edit').onclick=()=>{const goal=prompt('你的目标',state.goal);if(goal?.trim()){const size=Number(prompt('网格大小（4–14）',state.size));state.goal=goal.trim();if(size>=4&&size<=14&&Number.isInteger(size)){state.size=size;state.filled=[]}save();render()}};
 document.querySelectorAll('.flow-cell').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.i);if(!state.filled.includes(i)){state.filled.push(i);save();render()}});
}
function addCell(){const total=state.size*state.size;const available=[...Array(total).keys()].filter(i=>!state.filled.includes(i));if(available.length)state.filled.push(available[Math.floor(Math.random()*available.length)])}
render();
