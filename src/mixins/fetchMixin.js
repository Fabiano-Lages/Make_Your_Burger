export default {
  methods: {
      async fetchWithToken(url, options = {}) {
          const token = sessionStorage.getItem('token');
          const headers = options.headers || {};
        
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }
        
          options.headers = headers;
        
          const response = await fetch(url, options);
          const retorno = await response.json();
          return (retorno);
        },
        async fetchNoToken(url, options = {}) {
          const token = localStorage.getItem('token');
          const headers = options.headers || {};
          options.headers = headers;
        
          const response = await fetch(url, options);
          const retorno = await response.json();
          return (retorno);
        }
    }
  };