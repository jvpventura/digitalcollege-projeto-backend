const CategoryModel = require("../models/CategoryModel");

const CategoryController = {
  // Requisito 02 - Criar categoria (POST /v1/category)
  async create(req, res) {
    try {
      const { name, slug, use_in_menu } = req.body;
      const newCategory = await CategoryModel.create({
        name,
        slug,
        use_in_menu,
      });
      return res.status(201).json(newCategory);
    } catch (error) {
      // Isso vai te dizer exatamente qual campo está dando problema
      return res.status(400).json({
        message: "Erro ao criar categoria",
        error: error.message,
      });
    }
  },

  // Requisito 01 - Buscar por ID (GET /v1/category/:id)
  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" }); //
      }
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao buscar categoria", error });
    }
  },
  // Adicione este método dentro do CategoryController
  async search(req, res) {
    try {
      let { limit, page, fields, use_in_menu } = req.query; // Pega os parâmetros da URL

      // Configurações de paginação
      limit = limit === "-1" ? null : parseInt(limit) || 12;
      page = parseInt(page) || 1;
      const offset = (page - 1) * (limit || 0);

      // Filtros de busca
      const where = {};
      if (use_in_menu !== undefined) {
        where.use_in_menu = use_in_menu === "true";
      }

      // Seleção de campos específicos
      const attributes = fields ? fields.split(",") : undefined;

      const { count, rows } = await CategoryModel.findAndCountAll({
        where,
        attributes,
        limit,
        offset,
      });

      return res.status(200).json({
        data: rows,
        total: count,
        limit,
        page,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao listar categorias", error: error.message });
    }
  },
  // Requisito 04 - Atualizar categoria (PUT /v1/category/:id)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, slug, use_in_menu } = req.body;

      const category = await CategoryModel.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await category.update({ name, slug, use_in_menu });
      return res.status(204).send(); // Sucesso sem corpo de resposta
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao atualizar categoria", error: error.message });
    }
  },

  // Requisito 05 - Deletar categoria (DELETE /v1/category/:id)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await category.destroy();
      return res.status(204).send(); // Sucesso sem corpo de resposta
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao deletar categoria", error: error.message });
    }
  },
};

module.exports = CategoryController;
