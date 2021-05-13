webpackJsonp([15],{FVP5:function(e,t){},fkUX:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("vLgD");var o={name:"role",created:function(){this._getData()},data:function(){return{table_loading:!0,list:[],params:{pageSize:10,page:1},form:{role_name:"",id:""},formRole:{role_name:[{required:!0,message:"请填写角色名",trigger:"blur"}]},showDialog:!1,showDialogDistribution:!1,title:"",tree:[],choseKeys:[],temp_id:""}},methods:{addRole:function(){this.showDialog=!0,this.title="添加角色"},handleEdit:function(e,t){this.showDialog=!0,this.title="编辑角色",this.form.id=t.id,this.form.role_name=t.role_name},handleAuth:function(e,t){var i,o=this;this.showDialogDistribution=!0,(i=t,Object(a.a)({url:"role/giveAccess",method:"get",params:i})).then(function(e){o.temp_id=t.id,o.tree&&(o.tree=e.data.tree),o.choseKeys=e.data.choseKeys?e.data.choseKeys:[]})},giveAccess:function(){var e,t=this,i=this.$refs.tree.getCheckedKeys().join(","),o={id:this.temp_id,rule:i};(e=o,Object(a.a)({url:"role/giveAccess",method:"post",data:e})).then(function(e){t.$message({message:e.msg,type:"success"}),t.showDialogDistribution=!1})},handleDel:function(e,t){var i=this;this.$confirm("删除角色将不可恢复","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var o;(o={id:t.id},Object(a.a)({url:"role/roleDel",method:"post",data:o})).then(function(t){i.$message({message:t.msg,type:"success"}),i.list.splice(e,1)})})},onSubmit:function(){var e=this;this.$refs.roleForm.validate(function(t){if(!t)return!1;var i,o;(i=e.form,o=i.id?"role/roleEdit":"role/roleAdd",Object(a.a)({url:o,method:"post",data:i})).then(function(t){e.showDialog=!1,e.$message({message:t.msg,type:"success"}),e.form.id="",e._getData()})})},_getData:function(){var e,t=this;(e=this.params,Object(a.a)({url:"role/index",method:"get",params:e})).then(function(e){t.table_loading=!1,t.list=e.data.data})}}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("p",{staticClass:"page-title"},[e._v("角色管理")]),e._v(" "),i("div",{staticClass:"filter-container"},[i("el-button",{staticClass:"filter-item",attrs:{type:"primary",plain:""},on:{click:function(t){e.addRole()}}},[e._v("添加角色")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.table_loading,expression:"table_loading"}],attrs:{"element-loading-text":"加载中...",border:"",fit:"","highlight-current-row":"",data:e.list}},[i("el-table-column",{attrs:{align:"center",width:"60px",label:"ID",prop:"id"}}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"角色",prop:"role_name"}}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){e.handleEdit(t.$index,t.row)}}},[e._v("编辑\n                ")]),e._v(" "),1!=t.row.id?i("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(i){e.handleAuth(t.$index,t.row)}}},[e._v("分配权限\n                ")]):e._e(),e._v(" "),1!=t.row.id?i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){e.handleDel(t.$index,t.row)}}},[e._v("删除\n                ")]):e._e()]}}])})],1),e._v(" "),i("el-dialog",{attrs:{visible:e.showDialog,title:e.title,width:"30%"},on:{"update:visible":function(t){e.showDialog=t}}},[i("el-form",{ref:"roleForm",attrs:{model:e.form,"status-icon":"","label-width":"80px",rules:e.formRole},nativeOn:{submit:function(e){e.preventDefault()}}},[i("el-form-item",{attrs:{label:"角色名",prop:"role_name"}},[i("el-input",{model:{value:e.form.role_name,callback:function(t){e.$set(e.form,"role_name",t)},expression:"form.role_name"}})],1),e._v(" "),i("el-form-item",[i("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){e.onSubmit()}}},[e._v("确定")])],1)],1)],1),e._v(" "),i("el-dialog",{staticClass:"my-dialog",attrs:{visible:e.showDialogDistribution,title:"分配权限",width:"30%"},on:{"update:visible":function(t){e.showDialogDistribution=t}}},[i("el-tree",{ref:"tree",attrs:{data:e.tree,"show-checkbox":"","node-key":"id","default-expand-all":"","default-checked-keys":e.choseKeys}}),e._v(" "),i("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){e.giveAccess()}}},[e._v("确定分配")])],1)],1)},staticRenderFns:[]};var l=i("VU/8")(o,n,!1,function(e){i("FVP5")},null,null);t.default=l.exports}});