class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao);

      request.onsuccess = (e) => resolve();
      request.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível salvar a negociação');
      };
    });
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear();

      request.onsuccess = (e) => resolve();
      request.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível apagar a negociação');
      };
    });
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      const negociacoes = [];

      const cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

      cursor.onsuccess = (e) => {
        const actual = e.target.result;

        if (actual) {
          const negociacao = new Negociacao(
            actual.value._data,
            actual.value._quantidade,
            actual.value._valor
          );

          negociacoes.push(negociacao);
          actual.continue();
        } else {
          resolve(negociacoes);
        }
      };

      cursor.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível listar nas negociações');
      };
    });
  }
}
