var data =  require("./fakeData");

const getUser = ( req, res, next ) => {
    
    var name =  req.query.name;

    for(let i = 0; i < data.length;  i++) {
        // agora, a comparação é feita entre o termo de busca e cada um dos nomes dos usuários
        // ou seja, entre req.query.name e data[i].name
        if(data[i].name == name) {
            return res.send(data[i]);
        }
    }
    // é necessário haver uma resposta definida para quando a query não é bem sucedida
    return res.status(404).json({ error: "Usuário não encontrado" });
};

const getUsers = ( req, res, next ) => {
    
    res.send(data);
    
};

module.exports = {
    getUser,
    getUsers
};