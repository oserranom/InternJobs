<script setup>

</script>

<template>
    <div class="flex justify-center p-5 text-gray-100 md:mb-40">
        <div class="md:w-2/5 rounded-lg bg-gray-900 p-5 mt-10">
            <form
                class="p-5 pb-0"

            >
                <h1 class="text-center text-2xl font-semibold">Confirma tu <span class="text-emerald-500"> Inscripción</span></h1>

                <select name="includeCL" id="includeCL"
                    class="w-full text-center p-2 mt-5 bg-gray-100 text-gray-900 rounded"
                >
                    <option value="noInclude">No incluir carta de presentación</option>
                    <option value="include">Incluir carta de presentación</option>
                </select>


                <textarea 
                    name="cover_letter" 
                    id="cover_letter"
                    placeholder="Escribe aquí tu carta de presentación"
                    class="w-full my-5 p-2 bg-gray-100 text-gray-900 rounded min-h-60"
                ></textarea>

                <div class="w-full p-3">
                    <input 
                        type="submit"
                        class="bg-emerald-500 hover:bg-emerald-600 rounded w-full py-2 font-semibold cursor-pointer"
                        value="Confirmar mi inscripción"
                    >
                </div>

            </form>

            <!--Añadiendo transition-->
            <!-- <div class="p-7 -mt-5">
                <Transition name="fade">
                    <Alert 
                        v-if="alert.message"
                        :alert="alert"
                    />
                </Transition>
            </div>
             -->

        </div>
    </div>
</template>