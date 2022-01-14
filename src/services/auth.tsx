// Função simulando informações vindo do backend

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'sdf21asd5f1sd56f1dpqxccxvs25fhgjhgjf2s1ad3f21a3sdf',
        user: {
          name: 'Fulano',
          email: 'fulanodasilva@gmail.com',
        },
      });
    }, 1500);
  });
}
