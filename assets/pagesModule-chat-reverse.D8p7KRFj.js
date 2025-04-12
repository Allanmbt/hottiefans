import{at as t,I as e,c as i,b as o,d as s,w as a,i as n,o as r,e as l,j as c,k as m,l as p,F as h,m as g,O as u,E as f,v,ad as y,f as b}from"./index-DyB-GtSf.js";import{_ as d}from"./n-navbar.DgJOiXYI.js";import{o as x,d as S,r as V}from"./uni-app.es.CYr7Wecl.js";import{_ as j}from"./n-list-cell.CFZ1yxA_.js";import{_ as H}from"./n-list.qlhvrMMX.js";import{_ as P}from"./n-height.iPg7YRxT.js";import{i as _,_ as T,a as w,b as M,f as k,c as L,m as E,d as A,e as B}from"./data.BtYriC70.js";import"./n-icon.C34IfF9H.js";import"./n-popup.DWLeKhpE.js";import{c as I}from"./imgs.wUGTdslH.js";import{u as C}from"./useNav.y5ABEmWP.js";import{c as D,d as R}from"./system.Bdz65IDa.js";import{u as z}from"./element.B9OwrRfy.js";import"./n-badge.U9JWwHKe.js";import"./props.CkprGx8I.js";import"./usePager.Bx7XEHLh.js";import"./_plugin-vue_export-helper.BCo6x5W8.js";import"./n-button.C0Lbq8AA.js";import"./n-loading-indicator.BodNpqVl.js";const K={__name:"reverse",props:{type:{type:String,default:"1"}},setup(K){const{leftIcons:N,navLeftAction:O}=C(),q=t(),F=z(),Q=[{icon:"add",text:"好友",iconType:"inverse",iconSize:"ss",textType:"inverse",textSize:"ss",textStyle:"margin-left:6rpx;",bgType:"error",style:"border-radius:60rpx;width:125rpx;height:25px;justify-content:center;"},{icon:"elipsis",style:"margin-left:36rpx;"}],U=e({hasMorePage:!1,items:[],kbH:0,kbHeight:0,otherHeight:0,voiceVisible:!1,plusVisible:!1,emotionVisible:!1,moreVisible:!1,playingSrc:"",xh:0,platform:"",cp:1}),W=i((()=>U.kbHeight||U.otherHeight||0)),G=K;function J(t){}function X(t){U.hasMorePage?(U.items.unshift({id:2,avatar:I.avatar.caiman,type:"image",msg:t}),U.items.unshift({id:1,avatar:I.avatar.girl_nice,type:"image",msg:t}),u((function(){F.list.nScrollToTop()}))):(U.items.push({id:2,avatar:I.avatar.caiman,type:"image",msg:t}),U.items.push({id:1,avatar:I.avatar.girl_nice,type:"image",msg:t}),u((function(){F.list.nScrollToBottom()})))}function Y(){U.voiceVisible=!U.voiceVisible,U.plusVisible=!1,U.emotionVisible=!1,U.voiceVisible?U.otherHeight=f(276)-U.xh:U.otherHeight=0}function Z(){U.voiceVisible=!1,U.otherHeight=0}function $(){U.voiceVisible=!1,U.otherHeight=0}function tt(t){console.log(t),U.voiceVisible=!1,U.otherHeight=0,U.hasMorePage?(U.items.unshift({id:2,avatar:I.avatar.caiman,type:"voice",msg:t}),U.items.unshift({id:1,avatar:I.avatar.girl_nice,type:"voice",msg:t}),u((function(){F.list.nScrollToTop()}))):(U.items.push({id:2,avatar:I.avatar.caiman,type:"voice",msg:t}),U.items.push({id:1,avatar:I.avatar.girl_nice,type:"voice",msg:t}),u((function(){F.list.nScrollToBottom()})))}function et(t){t==U.playingSrc?q.stop():(q.stop(),q.src=t,q.play())}function it(){U.plusVisible=!U.plusVisible,U.plusVisible?U.otherHeight=(U.kbH||120)-U.xh:U.otherHeight=0,U.emotionVisible=!1,U.voiceVisible=!1}function ot(){v({url:"/pages/chat/collected"})}function st(){U.emotionVisible=!U.emotionVisible,U.emotionVisible?U.otherHeight=160-U.xh:U.otherHeight=0,U.plusVisible=!1,U.voiceVisible=!1}function at(t){y("chatEmj",t)}function nt(){y("chatDelEmj")}function rt(t){console.log(t),U.hasMorePage?(U.items.unshift({id:2,avatar:I.avatar.caiman,type:"text",msg:t}),U.items.unshift({id:1,avatar:I.avatar.girl_nice,type:"text",msg:t}),u((function(){F.list.nScrollToTop()}))):(U.items.push({id:2,avatar:I.avatar.caiman,type:"text",msg:t}),U.items.push({id:1,avatar:I.avatar.girl_nice,type:"text",msg:t}),u((function(){F.list.nScrollToBottom()}))),F.inputtoolbar.clear()}function lt(t){U.kbHeight=t.height,t.height>0&&(U.kbH=t.height,U.otherHeight=0,U.voiceVisible=!1,U.emotionVisible=!1,U.plusVisible=!1)}function ct(){U.hasMorePage?U.items=k.reverse():(U.items=L,function(t){const e=F.list;let i=e.nScrollToBottom;t&&(i=e.nScrollToTop);u((()=>{i()}))}(!1))}function mt(){U.hasMorePage&&setTimeout((()=>{U.items=U.items.concat(L.reverse());F.list.nEndSuccess(!1)}),2e3)}function pt(){U.moreVisible=!0}return x((()=>{U.platform=D(),U.hasMorePage="2"==G.type,U.xh=R(),q.onEnded((()=>{U.playingSrc=""})),q.onPause((()=>{U.playingSrc=""})),q.onStop((()=>{U.playingSrc=""})),q.onPlay((()=>{U.playingSrc=q.src})),q.onError((()=>{U.playingSrc=""}))})),S((()=>{q.offEnded(),q.offPause(),q.offStop(),q.offPlay(),q.offError()})),(t,e)=>{const i=V(o("n-navbar"),d),u=n,f=V(o("n-list-cell"),j),v=V(o("n-list"),H),y=V(o("n-height"),P);return r(),s(u,null,{default:a((()=>[l(i,{lefts:c(N),title:"本人张翠花",rights:Q,leftStyle:"width:90rpx;",centerStyle:"width:300rpx;justify-content:flex-start !important;",rightStyle:"width:360rpx;",onRightAction:J,onLeftAction:c(O)},null,8,["lefts","onLeftAction"]),l(v,{ref:t=>c(F).set(t,"list"),reverse:U.hasMorePage?"transform: rotate(180deg);":"",down:null,up:{use:U.hasMorePage},useLoading:!0,height:"window-!status-!nav-!x",onInited:ct,onUp:mt},{default:a((()=>[l(f,null,{default:a((()=>[l(u,{style:{height:"26rpx"}})])),_:1}),(r(!0),m(h,null,p(U.items,((e,i)=>(r(),s(f,{key:i},{default:a((()=>["text"==e.type?(r(),s(E,{key:0,boxStyle:U.hasMorePage?"transform: rotate(180deg);":"",isLeft:1===e.id,avatar:e.avatar,msg:e.msg,onMore:pt},null,8,["boxStyle","isLeft","avatar","msg"])):b("",!0),"image"==e.type?(r(),s(A,{key:1,boxStyle:U.hasMorePage?"transform: rotate(180deg);":"",isLeft:1===e.id,avatar:e.avatar,src:e.msg},null,8,["boxStyle","isLeft","avatar","src"])):b("",!0),"voice"==e.type?(r(),s(B,{key:2,boxStyle:U.hasMorePage?"transform: rotate(180deg);":"",isLeft:1===e.id,avatar:e.avatar,src:e.msg,current:t.playingSrc,onPlay:et},null,8,["boxStyle","isLeft","avatar","src","current"])):b("",!0),l(u,{style:{height:"76rpx"}})])),_:2},1024)))),128))])),_:1},8,["reverse","up"]),l(_,{ref:t=>c(F).set(t,"inputtoolbar"),onKb:lt,onImage:X,onPlus:it,onEmotion:st,onRecord:Y,onConfirm:rt},null,512),l(u,{style:g({height:W.value+"px"})},null,8,["style"]),l(y,{height:"x",bgType:"inverse"}),l(T,{show:U.voiceVisible,onShort:$,onVoice:tt,onCancel:Z},null,8,["show"]),l(w,{show:U.plusVisible,height:U.kbH,onCollect:ot},null,8,["show","height"]),l(M,{show:U.emotionVisible,onSelect:at,onDelete:nt},null,8,["show"])])),_:1})}}};export{K as default};
