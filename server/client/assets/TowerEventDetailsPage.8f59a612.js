import{u as m,w as l,c as p,a as s,o as c,b as i,e as n,d as t}from"./vendor.2a189428.js";import{_ as w,A as E,t as a}from"./index.65016102.js";const u={setup(){const e=m();return l(async()=>{try{await a.getActiveTowerEvent(e.params.id),await a.getTowerEventComments(e.params.id),await a.getTowerEventTickets(e.params.id)}catch(o){console.error("[could not load]",o.message),Pop.toast(o.message,"error")}}),{activeTowerEvent:p(()=>E.activeTowerEvent)}}},T={key:0,class:"row"},h=t("div",{class:"col-12 text-center"},[t("h1",null,"Loading...")],-1),f=[h],g={key:1},x={class:"row justify-content-center mt-4 text-center"},k={class:"container mt-5"};function y(e,o,A,r,C,j){const d=s("TowerEventDetails"),_=s("Attendees"),v=s("CommentThread");return r.activeTowerEvent?(c(),i("span",g,[n(d,{towerEvent:r.activeTowerEvent},null,8,["towerEvent"]),t("div",x,[n(_)]),t("div",k,[n(v)])])):(c(),i("div",T,f))}var N=w(u,[["render",y]]);export{N as default};