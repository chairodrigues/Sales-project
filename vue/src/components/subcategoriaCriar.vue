<template>
  <div>
    <h5>
      <v-toolbar-title class="titulo">Subcategoria</v-toolbar-title>
    </h5>
    <v-divider></v-divider>
    <v-dialog
      v-model="dialogDelete"
      max-wFatth="100px"
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
          >
            Excluir
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
            <div></div>
            <v-divider></v-divider>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mb-8 pa-0 ma-0"></div>
        <v-card-text class="pa-0">
          <v-form ref="form" class="mx-8">
            Qual a situação do registro?
            <v-row class="mx-0" persistent>
              <v-col cols="6">
                <v-switch
                  color="#3A5383"
                  text="Qual a situação do registro?"
                  v-model="editedItem.ativo"
                  inset
                  :label="`${editedItem.ativo ? 'Ativo' : 'Inativo'}`"
                ></v-switch>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.nome"
                  :rules="[rules.required]"
                  :text-style="'color=#cac7ca'"
                  font-family="Open Sans"
                  font-size="1.5rem"
                  font-style="normal"
                  font-weight="700"
                  line-height="normal"
                  label="Subcategoria"
                  outlined
                  :loading="isLoading"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-divider />
        </v-card-text>
        <v-card-actions>
          <v-btn
            max-width="90"
            min-height="40"
            @click="save"
            style="color: #ffffff"
            color="#3A5383"
            :loading="isLoading"
            class="pr-2"
            ><v-icon color="white" class="pr-1" small>save</v-icon>Salvar</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
    <v-btn
      font-weight="700"
      color="#3A5383"
      style="color: #ffffff"
      class="align-items-sm-center novo ps-4 ms-4 rounded-lg pb-6 mb-4 pt-5 mt-4 me-4 pe-4"
      clearable
      @click="openSubcategoriaModal(true)"
      ><v-icon small class="me-1" type="default"> add </v-icon>
      Nova subcategoria
    </v-btn>
    <div></div>
    <v-data-table
      :items-per-page="take"
      :page="currentPage"
      :headers="headers"
      :items="subcategoriasList"
      class="elevation-2 coluna mr-1"
      :server-items-length="totalItems"
      :loading="loadingTable"
      ><template v-slot:[`item.actions`]="{ item }">
        <v-icon class="my-2 editar" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon class="deletar" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>Sem dados para exibir</template>
      <template v-slot:[`item.id`]="{ item }">
        {{ ajustCod(item.id) }}
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
    </v-data-table>
  </div>
</template>


<script>
import validationRules from "@/mixins/validationRules.js";
import { RouterLink } from "vue-router";

import { createNamespacedHelpers } from "vuex";
import Breadcrumbs from "@/components/breadcrumbs.vue";
const moduleSubcategoria = createNamespacedHelpers("ModuleSubcategoria");
const moduleCadastro = createNamespacedHelpers("ModuleCadastro");

export default {
  props: {
    categoriaId: Number,
    subcategoriasList: Array,
  },
  mixins: [validationRules],
  components: { Breadcrumbs },
  data: () => ({
    orderBy: null,
    desc: false,
    isLoading: false,
    loadingTable: false,
    ativo: true,
    dialog: false,
    dialogDelete: false,
    items: [
      { value: false, text: "Inativo" },
      { value: true, text: "Ativo" },
    ],
    headers: [
      { text: "Código", value: "id", sortable: true, alignText: "left" },
      { text: "Subcategoria", value: "nome", sortable: true },
      { text: "Situação", value: "ativo", sortable: true },
      { text: " ", value: "actions", sortable: false, align: "right" },
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      nome: "",
      ativo: true,
    },
    formTitle: "Subcategorias",
    class: "formTitle",
    situacaoList: [],
    skip: 0,
    take: 5,
    currentPage: 1,
    totalItems: 0,
  }),
  methods: {
    save() {
      this.isLoading = true;
      if (this.$refs.form && this.$refs.form.validate()) {
        console.log(this.editedIndex);
        if (this.editedIndex >= 0) {
          this.$emit("removeItem", this.editedIndex);
          // this.subcategoriasList.splice(this.editedIndex, 1);
          this.editedIndex = -1;
        }
        this.$emit("insertItem", this.editedItem);
        // this.subcategoriasList.push(Object.assign({}, this.editedItem));
        this.totalItems++;
      }
      this.close();
      this.isLoading = false;
    },

    // editItem(item, itemParaEditar, posicao) {
    // this.editedIndex = this.subcategoriasList.searchElement(this.editedItem) ;
    // if(itemParaEditar){
    //   itemParaEditar = this.editedItem.id || itemParaEditar.id;
    //   itemParaEditar = this.editedItem.nome || itemParaEditar.nome;
    //   itemParaEditar = this.editedItem.ativo || itemParaEditar.ativo;
    // }
    // console.log(this.editedItem);
    // console.log(this.editedIndex);
    // this.openSubcategoriaModal(false);

    // },

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.subcategoriasList.indexOf(item);
      this.openSubcategoriaModal(false);
    },

    deleteItem(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.isLoading = true;
      this.editedIndex = this.subcategoriasList.indexOf(this.editedItem);
      this.$emit("removeItem", this.editedIndex);
      // this.subcategoriasList.splice(this.editedIndex, 1);
      this.closeDelete();
      this.isLoading = false;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    situacaoText(ativo) {
      if (ativo == true) {
        return "class='ma-2'", "Ativo";
      } else {
        return "x-small", "class='ma-2'", "Inativo";
      }
    },

    getChipColor(ativo) {
      if (ativo) return "#107154";
      else return "#CCCCCC";
    },

    getTextColor(ativo) {
      if (ativo) return "#FFFFFF";
      else return "#4D4D4D";
    },

    openSubcategoriaModal(isNew) {
      if (this.$refs.form) this.$refs.form.resetValidation();
      if (isNew) {
        this.editedItem.ativo = true;
        this.editedItem.nome = null;
      }
      this.dialog = true;
    },

    updatePage(value) {
      this.currentPage = value;
      this.skip = (this.currentPage - 1) * this.take;
    },

    ajustCod(id) {
      if (id) return id.toString().padStart(5, "0");
      else return "-";
    },

    //   editaritem(posicao, item){
    //   if (posicao >= 0 && posicao < subcategoriasList.length) {
    //   let ItemParaEditar = this.subcategoriasList[posicao];
    //   console.log(posicao);
    //   this.editedItem.item = ItemParaEditar.item || item;
    //   this.openSubcategoriaModal(false);
    // }
    //},
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