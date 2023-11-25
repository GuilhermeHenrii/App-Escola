// configurando o axios para que todas as requisições partam do ponto final da rota da api (http://seuip)
import axios from 'axios';

export default axios.create({
  baseURL: 'coloque-sua-url-aqui',
});
