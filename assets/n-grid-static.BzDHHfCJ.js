import{c as e,b as t,d as o,w as i,n as l,m as s,i as n,o as a,k as r,l as c,F as y,H as x,h as d,t as b,f as m,q as p}from"./index-DyB-GtSf.js";import{_ as g}from"./n-icon.C34IfF9H.js";import{r as S}from"./uni-app.es.CYr7Wecl.js";import{_ as u}from"./n-badge.U9JWwHKe.js";import{m as f}from"./props.CkprGx8I.js";const h={__name:"n-grid-static",props:f([["items",[]],["mode","top"],["columns",4],"itemHeight",["hasLine",!1],["space","12rpx"],["itemAlign","center"],["itemJustify","center"],["textType","text"],["textSize","base"],["iconType","text"],["iconSize","l"],"border","radius",["hover","opacity"],["itemBorder","light"],["iconLabel","icon"],["textLabel","text"],["isIcon",!0],["badgeConfig",{}],"boxStyle","itemBoxStyle","iconStyle","iconBoxStyle","textStyle","boxClass","itemBoxClass","iconClass","iconBoxClass","textClass"]),emits:["itemClicked"],setup(f,{emit:h}){const z=f,C=h,T=e((()=>{const e=[];let t=0;if(z.items.forEach(((o,i)=>{t=Math.floor(i/z.columns),e[t]||(e[t]=[]),e[t].push(o)})),e.length>0)for(;e[t].length!==z.columns;)e[t].push(!1);return e})),v=e((()=>(z.itemHeight?"height:"+z.itemHeight+";":"")+z.itemBoxStyle)),k=e((()=>"left"===z.mode||"right"===z.mode?"row":"column")),_=e((()=>"left"!==z.mode&&"top"!==z.mode)),L=e((()=>"margin-"+z.mode+":"+z.space+";"+z.textStyle));function B(e,t,o){C("itemClicked",{row:e,column:t,item:o})}return(e,f)=>{const h=p,z=S(t("n-icon"),g),C=S(t("n-badge"),u),w=n;return a(),o(w,{class:l(["n-flex-column","n-border-"+e.border,"n-radius-"+e.radius]),style:s(e.boxStyle)},{default:i((()=>[(a(!0),r(y,null,c(T.value,((t,n)=>(a(),o(w,{class:"n-flex-row n-wrap-nowrap",key:n},{default:i((()=>[(a(!0),r(y,null,c(t,((t,r)=>(a(),o(w,{class:l(["row"===k.value?"n-flex-row":"n-flex-column","n-position-relative","n-justify-"+e.itemJustify,"n-align-"+e.itemAlign,"n-flex-1",0!==r&&e.hasLine&&"n-border-left-"+e.itemBorder,0!==n&&e.hasLine&&"n-border-top-"+e.itemBorder,"n-hover-"+e.hover+"-n"]),key:r,style:s(v.value),"hover-class":"n-hover-"+e.hover,bubble:"true",onClick:x((e=>B(n,r,t)),["stop"])},{default:i((()=>[_.value&&t?(a(),o(h,{key:0,class:l(["n-color-"+(t.textType||e.textType),"n-size-"+(t.textSize||e.textSize)]),style:s(L.value+(t.textStyle||""))},{default:i((()=>[d(b(t[e.textLabel]),1)])),_:2},1032,["class","style"])):m("",!0),e.isIcon&&t?(a(),o(z,{key:1,name:t[e.iconLabel],type:t.iconType||e.iconType,size:t.iconSize||e.iconSize,iconStyle:e.iconStyle+(t.iconStyle||""),boxStyle:e.iconBoxStyle,onIconClicked:e=>B(n,r,t)},null,8,["name","type","size","iconStyle","boxStyle","onIconClicked"])):m("",!0),!e.isIcon&&t?(a(),o(h,{key:2,class:l(["n-color-"+(t.iconType||e.iconType),"n-size-"+(t.iconSize||e.iconSize)]),style:s(e.iconStyle+(t.iconStyle||""))},{default:i((()=>[d(b(t[e.iconLabel]),1)])),_:2},1032,["class","style"])):m("",!0),!_.value&&t?(a(),o(h,{key:3,class:l(["n-color-"+(t.textType||e.textType),"n-size-"+(t.textSize||e.textSize)]),style:s(L.value+(t.textStyle||""))},{default:i((()=>[d(b(t[e.textLabel]),1)])),_:2},1032,["class","style"])):m("",!0),t.badge?(a(),o(C,{key:4,size:t.badge.size||e.badgeConfig.size||"12rpx",bgType:t.badge.bgType||e.badgeConfig.bgType||"error",text:t.badge.text||"",border:t.badge.border||e.badgeConfig.border||"none",textType:t.badge.textType||e.badgeConfig.textType||"inverse",textSize:t.badge.textSize||e.badgeConfig.textSize||"ss",textStyle:t.badge.textStyle||e.badgeConfig.textStyle||"",boxStyle:t.badge.boxStyle||e.badgeConfig.boxStyle||""},null,8,["size","bgType","text","border","textType","textSize","textStyle","boxStyle"])):m("",!0)])),_:2},1032,["class","style","hover-class","onClick"])))),128))])),_:2},1024)))),128))])),_:1},8,["class","style"])}}};export{h as _};
