/** @type {import('mock-config-server').MockServerConfig} */
const mockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/user',
        method: 'get',
        routes: [
          {
            settings: { polling: true },
            queue: [
              { data: { emoji: '🦁', name: 'Nursultan' } },
              { data: { emoji: '☄', name: 'Dmitriy' } }
            ]
          }
        ]
      }
    ]
  }
};

export default mockServerConfig;