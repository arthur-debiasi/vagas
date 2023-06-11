const fakeData = [
    {
        id: 1,
        name: "João Oliveira",
        job: "Desenvolvedor"
    }
]

const userDict = {};

fakeData.forEach((item) => userDict[item.name] = item);

// Alterei a estrutura de dados para melhorar o desempenho das buscas
// Foi criado um objeto "userDict", suas chaves são os
// names dos users e os valores são os objetos dos users.
// {
//  'João Oliveira': { id: 1, name: 'João Oliveira', job: 'Desenvolvedor' }
// }

module.exports = { fakeData, userDict };