import moment from "moment";

const filters = [
  {
    name: "dateTime",
    handler: function (value) {
      if (!value) return "";
      let dateTime = new Date(value);
      return moment(dateTime).format("DD/MM/YYYY HH:mm");
    },
  },

  {
    name: "date",
    handler: function (value) {
      if (!value) return "";
      let dateTime = new Date(value);
      return moment(dateTime).format("DD/MM/YYYY");
    },
  },
  {
    name: "dateTimeAuditedEntity",
    handler: function (value) {
      if (!value) return "";
      var date = value.lastModificationTime
        ? value.lastModificationTime
        : value.creationTime;
      var name = value.lastModifierUserName;
      let dateTime = new Date(date);
      return `${name} ${moment(dateTime).format("DD/MM/YYYY HH:mm")}`;
    },
  },
  {
    name: "truncate",
    handler: function (value, length) {
      if (!value) return "";
      return value.length <= length
        ? value
        : String(value).slice(0, length).concat(["..."]);
    },
  },
  {
    name: "lastModification",
    handler: function (value) {
      if (value.lastModificationTime != null)
        return (
          value.lastModifierUserName +
          " " +
          convertTimeStamp(value.lastModificationTime)
        );
      else
        return (
          value.lastModifierUserName +
          " " +
          convertTimeStamp(value.creationTime)
        );
    },
  },
  {
    name: "ativoInativo",
    handler: function (value) {
      return value ? "ATIVO" : "INATIVO";
    },
  },
  {
    name: "origemCadastro",
    handler: function (value) {
      switch (value) {
        case 1:
          return "IMPORTAÇÃO";
        case 2:
          return "MANUAL";
        default:
          return "";
      }
    },
  },
  {
    name: "situacaoImportacao",
    handler: function (value) {
      if (!value) return "NÃO RELACIONADA";

      switch (value.statusImportacao) {
        case 1:
          return "IMPORTAÇÃO EM ANDAMENTO";
        case 2:
          return "LISTA IMPORTADA";
        case 3:
          return "ERRO NA IMPORTAÇÃO";
        default:
          return "NÃO RELACIONADA";
      }
    },
  },
  {
    name: "sequencialCode",
    handler: function (value) {
      if (value && value.length < 3) value = value.padStart(3, "0");
      return value;
    },
  },
];

export default {
  install(Vue) {
    filters.forEach((filter) => {
      Vue.filter(filter.name, filter.handler);
    });
  },
};
