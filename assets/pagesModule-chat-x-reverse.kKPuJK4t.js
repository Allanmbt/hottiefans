import{at as t,I as e,c as i,b as o,d as s,w as a,i as r,o as n,e as l,j as c,k as m,l as p,F as h,m as g,O as u,E as f,v,ad as y,f as b}from"./index-DyB-GtSf.js";import{_ as d}from"./n-navbar.DgJOiXYI.js";import{o as x,d as S,r as V}from"./uni-app.es.CYr7Wecl.js";import{_ as j}from"./n-list-cell.CFZ1yxA_.js";import{_ as H}from"./n-list.qlhvrMMX.js";import{_ as P}from"./n-height.iPg7YRxT.js";import{i as _,_ as T,a as w,b as M,f as k,c as L,m as E,d as A,e as B}from"./data.BtYriC70.js";import"./n-icon.C34IfF9H.js";import"./n-popup.DWLeKhpE.js";import{c as I}from"./imgs.wUGTdslH.js";import{u as X}from"./useNav.y5ABEmWP.js";import{c as C,d as D}from"./system.Bdz65IDa.js";import{u as R}from"./element.B9OwrRfy.js";import"./n-badge.U9JWwHKe.js";import"./props.CkprGx8I.js";import"./usePager.Bx7XEHLh.js";import"./_plugin-vue_export-helper.BCo6x5W8.js";import"./n-button.C0Lbq8AA.js";import"./n-loading-indicator.BodNpqVl.js";const z={__name:"x-reverse",props:{type:{type:String,default:"1"}},setup(z){const{leftIcons:K,navLeftAction:N}=X(),O=t(),q=R(),F=[{icon:"add",text:"好友",iconType:"inverse",iconSize:"ss",textType:"inverse",textSize:"ss",textStyle:"margin-left:6rpx;",bgType:"error",style:"border-radius:60rpx;width:125rpx;height:25px;justify-content:center;"},{icon:"elipsis",style:"margin-left:36rpx;"}],Q=e({hasMorePage:!1,items:[],kbH:0,kbHeight:0,otherHeight:0,voiceVisible:!1,plusVisible:!1,emotionVisible:!1,moreVisible:!1,playingSrc:"",xh:0,platform:"",cp:1}),U=i((()=>Q.kbHeight||Q.otherHeight||0)),W=z;function G(t){}function J(t){Q.hasMorePage?(Q.items.unshift({id:2,avatar:I.avatar.caiman,type:"image",msg:t}),Q.items.unshift({id:1,avatar:I.avatar.girl_nice,type:"image",msg:t}),u((function(){q.list.nScrollToTop()}))):(Q.items.push({id:2,avatar:I.avatar.caiman,type:"image",msg:t}),Q.items.push({id:1,avatar:I.avatar.girl_nice,type:"image",msg:t}),u((function(){q.list.nScrollToBottom()})))}function Y(){Q.voiceVisible=!Q.voiceVisible,Q.plusVisible=!1,Q.emotionVisible=!1,Q.voiceVisible?Q.otherHeight=f(276)-Q.xh:Q.otherHeight=0}function Z(){Q.voiceVisible=!1,Q.otherHeight=0}function $(){Q.voiceVisible=!1,Q.otherHeight=0}function tt(t){console.log(t),Q.voiceVisible=!1,Q.otherHeight=0,Q.hasMorePage?(Q.items.unshift({id:2,avatar:I.avatar.caiman,type:"voice",msg:t}),Q.items.unshift({id:1,avatar:I.avatar.girl_nice,type:"voice",msg:t}),u((function(){q.list.nScrollToTop()}))):(Q.items.push({id:2,avatar:I.avatar.caiman,type:"voice",msg:t}),Q.items.push({id:1,avatar:I.avatar.girl_nice,type:"voice",msg:t}),u((function(){q.list.nScrollToBottom()})))}function et(t){t==Q.playingSrc?O.stop():(O.stop(),O.src=t,O.play())}function it(){Q.plusVisible=!Q.plusVisible,Q.plusVisible?Q.otherHeight=(Q.kbH||120)-Q.xh:Q.otherHeight=0,Q.emotionVisible=!1,Q.voiceVisible=!1}function ot(){v({url:"/pages/chat/collected"})}function st(){Q.emotionVisible=!Q.emotionVisible,Q.emotionVisible?Q.otherHeight=160-Q.xh:Q.otherHeight=0,Q.plusVisible=!1,Q.voiceVisible=!1}function at(t){y("chatEmj",t)}function rt(){y("chatDelEmj")}function nt(t){console.log(t),Q.hasMorePage?(Q.items.unshift({id:2,avatar:I.avatar.caiman,type:"text",msg:t}),Q.items.unshift({id:1,avatar:I.avatar.girl_nice,type:"text",msg:t}),u((function(){q.list.nScrollToTop()}))):(Q.items.push({id:2,avatar:I.avatar.caiman,type:"text",msg:t}),Q.items.push({id:1,avatar:I.avatar.girl_nice,type:"text",msg:t}),u((function(){q.list.nScrollToBottom()}))),q.inputtoolbar.clear()}function lt(t){Q.kbHeight=t.height,t.height>0&&(Q.kbH=t.height,Q.otherHeight=0,Q.voiceVisible=!1,Q.emotionVisible=!1,Q.plusVisible=!1)}function ct(){Q.hasMorePage?Q.items=k.reverse():(Q.items=L,function(t){const e=q.list;let i=e.nScrollToBottom;t&&(i=e.nScrollToTop);u((()=>{i()}))}(!1))}function mt(){Q.hasMorePage&&setTimeout((()=>{Q.items=Q.items.concat(L.reverse());q.list.nEndSuccess(!1)}),2e3)}function pt(){Q.moreVisible=!0}return x((()=>{Q.platform=C(),Q.hasMorePage="2"==W.type,Q.xh=D(),O.onEnded((()=>{Q.playingSrc=""})),O.onPause((()=>{Q.playingSrc=""})),O.onStop((()=>{Q.playingSrc=""})),O.onPlay((()=>{Q.playingSrc=O.src})),O.onError((()=>{Q.playingSrc=""}))})),S((()=>{O.offEnded(),O.offPause(),O.offStop(),O.offPlay(),O.offError()})),(t,e)=>{const i=V(o("n-navbar"),d),u=r,f=V(o("n-list-cell"),j),v=V(o("n-list"),H),y=V(o("n-height"),P);return n(),s(u,null,{default:a((()=>[l(i,{lefts:c(K),title:"本人张翠花",rights:F,leftStyle:"width:90rpx;",centerStyle:"width:300rpx;justify-content:flex-start !important;",rightStyle:"width:360rpx;",onRightAction:G,onLeftAction:c(N)},null,8,["lefts","onLeftAction"]),l(v,{ref:t=>c(q).set(t,"list"),reverse:Q.hasMorePage?"transform: rotateX(180deg);":"",showScrollbar:!1,down:null,up:{use:Q.hasMorePage},useLoading:!0,height:"window-!status-!nav-!x",onInited:ct,onUp:mt},{default:a((()=>[l(f,null,{default:a((()=>[l(u,{style:{height:"26rpx"}})])),_:1}),(n(!0),m(h,null,p(Q.items,((e,i)=>(n(),s(f,{key:i},{default:a((()=>["text"==e.type?(n(),s(E,{key:0,boxStyle:Q.hasMorePage?"transform: rotateX(180deg);":"",isLeft:1===e.id,avatar:e.avatar,msg:e.msg,onMore:pt},null,8,["boxStyle","isLeft","avatar","msg"])):b("",!0),"image"==e.type?(n(),s(A,{key:1,boxStyle:Q.hasMorePage?"transform: rotateX(180deg);":"",isLeft:1===e.id,avatar:e.avatar,src:e.msg},null,8,["boxStyle","isLeft","avatar","src"])):b("",!0),"voice"==e.type?(n(),s(B,{key:2,boxStyle:Q.hasMorePage?"transform: rotateX(180deg);":"",isLeft:1===e.id,avatar:e.avatar,src:e.msg,current:t.playingSrc,onPlay:et},null,8,["boxStyle","isLeft","avatar","src","current"])):b("",!0),l(u,{style:{height:"76rpx"}})])),_:2},1024)))),128))])),_:1},8,["reverse","up"]),l(_,{ref:t=>c(q).set(t,"inputtoolbar"),onKb:lt,onImage:J,onPlus:it,onEmotion:st,onRecord:Y,onConfirm:nt},null,512),l(u,{style:g({height:U.value+"px"})},null,8,["style"]),l(y,{height:"x",bgType:"inverse"}),l(T,{show:Q.voiceVisible,onShort:$,onVoice:tt,onCancel:Z},null,8,["show"]),l(w,{show:Q.plusVisible,height:Q.kbH,onCollect:ot},null,8,["show","height"]),l(M,{show:Q.emotionVisible,onSelect:at,onDelete:rt},null,8,["show"])])),_:1})}}};export{z as default};
