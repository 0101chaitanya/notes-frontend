(this["webpackJsonpfso-2"]=this["webpackJsonpfso-2"]||[]).push([[0],{41:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var c=n(16),o=n.n(c),r=n(7),i=n(3),a=n(2),u=n(0),s=function(t){var e=t.note,n=t.toggleImportanceOf,c=e.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[e.content," ",Object(u.jsx)("button",{onClick:function(){return n(e.id)},children:c})]})},l=function(t){var e=t.message;return null===e?null:Object(u.jsx)("div",{className:"error",children:e})},j=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app"})]})},f=n(4),d=n.n(f),b="https://hidden-reef-53498.herokuapp.com/api/notes",h=function(t){var e=Object(a.useState)([]),n=Object(i.a)(e,2),c=n[0],o=n[1],f=Object(a.useState)("a new note"),h=Object(i.a)(f,2),O=h[0],m=h[1],p=Object(a.useState)(!0),v=Object(i.a)(p,2),x=v[0],g=v[1],S=Object(a.useState)(""),k=Object(i.a)(S,2),w=k[0],y=k[1];Object(a.useEffect)((function(){console.log("Effect:"),function(){var t=d.a.get(b),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))}().then((function(t){console.log("Promise fulfilled"),o(t)}))}),[]),console.log("render",c.length,"notes");var I=function(t){var e=c.find((function(e){return e.id===t})),n=Object(r.a)(Object(r.a)({},e),{},{important:!e.important});(function(t,e){return d.a.put("".concat(b,"/").concat(t),e).then((function(t){return t.data}))})(t,n).then((function(e){o(c.map((function(n){return n.id!==t?n:e})))})).catch((function(n){y('The note "'.concat(e.content,'" was already deleted from server')),setTimeout((function(){y(null)}),5e3),o(c.filter((function(e){return e.id!==t})))}))},N=x?c:c.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),w&&Object(u.jsx)(l,{message:w}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(u.jsx)("ul",{children:N.map((function(t){return Object(u.jsx)(s,{toggleImportanceOf:I,note:t},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e,n={content:O,date:(new Date).toISOString(),important:Math.random()<.5};(e=n,d.a.post(b,e).then((function(t){return t.data}))).then((function(t){o(c.concat(t)),m("")}))},children:[Object(u.jsx)("input",{onChange:function(t){m(t.target.value)},value:O}),Object(u.jsx)("button",{type:"submit",children:"Save"})]}),Object(u.jsx)(j,{})]})};n(41);o.a.render(Object(u.jsx)(h,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.0eba39a4.chunk.js.map