(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{HXnU:function(t,e,n){"use strict";n.r(e);var r=n("ofXK"),i=n("3Pt+"),o=n("tyNb"),c=n("6NWb"),a=n("H+bZ"),s=n("fXoL");function b(t,e){1&t&&(s.Pb(0,"div",7),s.zc(1,"Create an Organization"),s.Ob())}function d(t,e){if(1&t&&(s.Pb(0,"div",16),s.zc(1),s.Ob()),2&t){const t=s.Zb(3);s.Ab(1),s.Ac(t.errors.name[0])}}function u(t,e){if(1&t){const t=s.Qb();s.Pb(0,"form",10),s.Xb("ngSubmit",(function(){return s.rc(t),s.Zb(2).submit()})),s.Pb(1,"div",11),s.Nb(2,"input",12),s.xc(3,d,2,1,"div",13),s.Ob(),s.Pb(4,"div",14),s.Pb(5,"button",15),s.zc(6,"Submit"),s.Ob(),s.Ob(),s.Ob()}if(2&t){const t=s.Zb(2);s.fc("formGroup",t.form),s.Ab(3),s.fc("ngIf",t.errors.name),s.Ab(2),s.fc("disabled",t.loading||t.form.invalid)}}function f(t,e){if(1&t&&(s.Pb(0,"div",8),s.xc(1,u,7,3,"form",9),s.Ob()),2&t){const t=s.Zb();s.Ab(1),s.fc("ngIf",t.form)}}const m=function(t){return["../../",t]};function l(t,e){if(1&t&&(s.Pb(0,"div",17),s.Pb(1,"div",18),s.zc(2,"Successfully created organization."),s.Ob(),s.Pb(3,"p",19),s.zc(4,"Click on the button below to view it."),s.Ob(),s.Pb(5,"a",20),s.zc(6),s.Ob(),s.Ob()),2&t){const t=s.Zb();s.Ab(5),s.fc("routerLink",s.jc(2,m,t.organization.id)),s.Ab(1),s.Ac(t.organization.name)}}let p=(()=>{class t{constructor(t,e){this.api=t,this.formBuilder=e,this.errors={}}ngOnInit(){this.form=this.formBuilder.group({name:["",i.t.required]})}submit(){this.loading=!0,this.api.createOrganization(this.form.get("name").value).subscribe(t=>{this.loading=!1,this.organization=t,this.api.createProject(t.id,"Default").subscribe(t=>{this.api.createChat({project:t.id,content:"I just created this awesome organization!"}).subscribe(),this.api.createTask({project:t.id,content:"Setup this organization"}).subscribe(),this.api.createColumn({project:t.id,order:0,name:"Ready"}).subscribe(t=>{this.api.createCard({column:t.id,content:"Hey, I'm a sample card here. Do whatever you want with me."}).subscribe()}),this.api.createColumn({project:t.id,order:1,name:"In Progress"}).subscribe(),this.api.createColumn({project:t.id,order:2,name:"Needs Review"}).subscribe(),this.api.createColumn({project:t.id,order:3,name:"Done"}).subscribe()})},t=>{this.loading=!1,this.errors=t.error})}}return t.\u0275fac=function(e){return new(e||t)(s.Mb(a.a),s.Mb(i.c))},t.\u0275cmp=s.Gb({type:t,selectors:[["app-new"]],decls:7,vars:3,consts:[[1,"container","py-5"],[1,"row","justify-content-center"],[1,"col-lg-4"],[1,"card"],["class","card-header text-center",4,"ngIf"],["class","card-body",4,"ngIf"],["class","card-body text-center",4,"ngIf"],[1,"card-header","text-center"],[1,"card-body"],[3,"formGroup","ngSubmit",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"form-group"],["type","text","placeholder","Name","formControlName","name",1,"form-control"],["class","text-danger",4,"ngIf"],[1,"text-center"],[1,"btn","btn-success","btn-block",3,"disabled"],[1,"text-danger"],[1,"card-body","text-center"],[1,"text-success"],[1,"small"],[1,"btn","btn-info",3,"routerLink"]],template:function(t,e){1&t&&(s.Pb(0,"div",0),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Pb(3,"div",3),s.xc(4,b,2,0,"div",4),s.xc(5,f,2,1,"div",5),s.xc(6,l,7,4,"div",6),s.Ob(),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.Ab(4),s.fc("ngIf",!e.organization),s.Ab(1),s.fc("ngIf",!e.organization),s.Ab(1),s.fc("ngIf",e.organization))},directives:[r.l,i.v,i.m,i.g,i.b,i.l,i.f,o.d],styles:[""]}),t})();n.d(e,"NewModule",(function(){return h}));const g=[{path:"",component:p}];let h=(()=>{class t{}return t.\u0275mod=s.Kb({type:t}),t.\u0275inj=s.Jb({factory:function(e){return new(e||t)},imports:[[r.c,i.q,o.e.forChild(g),c.b]]}),t})()}}]);