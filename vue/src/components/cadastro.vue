<template>
  <div>
    <h5>
      
        <v-toolbar-title class="titulo pl-0">Cadastro </v-toolbar-title>
      </h5>
      <v-card class="card pr-10 pl-4 botaoNav">
        <router-link to="/categorias">
          <v-btn text color="#4D4D4D">
            <v-icon color="#4D4D4D"> category </v-icon>
            Foco Nas Tarefas
          </v-btn>
        </router-link>
        <v-divider></v-divider> 
        <v-divider></v-divider> 
      </v-card>
    </div>
</template>

<script>
import Breadcrumbs from '@/components/breadcrumbs.vue';

export default {
components: { Breadcrumbs },
};
</script>

<style>
.card {
  display: flex;
  width: 38.25rem;
  padding: var(--spacing-6, 1.5rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-3, 0.75rem);
  border-radius: var(--spacing-2, 0.5rem);
  background: var(--color-white-base, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1),
    0px 2px 2px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px -2px rgba(0, 0, 0, 0.2);
}
.botaoNav {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  background: var(--white-darken-1, #f5f5f5);
  color: #4d4d4d;
}
</style>