import{at as e,I as t,c as i,b as s,d as o,w as a,i as n,o as r,e as l,j as c,k as p,l as h,F as m,m as u,E as g,v as f,ad as b,O as v,f as y}from"./index-DyB-GtSf.js";import{_ as d}from"./n-navbar.DgJOiXYI.js";import{o as x,d as V,r as j}from"./uni-app.es.CYr7Wecl.js";import{_ as S}from"./n-list-cell.CFZ1yxA_.js";import{_ as H}from"./n-list.qlhvrMMX.js";import{_ as w}from"./n-height.iPg7YRxT.js";import{i as _,_ as P,a as k,b as L,c as E,m as M,d as T,e as A}from"./data.BtYriC70.js";import"./n-icon.C34IfF9H.js";import"./n-popup.DWLeKhpE.js";import{c as D}from"./imgs.wUGTdslH.js";import{u as I}from"./useNav.y5ABEmWP.js";import{c as C,d as R}from"./system.Bdz65IDa.js";import{u as z}from"./element.B9OwrRfy.js";import"./n-badge.U9JWwHKe.js";import"./props.CkprGx8I.js";import"./usePager.Bx7XEHLh.js";import"./_plugin-vue_export-helper.BCo6x5W8.js";import"./n-button.C0Lbq8AA.js";import"./n-loading-indicator.BodNpqVl.js";const K={__name:"normal-more",props:{type:{type:String,default:"1"}},setup(K){const{leftIcons:N,navLeftAction:O}=I(),q=z(),B=e(),F=[{icon:"add",text:"好友",iconType:"inverse",iconSize:"ss",textType:"inverse",textSize:"ss",textStyle:"margin-left:6rpx;",bgType:"error",style:"border-radius:60rpx;width:125rpx;height:25px;justify-content:center;"},{icon:"elipsis",style:"margin-left:36rpx;"}],Q=t({hasMorePage:!1,items:[],kbH:0,kbHeight:0,otherHeight:0,voiceVisible:!1,plusVisible:!1,emotionVisible:!1,moreVisible:!1,playingSrc:"",xh:0,platform:"",cp:1}),W=i((()=>Q.kbHeight||Q.otherHeight||0)),G=K;function J(e){}function U(e){Q.items.push({id:2,avatar:D.avatar.caiman,type:"image",msg:e}),Q.items.push({id:1,avatar:D.avatar.girl_nice,type:"image",msg:e}),he()}function X(){Q.voiceVisible=!Q.voiceVisible,Q.plusVisible=!1,Q.emotionVisible=!1,Q.voiceVisible?Q.otherHeight=g(276)-Q.xh:Q.otherHeight=0}function Y(){Q.voiceVisible=!1,Q.otherHeight=0}function Z(){Q.voiceVisible=!1,Q.otherHeight=0}function $(e){console.log(e),Q.voiceVisible=!1,Q.otherHeight=0,Q.items.push({id:2,avatar:D.avatar.caiman,type:"voice",msg:e}),Q.items.push({id:1,avatar:D.avatar.girl_nice,type:"voice",msg:e}),he()}function ee(e){e==Q.playingSrc?B.stop():(B.stop(),B.src=e,B.play())}function te(){Q.plusVisible=!Q.plusVisible,Q.plusVisible?Q.otherHeight=(Q.kbH||120)-Q.xh:Q.otherHeight=0,Q.emotionVisible=!1,Q.voiceVisible=!1}function ie(){f({url:"/pages/chat/collected"})}function se(){Q.emotionVisible=!Q.emotionVisible,Q.emotionVisible?Q.otherHeight=160-Q.xh:Q.otherHeight=0,Q.plusVisible=!1,Q.voiceVisible=!1}function oe(e){b("chatEmj",e)}function ae(){b("chatDelEmj")}function ne(e){console.log(e),Q.items.push({id:2,avatar:D.avatar.caiman,type:"text",msg:e}),Q.items.push({id:1,avatar:D.avatar.girl_nice,type:"text",msg:e}),he(),q.inputtoolbar.clear()}function re(e){Q.kbHeight=e.height,e.height>0&&(Q.kbH=e.height,Q.otherHeight=0,Q.voiceVisible=!1,Q.emotionVisible=!1,Q.plusVisible=!1)}function le(){setTimeout((()=>{Q.items=E,Q.hasMorePage=!0,he()}),2e3)}function ce(){Q.hasMorePage&&setTimeout((()=>{Q.items=E.concat(Q.items);const e=q.list;Q.cp+=1,5==Q.cp?Q.hasMorePage=!1:Q.hasMorePage=!0,e.nEndSuccess(!1)}),2e3)}function pe(){Q.moreVisible=!0}function he(){let e=q.list.nScrollToBottom;v((()=>{e()}))}return x((()=>{Q.platform=C(),Q.hasMorePage="2"==G.type,Q.xh=R(),B.onEnded((()=>{Q.playingSrc=""})),B.onPause((()=>{Q.playingSrc=""})),B.onStop((()=>{Q.playingSrc=""})),B.onPlay((()=>{Q.playingSrc=B.src})),B.onError((()=>{Q.playingSrc=""}))})),V((()=>{B.offEnded(),B.offPause(),B.offStop(),B.offPlay(),B.offError()})),(e,t)=>{const i=j(s("n-navbar"),d),g=n,f=j(s("n-list-cell"),S),b=j(s("n-list"),H),v=j(s("n-height"),w);return r(),o(g,null,{default:a((()=>[l(i,{lefts:c(N),title:"本人张翠花",rights:F,leftStyle:"width:90rpx;",centerStyle:"width:300rpx;justify-content:flex-start !important;",rightStyle:"width:360rpx;",onRightAction:J,onLeftAction:c(O)},null,8,["lefts","onLeftAction"]),l(b,{ref:e=>c(q).set(e,"list"),showScrollbar:!1,down:{use:Q.hasMorePage},up:null,useLoading:!0,height:"window-!status-!nav-!x",onInited:le,onDown:ce},{default:a((()=>[l(f,null,{default:a((()=>[l(g,{style:{height:"26rpx"}})])),_:1}),(r(!0),p(m,null,h(Q.items,((e,t)=>(r(),o(f,{key:t},{default:a((()=>["text"==e.type?(r(),o(M,{key:0,isLeft:1===e.id,avatar:e.avatar,msg:e.msg,onMore:pe},null,8,["isLeft","avatar","msg"])):y("",!0),"image"==e.type?(r(),o(T,{key:1,isLeft:1===e.id,avatar:e.avatar,src:e.msg},null,8,["isLeft","avatar","src"])):y("",!0),"voice"==e.type?(r(),o(A,{key:2,isLeft:1===e.id,avatar:e.avatar,src:e.msg,current:Q.playingSrc,onPlay:ee},null,8,["isLeft","avatar","src","current"])):y("",!0),l(g,{style:{height:"76rpx"}})])),_:2},1024)))),128))])),_:1},8,["down"]),l(_,{ref:e=>c(q).set(e,"inputtoolbar"),onKb:re,onImage:U,onPlus:te,onEmotion:se,onRecord:X,onConfirm:ne},null,512),l(g,{style:u({height:W.value+"px"})},null,8,["style"]),l(v,{height:"x",bgType:"inverse"}),l(P,{show:Q.voiceVisible,onShort:Z,onVoice:$,onCancel:Y},null,8,["show"]),l(k,{show:Q.plusVisible,height:Q.kbH,onCollect:ie},null,8,["show","height"]),l(L,{show:Q.emotionVisible,onSelect:oe,onDelete:ae},null,8,["show"])])),_:1})}}};export{K as default};
