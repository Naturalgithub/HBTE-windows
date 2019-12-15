import en from '../i18n/lang/en'
import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/views/commerViews'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'
import NewIndex2 from '@/views/newindex/NewIndex2'
// import NewIndex2 from '@/views/newindex/NewIndex2.vue'

// 不是必须加载的组件使用懒加载
const Icon = () => import('@/views/icon/index')
const IndexTwo = () => import('@/views/icon/IndexTwo')
const IndexThree = () => import('@/views/icon/IndexThree')
const Erji = () => import('@/views/duoji/erji')
const Erji2 = () => import('@/views/duoji/erji2')
const Sanji = () => import('@/views/duoji/sanji')
const Sanji2 = () => import('@/views/duoji/sanji2')
const Siji = () => import('@/views/duoji/siji')
const Wuji = () => import('@/views/duoji/wuji')
const Transfer = () => import('@/views/transfer/transfer')
const DataTable = () => import('@/views/table/dataTables')
const FilterTable = () => import('@/views/table/filterTable')
const DragTable = () => import('@/views/table/dragTabe')
const Upload = () => import('@/views/upload/upload')
const Markdown = () => import('@/views/editor/markdownView')
const WangeditorView = () => import('@/views/editor/wangeditorView')

const NotFound = () => import('@/page404')
const AddArticle = () => import('@/views/article/addArticle')
// 收支系统

// const AddArticleEditor = () => import('@/views/monesystem/moneysystem/InOutWrite')
const InOutWrite = () => import('@/views/monesystem/moneysystem/InOutWrite')
const InOutAddWrite = () => import('@/views/monesystem/moneysystem/InOutAddWrite')
const InOutQuery = () => import('@/views/monesystem/moneysystem/InOutQuery')
const ApplyWrite = () => import('@/views/monesystem/moneysystem/ApplyWrite')
const PLine = () => import('@/views/monesystem/moneysystem/PLinee')
const InOutManagement = () => import('@/views/monesystem/moneysystem/InOutManagement')

// 系统设置
const MoneyManagement = () => import('@/views/monesystem/system/MoneyManagement')
const AccountingItem = () => import('@/views/monesystem/system/AccountingItem')
// const aemtest = () => import('@/views/monesystem/system/aemtest')
const AitemLine = () => import('@/views/monesystem/system/AitemLine')
const BankManagement = () => import('@/views/monesystem/system/BankManagement')
const CompanyInfo = () => import('@/views/monesystem/system/CompanyInfo')
const CustomerManagement = () => import('@/views/monesystem/system/CustomerManagement')
const DepartmentInfo = () => import('@/views/monesystem/system/DepartmentInfo')
const SupplierManage = () => import('@/views/monesystem/system/SupplierManage')
const ItemInfo = () => import('@/views/monesystem/system/ItemInfo')
// const ItemLine = () => import('@/views/monesystem/system/ItemLine')
const PayPal = () => import('@/views/monesystem/system/PayPal')
// const TypeList = () => import('@/views/monesystem/system/TypeList')

// 审批管理
const ApplicationList = () => import('@/views/monesystem/allow/ApplicationList')
const ToDoList = () => import('@/views/monesystem/allow/ToDoList')

const LoginDate = () => import('@/views/logindate/LoginDate')
// const LoginDateTwo = () => import('@/views/logindate/LoginDateTwo')

// const NavClassify = () => import('@/views/syssetting/navClassify')
// const pagePermissions = () => import('@/views/permissions/pagePermissions')
// const btnPermissions = () => import('@/views/permissions/btnPermissions')

Vue.use(Router)
let routeNmae = en.routeNmae
let defaultRouter = [

  {
    path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: routeNmae.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  }
]

