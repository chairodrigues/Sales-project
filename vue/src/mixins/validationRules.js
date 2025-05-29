export default {
  data: () => ({
    rules: {
      required: (value) => !!value || "Campo obrigatório",
      requiredBoolean: (value) => (value == true || value == false) || "Campo obrigatório",
      maximoSeteDigitos: (value) =>
        (value && value.length <= 7) || "Máximo de 7 dígitos",
      maximoOitoDigitos: (value) =>
        (value && value.length <= 8) || "Máximo de 8 dígitos",
      nameValidation: (value) => {
        const pattern =
          /^[a-zA-Z]{1,}(?: [a-zA-Z]+){1,}[a-zA-Z\u00C0-\u00FF ]+/i;
        return pattern.test(value) || "Digite ao menos um nome e um sobrenome";
      },
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const pattern2 = /^([a-zA-z0-9]){1,}$/;
        return (
          pattern.test(value) ||
          pattern2.test(value) ||
          "O e-mail informado é inválido."
        );
      },
      cep: (value) => {
        
        if (
          value == "00000-000" ||
          value == "11111-111" ||
          value == "22222-222" ||
          value == "33333-333" ||
          value == "44444-444" ||
          value == "55555-555" ||
          value == "66666-666" ||
          value == "77777-777" ||
          value == "88888-888" ||
          value == "99999-999"
        )
          return "O CEP informado é inválido";
        
        const pattern = /^[0-9]{5}-[0-9]{3}$/;
        return pattern.test(value) || "O CEP informado é inválido";
      },
      conta: (value) => {
        const pattern = /^\d{1,13}\-\d{1}$/;
        const pattern2 = /^\d{1}$/;
        return (
          pattern.test(value) ||
          pattern2.test(value) ||
          "A conta informada é inválido"
        );
      },
      agencia: (value) => {
        const pattern = /^\d{1,6}$/;
        return pattern.test(value) || "A agência informada é inválida";
      },
      time: (value) => {
        const pattern = /^(?:[01]\d|2[0123]):(?:[012345]\d)*$/;
        return pattern.test(value) || "Valor inválido";
      },
      timeInferior: (value) => {
        if(value && value != undefined && value.length > 3) {
          const horaAtual = new Date().getHours();
          const minAtual = new Date().getMinutes();
            const array = value.split(":");
            if (array[0] && array[1]) {
              if (parseInt(array[0]) < horaAtual) {
                return "O horário não pode ser inferior ao atual.";
              } else if (
                parseInt(array[0]) === horaAtual &&
                parseInt(array[1]) < minAtual
              ) {
                return "O horário não pode ser inferior ao atual.";
              } else {
                return true;
              }
            }
        }
        else {
          return true
        }
      },
      date: (stringData) => {
        if (!stringData) return true;
        let dadosData = stringData.split("/");

        if (dadosData.length !== 3) return "Data inválida";

        let ano = Number(dadosData[2]);
        let mes = Number(dadosData[1]);
        let dia = Number(dadosData[0]);

        if (!Date.parse(ano + "-" + mes + "-" + dia)) return "Data inválida";
        else if (mes === 2 && dia > 29) return "Data inválida";
        else if (
          (mes === 4 || mes === 6 || mes === 9 || mes === 11) &&
          dia > 30
        )
          return "Data inválida";
        else if (dia > 31) return "Data inválida";
        else return true;
      },
      diaMes: (stringData) => {
        if (!stringData) return true;
        let dadosData = stringData.split("/");

        if (dadosData.length !== 2) return "Data inválida";

        let mes = Number(dadosData[1]);
        let dia = Number(dadosData[0]);

        if (!Date.parse(mes + "-" + dia)) return "Data inválida";
        else if (mes === 2 && dia > 29) return "Data inválida";
        else if (
          (mes === 4 || mes === 6 || mes === 9 || mes === 11) &&
          dia > 30
        )
          return "Data inválida";
        else if (dia > 31) return "Data inválida";
        else return true;
      },
      shortData: (value) => {
        const pattern =
          /(((0[123456789]|10|11|12)([/])(([1][9][0-9][0-9])|([2][0-9][0-9][0-9]))))/;
        return pattern.test(value) || "A data informada é inválida";
      },
      compararData: (value) => {
        if (value) {
          const arrData = value.split("/");
          const stringFormatada =
            arrData[1] + "-" + arrData[0] + "-" + arrData[2];
          const dataFormatada = new Date(stringFormatada).getTime();
          const dataAtual = new Date().getTime();

          return (
            dataFormatada > dataAtual ||
            "A data não pode ser inferior a data atual."
          );
        }
      },
      telefone: (value) => {
        if (value) {
          const pattern = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{4}\-[0-9]{4}$/;
          const pattern2 = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
          return (
            pattern.test(value) ||
            pattern2.test(value) ||
            "O telefone informado é inválido"
          );
        } else return true;
      },
    },
  }),

  methods: {
    dataPeriodo(v) {
      if (this.inputData.tipoTransferencia == 2) {
        const pattern =
          /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/(\d{4})\~([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/(\d{4})/;
        return pattern.test(v) || "A data informada é inválida";
      }
    },
    contaMask(v) {
      if (v) {
        let items = [];

        if (v.length == 1) return ["#"];
        if (v.length >= 3) {
          let hashTags = [];
          for (let index = 2; index < v.length; index++) {
            items.push("#");
            hashTags = items.join("");
          }
          return [`${hashTags}-#`];
        } else return ["#-#"];
      }
      return null;
    },
    valorMask(v) {
      if (v) {
        let items = [];

        if (v.length == 1) return ["#"];

        if (v.length >= 4) {
          let hashTags = [];
          for (let index = 3; index < v.length; index++) {
            items.push("#");
            hashTags = items.join("");
          }
          return [`${hashTags},##`];
        } else return ["#,##"];
      }
      return null;
    },
    cpf(cpf) {
      if (this.inputData.tipoPessoa == 2) return true;

      if (cpf != null) {
        let initialCpf = cpf;
        cpf = cpf.replace(/[^\d]+/g, "");

        if (
          cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999"
        )
          return false || "O CPF informado é inválido";

        let add = 0;
        for (var i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
          return false || "O CPF informado é inválido";

        add = 0;
        for (var j = 0; j < 10; j++) add += parseInt(cpf.charAt(j)) * (11 - j);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;

        const pattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

        if (rev != parseInt(cpf.charAt(10)) || !pattern.test(initialCpf))
          return false || "O CPF informado é inválido";
        else return true;
      }
      return true;
    },
    cnpj(cnpj) {
      if (this.inputData.tipoPessoa == 1) return true;

      if (cnpj) {
        let cnpjInitial = cnpj;
        cnpj = cnpj.replace(/[^\d]+/g, "");

        // Elimina CNPJs invalidos conhecidos
        if (
          cnpj == "00000000000000" ||
          cnpj == "11111111111111" ||
          cnpj == "22222222222222" ||
          cnpj == "33333333333333" ||
          cnpj == "44444444444444" ||
          cnpj == "55555555555555" ||
          cnpj == "66666666666666" ||
          cnpj == "77777777777777" ||
          cnpj == "88888888888888" ||
          cnpj == "99999999999999"
        )
          return false || "O CNPJ informado é inválido";
        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0))
          return false || "O CNPJ informado é inválido";
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        const pattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1) || !pattern.test(cnpjInitial))
          return false || "O CNPJ informado é inválido";
        else return true;
      }
      return true;
    },
    // cnpjFormat () {
    //   this.inputData.cnpj = this.inputData.cnpj.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
    //   this.inputData.cnpj = this.inputData.cnpj.length >= 19 ? this.inputData.cnpj.slice(0, 18) : this.inputData.cnpj;
    // },
    // cpfFormat () {
    //   this.inputData.cpf = this.inputData.cpf.replace(/\D/g, "").replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
    //   this.inputData.cpf = this.inputData.cpf.length >= 15 ? this.inputData.cpf.slice(0, 14) : this.inputData.cpf;
    // },
    // cepFormat () {
    //   // this.inputData.cep = this.inputData.cep.replace(/\D/g,"").replace(/^(\d{5})(\d)/,"$1-$2");
    //   this.inputData.cep = this.inputData.cep.replace(/\D/g, "")
    //   this.inputData.cep = this.inputData.cep.length >= 9 ? this.inputData.cep.slice(0, 9) : this.inputData.cep;
    // },
    // dataFormat () {
    //   this.inputData.data = this.inputData.data.replace(/\D/g, "").replace(/^(\d{2})(\d)/g, "$1/$2");
    //   this.inputData.data = this.inputData.data.length >= 5 ? this.inputData.data.slice(0, 5) : this.inputData.data;
    // },
    // agenciaFormat () {
    //   this.inputData.agencia = this.inputData.agencia.replace(/\D/g, "");
    //   this.inputData.agencia = this.inputData.agencia.length >= 7 ? this.inputData.agencia.slice(0, 6) : this.inputData.agencia;
    // },
    // contaFormat () {
    //   this.inputData.conta = this.inputData.conta.replace(/\D/g, "").replace(/(\d)(\d{1})$/, "$1-$2")
    //   this.inputData.conta = this.inputData.conta.length >= 15 ? this.inputData.conta.slice(0, 15) : this.inputData.conta;
    // },
    // prazoFormat () {
    //   this.inputData.prazo = this.inputData.prazo.length >= 5 ? this.inputData.prazo.slice(0, 5) : this.inputData.prazo;
    // },
    // siglaFormat () {
    //   this.inputData.sigla = this.inputData.sigla.length >= 6 ? this.inputData.sigla.slice(0, 6) : this.inputData.sigla;
    // },
  },
};
