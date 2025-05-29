<template>
  <div>
    <v-alert
      dismissible
      type="success"
      width="25%"
      style="position: absolute; top: 10%; right: 1%"
      v-show="alertSuccess"
      transition="scroll-x-reverse-transition"
      >{{ alertSuccessText }}</v-alert
    >
    <v-alert
      dismissible
      type="error"
      width="25%"
      style="position: absolute; top: 10%; right: 1%"
      v-show="alertError"
      transition="scroll-x-reverse-transition"
      >{{ alertErrorText }}</v-alert
    >
    <v-card style="height: 100%">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        hide-overlay
        class="rounded-xl"
        mobile-breakpoint="0"
        style="overflow: visible; width: auto"
      >
        <v-list-item class="px-2" style="align-items: unset">
          <v-list-item-avatar class="avatarImagem">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-progress-circular
                  :size="size + 8"
                  color="grey"
                  :indeterminate="loading"
                >
                  <v-avatar class="avatar linkItem" :size="size">
                    <v-img
                      :src="imagemPerfil"
                      alt="User"
                      v-bind="attrs"
                      v-if="loadImage"
                      v-on="on"
                    ></v-img>
                    <span
                      class="white--text text-h5"
                      v-bind:class="[mini ? miniInitial : bigInitial]"
                      v-bind="attrs"
                      v-if="!loadImage"
                      v-on="on"
                      >{{ getInitials }}</span
                    >
                  </v-avatar>
                </v-progress-circular>
              </template>
              <v-card>
                <v-list style="text-decoration-line: underline">
                  <v-list-item @click="$refs.file.click()">
                    <input
                      id="upload"
                      type="file"
                      ref="file"
                      v-on:change="uploadImage($event)"
                    />
                    Alterar Foto
                  </v-list-item>
                  <v-list-item @click="logout"> Sair </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-list-item-avatar>
          <v-btn
            style="width: 10px; padding: 0"
            icon
            @click.stop="mini = !mini"
            @click="size = 45"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item>

        <v-list-item
          class="px-2 mt-5 align-center justify-center"
          style="margin-top: 0px !important"
        >
          <div class="text-center" v-show="mini"></div>

          <div v-show="!mini">
            <div style="display: inline-block; text-align: left">
              <h4
                class="text-uppercase textMenuLateral text-decoration-underline"
                style="margin-bottom: 10px"
              ></h4>
              <h3 class="userNameMenuLateral">{{ getUsername }}</h3>
              <span class="textMenuLateral">{{ getEmail }}</span>
            </div>
          </div>
        </v-list-item>

        <v-list flat class="mt-2 ml-1"> </v-list>
        <v-list flat class="fixedBottom">
          <v-list-item>
            <v-list-item-icon>
              <v-icon medium @click="linkTo('/app/administracao')"
                >mdi-wrench</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content
              class="linkItem itensMenuLateral"
              @click="linkTo('/app/administracao'), (size = 45)"
            >
              <v-list-item-title>Administração</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { toBase64 } from "@/lib/helpers/base64";
