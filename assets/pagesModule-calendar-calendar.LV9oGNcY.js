import{_ as e}from"./n-navbar.DgJOiXYI.js";import{r as a,b as n,d as l,w as t,i as r,o,e as u,j as s,h as i,t as c,k as y,l as h,F as f,q as v,C as m,n as d,f as p,S as x}from"./index-DyB-GtSf.js";import{r as w}from"./uni-app.es.CYr7Wecl.js";import{a as g,_ as b}from"./n-icon.C34IfF9H.js";import{g as _,a as j,b as k}from"./date.BEWHXjV7.js";import{u as C}from"./useNav.y5ABEmWP.js";import"./n-badge.U9JWwHKe.js";import"./props.CkprGx8I.js";import"./system.Bdz65IDa.js";import"./_plugin-vue_export-helper.BCo6x5W8.js";const I={__name:"calendar",setup(I){const{leftIcons:z,navLeftAction:F}=C(),L=_(),T={},A=["日","一","二","三","四","五","六"],q=a({year:L.year,month:L.month}),D=a(J(L.year,L.month)),K=a(1),M=a(null);function N(e){const a=K.value;K.value=e.detail.current,2===a&&0===K.value?q.value={year:q.value.month+1>12?q.value.year+1:q.value.year,month:q.value.month+1>12?1:q.value.month+1}:0===a&&2===K.value?q.value={year:q.value.month-1>=1?q.value.year:q.value.year-1,month:q.value.month-1>=1?q.value.month-1:12}:a<K.value?q.value={year:q.value.month+1>12?q.value.year+1:q.value.year,month:q.value.month+1>12?1:q.value.month+1}:q.value={year:q.value.month-1>=1?q.value.year:q.value.year-1,month:q.value.month-1>=1?q.value.month-1:12},H()}function S(){q.value={year:q.value.year-1,month:q.value.month},H()}function B(){q.value={year:q.value.year+1,month:q.value.month},H()}function E(){q.value={year:q.value.month-1>=1?q.value.year:q.value.year-1,month:q.value.month-1>=1?q.value.month-1:12},H()}function G(){q.value={year:q.value.month+1>12?q.value.year+1:q.value.year,month:q.value.month+1>12?1:q.value.month+1},H()}function H(){const e=J(q.value.year,q.value.month);0===K.value?D.value=[e[1],e[2],e[0]]:1===K.value?D.value=e:D.value=[e[2],e[0],e[1]]}function J(e,a){const n=[];return a-1<=0?n.push({year:e-1,month:12,days:O(e-1,12)}):n.push({year:e,month:a-1,days:O(e,a-1)}),n.push({year:e,month:a,days:O(e,a)}),a+1>12?n.push({year:e+1,month:1,days:O(e+1,1)}):n.push({year:e,month:a+1,days:O(e,a+1)}),n}function O(e,a){if(T[e+"_"+a])return T[e+"_"+a];const n=j(e,a,1),l=k(e,a),t=[];for(let o=1;o<=l;o++)t.push({year:e,month:a,day:o,isToday:e==L.year&&a==L.month&&o==L.day});for(let o=0;o<n;o++)t.unshift(null);const r=g(t,7,null);return T[e+"_"+a]=r,r}return(a,g)=>{const _=w(n("n-navbar"),e),j=w(n("n-icon"),b),k=r,C=v,I=x,L=m;return o(),l(k,{class:"n-full-height"},{default:t((()=>[u(_,{lefts:s(z),bgType:"none",onLeftAction:s(F)},null,8,["lefts","onLeftAction"]),u(k,{class:"n-flex-row n-align-center n-justify-center",style:{"margin-top":"30rpx",height:"60rpx"}},{default:t((()=>[u(k,{class:"n-flex-row n-align-center n-justify-center",style:{width:"86rpx"},bubble:"true",onClick:S},{default:t((()=>[u(j,{name:"arrow-double-left",onIconClicked:S})])),_:1}),u(k,{class:"n-flex-row n-align-center n-justify-center",style:{width:"86rpx"},bubble:"true",onClick:E},{default:t((()=>[u(j,{name:"arrow-left",onIconClicked:E})])),_:1}),u(C,{class:"n-size-l n-color-text",style:{width:"200rpx","text-align":"center","font-weight":"700"}},{default:t((()=>[i(c(q.value.year||"")+"年"+c(q.value.month||"")+"月",1)])),_:1}),u(k,{class:"n-flex-row n-align-center n-justify-center",style:{width:"86rpx"},bubble:"true",onClick:G},{default:t((()=>[u(j,{name:"arrow-right",onIconClicked:G})])),_:1}),u(k,{class:"n-flex-row n-align-center n-justify-center",style:{width:"86rpx"},bubble:"true",onClick:B},{default:t((()=>[u(j,{name:"arrow-double-right",onIconClicked:B})])),_:1})])),_:1}),u(k,{class:"n-flex-row n-align-center n-wrap-nowrap",style:{"margin-left":"10rpx",width:"730rpx"}},{default:t((()=>[(o(),y(f,null,h(A,((e,a)=>u(k,{class:"n-flex-row n-align-center n-justify-center n-flex-1",style:{height:"100rpx"},key:a},{default:t((()=>[u(C,{class:"n-color-second n-size-l"},{default:t((()=>[i(c(e),1)])),_:2},1024)])),_:2},1024))),64))])),_:1}),u(L,{current:K.value,style:{flex:"1",width:"750rpx"},circular:!0,onChange:N},{default:t((()=>[(o(!0),y(f,null,h(D.value,((e,a)=>(o(),l(I,{key:a},{default:t((()=>[u(k,{class:"n-position-relative",style:{"margin-left":"10rpx",width:"730rpx"}},{default:t((()=>[u(k,{class:"n-position-absolute n-flex-row n-align-center n-justify-center",style:{left:"0",top:"0",bottom:"0",width:"730rpx"}},{default:t((()=>[u(C,{style:{"font-size":"260rpx",color:"#F5F7F9"}},{default:t((()=>[i(c(e.month),1)])),_:2},1024)])),_:2},1024),(o(!0),y(f,null,h(e.days,((e,a)=>(o(),l(k,{class:"n-flex-row n-align-center n-wrap-nowrap",key:a,style:{width:"730rpx",height:"100rpx"}},{default:t((()=>[(o(!0),y(f,null,h(e,((e,a)=>(o(),l(k,{class:"n-flex-row n-align-center n-justify-center n-flex-1",style:{height:"100rpx"},key:a,bubble:"true",onClick:a=>{var n;(n=e)&&(M.value={...n})}},{default:t((()=>[e?(o(),l(k,{key:0,class:d(["n-flex-row","n-align-center","n-justify-center",M.value&&M.value.year==e.year&&M.value.month==e.month&&M.value.day==e.day?"n-bg-warning":"",e.isToday?"n-border-all-warning":"n-border-none"]),style:{width:"100rpx",height:"100rpx","border-radius":"100rpx"}},{default:t((()=>[u(C,{class:d([M.value&&M.value.year==e.year&&M.value.month==e.month&&M.value.day==e.day?"n-color-inverse":e.isToday?"n-color-warning":"n-color-text","n-size-l"])},{default:t((()=>[i(c(e.day),1)])),_:2},1032,["class"])])),_:2},1032,["class"])):p("",!0)])),_:2},1032,["onClick"])))),128))])),_:2},1024)))),128))])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["current"])])),_:1})}}};export{I as default};
