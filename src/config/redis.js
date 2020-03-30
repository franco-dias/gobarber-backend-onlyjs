// configuração da máquina do docker rodando a queue

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
