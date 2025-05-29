<template>
  <div>
    <Breadcrumbs />
    <h5>
      <v-toolbar-title class="titulo pl-0"
        >Editar Categoria
      </v-toolbar-title>
    </h5>
  <v-form ref="form">
    <div class="caixa">
      <div></div>
      <h6 class="informacao">Informações principais</h6>
      <v-divider></v-divider>
      <h6 class="texto">Qual a situação do registro</h6>
      <v-switch
          v-model="editedItem.ativo"
          color="#3A5383"
          inset
          class="switch"
          :label="`${editedItem.ativo ? 'Ativo' : 'Inativo'}`"
          required
      ></v-switch>
      <v-text-field
        outlined
        clearable
        v-model="editedItem.nome"
        label="Nome categoria"
        :loading="isLoading"
        required
        :rules="rules"
      ></v-text-field>
      <v-textarea
        cols="30"
        rows="5"
        large
        outlined
        clearable
        :rules="descMaximo"
        v-model="editedItem.descricao"
        label="Descrição da Categoria (opcional)"
        :loading="isLoading"
      ></v-textarea>
    </div>
  </v-form>
    <v-spacer></v-spacer>
    <v-col></v-col>
    <template>
      <div class="caixa">
        <div>
          <Subcategoria :categoriaId="$route.params.id" />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            max-width="90"
            min-height="40"
            @click="save"
            style="color: #ffffff"
            color="#3A5383"
            :loading="isLoading"
            class="pr-2"
            ><v-icon color="white" class="pr-1" small>save</v-icon>Salvar</v-btn
          ></v-card-actions>
      </div>
    </template>
  </div>
</template>

<script>
import Subcategoria from "@/components/subcategoriaEditar.vue";
import Breadcrumbs from "@/components/breadcrumbs.vue";
import Cadastro from "@/components/categorias.vue";
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
    orderBy: null,
    desc: false,
    isLoading: false,
    loadingTable: false, 
    ativoSwitch : true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Código", value: "id", sortable: true, alignText: "left" },
      {
        text: "Categoria",
        value: "nome",
        sortable: true,
      },
      { text: "Situação", value: "ativo", sortable: true },
      { text: "Subcategoria", value: "subcat", sortable: true },
      { text: " ", value: "actions", sortable: false, align: "right" },
    ],
    formTitle: "Categorias",
    class: "formTitle",
    listCategoria: [],
    situacaoList: [],
    editedItem: {
    },
    searchText: null,
    skip: 0,
    take: 5,
    currentPage: 1,
    totalItems: 0,
    editedItem: {},
  }),
  methods: {
    ...moduleCadastro.mapActions({
      getCategoriaById: "getCategoriaById",
      carregarCategoria: "carregarCategoria",
      atualizarCategoria: "atualizarCategoria",
    }),
    quantidadeSubcategoria() {
      return quantSubcateg.toString;
    },

    async save() {
      if (this.$refs.form) 
      this.$refs.form.resetValidation();

      if (this.$refs.form && this.$refs.form.validate()) {
        this.isLoading = true;
        console.log();
        if (this.editedItem.id) {
          await this.updateItemApi(this.editedItem);
        } else {
          await this.createItemApi(this.editedItem);
        }
        this.$router.push({path:"/categorias"});
        this.isLoading = false;
      }
    },
    
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.openCriarCategModal(false);
    },
    
    close() {
      this.dialog = false;
    }, 

    getChipColor(ativo) {
      if (ativo) return "#107154";
      else return "#CCCCCC";
    },

    getTextColor(ativo) {
      if (ativo) return "#FFFFFF";
      else return "#4D4D4D";
    },

    openCriarCategModal(isNew) {
      if (isNew) {
        this.editedItem.ativo = true;
        this.editedItem.nome = null;
        this.editedItem.id = 0;
      }
      this.dialog = true;
    }, 

    async createItemApi(item) {
      await this.criarCategoria(item);
    },

    async updateItemApi(item) {
      await this.atualizarCategoria(item);
    },

    async loadCategoria() {
      if (this.$route.params.id) {
        this.isLoading = true;
        var response = await this.getCategoriaById(this.$route.params.id);
        this.editedItem = response.data.result;
        this.isLoading = false;
      }
    },

  },

  mounted() {
    this.loadCategoria();
    //this.loadSubcategorias();
  },
};
</script>

<style>
.texto {
  color: var(--black-lighten-1, #4d4d4d);
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
  border: 1px solid var(--black-lighten-3, #ccc);
  background: var(--color-white-base, #fff);
}

.informacao {
  color: var(--darken1, #304163);
  font-family: Open Sans;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>