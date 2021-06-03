const ConnectionFactory = (() => {
  const stores = ['negociacoes'];
  let connection = null;
  let close = null;

  return class ConnectionFactory {
    constructor() {
      throw new Error('Não é possível criar instancias dessa classe');
    }

    static _createStores(connection) {
      stores.forEach((store) => {
        if (connection.objectStoreNames.contains(store)) {
          connection.deleteObjectStore(store);
          connection.createObjectStore(store, { autoIncrement: true });
        }
      });
    }

    static getConnection() {
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open('jscangaceiro', 2);

        openRequest.onupgradeneeded = (e) => {
          if (connection) return resolve(connection);

          ConnectionFactory._createStores(e.target.result);
        };

        openRequest.onsuccess = (e) => {
          connection = e.target.result;
          close = connection.close.bind(connection);
          connection.close = () => {
            throw new Error('Você não pode fechar diretamente a conexão');
          };
          resolve(e.target.result);
        };

        openRequest.onerror = (e) => {
          reject(e.target.error.name);
        };
      });
    }

    static closeConnection() {
      if (connection) {
        close();
      }
    }
  };
})();
