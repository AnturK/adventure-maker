(this["webpackJsonpadventure-maker"]=this["webpackJsonpadventure-maker"]||[]).push([[0],{62:function(e,t,n){},63:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(19),i=n.n(a),s=(n(61),n(62),n(63),n(12)),o=n(8),d=n(15),j=n(4),l=n(6),u=n(80),h=n(75),b=n(76),f=n(54),O=n(74),g=n(72),x=n(81),A=n(55),v=n(52),m=n(82),p=n(83),_=n(14),C=n(11);function q(e,t,n){var r=e.slice();return r[e.indexOf(t)]=n,r}function y(e,t,n){return Object(j.a)(Object(j.a)({},e),{},Object(C.a)({},t,n))}function w(e){var t=Number(e);return Number.isFinite(t)&&!Number.isNaN(t)?t:e}var k={};function R(e){return e in k?k[e]+=1:k[e]=0,"".concat(e," ").concat(k[e])}var D=function e(){Object(_.a)(this,e),this.id=R("Node"),this.name=this.id,this.description="Node description goes here",this.choices=[],this.image="default",this.image_raw=void 0,this.on_enter_effects=void 0,this.on_exit_effects=void 0},S=function e(){Object(_.a)(this,e),this.id=R("trigger"),this.name="Trigger",this.target_node=void 0,this.on_trigger_effects=void 0,this.requirements=void 0},E=function e(){Object(_.a)(this,e),this.id=R("choice"),this.key=this.id,this.name="New Choice",this.exit_node="FAIL",this.on_selection_effects=void 0,this.requirements=void 0,this.delay=0,this.delay_message=void 0},I=function e(){Object(_.a)(this,e),this.id=R("effect"),this.effect_type="Add",this.quality="Quality",this.value=1},N=function e(){Object(_.a)(this,e),this.id=R("req"),this.group_type="AND",this.requirements=[]},T=function e(){Object(_.a)(this,e),this.id=R("req"),this.quality="Quality",this.operator="==",this.value=1},B=Object(s.b)({key:"adventure",default:new function e(){Object(_.a)(this,e),this.name="New adventure",this.starting_node="",this.nodes=[],this.triggers=[],this.required_site_traits=[],this.loot_types=[],this.band_modifiers={},this.starting_qualities={},this.deep_scan_description="",this.author="Anonymous"}}),G=Object(s.c)({key:"nodes",get:function(e){return(0,e.get)(B).nodes}}),Q=Object(s.d)({key:"single_node",get:function(e){return function(t){return(0,t.get)(B).nodes.find((function(t){return t.id===e}))}},set:function(e){return function(t,n){var r=t.set,c=(0,t.get)(B),a=Object(j.a)(Object(j.a)({},c),{},{nodes:q(c.nodes,c.nodes.find((function(t){return t.id===e})),n)});r(B,a)}}}),U=Object(s.c)({key:"triggers",get:function(e){return(0,e.get)(B).triggers}}),L=Object(s.d)({key:"single_trigger",get:function(e){return function(t){return(0,t.get)(B).triggers.find((function(t){return t.id===e}))}},set:function(e){return function(t,n){var r=t.set,c=(0,t.get)(B),a=Object(j.a)(Object(j.a)({},c),{},{triggers:q(c.triggers,c.triggers.find((function(t){return t.id===e})),n)});r(B,a)}}}),P=n(84),F=n(78),M=n(71),K=n(73),H=n(53),V=["FAIL","FAIL_DEATH","WIN","GO_BACK"],J=["ruins","technology present","space station","alien","habitable","spaceship","in space","on surface"],X=["Plasma absorption band","Hydrocarbons/Molecular oxygen","Narrow-band radio waves","Exotic Radiation","Increased Density"],Z=["maint","drugs","research","weapons","pets","unique"],W={default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkBAMAAAAxqGI4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURQAAAP8AABv/jSIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC7SURBVGje7ZdBDsJADAPjH2T//1lAgNrlxMVDiTynnjKyu6m6FUIIIfyA9aCtCq0XhMNo0bMoWRt7j3Za7rOPJ5fkNNj3Vk5zbVGOtiCJra9trFHSm6TdEvkka46kR0i2uX8t2bZRri+kPpax3FCSdjtESdwOpK0a05agtuwOJIiAIEUEKSKIGMmQtooIIiKIprQFSSqS71FHcjVJCD6gHzvmsuiOogVcSSO5ngQ5XcyeMDegEEIIYTBVNw34EbwIRO7ZAAAAAElFTkSuQmCC",grue:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkBAMAAAAxqGI4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAP8AAP8hAFWgYwIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABbSURBVGje7dPBDYAgEEVBtAKXCmT7L1LucgRi4kwDL/nZLQAAAAAAAPxQXOsbR8SGSG3rKy0zB+m5G/ZG3q/G5A3PQeTMDRNGjeU312+htuWRjLbheQAA+KxSHrpcA/wdxXfnAAAAAElFTkSuQmCC",signal_lost:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkBAMAAAAxqGI4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURQAAAP8AABv/jSIAAAAJcEhZcwAADsIAAA7CARUoSoAAAADZSURBVGje7ZNRFoQgCADhBnD/y66AWenbLb935vXK1BwhEQAAAAAAAACAv0LdXLzR2tVsPepuItWZ9Gb0xgxzvww+k7Prk978LvHo1rjvSTQWb4/cYry1q9bLjnMvdWvzwhMRy4bEhqSamb5cZpHUhD66Jck0D4m8kNTIjqTy3CXxK9QsM9hDXCXqcyrfae6SfgZK4qfED6+67UnWf/IkcZmjfCPR83SlREeuJkk/XVUuW5Lc81QnkUG9FYMf5XSZuxPJWD4e9lNSIehUqAAAAAAAAAAAAFdEPmbgEwxTT+ziAAAAAElFTkSuQmCC",trader:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkBAMAAAAxqGI4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAP/YAH8zAHXkPMkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF8SURBVGje7dkLbsMgDAZg8AnwDbzd/5BTk3aD+A9Ngp2ChvuSIuoP2W4TtWHGjBkzZsyYMWxE5uSYnpfwEuKa3il7vnmxz643b4rsVJ6+TbLnm9fdbUb05i2RvbGJ+pDIpaZUxsYO+X37DQgqtkYoCBkjeoRHQFCxNSLLbTgk6s9OG4KKvYOQM0KhfwQVW3/X34LI6945Qs4IKvZ6ltmsegj07xFUbI1I9jBC9HXFAAgs9j5CjggFc+R5McZmCCp2BbnWlGOIDITkxX4aWef/8l9pCuyoQigMhGTFjtaI1BAuVhXPPSPkhsBicxUhayTlq/pGYLHryPmmICQqRFwRNkfoIHK2KbCjCqFgjzBCslNME/J6yZG0rioPnWyKHEKEi0guyFeJcBOyFi++Rc79mgrHpkCWznMzosZGI6HFwGMDkNBg4LFhgKBLsaMBx6apNgeQ5IHwHQhKGM0RMDYbxOaPhu3YuCB7qCvCn0DSRCoRP4LwqMiMGb1GCD/OSlYEGoUISwAAAABJRU5ErkJggg=="},Y={Add:"Add",Set:"Set",Remove:"Remove"},z={raw:"raw",random:"random"},$=n(1);function ee(e){var t=e.handleChange,n=e.handleDelete,r=e.effect.value===Object(e.effect.value)?e.effect.value.value_type:"raw";return Object($.jsxs)(M.a,{children:[Object($.jsx)(v.a,{as:"select",value:e.effect.effect_type,onChange:function(e){return t("effect_type",e.target.value)},children:Object.keys(Y).map((function(e){return Object($.jsx)("option",{children:Y[e]},e)}))}),Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:"Quality"})}),Object($.jsx)(v.a,{value:e.effect.quality,onChange:function(e){return t("quality",e.target.value)}}),Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:"Value"})}),function(n){switch(n){case"random":return Object($.jsxs)($.Fragment,{children:[Object($.jsx)(M.a.Text,{children:"Random"}),Object($.jsx)(v.a,{value:e.effect.value.low,onChange:function(n){return t("value",Object(j.a)(Object(j.a)({},e.effect.value),{},{low:w(n.target.value)}))}}),Object($.jsx)(M.a.Text,{children:"To"}),Object($.jsx)(v.a,{value:e.effect.value.high,onChange:function(n){return t("value",Object(j.a)(Object(j.a)({},e.effect.value),{},{high:w(n.target.value)}))}})]});case"raw":return Object($.jsx)(v.a,{value:e.effect.value,onChange:function(e){return t("value",w(e.target.value))}});default:return Object($.jsx)(M.a.Text,{children:"Unsupported"})}}(r),Object($.jsxs)(M.a.Append,{children:[Object($.jsx)(g.a,{onClick:function(e){var n=Object.keys(z).map((function(e){return z[e]})),c=n.indexOf(r),a=n[(c+1)%n.length];t("value",function(e){switch(e){case z.raw:return 0;case z.random:return{value_type:z.random,low:0,high:0};default:return 0}}(a))},children:"*"}),Object($.jsx)(g.a,{variant:"danger",onClick:n,children:"Delete"})]})]})}function te(e){var t=e.handleEffectsChanged,n=e.handleEffectAdded,r=e.handleEffectDeleted;function c(){n(new I)}return e.effects?Object($.jsxs)($.Fragment,{children:[Object($.jsx)(P.a.Header,{children:e.title}),Object($.jsxs)(K.a,{children:[e.effects.map((function(e){return Object($.jsx)(H.a,{children:Object($.jsx)(ee,{effect:e,handleChange:function(n,r){return t(e,n,r)},handleDelete:function(t,n){return r(e,t,n)}})},e.id)})),Object($.jsx)(H.a,{children:Object($.jsx)(g.a,{onClick:c,children:"Add New Effect"})})]})]}):Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:e.title})}),Object($.jsx)(M.a.Append,{children:Object($.jsx)(g.a,{onClick:c,children:"Create Effect"})})]})}function ne(e){var t=e.handleRequirementsChanged,n=e.handleRequirementAdded,r=e.handleRequirementDeleted;function c(){n(new T)}return e.requirements?Object($.jsxs)($.Fragment,{children:[Object($.jsx)(P.a.Header,{children:e.title}),Object($.jsxs)(K.a,{children:[e.requirements.map((function(e){return e.requirements?Object($.jsx)(ce,{group:e,handleReqGroupChanged:function(n,r){return t(e,n,r)},handleReqGroupDeleted:function(){return r(e)}},e.id):Object($.jsx)(re,{requirement:e,handleReqChanged:function(n,r){return t(e,n,r)},handleReqDeleted:function(){return r(e)}},e.id)})),Object($.jsx)(K.a.Item,{children:Object($.jsxs)(O.a,{children:[Object($.jsx)(g.a,{onClick:function(){n(new N)},children:"Add Req Group"}),Object($.jsx)(g.a,{onClick:c,children:"Add Single Req"})]})})]})]}):Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:e.title})}),Object($.jsx)(M.a.Append,{children:Object($.jsx)(g.a,{onClick:c,children:"Add Requirements"})})]})}function re(e){var t=e.handleReqDeleted,n=e.handleReqChanged;return Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:"Quality"})}),Object($.jsx)(v.a,{value:e.requirement.quality,onChange:function(e){return n("quality",e.target.value)}}),Object($.jsxs)(v.a,{as:"select",value:e.requirement.operator,onChange:function(e){return n("operator",e.target.value)},children:[Object($.jsx)("option",{children:"=="}),Object($.jsx)("option",{children:"!="}),Object($.jsx)("option",{children:">"}),Object($.jsx)("option",{children:"<"}),Object($.jsx)("option",{children:">="}),Object($.jsx)("option",{children:"<="})]}),Object($.jsx)(v.a,{value:e.requirement.value,onChange:function(e){return n("value",w(e.target.value))}}),Object($.jsx)(M.a.Append,{children:Object($.jsx)(g.a,{variant:"danger",onClick:function(){return t(e.requirement)},children:"Delete"})})]})}function ce(e){var t=e.handleReqGroupDeleted,n=e.handleReqGroupChanged,r=function(t){var r=e.group.requirements.filter((function(e){return e!==t}));n("requirements",r)},c=function(t,r,c){var a=Object(j.a)(Object(j.a)({},t),{},Object(C.a)({},r,c)),i=e.group.requirements.slice();i[e.group.requirements.indexOf(t)]=a,n("requirements",i)};return Object($.jsxs)(P.a,{border:"dark",children:[Object($.jsx)(P.a.Header,{children:Object($.jsxs)(M.a,{children:[Object($.jsxs)(v.a,{as:"select",value:e.group.group_type,onChange:function(e){return n("group_type",e.target.value)},children:[Object($.jsx)("option",{children:"AND"}),Object($.jsx)("option",{children:"OR"})]}),Object($.jsx)(M.a.Text,{children:"Group"}),Object($.jsx)(M.a.Append,{children:Object($.jsx)(g.a,{variant:"danger",onClick:function(){return t(e.group)},children:"Delete"})})]})}),Object($.jsxs)(K.a,{children:[Object($.jsx)(K.a.Item,{children:e.group.requirements.map((function(e){return e.requirements?Object($.jsx)(ce,{group:e,handleReqGroupDeleted:r,handleReqGroupChanged:function(t,n){return c(e,t,n)}},e.id):Object($.jsx)(re,{requirement:e,handleReqDeleted:r,handleReqChanged:function(t,n){return c(e,t,n)}},e.id)}))}),Object($.jsx)(K.a.Item,{children:Object($.jsxs)(O.a,{children:[Object($.jsx)(g.a,{onClick:function(){var t=new N,r=[].concat(Object(d.a)(e.group.requirements),[t]);n("requirements",r)},children:"Add Req Group"}),Object($.jsx)(g.a,{onClick:function(){var t=new T,r=[].concat(Object(d.a)(e.group.requirements),[t]);n("requirements",r)},children:"Add Single Req"})]})})]})]})}var ae=n(38),ie=n(77);function se(e){var t=Object(r.useState)(e.startCollapsed),n=Object(l.a)(t,2),c=n[0],a=n[1];return Object($.jsxs)(h.a,{children:[Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(P.a.Header,{onClick:function(){return a(!c)},children:Object($.jsx)(h.a,{children:Object($.jsxs)(b.a,{children:[Object($.jsx)(f.a,{className:"flex-grow",children:e.title}),Object($.jsx)(f.a,{className:"flex-grow-0",children:c?"\u25bc":"\u25b2"})]})})})})}),Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(h.a,{className:c?"d-none":"",children:Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:e.children})})})})})]})}function oe(e){var t=e.allowNone,n=void 0!==t&&t,r=e.allowCustom,c=void 0===r||r,a=Object(ae.a)(e,["allowNone","allowCustom"]),i=Object(s.e)(G),o=Object(l.a)(i,1)[0];return Object($.jsxs)(v.a,Object(j.a)(Object(j.a)({},a),{},{as:"select",children:[o.map((function(e){return Object($.jsx)("option",{children:e.name},e.id)})),!!n&&Object($.jsx)("option",{value:"",children:"None"}),!!c&&V.map((function(e){return Object($.jsx)("option",{children:e},e)}))]}))}function de(e){var t=e.presetKeys,n=e.adventureProp,c=Object(s.e)(B),a=Object(l.a)(c,2),i=a[0],o=a[1],d=i[n],u=Object(r.useState)(t?t[0]:""),h=Object(l.a)(u,2),b=h[0],f=h[1],O=Object(r.useState)(""),x=Object(l.a)(O,2),A=x[0],m=x[1],p=Object.keys(d);return Object($.jsxs)(ie.a,{size:"sm",children:[Object($.jsx)("thead",{children:Object($.jsxs)("tr",{children:[Object($.jsx)("th",{children:"Quality"}),Object($.jsx)("th",{children:"Value"}),Object($.jsx)("th",{})]})}),Object($.jsxs)("tbody",{children:[p.map((function(e){return Object($.jsxs)("tr",{children:[Object($.jsx)("td",{children:e}),Object($.jsx)("td",{children:d[e]}),Object($.jsx)("td",{children:Object($.jsx)(g.a,{variant:"danger",onClick:function(){return function(e){var t=Object(j.a)({},d);delete t[e],o(y(i,n,t))}(e)},children:"Delete"})})]},e)})),Object($.jsxs)("tr",{children:[Object($.jsx)("td",{children:t?Object($.jsx)(v.a,{as:"select",value:b,onChange:function(e){return f(e.target.value)},children:t.map((function(e){return Object($.jsx)("option",{children:e},e)}))}):Object($.jsx)(v.a,{value:b,onChange:function(e){return f(e.target.value)}})}),Object($.jsx)("td",{children:Object($.jsx)(v.a,{value:A,onChange:function(e){return m(w(e.target.value))}})}),Object($.jsx)("td",{children:Object($.jsx)(g.a,{onClick:function(){var e=Object(j.a)(Object(j.a)({},d),{},Object(C.a)({},b,A));o(y(i,n,e))},children:"Add"})})]})]})]})}function je(e){var t=e.presetValues,n=e.adventureProp,c=e.unique,a=void 0===c||c,i=Object(s.e)(B),o=Object(l.a)(i,2),j=o[0],u=o[1],h=j[n]||[],b=Object(r.useState)(t?t[0]:""),f=Object(l.a)(b,2),O=f[0],x=f[1];return Object($.jsxs)(A.a,{children:[h.map((function(e){return Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Text,{children:e}),Object($.jsx)(M.a.Append,{children:Object($.jsx)(g.a,{variant:"danger",onClick:function(){return function(e){var t=h.filter((function(t){return t!==e}));u(y(j,n,t))}(e)},children:"X"})})]},e)})),Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:t?Object($.jsx)(v.a,{as:"select",value:O,onChange:function(e){return x(w(e.target.value))},children:t.map((function(e){return Object($.jsx)("option",{children:e},e)}))}):Object($.jsx)(v.a,{value:O,onChange:function(e){return x(w(e.target.value))}})}),Object($.jsx)(M.a.Append,{children:Object($.jsx)(g.a,{onClick:function(){if(!(a&&h.indexOf(O)>=0)){var e=[].concat(Object(d.a)(h),[O]);u(y(j,n,e))}},children:"Add"})})]})]})}function le(e){var t=e.handleChoiceDeletion,n=e.handleChoiceChange,c=Object(r.useState)(e.choice.exit_node),a=Object(l.a)(c,2),i=a[0],s=a[1];return Object($.jsx)(P.a,{children:Object($.jsxs)(P.a.Body,{children:[Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:"Choice"})}),Object($.jsx)(v.a,{value:e.choice.name,onChange:function(e){return n("name",e.target.value)}}),Object($.jsx)(M.a.Append,{children:Object($.jsx)(g.a,{variant:"danger",onClick:t,children:"Delete"})})]}),Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:"Exit Node"})}),Object($.jsx)(oe,{value:i,onChange:function(e){s(e.target.value),n("exit_node",e.target.value)},allowNone:!1})]}),Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:"Delay(ds)"})}),Object($.jsx)(v.a,{value:e.choice.delay,onChange:function(e){return n("delay",w(e.target.value))}}),Object($.jsx)(M.a.Text,{children:"Message"}),Object($.jsx)(v.a,{value:e.choice.delay_message,onChange:function(e){return n("delay_message",e.target.value)}})]}),Object($.jsx)(te,{title:"Selection Effects",effects:e.choice.on_selection_effects,handleEffectAdded:function(t){return function(t,r){var c=e.choice[t],a=void 0!==c?[].concat(Object(d.a)(c),[r]):[r];n(t,a)}("on_selection_effects",t)},handleEffectsChanged:function(t,r,c){return function(t,r,c,a){var i=Object(j.a)(Object(j.a)({},r),{},Object(C.a)({},c,a)),s=e.choice[t].slice();s[e.choice[t].indexOf(r)]=i,n(t,s)}("on_selection_effects",t,r,c)},handleEffectDeleted:function(t){return function(t,r){var c=e.choice[t].filter((function(e){return e!==r}));n(t,c.length?c:void 0)}("on_selection_effects",t)}}),Object($.jsx)(ne,{title:"Requirements",requirements:e.choice.requirements,handleRequirementAdded:function(t){var r=e.choice.requirements,c=void 0!==r?[].concat(Object(d.a)(r),[t]):[t];n("requirements",c)},handleRequirementDeleted:function(t){var r=e.choice.requirements.filter((function(e){return e!==t}));n("requirements",r.length?r:void 0)},handleRequirementsChanged:function(t,r,c){var a=Object(j.a)(Object(j.a)({},t),{},Object(C.a)({},r,c)),i=e.choice.requirements.slice();i[e.choice.requirements.indexOf(t)]=a,n("requirements",i)}})]})})}function ue(e){var t=e.handleNodeDeletion,n=Object(s.e)(Q(e.node.id)),c=Object(l.a)(n,2),a=c[0],i=c[1],o=function(t,n){var r=e.node[t],c=void 0!==r?[].concat(Object(d.a)(r),[n]):[n];i(y(a,t,c))},u=function(t,n,r,c){var s=Object(j.a)(Object(j.a)({},n),{},Object(C.a)({},r,c)),o=e.node[t].slice();o[e.node[t].indexOf(n)]=s,i(y(a,t,o))},h=function(t,n){var r=e.node[t].filter((function(e){return e!==n}));i(y(a,t,r.length?r:void 0))},b=a.raw_image?a.raw_image:W[a.image],f=Object(r.useRef)(),O=a.raw_image?"custom image data":a.image;return Object($.jsx)($.Fragment,{children:Object($.jsx)(P.a,{children:Object($.jsxs)(P.a.Body,{children:[Object($.jsxs)(P.a.Title,{children:[a.name," ",Object($.jsx)(g.a,{variant:"danger",onClick:t,children:"Delete"})]}),Object($.jsx)(F.a,{src:b,width:"400px",height:"200px"}),Object($.jsxs)(M.a,{children:[Object($.jsx)(M.a.Prepend,{children:Object($.jsx)(M.a.Text,{children:"Image"})}),Object($.jsx)(x.a.Control,{as:"select",value:O,readOnly:void 0!==a.raw_image,onChange:function(e){i(y(a,"image",e.target.value))},children:Object.keys(W).map((function(e){return Object($.jsx)("option",{children:e},e)}))}),Object($.jsx)(x.a.File,{type:"file",accept:"image/png",ref:f,onChange:function(e){var t=new FileReader;t.onload=function(e){var t=document.createElement("img");t.onload=function(){if(200===t.width&&100===t.height){var n=Object(j.a)(Object(j.a)({},a),{},{raw_image:e.target.result,image:null});i(n)}else alert("Adventure images need to be be 200x100 pngs.")},t.src=e.target.result},t.readAsDataURL(e.target.files[0])},style:{display:"none"}}),Object($.jsxs)(M.a.Append,{children:[Object($.jsx)(g.a,{onClick:function(){f.current.click()},children:"Custom"}),Object($.jsx)(g.a,{onClick:function(){var e=Object(j.a)(Object(j.a)({},a),{},{raw_image:void 0,image:"default"});i(e)},children:"Reset"})]})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Node ID"}),Object($.jsx)(v.a,{value:a.name,onChange:function(e){var t=y(a,"name",e.target.value);i(t)}})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Description"}),Object($.jsx)(v.a,{as:"textarea",rows:5,placeholder:"Describe whatever here.",value:a.description,onChange:function(e){return i(y(a,"description",e.target.value))}})]}),Object($.jsx)(te,{title:"On Enter Effects",effects:a.on_enter_effects,handleEffectAdded:function(e){return o("on_enter_effects",e)},handleEffectsChanged:function(e,t,n){return u("on_enter_effects",e,t,n)},handleEffectDeleted:function(e){return h("on_enter_effects",e)}}),Object($.jsx)(te,{title:"On Exit Effects",effects:a.on_exit_effects,parent_id:a.id,handleEffectAdded:function(e){return o("on_exit_effects",e)},handleEffectsChanged:function(e,t,n){return u("on_exit_effects",e,t,n)},handleEffectDeleted:function(e){return h("on_exit_effects",e)}}),Object($.jsx)(P.a.Header,{children:"Choices"}),a.choices.map((function(t){return Object($.jsx)(le,{choice:t,handleChoiceDeletion:function(){return function(t){var n=e.node.choices.filter((function(e){return e!==t}));i(y(a,"choices",n))}(t)},handleChoiceChange:function(n,r){var c=Object(j.a)(Object(j.a)({},t),{},Object(C.a)({},n,r));!function(t,n){var r=e.node.choices.slice();r[e.node.choices.indexOf(t)]=n,i(y(a,"choices",r))}(t,c)}},t.id)})),Object($.jsx)(g.a,{onClick:function(){return function(t){var n=[].concat(Object(d.a)(e.node.choices),[t]);i(y(a,"choices",n))}(new E)},children:"Add Choice"})]})})})}function he(e){var t=e.handleDeletion,n=Object(s.e)(L(e.trigger.id)),r=Object(l.a)(n,2),c=r[0],a=r[1];return Object($.jsx)(P.a,{children:Object($.jsxs)(P.a.Body,{children:[Object($.jsxs)(P.a.Title,{children:["Trigger ",Object($.jsx)(g.a,{variant:"danger",onClick:t,children:"Delete"})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Trigger ID"}),Object($.jsx)(v.a,{value:c.name,onChange:function(e){a(y(c,"name",e.target.value))}})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Target Node On Trigger"}),Object($.jsx)(oe,{allowNone:!0,value:c.target_node,onChange:function(e){a(y(c,"target_node",e.target.value))}})]}),Object($.jsx)(te,{title:"On Trigger Effects",effects:c.on_trigger_effects,handleEffectAdded:function(t){return function(t,n){var r=e.trigger[t],i=void 0!==r?[].concat(Object(d.a)(r),[n]):[n];a(y(c,t,i))}("on_trigger_effects",t)},handleEffectsChanged:function(t,n,r){return function(t,n,r,i){var s=Object(j.a)(Object(j.a)({},n),{},Object(C.a)({},r,i)),o=e.trigger[t].slice();o[e.trigger[t].indexOf(n)]=s,a(y(c,t,o))}("on_trigger_effects",t,n,r)},handleEffectDeleted:function(t){return function(t,n){var r=e.trigger[t].filter((function(e){return e!==n}));a(y(c,t,r.length?r:void 0))}("on_trigger_effects",t)}}),Object($.jsx)(ne,{title:"Trigger Requirements",requirements:e.trigger.requirements,handleRequirementAdded:function(t){var n=e.trigger.requirements,r=void 0!==n?[].concat(Object(d.a)(n),[t]):[t];a(y(c,"requirements",r))},handleRequirementDeleted:function(t){var n=e.trigger.requirements.filter((function(e){return e!==t}));a(y(c,"requirements",n.length?n:void 0))},handleRequirementsChanged:function(t,n,r){var i=Object(j.a)(Object(j.a)({},t),{},Object(C.a)({},n,r)),s=e.trigger.requirements.slice();s[e.trigger.requirements.indexOf(t)]=i,a(y(c,"requirements",s))}})]})})}var be=n(79);function fe(e){var t=Object(s.e)(B),n=Object(l.a)(t,1)[0],c=Object(r.useState)(n.nodes.find((function(e){return e.name===n.starting_node}))||n.nodes[0]),a=Object(l.a)(c,2),i=a[0],d=a[1],u=Object(r.useState)(n.starting_qualities),O=Object(l.a)(u,2),x=O[0],A=O[1],v=Object(r.useState)(i?i.name:""),m=Object(l.a)(v,2),p=m[0],_=m[1],q=function(e){switch(e.operator){case"==":if(x[e.quality]===e.value)return!0;break;case"!=":if(x[e.quality]!==e.value)return!0;break;case"<=":if(x[e.quality]<=e.value)return!0;break;case">=":if(x[e.quality]>=e.value)return!0;break;case">":if(x[e.quality]>e.value)return!0;break;case"<":if(x[e.quality]<e.value)return!0;break;default:alert("Unknown operator")}},y=function e(t,n){switch(n){case"AND":var r,c=Object(o.a)(t);try{for(c.s();!(r=c.n()).done;){var a=r.value;if(void 0!==a.group_type&&!e(a.requirements,a.group_type))return!1;if(!q(a))return!1}}catch(j){c.e(j)}finally{c.f()}return!0;case"OR":var i,s=Object(o.a)(t);try{for(s.s();!(i=s.n()).done;){var d=i.value;if(void 0!==d.group_type&&e(d,d.group_type))return!0;if(q(d))return!0}}catch(j){s.e(j)}finally{s.f()}return!1;default:alert("wrong group_type")}},w=function(e){return void 0===e.requirements||y(e.requirements,"AND")},k=function e(t){if(void 0===i.on_exit_effects||!E(i.on_exit_effects))switch(t){case"WIN":alert("Here you would complete the adventure in real game and recieve loot.");break;case"FAIL":alert("Here you would lose the adventure in real game and get dealt half integrity as damage.");break;case"FAIL_DEATH":alert("Here you would lose the adventure in real game and blown up.");break;case"GO_BACK":e(p.name);break;default:var r=n.nodes.find((function(e){return e.name===t}));if(d(r),p!==r.name&&_(r.name),void 0!==r.on_enter_effects&&E(r.on_enter_effects))return}},R=[],D=function(){if(void 0!==n.triggers){var e,t=Object(o.a)(n.triggers);try{for(t.s();!(e=t.n()).done;){var r=e.value;if(y(r.requirements,"AND")){if(!R.includes(r))return R.push(r),void 0!==r.on_trigger_effects&&E(r.on_trigger_effects)||void 0!==r.target_node&&k(r.target_node),!0;alert("Recursive trigger detected. ".concat(r.name))}}}catch(c){t.e(c)}finally{t.f()}}return R.length=0,!1},S=function(e){if(e===Object(e))switch(e.value_type){case z.random:return t=e.low,n=e.high,t=Math.ceil(t),n=Math.floor(n),Math.floor(Math.random()*(n-t)+t);default:alert("wrong value type")}var t,n;return e},E=function(e){var t,n=Object(o.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value,c=S(r.value);switch(r.effect_type){case Y.Add:var a=Object(j.a)(Object(j.a)({},x),{},Object(C.a)({},r.quality,(x[r.quality]||0)+c));A(a);break;case Y.Set:var i=Object(j.a)(Object(j.a)({},x),{},Object(C.a)({},r.quality,c));A(i);break;case Y.Remove:var s=Object(j.a)({},x);delete s[r.quality],A(s);break;default:alert("wrong effect type")}}}catch(d){n.e(d)}finally{n.f()}return!!D()};return i?Object($.jsxs)(h.a,{children:[Object($.jsx)(be.a,{variant:"danger",children:"Delays are not implemented. Choices shown as disabled would not be visible in-game"}),Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(g.a,{onClick:function(){d(n.nodes.find((function(e){return e.name===n.starting_node}))||n.nodes[0]),A(n.starting_qualities),_(i.name)},children:"Restart"})})}),Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsxs)(P.a,{children:[Object($.jsx)(P.a.Img,{src:i.raw_image?i.raw_image:W[i.image]}),Object($.jsxs)(P.a.Body,{children:[Object($.jsx)(P.a.Text,{children:i.description}),Object($.jsx)(h.a,{children:i.choices.map((function(e){return Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(g.a,{disabled:!w(e),onClick:function(){return function(e){void 0!==e.on_selection_effects&&E(e.on_selection_effects)||k(e.exit_node)}(e)},children:e.name})})},e.id)}))})]})]})})}),Object($.jsx)(b.a,{children:Object($.jsxs)(ie.a,{children:[Object($.jsx)("thead",{children:Object($.jsxs)("tr",{children:[Object($.jsx)("th",{children:"Quality"}),Object($.jsx)("th",{children:"Value"})]})}),Object($.jsx)("tbody",{children:Object.keys(x).map((function(e){return Object($.jsxs)("tr",{children:[Object($.jsx)("td",{children:e}),Object($.jsx)("td",{children:x[e]})]},e)}))})]})})]}):Object($.jsx)(be.a,{variant:"danger",children:"You need at least one node to play."})}function Oe(){var e=Object(s.e)(B),t=Object(l.a)(e,2),n=t[0],c=t[1],a=Object(s.e)(G),i=Object(l.a)(a,1)[0],_=Object(s.e)(U),C=Object(l.a)(_,1)[0],q=Object(r.useState)(""),w=Object(l.a)(q,2),k=w[0],E=w[1],I=Object(r.useState)(null),N=Object(l.a)(I,2),T=N[0],Q=N[1],L=function e(t){var n,r=Object(o.a)(t);try{for(r.s();!(n=r.n()).done;){var c=n.value;c.id=R("req"),void 0!==c.group_type&&void 0!==c.requirements&&e(c.requirements)}}catch(a){r.e(a)}finally{r.f()}},P=function(e){var t,n=Object(o.a)(e);try{for(n.s();!(t=n.n()).done;){t.value.id=R("effect")}}catch(r){n.e(r)}finally{n.f()}},F=Object(r.useRef)(),M=Object(r.useRef)(),K=k||function(){if(i.length)return i[0].id.toString()}(),H=n.starting_node||function(){if(i.length)return i[0].name}(),V=Object(r.useState)(!1),W=Object(l.a)(V,2),Y=W[0],z=W[1],ee=function(){z(!Y)};return Object($.jsxs)($.Fragment,{children:[Object($.jsx)(u.a,{show:Y,onHide:ee,children:Object($.jsx)(fe,{adventure:n})}),Object($.jsxs)(h.a,{children:[Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsxs)(O.a,{children:[Object($.jsx)(g.a,{onClick:function(){var e={adventure_name:n.name,author:n.author,starting_node:H,starting_qualities:n.starting_qualities,required_site_traits:n.required_site_traits,loot_categories:n.loot_types,scan_band_mods:n.band_modifiers,deep_scan_description:n.deep_scan_description,triggers:n.triggers,nodes:i},t=new Blob([JSON.stringify(e,(function(e,t){if("id"!==e)return t}))],{type:"application/json"}),r=URL.createObjectURL(t);M.current.href=r,M.current.download="".concat(n.name,".json"),M.current.click()},children:"Export"}),Object($.jsx)("a",{ref:M,style:{display:"none"},href:"/",children:"God is this really how JS supposed to work"}),Object($.jsx)(g.a,{onClick:function(){F.current.click()},children:"Import"}),Object($.jsx)(x.a.File,{onChange:function(e){var t=new FileReader;t.onload=function(e){var t=JSON.parse(e.target.result),r=function(e){var t,n=Object(o.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;r.id=R("Node");var c,a=Object(o.a)(r.choices);try{for(a.s();!(c=a.n()).done;){var i=c.value;i.id=R("choice"),void 0!==i.on_selection_effects&&P(i.on_selection_effects),void 0!==i.requirements&&L(i.requirements)}}catch(s){a.e(s)}finally{a.f()}void 0!==r.on_enter_effects&&P(r.on_enter_effects),void 0!==r.on_exit_effects&&P(r.on_exit_effects)}}catch(s){n.e(s)}finally{n.f()}return e}(t.nodes),a=function(e){var t,n=Object(o.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;r.id=R("trigger"),void 0!==r.requirements&&L(r.requirements),void 0!==r.on_trigger_effects&&P(r.on_trigger_effects)}}catch(c){n.e(c)}finally{n.f()}return e}(t.triggers),i=Object(j.a)(Object(j.a)({},n),{},{name:t.adventure_name,author:t.author,starting_node:t.starting_node,starting_qualities:t.starting_qualities,required_site_traits:t.required_site_traits,band_modifiers:t.scan_band_mods,loot_types:t.loot_categories,triggers:a,nodes:r});c(i)},t.readAsText(e.target.files[0])},accept:".json",ref:F,style:{display:"none"}}),Object($.jsx)(g.a,{onClick:ee,children:"Test"})]})})}),Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(se,{title:"Adventure Config",children:Object($.jsxs)(x.a,{children:[Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Adventure name"}),Object($.jsx)(v.a,{placeholder:"New adventure",value:n.name,onChange:function(e){return c(y(n,"name",e.target.value))}})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Author"}),Object($.jsx)(v.a,{value:n.author,onChange:function(e){return c(y(n,"author",e.target.value))}})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Starting node"}),Object($.jsx)(oe,{value:H,onChange:function(e){return c(y(n,"starting_node",e.target.value))},allowCustom:!1})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Starting qualities"}),Object($.jsx)(de,{adventureProp:"starting_qualities"})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Required site traits"}),Object($.jsx)(je,{presetValues:J,adventureProp:"required_site_traits"})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Loot type"}),Object($.jsx)(je,{presetValues:Z,adventureProp:"loot_types"})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Scanning modifiers"}),Object($.jsx)(de,{presetKeys:X,adventureProp:"band_modifiers"})]}),Object($.jsxs)(A.a,{children:[Object($.jsx)(x.a.Label,{children:"Deep scan description"}),Object($.jsx)(v.a,{value:n.deep_scan_description,onChange:function(e){return c(y(n,"deep_scan_description",e.target.value))}})]})]})})})}),Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(se,{title:"Nodes",children:Object($.jsxs)(m.a.Container,{id:"nodes",activeKey:K,onSelect:function(e){return E(e)},children:[Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsxs)(p.a,{variant:"tabs",children:[i.map((function(e){return Object($.jsx)(p.a.Item,{draggable:!0,onDragEnd:function(e){Q(null)},onDragStart:function(t){return function(e,t){Q(t)}(0,e)},onDrop:function(){return function(e){if(null!=T){var t=i.indexOf(e),r=i.indexOf(T),a=i.slice(),s=[a[r],a[t]];a[t]=s[0],a[r]=s[1],c(y(n,"nodes",a))}}(e)},onDragOver:function(t){return function(e,t){null!=T&&t!==T&&e.preventDefault()}(t,e)},children:Object($.jsx)(p.a.Link,{eventKey:e.id,children:e.name})},e.id)})),Object($.jsx)(p.a.Item,{children:Object($.jsx)(p.a.Link,{onClick:function(){var e=Object(j.a)(Object(j.a)({},n),{},{nodes:[].concat(Object(d.a)(i),[new D])});c(e)},children:"Add Node"})})]})})}),Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(m.a.Content,{children:i.map((function(e){return Object($.jsx)(m.a.Pane,{eventKey:e.id,children:Object($.jsx)(ue,{node:e,handleNodeDeletion:function(){return function(e){var t=i.filter((function(t){return t!==e}));c(y(n,"nodes",t))}(e)}})},e.id)}))})})})]})})})}),Object($.jsx)(b.a,{children:Object($.jsx)(f.a,{children:Object($.jsx)(se,{title:"Triggers",startCollapsed:!0,children:Object($.jsx)(h.a,{children:Object($.jsxs)(b.a,{children:[C.map((function(e){return Object($.jsx)(f.a,{xl:"auto",children:Object($.jsx)(he,{trigger:e,handleDeletion:function(){return function(e){var t=C.filter((function(t){return t!==e}));c(y(n,"triggers",t))}(e)}})},e.id)})),Object($.jsx)(f.a,{children:Object($.jsx)(g.a,{onClick:function(){var e=Object(j.a)(Object(j.a)({},n),{},{triggers:[].concat(Object(d.a)(C),[new S])});c(e)},children:"Add Trigger"})})]})})})})})]})]})}var ge=function(){return Object($.jsx)(s.a,{children:Object($.jsx)(Oe,{})})},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,85)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))};i.a.render(Object($.jsx)(c.a.StrictMode,{children:Object($.jsx)(ge,{})}),document.getElementById("root")),xe()}},[[69,1,2]]]);
//# sourceMappingURL=main.ab1a0e4e.chunk.js.map