<template>
  <div>
    <Breadcrumbs />
    <v-toolbar-title class="titulo">Categorias</v-toolbar-title>
    <v-dialog
      v-model="dialogDelete"
      max-wFatth="100px"
      v-bind="props"
      persistent
      width="auto"
      style="border-radius: 0.2rem; background: var(--white-base, #fff)"
      ><v-card>
        <v-card-title class="text-h5"> </v-card-title>
        <v-row justify="center" class="mb-3 mx-0">
          <v-icon size="60" color="#E10000">report</v-icon>
        </v-row>
        <v-card-text class="text-central">
          Tem certeza de que deseja excluir?<br />
          Essa ação não pode ser revertida.<br />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="dark grey"
            text
            @click="closeDelete"
            :loading="isLoading"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="white"
            text
            @click="deleteItemConfirm"
            cols="12"
            md="3"
            class="pa-4 text-center error text-no-wrap rounded"
            :loading="isLoading"
            >Excluir
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" width="68.75rem">
      <v-card>
        <v-card-title>
          <span class="formTitle text-h5">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <v-btn icon class="mb-2" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>
      </v-card>
    </v-dialog>
    <v-spacer><v-col cols="1"></v-col></v-spacer>
    <v-row>
      <router-link to="/criarCategoria">
        <v-btn
          font-weight="700"
          color="#3A5383"
          style="color: #ffffff"
          class="align-items-sm-center ps-4 ms-4 rounded-lg pb-6 mb-4 pt-5 mt-4 me-4 pe-4"
          clearable
          ><v-icon small class="me-1" type="default"> add </v-icon>
          Novo
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <div :style="'width: 45%'">
        <v-text-field
          absolute
          v-model="searchText"
          solo
          placeholder="Pesquisar por Código ou Categoria"
          prepend-inner-icon="search"
          class="pt-2 mr-3"
          @change="mostrarTelaAtualizada"
          :loading="isLoading"
          clearable
          @click:clear="clearAndSearch"
        />
      </div>
      <v-btn
        large
        icon
        ajust
        style="background-color: #3a5383"
        class="pt-1 mr-3 mt-3"
        elevation="3"
        @keyup.13="enter"
        @click="mostrarTelaAtualizada"
        :loading="isLoading"
        ><v-icon class="pesquisa" color="white" medium>search</v-icon>
      </v-btn>
    </v-row>
    <v-data-table
      :items-per-page="take"
      :page="currentPage"
      :headers="headers"
      :items="listCategoria"
      class="elevation-2 coluna mr-1"
      :server-items-length="totalItems"
      @update:items-per-page="updateTake"
      @update:page="updatePage"
      :sort-by="orderBy"
      :sort-desc="desc"
      @update:sort-by="updateOrderBy"
      @update:sort-desc="updateDesc"
      :loading="loadingTable"
      ><template v-slot:[`item.actions`]="{ item }">
        <router-link :to="{ path: '/editCateg/' + `${item.id}` }">
          <v-icon class="my-2 editar"> mdi-pencil </v-icon>
        </router-link>
        <v-icon class="deletar" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>Sem dados para exibir</template>
      <template v-slot:[`item.id`]="{ item }">
        <v-btn
          text
          @click="$router.push({ path: '/editCateg/' + `${item.id}` })"
        >
          {{ ajustCod(item.id) }}
        </v-btn>
      </template>
      <template v-slot:[`item.ativo`]="{ item }">
        <v-chip
          class="statusChip justify-center"
          font-family="Open Sans"
          label
          :color="getChipColor(item.ativo)"
          :text-color="getTextColor(item.ativo)"
          >{{ situacaoText(item.ativo) }}
        </v-chip>
      </template>
      <template v-slot:[`item.subcategoriasCount`]="{ item }">
        {{ `(${item.subcategoriasCount})` }}
      </template>
    </v-data-table>
  </div>
</template>  
   
