import{c as t,o as s,d as e,w as o,N as a,n as p,m as n,i as l}from"./index-DyB-GtSf.js";import{g as i}from"./system.Bdz65IDa.js";const f={__name:"n-position",props:{fixed:{type:Boolean,default:!1},pos:{type:String,default:"bottom"},offset:{type:String,default:"0px"},bgType:{type:String,default:""},boxStyle:{type:String,default:""},boxClass:{type:String,default:""}},setup(f){const r=f,u=t((()=>i(r.offset))),d=t((()=>("top"===r.pos?`top:${u.value}px;`:`bottom:${u.value}px;`)+r.boxStyle));return(t,i)=>{const r=l;return s(),e(r,{class:p([f.fixed?"n-position-fixed":"n-position-absolute","n-bg-"+f.bgType,"n-zindex-position",f.boxClass]),style:n(d.value)},{default:o((()=>[a(t.$slots,"default")])),_:3},8,["class","style"])}}};export{f as _};
