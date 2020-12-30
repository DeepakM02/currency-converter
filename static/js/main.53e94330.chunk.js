(this["webpackJsonpcurrency-converter"]=this["webpackJsonpcurrency-converter"]||[]).push([[0],{11:function(e,a,n){},16:function(e,a,n){},17:function(e,a,n){"use strict";n.r(a);var t=n(0),r=n.n(t),c=n(4),o=n.n(c),i=(n(11),n(1)),l=n(5),b=n(2),u="https://api.exchangeratesapi.io",s=(n(16),function(){var e=Object(t.useState)(1),a=Object(i.a)(e,2),n=a[0],c=a[1],o=Object(t.useState)(""),s=Object(i.a)(o,2),m=s[0],h=s[1],f=Object(t.useState)("USD"),p=Object(i.a)(f,2),d=p[0],v=p[1],y=Object(t.useState)("INR"),g=Object(i.a)(y,2),E=g[0],S=g[1],O=Object(t.useState)(""),j=Object(i.a)(O,2),w=j[0],k=j[1],C=Object(t.useState)(""),D=Object(i.a)(C,2),N=D[0],R=D[1],K=Object(t.useMemo)((function(){return[{primary:!0,type:"utc",position:"bottom"},{type:"linear",position:"left"}]}),[]),P=r.a.useMemo((function(){return{type:"bubble",showPoints:!1}}),[]);Object(t.useEffect)((function(){x()}),[]);var x=function(){var e="".concat(u,"/latest?base=").concat(d,"&&symbols=").concat(E);fetch(e).then((function(e){return e.json()})).then((function(e){var a=e.rates[E],t=(n*a).toFixed(2);h("".concat(t," ").concat(E)),I(a),B()})).catch((function(e){alert(e)}))},I=function(e){var a=b.filter((function(e){return e.abbr===d}))[0].name,n=b.filter((function(e){return e.abbr===E}))[0].name,t="1 ".concat(a," = ").concat(e.toFixed(2)," ").concat(n);k(t)},B=function(){var e=function(){var e=new Date,a=[e.getFullYear(),e.getMonth()+1,e.getDate()],n=a[0],t=a[1],r=a[2];return{start_at:"".concat(n-1,"-").concat(t,"-").concat(r),end_at:"".concat(n,"-").concat(t,"-").concat(r)}}(),a=e.start_at,n=e.end_at,t="".concat(u,"/history?start_at=").concat(a,"&end_at=").concat(n,"&symbols=").concat(d,"&base=").concat(E);fetch(t).then((function(e){return e.json()})).then((function(e){var a=[{specialLabel:"Historical Rates",data:Object.entries(e.rates).map((function(e){var a=Object(i.a)(e,2),n=a[0],t=a[1];return[new Date(n),t[d]]}))}];R(a)}))};return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Currency Converter"),r.a.createElement("div",{className:"currency-section"},r.a.createElement("input",{type:"number",min:1,name:"fromCurrency",value:n,onKeyDown:function(e){return["e","E","+","-"].includes(e.key)&&e.preventDefault()},onChange:function(e){return c(e.target.value)}}),r.a.createElement("select",{name:"from country",value:d,placeholder:"Please select from currency",onChange:function(e){return v(e.target.value)}},b.map((function(e,a){return r.a.createElement("option",{key:a,value:e.abbr},e.name)}))),r.a.createElement("select",{name:"to country",value:E,placeholder:"Please select to currency",onChange:function(e){return S(e.target.value)}},b.map((function(e,a){return r.a.createElement("option",{key:a,value:e.abbr},e.name)}))),r.a.createElement("button",{disabled:!n,onClick:x},"Convert")),r.a.createElement("div",{className:"result-section"},m?r.a.createElement("h2",null,m):null,r.a.createElement("h3",null,w)),N?r.a.createElement("div",{style:{width:"800px",height:"300px",display:"inline-block",textAlign:"center"}},r.a.createElement(l.Chart,{data:N,axes:K,series:P,tooltip:!0})):null)});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(s,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},2:function(e){e.exports=JSON.parse('[{"name":"US dollar","abbr":"USD"},{"name":"Japanese yen ","abbr":"JPY"},{"name":"Bulgarian lev","abbr":"BGN"},{"name":"Czech koruna ","abbr":"CZK"},{"name":"Danish krone","abbr":"DKK"},{"name":"Pound sterling ","abbr":"GBP"},{"name":"Hungarian forint ","abbr":"HUF"},{"name":"Polish zloty","abbr":"PLN"},{"name":"Romanian leu ","abbr":"RON"},{"name":"Swedish krona","abbr":"SEK"},{"name":"Swiss franc","abbr":"CHF"},{"name":"Icelandic krona","abbr":"ISK"},{"name":"Norwegian krone","abbr":"NOK"},{"name":"Croatian kuna ","abbr":"HRK"},{"name":"Russian rouble ","abbr":"RUB"},{"name":"Turkish lira","abbr":"TRY"},{"name":"Australian dollar","abbr":"AUD"},{"name":"Brazilian real ","abbr":"BRL"},{"name":"Canadian dollar","abbr":"CAD"},{"name":"Chinese yuan renminbi","abbr":"CNY"},{"name":"Hong Kong dollar","abbr":"HKD"},{"name":"Indonesian rupiah ","abbr":"IDR"},{"name":"Israeli shekel ","abbr":"ILS"},{"name":"Indian rupee ","abbr":"INR"},{"name":"South Korean won","abbr":"KRW"},{"name":"Mexican peso ","abbr":"MXN"},{"name":"Malaysian ringgit ","abbr":"MYR"},{"name":"New Zealand dollar","abbr":"NZD"},{"name":"Philippine peso ","abbr":"PHP"},{"name":"Singapore dollar","abbr":"SGD"},{"name":"Thai baht","abbr":"THB"},{"name":"South African rand","abbr":"ZAR"}]')},6:function(e,a,n){e.exports=n(17)}},[[6,1,2]]]);
//# sourceMappingURL=main.53e94330.chunk.js.map