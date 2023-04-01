import Vue from 'vue';
import Router from "vue-router";

import Index from '@/components'
import Picture from '@/components/picture.vue'
import Profile from '@/components/profile.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/picture',
            name: 'picture',
            component: Picture
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
    ]
})