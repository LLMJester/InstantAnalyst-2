(()=>{"use strict";var e={5248:(e,r,n)=>{n(3792),n(3362),n(9085),n(9391);var t=n(3751),i=(n(2675),n(9463),n(2010),n(641)),s=n(33),o={class:"app-container"},a={class:"controls"},c={key:0,class:"recording-info"},u={class:"recording-timer"},l={class:"transcript-container"},d={class:"transcript"},p={key:1,class:"requirement-form"},h={key:0,class:"requirement-count"},m={class:"form-group"},g={class:"form-group"},v={class:"navigation-buttons"},f=["disabled"],k={class:"action-buttons"},R=["disabled"],q=["disabled"],b={class:"requirements-table"};function x(e,r,n,x,A,C){return(0,i.uX)(),(0,i.CE)("div",o,[r[17]||(r[17]=(0,i.Lk)("h1",null,"Requirements Voice Capture",-1)),(0,i.Lk)("div",a,[(0,i.Lk)("button",{onClick:r[0]||(r[0]=function(){return C.toggleRecording&&C.toggleRecording.apply(C,arguments)}),class:(0,s.C4)({recording:A.isRecording})},(0,s.v_)(A.isRecording?"Stop Recording":"Start Recording"),3),(0,i.Lk)("div",{class:(0,s.C4)(["status-indicator",{active:A.isRecording}])},null,2),(0,i.Lk)("button",{onClick:r[1]||(r[1]=function(){return C.clearTranscript&&C.clearTranscript.apply(C,arguments)}),class:"clear-button"},"Clear Transcript")]),A.isRecording?((0,i.uX)(),(0,i.CE)("div",c,[r[8]||(r[8]=(0,i.Lk)("div",{class:"recording-message"},"Recording... (Captures up to 30 seconds of audio at a time)",-1)),(0,i.Lk)("div",u,(0,s.v_)(Math.floor(A.recordingDuration/1e3))+" seconds",1)])):(0,i.Q3)("",!0),(0,i.Lk)("div",l,[r[9]||(r[9]=(0,i.Lk)("h3",null,"Current Transcript",-1)),(0,i.Lk)("div",d,(0,s.v_)(A.currentTranscript),1)]),A.currentRequirement?((0,i.uX)(),(0,i.CE)("div",p,[(0,i.Lk)("h3",null,[r[10]||(r[10]=(0,i.eW)("Current Requirement ")),A.pendingRequirements.length>0?((0,i.uX)(),(0,i.CE)("span",h,"("+(0,s.v_)(A.pendingRequirements.length+1)+" total)",1)):(0,i.Q3)("",!0)]),(0,i.Lk)("div",m,[r[11]||(r[11]=(0,i.Lk)("label",{for:"name"},"Requirement Name",-1)),(0,i.bo)((0,i.Lk)("input",{id:"name","onUpdate:modelValue":r[2]||(r[2]=function(e){return A.currentRequirement.name=e}),placeholder:"Enter requirement name"},null,512),[[t.Jo,A.currentRequirement.name]])]),(0,i.Lk)("div",g,[r[12]||(r[12]=(0,i.Lk)("label",{for:"description"},"Requirement Description",-1)),(0,i.bo)((0,i.Lk)("textarea",{id:"description","onUpdate:modelValue":r[3]||(r[3]=function(e){return A.currentRequirement.description=e}),placeholder:"Enter or verify the transcribed requirement description"},null,512),[[t.Jo,A.currentRequirement.description]])]),(0,i.Lk)("div",v,[(0,i.Lk)("button",{onClick:r[4]||(r[4]=function(){return C.previousRequirement&&C.previousRequirement.apply(C,arguments)}),class:"nav-button",disabled:0===A.navigationHistory.length},r[13]||(r[13]=[(0,i.Lk)("span",{class:"arrow"},"←",-1),(0,i.eW)(" Previous ")]),8,f),(0,i.Lk)("div",k,[(0,i.Lk)("button",{onClick:r[5]||(r[5]=function(){return C.saveCurrentRequirement&&C.saveCurrentRequirement.apply(C,arguments)}),disabled:!A.currentRequirement.name||!A.currentRequirement.description,class:"save-button"}," Save Requirement ",8,R),(0,i.Lk)("button",{onClick:r[6]||(r[6]=function(){return C.deleteCurrentRequirement&&C.deleteCurrentRequirement.apply(C,arguments)}),class:"delete-button"}," Delete ")]),(0,i.Lk)("button",{onClick:r[7]||(r[7]=function(){return C.nextRequirement&&C.nextRequirement.apply(C,arguments)}),class:"nav-button",disabled:0===A.pendingRequirements.length},r[14]||(r[14]=[(0,i.eW)(" Next "),(0,i.Lk)("span",{class:"arrow"},"→",-1)]),8,q)])])):(0,i.Q3)("",!0),(0,i.Lk)("div",b,[r[16]||(r[16]=(0,i.Lk)("h3",null,"Requirements List",-1)),(0,i.Lk)("table",null,[r[15]||(r[15]=(0,i.Lk)("thead",null,[(0,i.Lk)("tr",null,[(0,i.Lk)("th",null,"Requirement Name"),(0,i.Lk)("th",null,"Requirement Description")])],-1)),(0,i.Lk)("tbody",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(A.savedRequirements,(function(e,r){return(0,i.uX)(),(0,i.CE)("tr",{key:r},[(0,i.Lk)("td",null,(0,s.v_)(e.name),1),(0,i.Lk)("td",null,(0,s.v_)(e.description),1)])})),128))])])])])}var A=n(3604),C=n(9258),y=n(459),w=n(388);n(1629),n(4423),n(4114),n(5086),n(3609),n(9089),n(739),n(8111),n(7588),n(3579),n(3110),n(6099),n(7495),n(1699),n(744),n(3500),n(6031);const L={name:"App",data:function(){return{isRecording:!1,recorder:null,audioContext:null,analyser:null,currentTranscript:"",pendingRequirements:[],currentRequirement:null,savedRequirements:[],refreshInterval:null,micStream:null,recordingStartTime:null,recordingChunks:[],processingAudio:!1,apiBaseUrl:"http://localhost:3000",recordingStartedAt:null,recordingDuration:0,navigationHistory:[],timerInterval:null}},methods:{getApiUrl:function(){return this.apiBaseUrl},fetchRequirements:function(){var e=this;return(0,w.A)((0,y.A)().mark((function r(){var n;return(0,y.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,fetch("".concat(e.getApiUrl(),"/api/requirements"));case 3:if(n=r.sent,!n.ok){r.next=8;break}return r.next=7,n.json();case 7:e.savedRequirements=r.sent;case 8:r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),console.error("Error fetching requirements:",r.t0);case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},fetchTranscript:function(){var e=this;return(0,w.A)((0,y.A)().mark((function r(){var n,t;return(0,y.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,fetch("".concat(e.getApiUrl(),"/api/transcript"));case 3:if(n=r.sent,!n.ok){r.next=9;break}return r.next=7,n.json();case 7:t=r.sent,e.currentTranscript=t.transcript;case 9:r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](0),console.error("Error fetching transcript:",r.t0);case 14:case"end":return r.stop()}}),r,null,[[0,11]])})))()},clearTranscript:function(){this.currentTranscript="",fetch("".concat(this.getApiUrl(),"/api/clear-transcript"),{method:"POST"})["catch"]((function(e){console.error("Error clearing transcript:",e),alert("Could not connect to the server. Please ensure the backend is running on port 3000.")}))},toggleRecording:function(){this.isRecording?this.stopRecording():this.startRecording()},startRecording:function(){var e=this;return(0,w.A)((0,y.A)().mark((function r(){var n;return(0,y.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e.recordingStartedAt=Date.now(),e.recordingDuration=0,e.timerInterval=setInterval((function(){e.recordingDuration=Date.now()-e.recordingStartedAt}),100),r.next=6,navigator.mediaDevices.getUserMedia({audio:{channelCount:1,sampleRate:48e3,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});case 6:e.micStream=r.sent,n={mimeType:"audio/webm;codecs=opus",audioBitsPerSecond:128e3},e.recorder=new MediaRecorder(e.micStream,n),e.recordingChunks=[],e.recorder.ondataavailable=function(r){r.data.size>0&&(console.log("Audio chunk received, size:",r.data.size),e.recordingChunks.push(r.data))},e.recorder.start(5e3),e.isRecording=!0,e.refreshInterval=setInterval((function(){var r=Date.now()-e.recordingStartedAt;console.log("Recording time: ".concat(r/1e3," seconds")),r>=3e4&&e.recordingChunks.length>0&&(console.log("Processing 30 seconds of audio chunks:",e.recordingChunks.length),e.processAudioAndUpdateTranscript(),e.recordingStartedAt=Date.now())}),5e3),console.log("Recording started successfully"),r.next=21;break;case 17:r.prev=17,r.t0=r["catch"](0),console.error("Error starting recording:",r.t0),alert("Could not access microphone. Please ensure you have granted permission.");case 21:case"end":return r.stop()}}),r,null,[[0,17]])})))()},processAudioAndUpdateTranscript:function(){var e=this;return(0,w.A)((0,y.A)().mark((function r(){var n,t,i;return(0,y.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(0!==e.recordingChunks.length){r.next=3;break}return console.log("No audio chunks to process"),r.abrupt("return");case 3:if(!e.processingAudio){r.next=6;break}return console.log("Already processing audio, skipping this batch"),r.abrupt("return");case 6:if(console.log("Start processing audio chunks"),e.processingAudio=!0,r.prev=8,n=(0,C.A)(e.recordingChunks),e.recordingChunks=[],t=new Blob(n,{type:"audio/webm;codecs=opus"}),console.log("Audio blob created, size:",t.size),!(t.size<1e3)){r.next=17;break}return console.log("Audio blob too small, skipping"),e.processingAudio=!1,r.abrupt("return");case 17:i=new FileReader,i.onloadend=(0,w.A)((0,y.A)().mark((function r(){var n,t,s,o;return(0,y.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=i.result.split(",")[1],console.log("Audio converted to base64, length:",n.length),r.prev=2,console.log("Sending audio to server for transcription"),r.next=6,fetch("".concat(e.getApiUrl(),"/api/transcribe"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({audioData:n})});case 6:if(t=r.sent,!t.ok){r.next=16;break}return r.next=10,t.json();case 10:s=r.sent,console.log("Transcription received:",s),s.fullText&&(e.currentTranscript=s.fullText),s.requirements&&s.requirements.length>0&&(console.log("Requirements detected:",s.requirements.length),s.requirements.forEach((function(r){e.isDuplicateRequirement(r)||e.pendingRequirements.push(r)})),!e.currentRequirement&&e.pendingRequirements.length>0&&(e.currentRequirement=e.pendingRequirements.shift())),r.next=20;break;case 16:return r.next=18,t.text();case 18:o=r.sent,console.error("Server returned an error:",o);case 20:r.next=26;break;case 22:r.prev=22,r.t0=r["catch"](2),console.error("Network error when sending audio:",r.t0),alert("Could not connect to the server. Please make sure the backend is running on port 3000.");case 26:e.processingAudio=!1;case 27:case"end":return r.stop()}}),r,null,[[2,22]])}))),i.onerror=function(r){console.error("Error reading audio file:",r),e.processingAudio=!1},i.readAsDataURL(t),r.next=27;break;case 23:r.prev=23,r.t0=r["catch"](8),console.error("Error processing audio:",r.t0),e.processingAudio=!1;case 27:case"end":return r.stop()}}),r,null,[[8,23]])})))()},isDuplicateRequirement:function(e){var r=this;if(this.currentRequirement&&this.similarText(this.currentRequirement.name,e.name)&&this.similarText(this.currentRequirement.description,e.description))return!0;var n=this.pendingRequirements.some((function(n){return r.similarText(n.name,e.name)&&r.similarText(n.description,e.description)}));if(n)return!0;var t=this.savedRequirements.some((function(n){return r.similarText(n.name,e.name)&&r.similarText(n.description,e.description)}));return!!t},similarText:function(e,r){if(!e||!r)return!1;var n=e.toLowerCase(),t=r.toLowerCase();if(n===t||n.includes(t)||t.includes(n))return!0;var i,s=n.split(/\s+/),o=t.split(/\s+/),a=0,c=(0,A.A)(s);try{for(c.s();!(i=c.n()).done;){var u=i.value;u.length>3&&o.includes(u)&&a++}}catch(l){c.e(l)}finally{c.f()}return a/Math.max(1,s.length)>.6},saveCurrentRequirement:function(){var e=this;return(0,w.A)((0,y.A)().mark((function r(){var n,t;return(0,y.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.currentRequirement&&e.currentRequirement.name&&e.currentRequirement.description){r.next=2;break}return r.abrupt("return");case 2:return r.prev=2,r.next=5,fetch("".concat(e.getApiUrl(),"/api/requirements"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.currentRequirement.name,description:e.currentRequirement.description})});case 5:if(n=r.sent,!n.ok){r.next=12;break}return r.next=9,n.json();case 9:t=r.sent,e.savedRequirements.push(t),e.pendingRequirements.length>0?(e.currentRequirement=e.pendingRequirements.shift(),e.navigationHistory=[]):e.currentRequirement=null;case 12:r.next=18;break;case 14:r.prev=14,r.t0=r["catch"](2),console.error("Error saving requirement:",r.t0),alert("Could not save requirement. Please ensure the backend server is running.");case 18:case"end":return r.stop()}}),r,null,[[2,14]])})))()},deleteCurrentRequirement:function(){this.currentRequirement&&(this.navigationHistory.push(this.currentRequirement),this.pendingRequirements.length>0?this.currentRequirement=this.pendingRequirements.shift():this.currentRequirement=null)},previousRequirement:function(){0!==this.navigationHistory.length&&(this.currentRequirement&&this.pendingRequirements.unshift(this.currentRequirement),this.currentRequirement=this.navigationHistory.pop())},nextRequirement:function(){0!==this.pendingRequirements.length&&(this.currentRequirement&&this.navigationHistory.push(this.currentRequirement),this.currentRequirement=this.pendingRequirements.shift())},stopRecording:function(){this.recorder&&"inactive"!==this.recorder.state&&this.recorder.stop(),this.refreshInterval&&(clearInterval(this.refreshInterval),this.refreshInterval=null),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.recordingChunks.length>0&&this.processAudioAndUpdateTranscript(),this.micStream&&(this.micStream.getTracks().forEach((function(e){return e.stop()})),this.micStream=null),this.isRecording=!1},checkServerConnectivity:function(){var e=this;return(0,w.A)((0,y.A)().mark((function r(){var n;return(0,y.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,fetch("".concat(e.getApiUrl(),"/api/health"));case 3:n=r.sent,n.ok&&console.log("Connected to backend server successfully"),r.next=11;break;case 7:r.prev=7,r.t0=r["catch"](0),console.error("Backend server connectivity check failed:",r.t0),alert("Could not connect to the backend server. Please ensure it is running on http://localhost:3000");case 11:case"end":return r.stop()}}),r,null,[[0,7]])})))()}},mounted:function(){this.checkServerConnectivity(),this.fetchRequirements(),this.fetchTranscript()},beforeUnmount:function(){this.stopRecording(),this.timerInterval&&clearInterval(this.timerInterval),this.refreshInterval&&clearInterval(this.refreshInterval)}};var T=n(6262);const S=(0,T.A)(L,[["render",x]]),I=S;(0,t.Ef)(I).mount("#app")}},r={};function n(t){var i=r[t];if(void 0!==i)return i.exports;var s=r[t]={exports:{}};return e[t].call(s.exports,s,s.exports,n),s.exports}n.m=e,(()=>{var e=[];n.O=(r,t,i,s)=>{if(!t){var o=1/0;for(l=0;l<e.length;l++){for(var[t,i,s]=e[l],a=!0,c=0;c<t.length;c++)(!1&s||o>=s)&&Object.keys(n.O).every((e=>n.O[e](t[c])))?t.splice(c--,1):(a=!1,s<o&&(o=s));if(a){e.splice(l--,1);var u=i();void 0!==u&&(r=u)}}return r}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[t,i,s]}})(),(()=>{n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r)})(),(()=>{var e={524:0};n.O.j=r=>0===e[r];var r=(r,t)=>{var i,s,[o,a,c]=t,u=0;if(o.some((r=>0!==e[r]))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(c)var l=c(n)}for(r&&r(t);u<o.length;u++)s=o[u],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(l)},t=self["webpackChunkinstant_analyst_frontend"]=self["webpackChunkinstant_analyst_frontend"]||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var t=n.O(void 0,[504],(()=>n(5248)));t=n.O(t)})();
//# sourceMappingURL=app.4d0c5a51.js.map