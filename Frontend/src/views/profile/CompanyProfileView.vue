<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();
    const router = useRouter();

    const menuItems = [
        { name: 'Configuración de la cuenta', routeName: 'CompanyConfig'},
        { name: 'Crear oferta', routeName: 'CreateOffer' },
        { name: 'Aplicaciones recibidas', routeName: 'Applications' },
        { name: 'Ofertas publicadas', routeName: 'PublishedOffers'}
    ]

    const goTo = (routeName)=>{
        router.push({ name: routeName });
    }

    const activeRoute = computed(()=> route.name );


</script>

<template>

    <div class="min-h-screen flex text-gray-100">
        <aside class="w-64 bg-gray-900 rounded">
            <div class="p-6 mb-5 font-semibold text-2xl text-center">
                Panel de Empresa
            </div>

            <nav class="flex flex-col mt-4">
                <button
                    v-for="item in menuItems"
                    :key="item.routeName"
                    @click="goTo(item.routeName)"
                    class="text-left font-semibold cursor-pointer hover:text-gray-300/70 px-6 py-4 border-b border-gray-200/30"
                    :class="[activeRoute === item.routeName ? 'text-emerald-500 bg-gray-800 border-l-4' : 'text-gray-100' ]"
                >{{ item.name }}</button>
            </nav>

        </aside>


        <!--Component principal-->
        <section class="flex-1 p-6">
            <router-view />
        </section>

    </div>

</template>