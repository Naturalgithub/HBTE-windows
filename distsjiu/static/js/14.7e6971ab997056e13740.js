webpackJsonp([14],{"5SaS":function(e,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=i("woOf"),t=i.n(n),o=i("pFYg"),r=i.n(o),s={name:"navClassify",data:function(){return{dynamicValidateForm:{domains:[],indexName:"首页",indexHref:"/index"}}},methods:{submitForm:function(e){var a=this,i={name:this.dynamicValidateForm.indexName,href:this.dynamicValidateForm.indexHref};var n=this.dynamicValidateForm.domains.map(function(e){return"object"===(void 0===e?"undefined":r()(e))?t()({},e):e});n.unshift(i);var o=n,s=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;a.$axios.post("/api/setting/setNavClassify",{navClassifyData:o}).then(function(e){console.log(e),s.$message({showClose:!0,message:e.data.msg,type:"success"})}).catch(function(e){console.log(e),s.$message({showClose:!0,message:e,type:"error"})})})},resetForm:function(e){this.$refs[e].resetFields()},removeDomain:function(e){var a=this.dynamicValidateForm.domains.indexOf(e);-1!==a&&this.dynamicValidateForm.domains.splice(a,1)},addDomain:function(){this.dynamicValidateForm.domains.push({indexName:"",indexHref:"",key:Date.now()})}},mounted:function(){}},d={render:function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("div",{staticClass:"wrap"},[i("el-form",{ref:"dynamicValidateForm",staticClass:"demo-dynamic",attrs:{model:e.dynamicValidateForm,"label-width":"100px"}},[i("el-form-item",{attrs:{prop:"indexName",label:"首页",rules:{required:!0,message:"分类不能为空",trigger:"blur"}}},[i("el-input",{attrs:{placeholder:"导航名称"},model:{value:e.dynamicValidateForm.indexName,callback:function(a){e.$set(e.dynamicValidateForm,"indexName",a)},expression:"dynamicValidateForm.indexName"}}),e._v(" "),i("el-input",{attrs:{placeholder:"path路径",disabled:""},model:{value:e.dynamicValidateForm.indexHref,callback:function(a){e.$set(e.dynamicValidateForm,"indexHref",a)},expression:"dynamicValidateForm.indexHref"}})],1),e._v(" "),e._l(e.dynamicValidateForm.domains,function(a,n){return i("el-form-item",{key:a.key,attrs:{label:"导航"+(n+1),prop:"domains."+n+".value"}},[i("el-input",{attrs:{placeholder:"导航名称"},model:{value:a.name,callback:function(i){e.$set(a,"name",i)},expression:"domain.name"}}),e._v(" "),i("el-input",{attrs:{placeholder:"path路径"},model:{value:a.href,callback:function(i){e.$set(a,"href",i)},expression:"domain.href"}}),e._v(" "),i("el-button",{on:{click:function(i){return i.preventDefault(),e.removeDomain(a)}}},[e._v("删除")])],1)}),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.submitForm("dynamicValidateForm")}}},[e._v("提交")]),e._v(" "),i("el-button",{on:{click:e.addDomain}},[e._v("新增分类")])],1)],2)],1)},staticRenderFns:[]};var m=i("VU/8")(s,d,!1,function(e){i("bE5A")},"data-v-42de4c03",null);a.default=m.exports},bE5A:function(e,a){}});
//# sourceMappingURL=14.7e6971ab997056e13740.js.map