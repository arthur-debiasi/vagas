var data =  require("./fakeData");

const getUser = ( req, res, next ) => {
    
    var name =  req.query.name;

    for(let i = 0; i < data.length;  i++) {
        // o código funciona quando o endpoint é "/user" pois { name === undefined },
        // bem como { i.name === undefined }, já que i é do tipo número
        if(i.name == name) {
            res.send(data[i]);
        }
        // se utilizamos o endpoint /user/?name=João Oliveira, esperando receber o user de João
        // a requisição fica sem resposta pois { name === "João Oliveira" }
        // porém { i.name === undefined }, ou seja: { name !== i.name }
        // e não há definição para quando não for encontrado o user
    }

};

const getUsers = ( req, res, next ) => {
    
    res.send(data);
    
};

module.exports = {
    getUser,
    getUsers
};