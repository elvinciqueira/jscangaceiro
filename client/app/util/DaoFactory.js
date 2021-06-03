async function getNegociacaoDao() {
  const conn = await ConnectionFactory.getConnection();
  return new NegociacaoDao(conn);
}
