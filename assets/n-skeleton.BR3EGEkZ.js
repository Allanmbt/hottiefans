import{r as a,c as s,K as t,d as e,w as r,n as i,j as l,m as o,i as n,o as d,f as u,k as h,l as c,F as w}from"./index-DyB-GtSf.js";import{a as g}from"./animate.QYSEQYB_.js";import{m as p}from"./props.CkprGx8I.js";import{_ as y}from"./_plugin-vue_export-helper.BCo6x5W8.js";const x=y({__name:"n-skeleton",props:p([["flex","row"],["align","center"],["justify","center"],["space","24rpx"],["bg","#CCC8C8"],["avatar",!0],["avatarWidth","120rpx"],["avatarHeight","120rpx"],["avatarRadius","12rpx"],["rows",2],["rowsWidth",["400rpx"]],["rowsHeight",["12rpx"]],["rowsRadius","12rpx"],["rowsAlign","center"],["rowsJustify","center"],["rowsSpace","20rpx"],"rowsStyle",["indicator",!0],["indicatorWidth","120rpx"],["indicatorHeight","120rpx"],["indicatorRadius","12rpx"],["animate",!0],"boxStyle","boxClass","rowsClass"]),setup(p){const y=p,x=a(null),f=s((()=>y.rows>0)),v=s((()=>{const a=[],s=y.rowsWidth.length,t=y.rowsHeight.length;for(let e=0;e<y.rows;e++)a.push({width:y.rowsWidth[e]||y.rowsWidth[s-1]||0,height:y.rowsHeight[e]||y.rowsHeight[t-1]||0});return a})),b=s((()=>y.avatar&&f.value)),m=s((()=>(y.avatar||f.value)&&y.indicator)),k=s((()=>"row"==y.flex?`width: ${y.space};`:`height: ${y.space};`)),_=s((()=>"row"==y.flex?`width: ${y.space};`:`height: ${y.space};`));return t((()=>{})),(a,s)=>{const t=n;return d(),e(t,{id:"nske",ref_key:"nske",ref:x,class:i(["n-flex-"+a.flex,"n-align-"+a.align,"n-justify-"+a.justify,l(g)&&"ske-ani",a.boxClass]),style:o(a.boxStyle)},{default:r((()=>[a.avatar?(d(),e(t,{key:0,style:o({width:a.avatarWidth,height:a.avatarHeight,"border-radius":a.avatarRadius,"background-color":a.bg})},null,8,["style"])):u("",!0),b.value?(d(),e(t,{key:1,style:o(k.value)},null,8,["style"])):u("",!0),f.value?(d(),e(t,{key:2,class:i(["n-flex-column","n-align-"+a.rowsAlign,"n-justify-"+a.rowsJustify,a.rowsClass]),style:o(a.rowsStyle)},{default:r((()=>[(d(!0),h(w,null,c(v.value,((s,r)=>(d(),e(t,{key:r,style:o({"margin-bottom":r==v.value.length-1?"0":a.rowsSpace,width:s.width,height:s.height,"background-color":a.bg,"border-radius":a.rowsRadius})},null,8,["style"])))),128))])),_:1},8,["class","style"])):u("",!0),m.value?(d(),e(t,{key:3,style:o(_.value)},null,8,["style"])):u("",!0),a.indicator?(d(),e(t,{key:4,style:o({width:a.indicatorWidth,height:a.indicatorHeight,"border-radius":a.indicatorRadius,"background-color":a.bg})},null,8,["style"])):u("",!0)])),_:1},8,["class","style"])}}},[["__scopeId","data-v-9953ab5d"]]);export{x as _};
