function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _createSuper(e){return function(){var t,n=_getPrototypeOf(e);if(_isNativeReflectConstruct()){var c=_getPrototypeOf(this).constructor;t=Reflect.construct(n,arguments,c)}else t=n.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"5c0e":function(e,t,n){"use strict";n.r(t);var c=n("ofXK"),i=n("3Pt+"),r=n("tyNb"),a=n("6NWb"),o=n("oW1M"),s=function(e){return e[e.CARD=1]="CARD",e}({}),b=n("lRx4"),l=n("phuL"),f=n("H+bZ"),u=n("8B4y"),d=n("IBXX"),p=n("fXoL"),v=["contentInput"];function g(e,t){if(1&e&&(p.Pb(0,"span",25),p.zc(1),p.Ob()),2&e){var n=p.Zb(2);p.Ab(1),p.Ac(n.card.content)}}function h(e,t){1&e&&(p.Pb(0,"small",30),p.zc(1,"This field is required"),p.Ob())}function O(e,t){if(1&e&&(p.Pb(0,"div",26),p.Nb(1,"textarea",27,28),p.xc(3,h,2,0,"small",29),p.Ob()),2&e){var n=p.Zb(2);p.Ab(1),p.Eb("is-invalid",n.content.hasError("required")),p.fc("formControl",n.content),p.Ab(2),p.fc("ngIf",n.content.hasError("required"))}}function P(e,t){if(1&e&&(p.Pb(0,"span"),p.zc(1),p.Ob()),2&e){var n=p.Zb(2);p.Ab(1),p.Ac(n.getUser(n.card.assignee).username)}}function m(e,t){1&e&&(p.Pb(0,"span",31),p.zc(1,"No one"),p.Ob())}function y(e,t){1&e&&(p.Pb(0,"span",31),p.zc(1,"No label"),p.Ob())}function A(e,t){if(1&e&&(p.Pb(0,"span"),p.zc(1),p.ac(2,"date"),p.Ob()),2&e){var n=p.Zb(2);p.Ab(1),p.Ac(p.cc(2,1,n.card.updated,"hh:MM a"))}}function C(e,t){1&e&&(p.Pb(0,"span",31),p.zc(1,"Never"),p.Ob())}function k(e,t){if(1&e){var n=p.Qb();p.Pb(0,"div",32),p.Pb(1,"a",33),p.Xb("click",(function(){return p.rc(n),p.Zb(2).editCard(!1)})),p.zc(2,"Cancel"),p.Ob(),p.Pb(3,"button",34),p.Xb("click",(function(){p.rc(n);var e=p.Zb(2);return e.update({content:e.content.value}),e.isEditing=!1})),p.zc(4,"Update "),p.Ob(),p.Ob()}if(2&e){var c=p.Zb(2);p.Ab(3),p.fc("disabled",c.content.hasError("required"))}}function _(e,t){if(1&e){var n=p.Qb();p.Pb(0,"div",32),p.Pb(1,"a",35),p.Xb("click",(function(){return p.rc(n),p.Zb(2).editCard(!0)})),p.zc(2,"Edit"),p.Ob(),p.Pb(3,"a",33),p.Xb("click",(function(){return p.rc(n),p.Zb(2).deleteCard()})),p.Nb(4,"fa-icon",36),p.Ob(),p.Ob()}if(2&e){var c=p.Zb(2);p.Ab(4),p.fc("icon",c.trash)}}function x(e,t){if(1&e){var n=p.Qb();p.Pb(0,"div",4),p.Pb(1,"div",5),p.Pb(2,"div",6),p.Pb(3,"div",7),p.Pb(4,"div",8),p.Pb(5,"div",9),p.Pb(6,"div",6),p.xc(7,g,2,1,"span",10),p.xc(8,O,4,4,"div",11),p.Ob(),p.Pb(9,"div",12),p.Pb(10,"ul",13),p.Pb(11,"li",14),p.Pb(12,"span",15),p.zc(13,"Column"),p.Ob(),p.Pb(14,"span",16),p.zc(15),p.Ob(),p.Ob(),p.Pb(16,"li",14),p.Pb(17,"span",15),p.zc(18,"Assignee"),p.Ob(),p.Pb(19,"span",16),p.xc(20,P,2,1,"span",17),p.xc(21,m,2,0,"span",18),p.Ob(),p.Ob(),p.Pb(22,"li",19),p.Xb("onHidden",(function(){return p.rc(n),p.Zb().updateCardLabels()})),p.Pb(23,"span",15),p.zc(24,"Labels"),p.Ob(),p.Pb(25,"span",16),p.xc(26,y,2,0,"span",18),p.Ob(),p.Ob(),p.Pb(27,"li",20),p.Pb(28,"span",15),p.zc(29,"Updated"),p.Ob(),p.Pb(30,"span",21),p.ac(31,"date"),p.xc(32,A,3,4,"span",17),p.xc(33,C,2,0,"span",18),p.Ob(),p.Ob(),p.Pb(34,"li",20),p.Pb(35,"span",15),p.zc(36,"Created"),p.Ob(),p.Pb(37,"span",22),p.ac(38,"date"),p.zc(39),p.ac(40,"date"),p.Ob(),p.Ob(),p.Ob(),p.Ob(),p.Ob(),p.Ob(),p.Pb(41,"div",23),p.xc(42,k,5,1,"div",24),p.xc(43,_,5,1,"div",24),p.Ob(),p.Ob(),p.Ob(),p.Ob(),p.Ob()}if(2&e){var c=p.Zb(),i=p.pc(2),r=p.pc(6),a=p.pc(4);p.Ab(7),p.fc("ngIf",!c.isEditing),p.Ab(1),p.fc("ngIf",c.isEditing),p.Ab(3),p.fc("popover",i),p.Ab(4),p.Ac(c.card.column.name),p.Ab(1),p.fc("popover",r),p.Ab(4),p.fc("ngIf",c.getUser(c.card.assignee)),p.Ab(1),p.fc("ngIf",!c.getUser(c.card.assignee)),p.Ab(1),p.fc("popover",a),p.Ab(4),p.fc("ngIf",!c.card.labels),p.Ab(4),p.fc("tooltip",p.bc(31,17,c.card.updated))("isDisabled",c.card.created===c.card.updated),p.Ab(2),p.fc("ngIf",c.card.created!==c.card.updated),p.Ab(1),p.fc("ngIf",c.card.created===c.card.updated),p.Ab(4),p.fc("tooltip",p.bc(38,19,c.card.updated)),p.Ab(2),p.Ac(p.cc(40,21,c.card.created,"hh:MM a")),p.Ab(3),p.fc("ngIf",c.isEditing),p.Ab(1),p.fc("ngIf",!c.isEditing)}}function z(e,t){if(1&e){var n=p.Qb();p.Pb(0,"li",39),p.Pb(1,"a",40),p.Xb("click",(function(){p.rc(n);var e=t.$implicit;return p.Zb(2).update({column:e.id})})),p.zc(2),p.Ob(),p.Ob()}if(2&e){var c=t.$implicit,i=p.Zb(2);p.Ab(1),p.Eb("active",i.card.column.id===c.id),p.Ab(1),p.Bc(" ",c.name," ")}}function I(e,t){if(1&e&&(p.Pb(0,"ul",37),p.xc(1,z,3,3,"li",38),p.Ob()),2&e){var n=p.Zb();p.Ab(1),p.fc("ngForOf",n.columns)}}function w(e,t){if(1&e&&p.Nb(0,"fa-icon",42),2&e){var n=p.Zb(3);p.fc("icon",n.check)}}function Z(e,t){if(1&e&&(p.Pb(0,"li",39),p.Pb(1,"a",40),p.Xb("click",(function(){var e=t.$implicit;return e.selected=!e.selected})),p.zc(2),p.xc(3,w,1,1,"fa-icon",41),p.Ob(),p.Ob()),2&e){var n=t.$implicit,c=p.Zb(2);p.Ab(1),p.Eb("active",n.selected)("disabled",c.loading),p.Ab(1),p.Bc(" ",n.name," "),p.Ab(1),p.fc("ngIf",n.selected)}}function E(e,t){if(1&e&&(p.Pb(0,"ul",37),p.xc(1,Z,4,6,"li",38),p.Ob()),2&e){var n=p.Zb();p.Ab(1),p.fc("ngForOf",n.labels)}}function R(e,t){if(1&e){var n=p.Qb();p.Pb(0,"li",39),p.Pb(1,"a",40),p.Xb("click",(function(){p.rc(n);var e=t.$implicit;return p.Zb(2).update({assignee:e.id})})),p.zc(2),p.Ob(),p.Ob()}if(2&e){var c=t.$implicit,i=p.Zb(2);p.Ab(1),p.Eb("active",i.getUser(i.card.assignee)&&i.getUser(i.card.assignee).id===c.id)("disabled",i.loading),p.Ab(1),p.Bc(" ",c.username," ")}}function j(e,t){if(1&e){var n=p.Qb();p.Pb(0,"ul",37),p.Pb(1,"li",39),p.Pb(2,"a",40),p.Xb("click",(function(){return p.rc(n),p.Zb().update({assignee:null})})),p.zc(3,"None"),p.Ob(),p.Ob(),p.xc(4,R,3,5,"li",38),p.Ob()}if(2&e){var c=p.Zb();p.Ab(2),p.Eb("active",!c.getUser(c.card.assignee)),p.Ab(2),p.fc("ngForOf",c.users)}}function N(){return Object.assign(new o.g,{placement:"left",outsideClick:!0})}var X,M=((X=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,c,r,a){var o;return _classCallCheck(this,n),(o=t.call(this)).activatedRoute=e,o.router=c,o.changeDetectorRef=r,o.apiService=a,o.trash=d.faTrash,o.check=u.faCheck,o.loading=!1,o.labels=[],o.content=new i.d("",i.t.required),o}return _createClass(n,[{key:"ngOnInit",value:function(){var e=this;this.activatedRoute.params.subscribe((function(t){e.apiService.getCard(t.card).subscribe((function(t){e.card=t,e.content.setValue(t.content),b.a.labels.subscribe((function(t){e.labels=t||[],e.labels.forEach((function(t){var n=e.card.labels.find((function(e){return e.label===t.id}));t.selected=!!n}))})),e.apiService.getColumns(null,e.card.column.project).subscribe((function(t){e.columns=t}))}))}))}},{key:"update",value:function(e){var t=this;this.loading=!0,this.apiService.updateCard(this.card.id,e).subscribe((function(){t.loading=!1,t.apiService.getCard(t.card.id).subscribe((function(e){t.card=e,t.content.setValue(e.content)}))}))}},{key:"deleteCard",value:function(){var e=this;confirm("Delete card?\nThis action is not undoable.")&&(this.loading=!0,this.apiService.deleteCard(this.card.id).subscribe((function(){e.router.navigate(["organization",e.activatedRoute.parent.snapshot.params.id],{queryParams:{project:e.card.column.project}})}),(function(){e.loading=!1})))}},{key:"editCard",value:function(e){this.isEditing=e,e?(this.changeDetectorRef.detectChanges(),this.contentInput.nativeElement.focus()):this.content.setValue(this.card.content)}},{key:"updateCardLabels",value:function(){var e=this;this.labels.forEach((function(t){var n=e.card.labels.find((function(e){return e.label===t.id}));t.selected&&!n?e.apiService.assignLabel(s.CARD,e.card.id,t.id).subscribe((function(t){e.card.labels.push({label:t.label,id:t.id})})):!t.selected&&n&&e.apiService.deAttachLabel(n.id).subscribe((function(){e.card.labels.splice(e.card.labels.indexOf(n),1)}))}))}}]),n}(l.a)).\u0275fac=function(e){return new(e||X)(p.Mb(r.a),p.Mb(r.c),p.Mb(p.h),p.Mb(f.a))},X.\u0275cmp=p.Gb({type:X,selectors:[["app-card"]],viewQuery:function(e,t){var n;1&e&&p.Cc(v,!0),2&e&&p.oc(n=p.Yb())&&(t.contentInput=n.first)},features:[p.zb([{provide:o.g,useFactory:N}]),p.xb],decls:7,vars:1,consts:[["class","container",4,"ngIf"],["columnPopover",""],["labelsPopover",""],["userPopover",""],[1,"container"],[1,"row","justify-content-center"],[1,"col-md-8"],[1,"card","my-3"],[1,"card-body"],[1,"row"],["class","white-space-pre",4,"ngIf"],["class","form-group",4,"ngIf"],[1,"col-md-4"],[1,"list-group"],[1,"list-group-item","list-group-item-action",3,"popover"],[1,"badge","badge-light"],[1,"float-right"],[4,"ngIf"],["class","text-secondary",4,"ngIf"],[1,"list-group-item","list-group-item-action",3,"popover","onHidden"],[1,"list-group-item"],[1,"float-right",3,"tooltip","isDisabled"],[1,"float-right",3,"tooltip"],[1,"card-footer"],["class","text-right",4,"ngIf"],[1,"white-space-pre"],[1,"form-group"],["name","content","rows","10",1,"form-control",3,"formControl"],["contentInput",""],["class","text-danger",4,"ngIf"],[1,"text-danger"],[1,"text-secondary"],[1,"text-right"],[1,"btn","btn-link","text-secondary",3,"click"],[1,"btn","btn-primary",3,"disabled","click"],[1,"btn","btn-link",3,"click"],[3,"icon"],[1,"nav","nav-pills","flex-column"],["class","nav-item",4,"ngFor","ngForOf"],[1,"nav-item"],[1,"nav-link",3,"click"],["class","float-right ml-2","size","sm",3,"icon",4,"ngIf"],["size","sm",1,"float-right","ml-2",3,"icon"]],template:function(e,t){1&e&&(p.xc(0,x,44,24,"div",0),p.xc(1,I,2,1,"ng-template",null,1,p.yc),p.xc(3,E,2,1,"ng-template",null,2,p.yc),p.xc(5,j,5,3,"ng-template",null,3,p.yc)),2&e&&p.fc("ngIf",t.isOrganizationInitialised&&t.card)},directives:[c.l,o.h,o.j,i.b,i.l,i.e,a.a,c.k],pipes:[c.e],styles:[""]}),X);n.d(t,"CardModule",(function(){return L}));var S,D=[{path:"",component:M}],L=((S=function e(){_classCallCheck(this,e)}).\u0275mod=p.Kb({type:S}),S.\u0275inj=p.Jb({factory:function(e){return new(e||S)},imports:[[c.c,r.e.forChild(D),o.i.forRoot(),o.k.forRoot(),i.q,a.b]]}),S)},"8B4y":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=[],i="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z";t.definition={prefix:"fas",iconName:"check",icon:[512,512,c,"f00c",i]},t.faCheck=t.definition,t.prefix="fas",t.iconName="check",t.width=512,t.height=512,t.ligatures=c,t.unicode="f00c",t.svgPathData=i}}]);