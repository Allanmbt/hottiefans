import{c as e,b as t,d as s,w as l,n,m as i,i as a,o,f as y,e as c,N as g,H as r,k as x,F as b,l as p,h as d,t as C,A as S,q as f}from"./index-DyB-GtSf.js";import{_ as m}from"./n-icon.C34IfF9H.js";import{r as T}from"./uni-app.es.CYr7Wecl.js";import{_ as u}from"./n-badge.U9JWwHKe.js";import{a as z}from"./system.Bdz65IDa.js";import{m as h}from"./props.CkprGx8I.js";const v={__name:"n-navbar",props:h([["lefts",[]],"title","icon",["rights",[]],["bgType","nav"],"border",["titleType","nav-title"],["titleSize","nav-title"],"titleStyle",["iconType","nav-title"],["iconSize","nav-title"],"iconStyle",["itemIconType","nav-icon"],["itemIconSize","nav-icon"],"itemIconStyle",["itemTextType","nav-item"],["itemTextSize","nav-item"],"itemTextStyle",["height",44],["includeStatus",!0],["isSeize",!0],["fixed",!0],["enableBack",!1],"leftStyle","leftBgType","leftItemStyle","rightStyle","rightBgType","rightItemStyle","centerStyle","boxStyle","statusNavStyle","navStyle",["badgeConfig",{}],"boxClass","titleClass","iconClass","itemIconClass","itemTextClass","leftClass","leftItemClass","rightClass","rightItemClass","centerClass","statusNavClass","navClass"]),emits:["leftAction","centerAction","rightAction"],setup(h,{emit:v}){const k=h,I=v,w=e((()=>k.includeStatus?z():0)),_=e((()=>w.value+k.height)),j=e((()=>"height:"+k.height+"px;"+k.navStyle));function B(e){I("leftAction",e),0==e&&k.enableBack&&S({delta:1})}function A(e){e&&e.stopPropagation&&e.stopPropagation(),I("centerAction")}function N(e){I("rightAction",e)}function P(e){e&&e.stopPropagation&&e.stopPropagation()}return(e,S)=>{const z=a,h=T(t("n-icon"),m),v=f,k=T(t("n-badge"),u);return o(),s(z,{class:n([e.boxClass]),style:i(e.boxStyle)},{default:l((()=>[e.fixed&&e.isSeize?(o(),s(z,{key:0,class:"n-width-750rpx",style:i({height:_.value+"px"})},null,8,["style"])):y("",!0),c(z,{class:n(["n-bg-"+e.bgType,"n-border-"+e.border,"n-width-750rpx","n-left-0","n-top-0","n-zindex-nav",e.fixed&&"n-position-fixed",e.statusNavClass]),style:i(e.statusNavStyle),onClick:r(P,["stop"])},{default:l((()=>[e.includeStatus?(o(),s(z,{key:0,class:"n-width-750rpx",style:i({height:w.value+"px"})},null,8,["style"])):y("",!0),c(z,{class:n(["n-flex-row","n-wrap-nowrap","n-align-center","n-width-750rpx",e.navClass]),style:i(j.value)},{default:l((()=>[c(z,{class:n(["n-flex-row","n-wrap-nowrap","n-justify-start","n-align-center",e.leftClass||"n-nav-lefts",e.leftBgType&&"n-bg-"+e.leftBgType]),style:i(e.leftStyle)},{default:l((()=>[g(e.$slots,"left",{},(()=>[e.lefts&&e.lefts.length>0?(o(!0),x(b,{key:0},p(e.lefts,((t,a)=>(o(),s(z,{key:a,class:n(["n-position-relative","n-flex-row","n-align-center",t.bgType&&"n-bg-"+t.bgType,e.leftItemClass,t.class||""]),style:i(e.leftItemStyle+(t.style||"")),bubble:"true",onClick:e=>B(a)},{default:l((()=>[t.icon?(o(),s(h,{key:0,name:t.icon,type:t.iconType||e.itemIconType,size:t.iconSize||e.itemIconSize,iconClass:e.itemIconClass||t.iconClass||"",iconStyle:e.itemIconStyle+(t.iconStyle||""),onIconClicked:e=>B(a)},null,8,["name","type","size","iconClass","iconStyle","onIconClicked"])):y("",!0),t.text?(o(),s(v,{key:1,class:n(["n-color-"+(t.textType||e.itemTextType),"n-size-"+(t.textSize||e.itemTextSize),e.itemTextClass,t.textClass||""]),style:i(e.itemTextStyle+(t.textStyle||""))},{default:l((()=>[d(C(t.text),1)])),_:2},1032,["class","style"])):y("",!0),t.badge?(o(),s(k,{key:2,size:t.badge.size||e.badgeConfig.size||"12rpx",bgType:t.badge.bgType||e.badgeConfig.bgType||"error",text:t.badge.text||"",border:t.badge.border||e.badgeConfig.border||"none",textType:t.badge.textType||e.badgeConfig.textType||"inverse",textSize:t.badge.textSize||e.badgeConfig.textSize||"ss",textStyle:t.badge.textStyle||e.badgeConfig.textStyle||"",boxStyle:t.badge.boxStyle||e.badgeConfig.boxStyle||"",textClass:t.badge.textClass||e.badgeConfig.textClass||"",boxClass:t.badge.boxClass||e.badgeConfig.boxClass||""},null,8,["size","bgType","text","border","textType","textSize","textStyle","boxStyle","textClass","boxClass"])):y("",!0)])),_:2},1032,["class","style","onClick"])))),128)):y("",!0)]))])),_:3},8,["class","style"]),c(z,{class:n(["n-flex-row","n-wrap-nowrap","n-align-center","n-justify-center","n-flex-1",e.centerClass]),style:i(e.centerStyle)},{default:l((()=>[g(e.$slots,"center",{},(()=>[e.title?(o(),s(v,{key:0,class:n(["n-lines-1","n-nav-title-text","n-color-"+e.titleType,"n-size-"+e.titleSize,e.titleClass]),style:i(e.titleStyle),onClick:r(A,["stop"])},{default:l((()=>[d(C(e.title),1)])),_:1},8,["class","style"])):y("",!0),e.icon?(o(),s(h,{key:1,name:e.icon,type:e.iconType,size:e.iconSize,iconStyle:e.iconStyle,iconClass:e.iconClass,onIconClicked:A},null,8,["name","type","size","iconStyle","iconClass"])):y("",!0)]))])),_:3},8,["class","style"]),c(z,{class:n(["n-flex-row","n-align-center","n-wrap-nowrap","n-justify-end",e.rightClass||"n-nav-rights",e.rightBgType&&"n-bg-"+e.rightBgType]),style:i(e.rightStyle)},{default:l((()=>[g(e.$slots,"right",{},(()=>[e.rights&&e.rights.length>0?(o(!0),x(b,{key:0},p(e.rights,((t,a)=>(o(),s(z,{key:a,class:n(["n-position-relative","n-flex-row","n-align-center","n-wrap-nowrap","n-justify-end",t.bgType&&"n-bg-"+t.bgType,e.rightItemClass,t.class||""]),style:i(e.rightItemStyle+(t.style||"")),bubble:"true",onClick:e=>N(a)},{default:l((()=>[t.icon?(o(),s(h,{key:0,name:t.icon,type:t.iconType||e.itemIconType,size:t.iconSize||e.itemIconSize,iconStyle:e.itemIconStyle+(t.iconStyle||""),iconClass:e.itemIconClass||t.iconClass||"",onIconClicked:e=>N(a)},null,8,["name","type","size","iconStyle","iconClass","onIconClicked"])):y("",!0),t.text?(o(),s(v,{key:1,class:n(["n-color-"+(t.textType||e.itemTextType),"n-size-"+(t.textSize||e.itemTextSize),e.itemTextClass,t.textClass||""]),style:i(e.itemTextStyle+(t.textStyle||""))},{default:l((()=>[d(C(t.text),1)])),_:2},1032,["class","style"])):y("",!0),t.badge?(o(),s(k,{key:2,size:t.badge.size||e.badgeConfig.size||"12rpx",bgType:t.badge.bgType||e.badgeConfig.bgType||"error",text:t.badge.text||"",border:t.badge.border||e.badgeConfig.border||"none",textType:t.badge.textType||e.badgeConfig.textType||"inverse",textSize:t.badge.textSize||e.badgeConfig.textSize||"ss",textStyle:t.badge.textStyle||e.badgeConfig.textStyle||"",boxStyle:t.badge.boxStyle||e.badgeConfig.boxStyle||"",textClass:t.badge.textClass||e.badgeConfig.textClass||"",boxClass:t.badge.boxClass||e.badgeConfig.boxClass||""},null,8,["size","bgType","text","border","textType","textSize","textStyle","boxStyle","textClass","boxClass"])):y("",!0)])),_:2},1032,["class","style","onClick"])))),128)):y("",!0)]))])),_:3},8,["class","style"])])),_:3},8,["class","style"]),g(e.$slots,"extra")])),_:3},8,["class","style"])])),_:3},8,["class","style"])}}};export{v as _};
