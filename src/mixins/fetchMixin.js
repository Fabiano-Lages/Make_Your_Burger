export default {
  methods: {
      async fetchWithToken(url, options = {}) {
        const token = sessionStorage.getItem('token');
        const headers = options.headers || {};
      
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      
        options.headers = headers;
      
        let retorno = null;
        try {
          const response = await fetch(url, options);
          retorno = await response.json();
        } catch(erro) {
          retorno = {Erro: erro};
        }
        
        return (retorno);
      },
      async fetchNoToken(url, options = {}) {
        const token = localStorage.getItem('token');
        const headers = options.headers || {};
        options.headers = headers;
      
        let retorno = null;
        try {
          const response = await fetch(url, options);
          retorno = await response.json();
        } catch(erro) {
          retorno = {Erro: erro};
        }
        return (retorno);
      }
    }
  };