<script>
import validationRules from "@/mixins/validationRules.js";
import { RouterLink } from "vue-router";
import { createNamespacedHelpers } from "vuex";
import Breadcrumbs from "@/components/breadcrumbs.vue";
const moduleCadastro = createNamespacedHelpers("ModuleCadastro");
import editarCategoria from "@/components/editarCateg.vue";

export default {
  mixins: [validationRules],
  components: { Breadcrumbs },
  data: () => ({
    orderBy: null,
    desc: false,
    isLoading: false,
    loadingTable: false,
    items: [
      { value: false, text: "Inativo" },
      { value: true, text: "Ativo" },
    ],
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
      { text: "Subcategorias", value: "subcategoriasCount", sortable: false },
      { text: " ", value: "actions", sortable: false, align: "right" },
    ],
    formTitle: "Categorias",
    class: "formTitle",
    listCategoria: [],
    situacaoList: [],
    editedItem: {},
    searchText: null,
    skip: 0,
    take: 5,
    currentPage: 1,
    totalItems: 0,
  }),
  methods: {
    ...moduleCadastro.mapActions({
      carregarCategoria: "carregarCategoria",
      deletarCategoria: "deletarCategoria",
    }),
    quantidadeSubcategoria() {
      //
      return quantSubcateg;
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      console.log();
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      this.isLoading = true;
      await this.deleteItemApi(this.editedItem);
      this.closeDelete();
      this.isLoading = false;
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    situacaoText(ativo) {
      if (ativo == true) {
        return "class='ma-2'", "Ativo";
      } else {
        return "x-small", "class='ma-2'", "Inativo";
      }
    },

    subcategoria() {},

    getChipColor(ativo) {
      if (ativo) return "#107154";
      else return "#CCCCCC";
    },

    getTextColor(ativo) {
      if (ativo) return "#FFFFFF";
      else return "#4D4D4D";
    },

    async deleteItemApi(item) {
      await this.deletarCategoria(item.id);
      await this.mostrarTelaAtualizada();
    },

    clearAndSearch() {
      this.searchText = "";
      this.mostrarTelaAtualizada();
    },

    async mostrarTelaAtualizada() {
      this.loadingTable = true;
      let response = await this.carregarCategoria({
        search: this.searchText,
        skip: this.skip,
        take: this.take == -1 ? this.totalItems : this.take,
        orderBy: this.orderBy,
        desc: this.desc,
      });
      if (response.data && response.data.result) {
        this.listCategoria = response.data.result.items;
        this.totalItems = response.data.result.totalCount;
      }
      this.loadingTable = false;
    },

    updateOrderBy(value) {
      this.orderBy = value;
      this.mostrarTelaAtualizada();
    },

    updateDesc(value) {
      this.desc = value;
      this.mostrarTelaAtualizada();
    },

    updateTake(value) {
      this.take = value;
      this.mostrarTelaAtualizada();
    },

    updatePage(value) {
      this.currentPage = value;
      this.skip = (this.currentPage - 1) * this.take;
      this.mostrarTelaAtualizada();
    },

    ajustCod(id) {
      return id.toString().padStart(5, "0");
    },
  },

  mounted() {
    this.mostrarTelaAtualizada();
  },
};
</script>
  <style scoped>
.statusChip {
  width: 70px;
}
.formTitle {
  font-family: Open-Sans;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #4d4d4d;
}

.novo {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-3, 0.75rem);
  align-self: stretch;
}

.deletar {
  width: var(--spacing-6, 1.5rem);
  height: var(--spacing-6, 1.5rem);
}

.editar {
  width: var(--spacing-6, 1.5rem);
  height: var(--spacing-6, 1.5rem);
}

.coluna {
  /*espaco */
  align-items: flex-start;
  padding: 0rem var(--spacing-3, 1%.75rem);
  flex-direction: column;
  align-items: flex-start;
  gap: -10.375rem;
  flex: 1 0 0;
  align-self: stretch;
}

.pesquisa {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: var(--spacing-6, 1.5rem);
  height: var(--spacing-6, 1.5rem);
}
</style> 