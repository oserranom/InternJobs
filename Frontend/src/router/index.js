import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue';
import JobOfferView from '@/views/JobOfferView.vue';

//Forms auth
import CandidateRegisterView from '@/views/auth/CandidateRegisterView.vue';
import CompanyRegisterView from '@/views/auth/CompanyRegisterView.vue';
import LoginCandidateView from '@/views/auth/LoginCandidateView.vue';
import LoginCompanyView from '@/views/auth/LoginCompanyView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResultsView
    },
    {
      path: '/offer/:id',
      name: 'JobOfferDetail',
      component: JobOfferView,
      props: true
    },

    //Registro
    {
      path: '/register/candidate',
      name: 'CandidateRegister',
      component: CandidateRegisterView
    },
    {
      path: '/register/company',
      name: 'CompanyRegister',
      component: CompanyRegisterView
    },

    //Login
    {
      path: '/login/candidate',
      name: 'LoginCandidate',
      component: LoginCandidateView
    },
    {
      path: '/login/company',
      name: 'LoginCompany',
      component: LoginCompanyView
    }
  ],
}); 

export default router
