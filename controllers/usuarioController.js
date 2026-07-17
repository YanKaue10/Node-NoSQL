const Usuario = require("../models/Usuario")

//Criar um novo usuario
exports.criarUsuario = async (req,res) => {
    try {
        const usuario = new Usuario(req.body)
        await usuario.save()
        res.status(201).json(usuario)
    } catch (error){
        res.status(400).json({message: "Erro ao criar o usuario! ", error})
    }
}

//Obter todos os usuarios 
exports.obterUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    } catch (error){
        res.status(400).json({message: "Erro ao buscar os usuarios!", error})
    }
}

exports.atualizarUsuario = async (req, res) => {
    try {
        const {id} = req.params
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        if(!usuarioAtualizado){
            return res.status(404).json({message: "Usuario não encontrado"})
        } 
        res.status(200).json(usuarioAtualizado)
    } catch(error) {
        res.status(400).json({message: "Erro ao atualizar o usuario"})
    }
}

exports.deletarUsuario = async (req, res) => {
    try {
        const {id} = req.params
        const usuarioDeletado = await Usuario.findByIdAndDelete(id)
        if(!usuarioDeletado){
            return res.status(404).json({message: "Usuario não encontrado"})
        }
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch(error) {
         res.status(400).json({message: "Erro ao atualizar o usuario"})
    }
    }

