import{o as t,d as e,w as n,e as s,j as o,p as r,i as a,aD as i,r as l,E as c,b as p,m as u,k as h,l as d,F as x,aB as m,aE as f,G as g}from"./index-DyB-GtSf.js";import{_ as y}from"./n-navbar.DgJOiXYI.js";import{o as w,r as v}from"./uni-app.es.CYr7Wecl.js";import{_ as b}from"./n-button.C0Lbq8AA.js";import{c as j}from"./imgs.wUGTdslH.js";import{u as _}from"./useNav.y5ABEmWP.js";import{e as T,i as F,a as L}from"./system.Bdz65IDa.js";import"./n-icon.C34IfF9H.js";import"./props.CkprGx8I.js";import"./_plugin-vue_export-helper.BCo6x5W8.js";import"./n-badge.U9JWwHKe.js";import"./n-loading-indicator.BodNpqVl.js";const k={__name:"followDraft",props:{item:{type:String,default:""}},setup:i=>(l,c)=>{const p=r,u=a;return t(),e(u,{class:"n-position-relative",style:{width:"100rpx",height:"100rpx","margin-right":"18rpx","margin-bottom":"18rpx"}},{default:n((()=>[s(p,{src:o(j).bg.exam,mode:"aspectFill",style:{width:"100rpx",height:"100rpx"}},null,8,["src"]),s(p,{src:i.item,class:"n-position-absolute",mode:"aspectFill",style:{left:"4rpx",top:"4rpx",width:"92rpx",height:"92rpx"}},null,8,["src"])])),_:1})}};const C={__name:"draw",setup(C){const{leftIcons:S,navLeftAction:W}=_(),A=l(500),E=l(0),B=l([]),{clearWriteCtx:D,touchStart:M,touchMove:P,touchEnd:I}=function(){let t=null,e=0,n=0;return w((()=>{t=i("ctx-write"),t.setLineWidth(4),t.setLineCap("round")})),{touchStart:function(s){let o=s.changedTouches[0];e=o.x,n=o.y,t.beginPath(),t.moveTo(o.x,o.y),t.setLineWidth(4)},touchMove:function(s){let o=s.changedTouches[0],r=o.x,a=o.y;r==e&&a==n||(t.moveTo(e,n),e=r,n=a,t.lineTo(r,a),t.stroke(),t.draw(!0))},touchEnd:function(t){e=0,n=0},clearWriteCtx:function(){t.clearRect(0,0,2e3,2e3),t.setLineWidth(4),t.setLineCap("round"),t.draw(!1)}}}();function R(){D()}function q(){m({x:0,y:0,width:c(500),height:c(500),destWidth:120,destHeight:120,canvasId:"ctx-write",success:function(t){B.value.push(t.tempFilePath),D()},fail:t=>{}})}return w((()=>{A.value=T(),E.value=A.value-F()-L()-c(800)})),(i,l)=>{const c=v(p("n-navbar"),y),m=a,w=r,_=f,T=g,F=v(p("n-button"),b);return t(),e(m,{style:u({height:A.value+"px"})},{default:n((()=>[s(c,{lefts:o(S),title:"跟写或签名",onLeftAction:o(W)},null,8,["lefts","onLeftAction"]),s(m,{style:{height:"60rpx"}}),s(m,{class:"n-flex-row n-justify-center n-position-relative"},{default:n((()=>[s(w,{src:o(j).bg.exam,mode:"aspectFill",style:{width:"500rpx",height:"500rpx"}},null,8,["src"]),s(m,{class:"n-position-absolute",style:{left:"50%",transform:"translateX(-50%)",top:"0"}},{default:n((()=>[s(_,{"canvas-id":"ctx-write",onTouchstart:o(M),onTouchmove:o(P),onTouchend:o(I),style:{width:"500rpx",height:"500rpx"}},null,8,["onTouchstart","onTouchmove","onTouchend"])])),_:1})])),_:1}),s(m,{style:{height:"40rpx","background-color":"#FFFFFF"}}),s(T,{"scroll-y":!0,class:"n-bg-page",style:u({height:E.value+"px"})},{default:n((()=>[s(m,{class:"n-flex-row n-wrap-wrap",style:{width:"750rpx","padding-left":"36rpx","margin-top":"20rpx"}},{default:n((()=>[(t(!0),h(x,null,d(B.value,((n,s)=>(t(),e(k,{key:s,item:n},null,8,["item"])))),128))])),_:1})])),_:1},8,["style"]),s(m,{class:"n-flex-row n-align-center n-justify-center",style:{"margin-top":"24rpx"}},{default:n((()=>[s(F,{icon:o(j).icon.eraser,text:null,iconStyle:"width:86rpx;height:86rpx;",border:"none",radius:"none",boxStyle:"width:86rpx;height:86rpx;",onButtonClicked:R},null,8,["icon"]),s(m,{style:{width:"120rpx"}}),s(F,{text:"完成",textType:"inverse",radius:"ll",border:"none",boxStyle:"background-color: #525C6A; width:252rpx;height:86rpx;",onButtonClicked:q})])),_:1})])),_:1},8,["style"])}}};export{C as default};
