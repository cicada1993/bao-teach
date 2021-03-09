import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = Array.of(
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: '/home',
        component: (resolve, reject) => require(['@/pages/Home.vue'], resolve),
        meta: {

        }
    },
    {
        path: '/olMap',
        component: (resolve, reject) => require(['@/pages/OlMap.vue'], resolve),
        meta: {
            
        }
    },
    {
        path: '/xdh',
        component: (resolve, reject) => require(['@/pages/Xdh.vue'], resolve),
        meta: {
            
        }
    },
    {
        path: '/media',
        component: (resolve, reject) => require(['@/pages/Media.vue'], resolve),
        meta: {
            
        }
    },
    {
        path: '/main',
        component: (resolve, reject) => require(['Main.vue'], resolve),
        meta: {
            
        }
    },
    {
        path: '/three',
        component: (resolve, reject) => require(['@/pages/Three.vue'], resolve),
        meta: {
            
        }
    },
    {
        path: '/svelteShell',
        component: (resolve, reject) => require(['@/pages/SvelteShell.vue'], resolve),
        meta: {
            
        }
    },
)

const router = new VueRouter({routes})

export default router