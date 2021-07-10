import Vue from 'vue';
import Router from 'vue-router';
import SchoolLayout from '@/components/SchoolLayout';

import ClassViewPage from '@/pages/class.view';
import ClassListPage from '@/pages/classes';
import ClassEditPage from '@/pages/class.edit';
import StudentListPage from '@/pages/classes';

//import StudentEditPage from '@/pages/student.edit';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'School',
        redirect: '/',
        component: SchoolLayout,
        children: [
            {
                path: '/',
                name: 'ClassListPage',
                component: ClassListPage,
            },
            {
                path: 'class/:classId/edit',
                name: 'ClassEditPage',
                component: ClassEditPage,
            },
            {
                path: 'class/:classId/view',
                name: 'ClassViewPage',
                component: ClassViewPage,
            },
            {
                path: '/students',
                name: 'StudentListPage',
                component: StudentListPage,
            },
            // {
            //     path: 'class/:classId/student/:studentId/edit',
            //     name: 'StudentEditPage',
            //     component: StudentEditPage,
            // },
        ]
    }]
});