(function(){"use strict";var e={5611:function(e,t,n){var i=n(144),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary"}},[n("a",{attrs:{href:"https://whitenightawa.github.io/Aeroplane-Chess/"}},[n("v-icon",{attrs:{"x-large":""}},[e._v("mdi-chess-pawn")])],1),n("a",{attrs:{href:"https://whitenightawa.github.io/Aeroplane-Chess/"}},[n("h1",{staticClass:"white--text"},[e._v("Aeroplane Chess")])]),n("v-spacer"),n("v-subheader",{staticClass:"white--text"},[e._v(" Your client ID: "),null!==e.clientId?n("code",[e._v(e._s(e.clientId))]):n("code",[e._v("Getting Id...")])]),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.changeTheme()}}},[e.$vuetify.theme.dark?n("v-icon",{staticClass:"white--text"},[e._v("mdi-white-balance-sunny")]):n("v-icon",{staticClass:"white--text"},[e._v("mdi-weather-night")])],1)],1),n("v-main",[e._v(" "+e._s(e.game)+" "),n("v-tabs-items",{staticClass:"fill-height",model:{value:e.page,callback:function(t){e.page=t},expression:"page"}},[n("v-tab-item",{staticClass:"fill-height",attrs:{value:"select"}},[n("v-container",{staticClass:"fill-height justify-space-around flex-column"},[n("v-card",{staticClass:"pa-8 justify-center align-center flex-column",staticStyle:{width:"100%",height:"45%",display:"flex"}},[n("h1",[e._v("Create new Game")]),n("v-btn",{on:{click:function(t){e.createGame(),e.page="create"}}},[e._v("Create")])],1),n("v-card",{staticClass:"pa-8 justify-center align-center flex-column",staticStyle:{width:"100%",height:"45%",display:"flex"}},[n("v-spacer"),n("h1",[e._v("Join Game")]),n("v-text-field",{staticStyle:{width:"100%"},attrs:{height:"50px",label:"Game ID",type:"password"},on:{keyup:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;""!==e.inputGameId&&e.join()}},model:{value:e.inputGameId,callback:function(t){e.inputGameId=t},expression:"inputGameId"}}),n("v-btn",{attrs:{disabled:""===e.inputGameId},on:{click:function(t){return e.join()}}},[e._v("JOIN")]),n("v-spacer")],1)],1)],1),n("v-tab-item",{staticClass:"fill-height",attrs:{value:"create"}},[n("v-container",{staticClass:"fill-height justify-center flex-column"},[n("v-card",{staticClass:"pa-4 ma-4"},[n("v-text-field",{attrs:{label:"Your name"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.updateName()}},scopedSlots:e._u([{key:"append-outer",fn:function(){return[n("v-btn",{attrs:{disabled:e.orgName===e.editName,icon:""},on:{click:function(t){return e.updateName()}}},[n("v-icon",[e._v(" mdi-content-save ")])],1)]},proxy:!0}]),model:{value:e.editName,callback:function(t){e.editName=t},expression:"editName"}})],1),n("v-alert",{attrs:{type:"info",prominent:""}},[e._v(" Your game id will be "),null!==e.game?n("code",{staticStyle:{"user-select":"none"}},[n("span",{class:{white:!e.showGameId}},[e._v(e._s(e.game.id))])]):e._e(),n("v-btn",{attrs:{icon:""},on:{click:function(t){e.showGameId=!e.showGameId}}},[e.showGameId?n("v-icon",[e._v("mdi-eye-off")]):n("v-icon",[e._v("mdi-eye")])],1),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.copy(e.urlHost+"?joinId="+e.game.id)}}},[n("v-icon",[e._v("mdi-content-copy")])],1)],1)],1)],1),n("v-tab-item",{staticClass:"fill-height",attrs:{value:"wait"}},[null!==e.game?n("v-container",{staticClass:"fill-height flex-column justify-center align-center"},[n("v-card",{staticClass:"pa-4 ma-4"},[n("v-text-field",{attrs:{label:"Your name"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.updateName()}},scopedSlots:e._u([{key:"append-outer",fn:function(){return[n("v-btn",{attrs:{disabled:e.orgName===e.editName,icon:""},on:{click:function(t){return e.updateName()}}},[n("v-icon",[e._v(" mdi-content-save ")])],1)]},proxy:!0}],null,!1,1496698030),model:{value:e.editName,callback:function(t){e.editName=t},expression:"editName"}}),n("v-alert",{attrs:{type:"info",prominent:""}},[e._v(" Your game id will be "),null!==e.game?n("code",{staticStyle:{"user-select":"none"}},[n("span",{class:{white:!e.showGameId}},[e._v(e._s(e.game.id))])]):e._e(),n("v-btn",{attrs:{icon:""},on:{click:function(t){e.showGameId=!e.showGameId}}},[e.showGameId?n("v-icon",[e._v("mdi-eye-off")]):n("v-icon",[e._v("mdi-eye")])],1),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.copy(e.urlHost+"?joinId="+e.game.id)}}},[n("v-icon",[e._v("mdi-content-copy")])],1)],1)],1),n("v-progress-circular",{staticClass:"ma-6",attrs:{indeterminate:"",color:"primary",size:"100"}}),n("h2",[e._v("Waiting the host to start")]),n("h6",{staticClass:"grey--text"},[e._v("Reload this page if you want to quit.")])],1):e._e()],1)],1),n("v-dialog",{model:{value:e.errDia,callback:function(t){e.errDia=t},expression:"errDia"}},[n("v-card",{staticClass:"fill-height",attrs:{color:"error"}},[n("v-card-title",{staticClass:"white--text text-center"},[e._v(" "+e._s(e.err)+" ")])],1)],1),null!==e.game?n("v-card",{staticClass:"userComp"},[n("v-expansion-panels",{attrs:{accordion:"",multiple:""}},[n("v-expansion-panel",[n("v-expansion-panel-header",[e._v(" Players ")]),n("v-divider"),n("v-expansion-panel-content",[n("v-list",{attrs:{dense:""}},e._l(e.game.clients,(function(t){return n("v-list-item",{key:t.id},[n("v-list-item-icon",[t.host?n("v-icon",{attrs:{color:"yellow",large:""}},[e._v(" mdi-crown ")]):e._e()],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.name))]),n("v-list-item-subtitle",[e._v(e._s(t.clientId))])],1),n("v-list-item-action",[t.host?e._e():n("v-btn",{attrs:{icon:"",disabled:!e.game.clients.filter((function(t){return t.clientId===e.clientId}))[0].host},on:{click:function(n){return e.kick(t.clientId)}}},[n("v-icon",[e._v("mdi-account-remove")])],1)],1)],1)})),1)],1)],1),n("ChatComp",{attrs:{m:e.messages,gameId:e.game.id,client:e.clientId},on:{"update:m":function(t){e.messages=t}}})],1)],1):e._e(),n("v-snackbar",{attrs:{color:e.snackbarColor},scopedSlots:e._u([{key:"action",fn:function(t){var i=t.attrs;return[n("v-btn",e._b({attrs:{icon:""},on:{click:function(t){e.snackbar=!1}}},"v-btn",i,!1),[n("v-icon",[e._v("mdi-close")])],1)]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[n("v-icon",[e._v("mdi-"+e._s(e.snackbarIcon))]),e._v(" "+e._s(e.snackbarMessage)+" ")],1)],1)],1)},s=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-expansion-panel",[n("v-expansion-panel-header",[e._v(" Chat ")]),n("v-divider"),n("v-expansion-panel-content",[n("v-container",{staticClass:"mt-4"},[n("v-row",{staticClass:"mb-4"},[n("v-card",{staticClass:"pa-3",staticStyle:{width:"100%"}},[n("v-row",[n("v-virtual-scroll",{attrs:{items:e.messages,height:"300","item-height":"64",id:"chatBox","emit-update":!0},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.item;return[n("v-list-item",[n("v-list-item-content",{class:{"text-right":i.id===e.clientId}},[n("h4",[e._v(e._s(i.name)),i.id===e.clientId?n("span",[e._v("(me)")]):e._e()]),n("p",{staticStyle:{overflow:"inherit"}},[e._v(" "+e._s(i.message)+" ")])])],1)]}}])})],1),n("v-row",[n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.scrollDown()}}},[n("v-icon",[e._v(" mdi-chevron-down ")])],1)],1)],1)],1),n("v-row",[n("v-text-field",{attrs:{outlined:""},on:{keyup:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;""!==e.message&&e.sendMessage()}},scopedSlots:e._u([{key:"append-outer",fn:function(){return[n("v-btn",{attrs:{disabled:""===e.message,icon:""},on:{click:function(t){return e.sendMessage()}}},[n("v-icon",[e._v(" mdi-send ")])],1)]},proxy:!0}]),model:{value:e.message,callback:function(t){e.message=t},expression:"message"}})],1)],1)],1)],1)},r=[],c={name:"ChatComp",props:{client:String,gameId:String,m:Array},data(){return{message:"",ws:this.$root.ws,clientId:this.client}},methods:{scrollDown:function(){let e=this.$el.querySelector("#chatBox");e.scrollTop=e.scrollHeight},sendMessage:function(){const e={method:"sendMessage",id:this.clientId,message:this.message,gameId:this.gameId};this.ws.send(JSON.stringify(e)),this.message=""}},computed:{messages:{get(){return this.m},set(e){this.$emit("update:m",e)}}},mounted(){}},l=c,d=n(1001),m=n(3453),u=n.n(m),h=n(3150),v=n(3237),p=n(9846),f=n(1418),g=n(6845),k=n(2443),b=n(1192),y=n(6428),w=n(7620),I=n(352),_=n(2877),x=n(9762),C=n(5337),Z=n(5683),V=(0,d.Z)(l,o,r,!1,null,"6b8a3174",null),S=V.exports;u()(V,{VBtn:h.Z,VCard:v.Z,VContainer:p.Z,VDivider:f.Z,VExpansionPanel:g.Z,VExpansionPanelContent:k.Z,VExpansionPanelHeader:b.Z,VIcon:y.Z,VListItem:w.Z,VListItemContent:I.km,VRow:_.Z,VSpacer:x.Z,VTextField:C.Z,VVirtualScroll:Z.Z});var N={name:"App",components:{ChatComp:S},data(){return{clientId:null,ws:this.$root.ws,game:null,errDia:!1,err:"",page:"select",showGameId:!1,inputGameId:"",sendJoin:!1,editName:"",orgName:"",message:"",snackbar:!1,snackbarColor:"success",snackbarMessage:"test",snackbarIcon:"check",messages:[],urlHost:document.location.href}},methods:{changeTheme:function(){this.$vuetify.theme.dark=!this.$vuetify.theme.dark,window.localStorage.setItem("isDark",this.$vuetify.theme.dark.toString())},updateName:function(){const e={clientId:this.clientId,method:"updateName",name:this.editName,game:this.game};this.ws.send(JSON.stringify(e))},createGame:function(){const e={method:"create",clientId:this.clientId};this.ws.send(JSON.stringify(e))},copy:function(e){navigator.clipboard.writeText(e)},join:function(){const e={method:"join",clientId:this.clientId,gameId:this.inputGameId};this.ws.send(JSON.stringify(e)),this.sendJoin=!0},kick:function(e){const t={method:"kick",clientId:e,gameId:this.game.id};this.ws.send(JSON.stringify(t))},scrollDown:function(){let e=this.$el.querySelector("#chatBox");e.scrollTop=e.scrollHeight}},mounted(){let e=window.localStorage.getItem("isDark");null===e?(e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,window.localStorage.setItem("isDark",e.toString()),this.$vuetify.theme.dark=e):this.$vuetify.theme.dark="true"===e,window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(t=>{e=!t.matches,window.localStorage.setItem("isDark",e.toString()),this.$vuetify.theme.dark="true"===e})),this.ws.onmessage=e=>{const t=JSON.parse(e.data);if(console.log(t),"connect"===t.method){console.log(t.clientId),this.clientId=t.clientId,this.snackbarMessage="Connected to ws server!",this.snackbarColor="success",this.snackbar=!0;const e=Object.fromEntries(new URLSearchParams(window.location.search));void 0!==e.joinId&&(this.inputGameId=e.joinId,this.join(),window.history.replaceState(null,null,"?"))}"create"===t.method&&(console.log(t.game),this.game=t.game,this.editName=this.game.clients.filter((e=>e.clientId===this.clientId))[0].name,this.orgName=this.editName,this.snackbarMessage="Successfully created a new game!",this.snackbarColor="success",this.snackbar=!0),"join"===t.method&&(this.game=t.game,this.sendJoin?(this.page="wait",this.sendJoin=!1,this.editName=t.name,this.orgName=t.name):(this.snackbarIcon="plus",this.snackbarMessage=`${t.name} join this Game!`,this.snackbarColor="success",this.snackbar=!0)),"updateName"===t.method&&(this.game=t.game,this.editName===t.name&&(this.editName=t.name,this.orgName=this.editName)),"kick"===t.method&&(t.clientId===this.clientId?(this.err="You has been kicked by the Host!",this.errDia=!0,this.page="select",this.game=null):(this.game=t.game,this.snackbarIcon="karate",this.snackbarColor="error",this.snackbarMessage=`${t.name} has been kick by the Host!`,this.snackbar=!0)),"left"===t.method&&(this.game=t.game,this.snackbarIcon="exit-run",this.snackbarColor="error",this.snackbarMessage=`${t.name} has left this game!`,this.snackbar=!0),"sendMessage"===t.method&&(delete t.method,this.messages.push(t),setTimeout((()=>{this.scrollDown()}),100)),"joinError"===t.method&&(this.err=t.error,this.errDia=!0)}}},j=N,O=n(1234),G=n(7524),D=n(9439),M=n(7118),E=n(2912),$=n(5630),T=n(6816),P=n(3099),J=n(459),L=n(7877),A=n(624),H=n(3202),B=n(5533),Y=n(1759),q=n(1954),F=(0,d.Z)(j,a,s,!1,null,null,null),R=F.exports;u()(F,{VAlert:O.Z,VApp:G.Z,VAppBar:D.Z,VBtn:h.Z,VCard:v.Z,VCardTitle:M.EB,VContainer:p.Z,VDialog:E.Z,VDivider:f.Z,VExpansionPanel:g.Z,VExpansionPanelContent:k.Z,VExpansionPanelHeader:b.Z,VExpansionPanels:$.Z,VIcon:y.Z,VList:T.Z,VListItem:w.Z,VListItemAction:P.Z,VListItemContent:I.km,VListItemIcon:J.Z,VListItemSubtitle:I.oZ,VListItemTitle:I.V9,VMain:L.Z,VProgressCircular:A.Z,VSnackbar:H.Z,VSpacer:x.Z,VSubheader:B.Z,VTabItem:Y.Z,VTabsItems:q.Z,VTextField:C.Z});var W=n(1910);i.Z.use(W.Z);var z=new W.Z({});i.Z.config.productionTip=!1,new i.Z({vuetify:z,render:e=>e(R),data(){return{ws:new WebSocket("wss://desert-smart-apology.glitch.me/")}}}).$mount("#app")}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,i,a,s){if(!i){var o=1/0;for(d=0;d<e.length;d++){i=e[d][0],a=e[d][1],s=e[d][2];for(var r=!0,c=0;c<i.length;c++)(!1&s||o>=s)&&Object.keys(n.O).every((function(e){return n.O[e](i[c])}))?i.splice(c--,1):(r=!1,s<o&&(o=s));if(r){e.splice(d--,1);var l=a();void 0!==l&&(t=l)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[i,a,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var a,s,o=i[0],r=i[1],c=i[2],l=0;if(o.some((function(t){return 0!==e[t]}))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(c)var d=c(n)}for(t&&t(i);l<o.length;l++)s=o[l],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},i=self["webpackChunkhtml"]=self["webpackChunkhtml"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(5611)}));i=n.O(i)})();
//# sourceMappingURL=app.d00451e5.js.map