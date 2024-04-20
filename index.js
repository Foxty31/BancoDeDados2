const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const cors = require('cors');

var db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

var columns = {
    date: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
};

var Notes = db.define('Notes', columns);

db.sync();

var api = express();

api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.get('/notes', async (req, res) => {
    var data = await Notes.findAll();
    res.json(data);
});

api.post('/notes', async (req, res) => {
    await Notes.create(req.body);
    res.send();
});

api.delete('/notes', async (res, req) => {
    await Notes.destroy( {where: { id: req.body.id }});
    res.send();
});

api.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});