import alerts from "@/mixins/alerts.js";
import { createNamespacedHelpers } from "vuex";
const moduleUsuarios = createNamespacedHelpers("ModuleUsuarios");
export default {
  data() {
    return {
      loading: false,
      size: 45,
      drawer: true,
      mini: true,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      loadImage: true,
      Nome: "",
      SobreNome: "",
      imagem: null,
      foto: null,
      miniInitial: "miniInitial",
      bigInitial: "bigInitial",
    };
  },
  props: {
    asText: Boolean,
  },
  watch: {
    drawer(drawer) {
      this.$emit("isActiveMenu", drawer);
    },
    $route(to, from) {
      this.mini = true;
      this.size = 45;
    },
  },
  computed: {
    getUsername() {
      this.getNomeSobrenome();
      return this.Nome + " " + this.SobreNome;
    },
    getEmail() {
      return this.$store.state.Session.user
        ? this.$store.state.Session.user.emailAddress
        : "";
    },
    getInitials() {
      this.getNomeSobrenome();
      this.loadImage = this.$store.state.ModuleUsuarios.imagem ? true : false;
      var iniciais =
        this.Nome.substr(0, 1).toUpperCase() +
        this.SobreNome.substr(0, 1).toUpperCase();
      return iniciais;
    },
    imagemPerfil() {
      return this.$store.state.ModuleUsuarios.imagem;
    },
  },
  methods: {
    ...moduleUsuarios.mapActions([
      "ObterFotoUsuarioLogado",
      "UpdateFotoUsuarioLogado",
    ]),

    getNomeSobrenome() {
      var nomeCompleto =
        this.$store.state.Session.user != null
          ? this.$store.state.Session.user.name.toUpperCase()
          : "";
      var arr = nomeCompleto.split(" ");
      if (arr) {
        this.Nome = arr[0];
        this.SobreNome = arr[arr.length - 1];
      }
    },
    linkTo(link) {
      if (this.$route.path != link) {
        this.$router.push(link);
        this.mini = true;
      }
    },
    logout() {
      this.$store.commit("App/logout");
    },
    async GetFotoUsuarioLogado(v) {
      await this.ObterFotoUsuarioLogado();
      this.loadImage = this.$store.state.ModuleUsuarios.imagem ? true : false;
      this.foto = this.$store.state.ModuleUsuarios.imagem;
      this.loading = false;
      if (v) {
        this.alertSuccess = true;
        this.alertSuccessText = "Imagem alterada com sucesso";
        setTimeout(() => {
          this.alertSuccess = false;
        }, 5000);
      }
    },
    async uploadImage(e) {
      if (e.target.files[0].size > 5000000) {
        e.preventDefault();
        this.alertError = true;
        this.alertErrorText = "Tamanho da imagem ultrapassa 5MB";
        setTimeout(() => {
          this.alertError = false;
        }, 5000);
        this.loading = false;
        return;
      }
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/jpg"
      ) {
        this.loading = true;

        this.menu = !this.menu;
        if (e.target.files.length > 0) {
          this.imagem = await toBase64(e.target.files[0], this.asText);

          await this.UpdateFotoUsuarioLogado({
            data: { Nome: e.target.files[0].name, Foto: this.imagem },
          }).then((result) => {
            document.getElementById("upload").value = "";
            this.imagem = "";
            if (result.status == 200) {
              this.GetFotoUsuarioLogado(true);
            } else {
              this.alertError = true;
              this.alertErrorText = "Ocorreu um erro, ao alterar a imagem...";
              setTimeout(() => {
                this.alertError = false;
              }, 5000);
              this.loading = false;
            }
          });
        }
      } else {
        this.alertError = true;
        this.alertErrorText = "Arquivo inválido";
        setTimeout(() => {
          this.alertError = false;
        }, 5000);
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getNomeSobrenome();
    this.GetFotoUsuarioLogado(false);
  },
  mixins: [alerts],
};
</script>
<style scoped>
.avatarImagem {
  width: 100% !important;
  height: 20% !important;
  margin: 0px !important;
  margin-top: 5px !important;
}
.fixedBottom {
  position: absolute !important;
  bottom: 0 !important;
}
.fixedBottomDiv {
  bottom: 0 !important;
  height: 100%;
}
.linkItem {
  cursor: pointer;
}
.avatar:hover {
  opacity: 1;
}
.avatar {
  opacity: 0.9;
}

#upload_link {
  text-decoration: none;
}
#upload {
  display: none;
}
.informationUser {
  height: 100px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
}
.itensMenuLateral {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  text-transform: uppercase;
  color: #4d4d4d;
}
.userNameMenuLateral {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 23px;
  text-transform: uppercase;
  text-align: center;
  color: #191919;
}
.textMenuLateral {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  margin-top: 10px;
  text-align: center;
}

.miniInitial {
  height: 100%;
  width: 100%;
  padding: 5px;
  font-size: 20px !important;
}

.bigInitial {
  height: 100%;
  width: 100%;
  padding: 30px;
  font-size: 22px !important;
}
</style>
