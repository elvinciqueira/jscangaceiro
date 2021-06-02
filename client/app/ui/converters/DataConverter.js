class DataConverter {
  constructor() {
    throw new Error('Esta classe não pode ser instanciada');
  }

  static paraTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static paraData(texto) {
    const dataEhInvalida = !/\d{2}\/\d{2}\/\d{4}/.test(texto);

    if (dataEhInvalida) throw new DataInvalidaException();

    return new Date(
      ...texto
        .split('/')
        .reverse()
        .map((item, indice) => item - (indice % 2))
    );
  }
}
