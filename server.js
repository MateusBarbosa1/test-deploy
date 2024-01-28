// HTTP SERVER //
/*
const { error } = require('console');
const http = require('http');

const requestHandler = (req,res) => {
    res.end('hello world, this is my server HTTP!');
}

const server = http.createServer(requestHandler);

const port = 3000;
const host = '192.168.0.57';

server.listen(port, host, (error) => {
    if(error) {
        console.error('Algo deu errado: ', error);
    } else {
        console.log(`server running on ${host}:${port}`);
    }
});
*/
// EXPRESS SERVER //

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

async function createUser(data) {
    return await prisma.users.create({ data });
}
async function readUsers() {
    return await prisma.users.findMany();
}

app.post('/create', async (req,res) => {
    const userCreated = await createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    res.json(userCreated);
});
app.get('/read', async (req,res) => {
    const users = await readUsers();
    res.json(users);
});

app.listen(process.env.PORT, () => { console.log('server running on port 3000!') });