const AuthorController = require('../controllers/author.controller');
console.log("AuthorController is =>", AuthorController)

module.exports = app => {
    app.get('/api/author', AuthorController.readAll);
    app.get('/api/author/:id', AuthorController.readOne);
    app.post('/api/author', AuthorController.create);
    app.patch('/api/author/:id', AuthorController.update);
    app.delete('/api/author/:id', AuthorController.delete);

}