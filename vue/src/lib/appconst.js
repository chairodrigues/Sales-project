const url = process.env.VUE_APP_API_PATH;

export default {
  userManagement: {
    defaultAdminUserName: "administrador",
  },
  localization: {
    defaultLocalizationSourceName: "pt-BR",
  },
  authorization: {
    encrptedAuthTokenName: "enc_auth_token",
  },
  appBaseUrl: "http://localhost:8080",
  remoteServiceBaseUrl: url.endsWith("/") ? url.slice(0, -1) : url,
};