let addRouter = [
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: routeNmae.article,
    meta: { role: ['superAdmin', 'admin'] },
    component: Layout,
    children: [
      {
        path: '/addArticle',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.publishArticle,
        component: AddArticle,
        children: []
      },
      // {
      //   path: '/addArticleEditor',
      //   iconCls: 'el-icon-edit-outline', // 图标样式class
      //   name: routeNmae.publishArticleEditor,
      //   component: AddArticleEditor,
      //   children: []
      // },
      // 财务系统
      {
        path: '/InOutAddWrite',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutAddWrite,
        component: InOutAddWrite,
        children: []
      },

      {
        path: '/InOutQuery',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutQuery,
        component: InOutQuery,
        children: []
      },
      // 货币管理
      {
        path: '/MoneyManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.MoneyManagement,
        component: MoneyManagement,
        children: []
      },
      {
        path: '/CustomerManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.CustomerManagement,
        component: CustomerManagement,
        children: []
      },
      {
        path: '/BankManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.BankManagement,
        component: BankManagement,
        children: []
      },
      {
        path: '/AitemLine',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.AitemLine,
        component: AitemLine,
        children: []
      },
      {
        path: '/SupplierManage',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.GongYingShang,
        component: SupplierManage,
        children: []
      },
      {
        path: '/CompanyInfo',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.CompanyInfo,
        component: CompanyInfo,
        children: []
      },
      {
        path: '/ItemInfo',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ItemInfo,
        component: ItemInfo,
        children: []
      },
      {
        path: '/AccountingItem',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.AccountingItem,
        component: AccountingItem,
        children: []
      },
      {
        path: '/PayPal',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.PayPal,
        component: PayPal,
        children: []
      },
      {
        path: '/DepartmentInfo',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.DepartmentInfo,
        component: DepartmentInfo,
        children: []
      },
      // 收支系统
      {
        path: '/InOutWrite',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutWrite,
        component: InOutWrite,
        children: []
      },
      {
        path: '/ApplyWrite',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ApplyWrite,
        component: ApplyWrite,
        children: []
      },
      {
        path: '/PLine',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.PLine,
        component: PLine,
        children: []
      },
      {
        path: '/InOutManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutManagement,
        component: InOutManagement,
        children: []
      },
      // 审批管理
      {
        path: '/ApplicationList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ApplicationList,
        component: ApplicationList,
        children: []
      },
      {
        path: '/ToDoList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ToDoList,
        component: ToDoList,
        children: []
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-exchange', // 图标样式class
    name: routeNmae.shuttleBox,
    meta: { role: ['superAdmin'] },
    component: Layout,
    children: [
      {
        path: '/LoginDate',
        iconCls: 'fa fa-sign-in', // 图标样式class
        name: routeNmae.demoShuttle,
        component: LoginDate,
        children: []
      }
    ]
  },
  // 图标管理
  {
    path: '/',
    iconCls: 'fa fa-paw', // 图标样式class
    name: routeNmae.icon,
    meta: { role: ['superAdmin'] },
    component: Layout,
    children: [
      {
        path: '/IndexTwo',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.mokuai,
        component: IndexTwo,
        children: []
      },
      {
        path: '/icon',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.builtInIcon,
        component: Icon,
        children: []
      },
      {
        path: '/IndexThree',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.zhuyeguanli,
        component: IndexThree,
        children: []
      }
    ]
  },

  // {
  //   path: '/',
  //   iconCls: 'fa fa-universal-access', // 图标样式class
  //   name: routeNmae.permissions,
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/pagePermissions',
  //       iconCls: 'fa fa-expeditedssl', // 图标样式class
  //       name: routeNmae.pageControl,
  //       component: pagePermissions,
  //       children: []
  //     },
  //     {
  //       path: '/btnPermissions',
  //       iconCls: 'fa fa-toggle-on', // 图标样式class
  //       name: routeNmae.btnControl,
  //       component: btnPermissions,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   iconCls: 'fa fa-newspaper-o', // 图标样式class
  //   name: routeNmae.table,
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/dataTable',
  //       iconCls: 'fa fa-sliders', // 图标样式class
  //       name: routeNmae.multiDataTable,
  //       component: DataTable,
  //       children: []
  //     },
  //     {
  //       path: '/filterTable',
  //       iconCls: 'fa fa-sort-amount-asc', // 图标样式class
  //       name: routeNmae.filterTable,
  //       component: FilterTable,
  //       children: []
  //     },
  //     {
  //       path: '/dragTabe',
  //       iconCls: 'fa fa-hand-stop-o', // 图标样式class
  //       name: routeNmae.dragSort,
  //       component: DragTable,
  //       children: []
  //     }
  //   ]
  // },

  // {
  //   path: '/',
  //   iconCls: 'fa fa-server',
  //   name: routeNmae.multiDirectory,
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/erji1',
  //       iconCls: 'fa fa-server',
  //       name: routeNmae['menu2-1'],
  //       component: Erji,
  //       children: []
  //     },
  //     {
  //       path: '/erji2',
  //       iconCls: 'fa fa-server',
  //       name: routeNmae['menu2-2'],
  //       component: Erji2,
  //       children: []
  //     },
  //     {
  //       path: '/erji3',
  //       iconCls: 'fa fa-server',
  //       name: routeNmae['menu2-3'],
  //       component: CommerViews, // 无限极菜单的容器
  //       children: [
  //         {
  //           path: '/sanji1',
  //           iconCls: 'fa fa-server',
  //           name: routeNmae['menu3-1'],
  //           component: Sanji,
  //           children: []
  //         },
  //         {
  //           path: '/sanji2',
  //           iconCls: 'fa fa-server',
  //           name: routeNmae['menu3-2'],
  //           component: Sanji2,
  //           children: []
  //         },
  //         {
  //           path: '/sanji3',
  //           iconCls: 'fa fa-server',
  //           name: routeNmae['menu3-3'],
  //           component: CommerViews,
  //           children: [
  //             {
  //               path: '/siji',
  //               iconCls: 'fa fa-server',
  //               name: routeNmae['menu4-1'],
  //               component: Siji,
  //               children: []
  //             },
  //             {
  //               path: '/siji1',
  //               iconCls: 'fa fa-server',
  //               name: routeNmae['menu4-2'],
  //               component: CommerViews,
  //               children: [
  //                 {
  //                   path: '/wuji',
  //                   iconCls: 'fa fa-server',
  //                   name: routeNmae['menu5-1'],
  //                   component: Wuji,
  //                   children: []
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   iconCls: 'fa fa-cloud-upload', // 图标样式class
  //   name: routeNmae.upload,
  //   component: Layout,
  //   meta: { role: ['superAdmin'] },
  //   children: [
  //     {
  //       path: '/upload',
  //       iconCls: 'el-icon-upload2', // 图标样式class
  //       name: routeNmae.fileUpload,
  //       component: Upload,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   iconCls: 'el-icon-edit', // 图标样式class
  //   name: routeNmae.editor,
  //   component: Layout,
  //   meta: { role: ['superAdmin', 'admin'] },
  //   children: [
  //     {
  //       path: '/markdown',
  //       iconCls: 'fa fa-file-code-o', // 图标样式class
  //       name: routeNmae.markdown,
  //       component: Markdown,
  //       children: []
  //     },
  //     {
  //       path: '/wangeditor',
  //       iconCls: 'fa fa-file-code-o', // 图标样式class
  //       name: routeNmae.wangeditor,
  //       component: WangeditorView,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   iconCls: 'el-icon-setting', // 图标样式class
  //   name: routeNmae.systemSettings,
  //   component: Layout,
  //   meta: { role: ['superAdmin'] },
  //   children: [
  //     {
  //       path: '/navClassifies',
  //       iconCls: 'el-icon-menu', // 图标样式class
  //       name: routeNmae.navMenu,
  //       component: NavClassify,
  //       children: []
  //     }
  //   ]
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  }

]
export default new Router({
  routes: defaultRouter
})
export { defaultRouter, addRouter }
