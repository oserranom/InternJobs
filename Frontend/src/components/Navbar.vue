<script setup>
    import { computed, onMounted } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useCandidateStore } from '@/stores/candidates';
    import { useCompanyStore } from '@/stores/companies';

    //Computed siempre debe retornar o abreviar eliminando las llaves
    const role = computed(() => localStorage.getItem('USER_ROLE')); //candidate o company
    

    const candidateStore = useCandidateStore();
    const companyStore = useCompanyStore(); 

    const loading = computed(() => candidateStore.loading || companyStore.loading ); 

    const isCandidateLoggedIn = computed(() => !!candidateStore.candidate?.id);
    const isCompanyLoggedIn = computed(() => !!companyStore.company?.id);
    //const user = computed(() => isCandidateLoggedIn.value || isCompanyLoggedIn.value);


    onMounted(async ()=>{
        if(role.value === 'company'){
           await companyStore.fetchCompany();
        } 
        if(role.value === 'candidate'){
           await candidateStore.fetchCandidate();
        }  
    });


    const handleLogout = ()=>{
        candidateStore.logout();
        companyStore.logout(); 
    }

</script>

<template>
    <nav class="bg-gray-800 sticky top-0 z-10 shadow-[0_2px_4px_-1px_rgba(16,185,129,0.5)]">
        <div class="text-center md:flex justify-between px-15 items-center">

            <RouterLink
                class="text-3xl font-serif font-bold text-gray-50 hover:text-emerald-400 text-shadow-emerald"
                :to="{name: 'home'}"
            >
                Intern<span class="font-sans font-extrabold text-emerald-400">JOBS</span>
            </RouterLink>

            
            <!-- Loading -->
            <div v-if="loading" class="text-gray-100 text-sm py-2 px-4 animate-pulse">
                Cargando usuario...
            </div>


            <!-- Usuario Logueado -->
            <div
                v-else-if="isCandidateLoggedIn || isCompanyLoggedIn" 
                class="text-center flex flex-col md:flex-row items-center"
            >
               <div 
                    v-if="role === 'candidate'"
                    class="my-5"
               >
                    <RouterLink 
                        :to="{name: 'CandidateProfile' }"
                        class="text-gray-100 text-lg font-semibold mx-4 bg-emerald-500 px-2 py-1 rounded 
                                hover:bg-emerald-600 flex justify-between gap-2 items-center max-w-75"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"  
                            width="20"  
                            height="20"  
                            viewBox="0 0 24 24"  
                            fill="currentColor"  
                            class="icon icon-tabler icons-tabler-filled icon-tabler-user"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                        </svg>

                        {{ candidateStore.candidate.name }}

                    </RouterLink>
               </div>


               <div 
                    v-else
                    class="my-5"
               >
                    <RouterLink 
                        :to="{ name: 'CompanyProfile' }"
                        class="text-gray-100 text-lg font-semibold mx-4 bg-emerald-500 px-2 py-1 rounded 
                                hover:bg-emerald-600 flex justify-between gap-2 items-center max-w-75"
                    >
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                        class="icon icon-tabler icons-tabler-outline icon-tabler-building">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 21l18 0" /><path d="M9 8l1 0" /><path d="M9 12l1 0" />
                        <path d="M9 16l1 0" /><path d="M14 8l1 0" />
                        <path d="M14 12l1 0" /><path d="M14 16l1 0" />
                        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
                    </svg>

                        {{ companyStore.company.name }}

                    </RouterLink>
               </div>


                <div class="my-5">
                    <button
                        class="rounded font-semibold ml-2 bg-red-500 px-2 py-1.5 cursor-pointer hover:bg-red-600"
                        @click="handleLogout"
                    >
                        Logout
                    </button>
                </div>
                
            </div>
                
            <!-- Usuario NO Logueado -->
            <div v-else class="text-center flex flex-col md:flex-row md:items-center">
               <div class="my-5">
                    <RouterLink 
                        :to="{name: 'LoginCompany'}"
                        class="text-gray-50 text-lg hover:text-gray-800 mx-2 hover:bg-gray-50 transition duration-300 ease-in-out
                            py-2 px-3 rounded-lg font-semibold"
                    >
                        Acceso Empresas
                    </RouterLink>
               </div>

                <div class="my-5">
                    <RouterLink 
                        :to="{name: 'LoginCandidate'}"
                        class="text-gray-50 text-lg hover:text-gray-800 mx-2 hover:bg-gray-50 transition duration-300 ease-in-out
                            py-2 px-3 rounded-lg font-semibold"
                    >
                        Acceso Candidatos
                    </RouterLink>
                </div>

                <div class="my-5">
                    <RouterLink 
                        :to="{name: 'CandidateRegister'}"
                        class="text-lg font-bold text-gray-800 bg-emerald-400 mx-2 rounded-lg py-2 px-3 
                        hover:shadow-[0_8px_25px_rgba(16,185,129,0.5)] hover:bg-emerald-300 transition duration-300 ease-in-out"
                    >
                        Regístrate
                    </RouterLink>
                </div>
                
            </div>

        </div>

    </nav>

</template>

<style>
    .text-shadow-emerald:hover {
        text-shadow:  0 0 6px #6ee7b7; /* emerald-400 */
        transition: ease 300ms;
    }
</style>