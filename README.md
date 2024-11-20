# POC5 - React

## Alunos:

* Caio Sampaio. RA: 10381053;
* Guilherme Picoli. RA: 10389843;
* Caio Filardi. RA: 10341128.

## Enunciado

Na sua POC você deve explicar o funcionamento dos seguintes conceitos de REACT, usando Next.js:
- Estrutura de Projeto NextJS 14 ou superior
- Criação de componentes simples (sem estado)
- Estilo CSS (global e módulo). 

## POC 5

### **Criação do Projeto NextJS 14**:

Inicialmente, criaremos o projeto em NextJS 14 com o comando `npx create-next-app@latest POC-7-SuperHeroe---NextJS`. Em seguida, escolheremos as seguintes configurações de projeto:

- Would you like to use TypeScript? ... **No**
- Would you like to use ESLint? ... **Yes**
- Would you like to use Tailwind CSS? ... **No**
- Would you like your code inside a `src/` directory? ... **Yes**
- Would you like to use App Router? (recommended) ... **Yes**
- Would you like to use Turbopack for next dev? ... **No**
- Would you like to customize the import alias (@/* by default)? ... **No**

Após a finalização das instalações de pacotes e geração de pastas, criaremos a pasta 'components'.

![image](https://github.com/user-attachments/assets/aedd51af-ce50-4a20-9544-e1ca47b2e916)


### **Super Heroe Card**:

Na pasta 'components', criaremos o arquivo 'HeroCard.jsx' para criar o componente de apresentação dos heróis. Nele deverá ter o seguinte código:

```
import React from 'react';

const HeroCard = ({ name, intelligence, strength, image }) => {
  return (
    <article>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <p>Intelligence: <span style={{ width: `${intelligence}%`, backgroundColor: '#F9B32F' }}></span></p>
      <p>Strength: <span style={{ width: `${strength}%`, backgroundColor: '#FF7C6C' }}></span></p>
    </article>
  );
};

export default HeroCard;
```

Assim temos o componente que receberá e apresentará as informações de cada herói.

### **Home Page**:

No arquivo 'page.js' criado pelo Nextjs, excluiremos todas as informações geradas automaticamente e construiremos a nossa própria função home. Iniciaremos definindo uma função para chamar a API Heroes dentro da função `home()`:

```
const [heroes, setHeroes] = useState([]);

      useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroIds = [200, 1, 3, 465, 5];
        const heroData = await Promise.all(heroIds.map(async (id) => {
          const response = await fetch(`${BASE_URL}${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }));
        setHeroes(heroData);
      } catch (error) {
        console.error('Failed to fetch heroes:', error);
      }
    };

    fetchHeroes();
  }, []);
```
 Para a chamada da API, usaremos o end-point `const BASE_URL = 'https://superheroapi.com/api/1d2d0c957b5f88ca2c1357ce6670cae7/';`.

 Por fim, usaremos o componente 'HeroCard', referenciando-o no `return();` da função `home()`. Para isso, teremos que importar o 'HeroCard' com o código `import HeroCard from '../components/HeroCard';`. O código do `return();` deverá ficar:

 ```
return (
      <div className="heroes">
        {heroes.map(hero => (
          <HeroCard
            key={hero.id}
            name={hero.name}
            intelligence={hero.powerstats.intelligence}
            strength={hero.powerstats.strength}
            image={hero.image.url}
          />
        ))}
      </div>
  );
 ```

Desse modo, o código completo do arquivo 'page.js' deverá ficar:

 ```
"use client";

import HeroCard from '../components/HeroCard';
import React, { useEffect, useState } from 'react';

const BASE_URL = 'https://superheroapi.com/api/1d2d0c957b5f88ca2c1357ce6670cae7/';

export default function Home() {
    const [heroes, setHeroes] = useState([]);

      useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroIds = [200, 1, 3, 465, 5];
        const heroData = await Promise.all(heroIds.map(async (id) => {
          const response = await fetch(`${BASE_URL}${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }));
        setHeroes(heroData);
      } catch (error) {
        console.error('Failed to fetch heroes:', error);
      }
    };

    fetchHeroes();
  }, []);
  
    return (
      <div className="heroes">
        {heroes.map(hero => (
          <HeroCard
            key={hero.id}
            name={hero.name}
            intelligence={hero.powerstats.intelligence}
            strength={hero.powerstats.strength}
            image={hero.image.url}
          />
        ))}
      </div>
  );
}
 ```

O útimo passo é defir os estilos para a página. Usaremos o 'global.css' para isso:

 ```
html, body {
  background-color: #f0f0f0;
  font-family: monospace;
  height: 100%;
}

.heroes {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.heroes article {
  height: 720px;
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
}

.heroes article img {
  border-radius: 10px 10px 0 0;
  width: 100%;
  max-height: 400px;
}

.heroes h1 {
  text-align: center;
}

.heroes article p {
  padding: 0 10px;
  width: calc(100% - 20px);
}

.heroes article p span {
  background-color: red;
  height: 10px;
  display: block;
  margin-top: 5px;
  border-radius: 5px;
}
 ```

O resultado será:

![image](https://github.com/user-attachments/assets/0065e6ac-9a1e-4957-a98e-b2efcf91c908)

