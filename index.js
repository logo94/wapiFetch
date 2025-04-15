const wapiFetch = (url, options = {}) => {
        
      const requestId = crypto.randomUUID();
      
      return new Promise((resolve, reject) => {
              
          const handleMessage = (event) => {
                  
                  if (event.data.type === 'WAPI_RESPONSE' && event.data.id === requestId) {
                      
                      window.removeEventListener('message', handleMessage);
                      
                      if (event.data.response.success) {
                      
                              const fakeResponse = new Response(
                                  event.data.response.data.body,
                                  {
                                  status: event.data.response.data.status,
                                  headers: event.data.response.data.headers
                                  }
                              );
                              
                              resolve(fakeResponse);
                      }
                  }
          };
      
          window.addEventListener('message', handleMessage);
          
          window.postMessage({
                  type: 'WAPI_PROXY',
                  id: requestId,
                  url: url,
                  options: options
          }, '*');
      });
  
};

export { wapiFetch };
