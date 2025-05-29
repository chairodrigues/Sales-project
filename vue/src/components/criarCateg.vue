<template>
  <div>
    <v-spacer></v-spacer>
    <Breadcrumbs />
    <v-toolbar-title class="titulo pl-0"
      >Criar Categoria 
    </v-toolbar-title>
    <v-form ref="form">
      <div box-shadow dense class="caixa mr-1">
        <h5>
          <h6 class="informacao">Informações principais</h6>
          <v-divider></v-divider>
        </h5>
        <v-spacer></v-spacer>
        <div class="mr-1"></div>
        <h6 class="texto">Qual a situação do registro</h6>

        <!-- <v-switch
          v-model="editedItem.ativo"
          color="#3A5383"
          inset
          class="switch"
          :label="`${editedItem.ativo ? 'Ativo' : 'Inativo'}`"
          required
        > -->
        </v-switch>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="editedItem.nome"
          class="nomecateg"
          outlined
          clearable
          label="Nome categoria"
          :loading="isLoading"
          required
          :rules="rules"
        >
        </v-text-field>
        <v-textarea
          v-model="editedItem.descricao"
          cols="30"
          rows="5"
          large
          outlined
          :rules="descMaximo"
          clearable
          label="Descrição da Categoria (opcional)"
        >
        </v-textarea>
        <col />
      </div>
    </v-form>
    <v-col class="mr-1"></v-col>
    <div class="caixa mr-1">
      <Subcategoria
        :subcategoriasList="editedItem.subcategorias"
        @insertItem="inserirSubcategoria"
        @removeItem="removerSubcategoria"
      />
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        max-width="90"
        min-height="40"
        @click="save()"
        style="color: #ffffff"
        color="#3A5383"
        class="pr-2"
        ><v-icon color="white" class="pr-1" small>save</v-icon>Salvar</v-btn
      ></v-card-actions
    >
  </div>
</template>

<script>
import Subcategoria from "@/components/subcategoriaCriar.vue";
import Breadcrumbs from "@/components/breadcrumbs.vue";
import validationRules from "@/mixins/validationRules.js";
import { RouterLink } from "vue-router";
import { createNamespacedHelpers } from "vuex";

const moduleCadastro = createNamespacedHelpers("ModuleCadastro");

export default {
  mixins: [validationRules],
  components: { Breadcrumbs, Subcategoria },

  data: () => ({
    rules: [(value) => !!value || "Necessário preencher."],
    descMaximo: [
      (value) => !value || value.length <= 1500 || "Máximo de 1500 caracteres",
    ],
    subcategList: [],
    orderBy: null,
    desc: false,
    isLoading: false,
    loadingTable: false,
    ativo: true["#3A5383"],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Código", value: "id", sortable: true, alignText: "left" },
      { text: "Categoria", value: "nome" },
      { text: "Situação", value: "ativo" },
      { text: "Subcategoria", value: "subcat" },
      { text: "Descrição", value: "descricao" },
      { text: " ", value: "actions", sortable: false, align: "right" },
    ],
    class: "formTitle",
    listCategoria: [],
    situacaoList: [],
    editedItem: {
      subcategorias: [],
    },
    searchText: null,
    skip: 0,
    take: 5,
    currentPage: 1,
    totalItems: 0,
  }),
  methods: {
    ...moduleCadastro.mapActions({
      carregarCategoria: "carregarCategoria",
      criarCategoria: "criarCategoria",
    }),
    async save() {
      if (this.$refs.form && this.$refs.form.validate()) {
        this.isLoading = true;
        await this.createItemApi(this.editedItem);
        this.$router.push({ path: "/categorias" });
        this.console.log();
        this.isLoading = false;
      }
    },
    async createItemApi(items) {
      await this.criarCategoria(items);
    },
    inserirSubcategoria(item) {
      this.editedItem.subcategorias.push(Object.assign({}, item));
    },
    removerSubcategoria(index) {
      this.editedItem.subcategorias.splice(index, 1);
    },
  },
};
</script>

<style>
.titulo {
  color: #3a5383;
  font-size: 24px;
  font-family: Open Sans;
  font-weight: 700;
}

.texto {
  color: var(--black-lighten-1, #4d4d4d);

  /* body/body-2 */
  font-family: "Open Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.caixa {
  display: flex;
  padding: var(--spacing-3, 0.75rem);
  flex-direction: column;
  border-radius: var(--spacing-2, 0.5rem);
  background: var(--color-white-base, #fff);
}

.subtitulo {
  color: var(--darken1, #304163);
  font-family: Open Sans;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.informacao {
  color: var(--darken1, #304163);
  font-family: Open Sans;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.switch {
  display: flex;
  width: 6.625rem;
  align-items: center;
  gap: 0.25rem;
}

.descricaocateg {
  display: flex;
  padding: var(--spacing-3, 0.75rem) 0rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  min-height: 12.5rem;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 0 0;
  border: 1px solid var(--black-lighten-1, #4d4d4d);
}
.nomecateg {
  display: flex;
  padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0.25rem;
  /*border: 1px solid var(--black-lighten-1, #4D4D4D);*/
}
</style>