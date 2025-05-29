import Vue from "vue";
import VueRouter from "vue-router";
import Template from "@/template/Template.vue";
import MenuLateral from "@/components/shared/menuLateral.vue";
import Cadastro from "@/components/cadastro.vue";
import categorias from "@/components/categorias.vue"; 
import CriarCategoria from "@/components/criarCateg.vue";
import EditarCategoria from "@/components/editarCateg.vue";
import Subcategoria from "@/components/subcategoriaEditar.vue";
import SubcategoriaCriar from "@/components/subcategoriaCriar.vue"

Vue.use(VueRouter);

export const appRouters = [];

const routes = [

  {
    path: "/",
    component: Cadastro,
    name: "Cadastro",
    meta: {
      active: true,
      title: "Cadastros",
      breadcrumb: [
        {
          text: "Cadastros",
          disabled: false,
          href: '/'
        },
        {
          text: "Cadastros",
          disabled: true,
        },
      ],
    },
  },
  {
    path: "/categorias",
    component: categorias,
    name: "categorias",
    meta: {
      active: true,
      title: "Categorias",
      breadcrumb: [
        {
          text: "Cadastros",
          active: true,
          href: '/'
        },
        {
          text: "Categorias",
          disabled: true,
        },
      ],
    },
  },


  {
    path: "/criarCategoria",
    component: CriarCategoria,
    name: "CriarCategoria",
    meta: {
      active: true,
      title: "Criar Categoria",
      breadcrumb: [
        {
          text: "Cadastros", 
          active:true, 
          href:"/",
          disabled: false, 
        },
        {
          text: "Categorias",
          href:"/categorias",
          disabled: false,
          to: {
            name: "categorias",
          },
        },
        {
          text: " Criar Categoria",
          active: false,
          to: {
            name: "CriarCategoria",
          },
        },
      ],
    },
  },


  {
    path: "/editCateg/:id",
    component: EditarCategoria,
    name: "EditarCategoria",
    meta: {
      active: true,
      title: "Editar Categoria",
      breadcrumb: [
        {
          text: "Cadastros",  
          href:"/",
          disabled: false, 
        },
        {
          text: "Categorias",
          href:"/categorias",
          disabled: false,
          to: {
            name: "categorias",
          },
        },
        {
          text: "Editar Categoria",
          disabled: true,
        },
      ],
    },
  },


  {
    path: "/sub",
    component: Subcategoria,
    name: "Subcategoria",
    meta: {
      active: true,
      title: "Subcategoria",
      breadcrumb: [
        {
          text: "Subcategoria",
          link: true,
          to: {
            name: "Subcategoria",
          },
        },
        {
          text: "Subcategoria",
          active: false,
        },
      ],
    },
  },

 
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    const conteudo = document.getElementById("conteudo");
    if (conteudo) {
      conteudo.scrollTop = 0;
    }
  },
});

export default router;
