import { createRouter, createWebHistory } from 'vue-router'
import { getCandidate, getCompany } from '@/services/authService';

//Home
import HomeView from '@/views/HomeView.vue'
//Search
import SearchResultsView from '@/views/SearchResultsView.vue';
import JobOfferView from '@/views/JobOfferView.vue';
//Forms auth
import CandidateRegisterView from '@/views/auth/CandidateRegisterView.vue';
import CompanyRegisterView from '@/views/auth/CompanyRegisterView.vue';
import LoginCandidateView from '@/views/auth/LoginCandidateView.vue';
import LoginCompanyView from '@/views/auth/LoginCompanyView.vue';
//Profiles
import CandidateProfileView from '@/views/profile/CandidateProfileView.vue';
import CompanyProfileView from '@/views/profile/CompanyProfileView.vue';
//Profile Components
import CompanyAccountSettings from '@/components/company/CompanyAccountSettings.vue';
import CreateJobOffer from '@/components/company/CreateJobOffer.vue';
import PublishedJobOffers from '@/components/company/PublishedJobOffers.vue';
import RecivedApplications from '@/components/company/RecivedApplications.vue';
//ApplyForm
import ApplyFormView from '@/views/ApplyFormView.vue';



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
    {
      path: '/offer/:id/apply',
      name: 'ApplyForm',
      component: ApplyFormView,
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
    },
    //Perfil candidate
    {
      path: '/candidate/profile',
      name: 'CandidateProfile',
      component: CandidateProfileView,
      meta: { requiresAuth: true },
    },
    //Perfil company
    {
      path: '/company/profile',
      component: CompanyProfileView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'CompanyProfile',
          redirect: { name: 'Applications'}
        },
        {
          path: 'config',
          name: 'CompanyConfig',
          component: CompanyAccountSettings
        },
        {
          path: 'create_offer',
          name: 'CreateOffer',
          component: CreateJobOffer
        },
        {
          path: 'applications',
          name: 'Applications',
          component: RecivedApplications
        },
        {
          path: 'published_offers',
          name: 'PublishedOffers',
          component: PublishedJobOffers
        }
      ]
    }
  ],
}); 

//Protección de rutas privadas con:

router.beforeEach(async (to, from, next)=>{

  const requiresAuth = to.matched.some(url => url.meta?.requiresAuth);

  if(!requiresAuth){
    return next(); //He requerido añadir esto para no caer en bucle de redirección infinito 
  }

  const role = localStorage.getItem('USER_ROLE');

  if(role === 'company'){
    try {
      await getCompany();
      return next();
    } catch (error) {
      return next({ name: 'LoginCompany' }); 
    }
  }

  if(role === 'candidate'){
    try {
      await getCandidate();
      return next(); 
    } catch (error) {
      return next({ name: 'LoginCandidate' }); 
    }
  }

  //Sin rol válido
  return next({ name: 'LoginCandidate' }); 

});

export default router
