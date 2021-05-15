class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }

  adiciona(event) {
    event.preventDefault();

    const negociacao = new Negociacao(
      DataConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );

    const diaMesAno = DataConverter.paraTexto(negociacao.data);

    console.log(diaMesAno);
    console.log(negociacao);
  }
}
