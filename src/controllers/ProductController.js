const ProductModel = require("../models/ProductModel");
const ProductImageModel = require("../models/ProductImageModel");
const ProductOptionModel = require("../models/ProductOptionModel");
const ProductCategoryModel = require("../models/ProductCategoryModel");
const { Op } = require("sequelize");

const ProductController = {
  // Requisito 02 - Criar produto (POST /v1/product)
  async create(req, res) {
    try {
      const {
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
        category_ids,
        images,
        options,
      } = req.body;

      // 1. Criar o Produto base
      const product = await ProductModel.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      });

      // 2. Vincular Categorias (Se houver)
      if (category_ids && category_ids.length > 0) {
        const categoryData = category_ids.map((id) => ({
          product_id: product.id,
          category_id: id,
        }));
        await ProductCategoryModel.bulkCreate(categoryData);
      }

      // 3. Salvar Imagens
      if (images && images.length > 0) {
        const imageData = images.map((img) => ({
          product_id: product.id,
          path: img.path,
          enabled: img.enabled || 1,
        }));
        await ProductImageModel.bulkCreate(imageData);
      }

      // 4. Salvar Opções (Tamanho, Cor, etc)
      if (options && options.length > 0) {
        const optionData = options.map((opt) => ({
          product_id: product.id,
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          values: opt.values,
        }));
        await ProductOptionModel.bulkCreate(optionData);
      }

      return res
        .status(201)
        .json({ message: "Produto criado com sucesso!", id: product.id });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar produto", error: error.message });
    }
  },
  async search(req, res) {
    try {
      let { limit, page, fields, name, category_ids, price_range, ...options } =
        req.query;

      // Configuração de Paginação
      limit = limit === "-1" ? null : parseInt(limit) || 12;
      page = parseInt(page) || 1;
      const offset = (page - 1) * (limit || 0);

      // Construção do Filtro (WHERE)
      const where = {};
      if (name) where.name = { [Op.like]: `%${name}%` };

      // Filtro de Preço (ex: 100-500)
      if (price_range) {
        const [min, max] = price_range.split("-");
        where.price = { [Op.between]: [min, max] };
      }

      const attributes = fields ? fields.split(",") : undefined;

      // Busca com relacionamentos (Include)
      const { count, rows } = await ProductModel.findAndCountAll({
        where,
        attributes,
        limit,
        offset,
        include: [
          { model: ProductImageModel, as: "images" },
          { model: ProductOptionModel, as: "options" },
        ],
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
        .json({ message: "Erro ao buscar produtos", error: error.message });
    }
  },
  // Requisito 01 - Buscar Produto por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id, {
        include: [
          { model: ProductImageModel, as: "images" },
          { model: ProductOptionModel, as: "options" },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" }); //
      }

      return res.status(200).json(product);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao buscar produto", error: error.message });
    }
  },

  // Requisito 04 - Atualizar Produto
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      } = req.body;

      const product = await ProductModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" }); //
      }

      await product.update({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      });
      return res.status(204).send(); // Status 204 conforme escopo
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao atualizar produto", error: error.message });
    }
  },

  // Requisito 05 - Deletar Produto
  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" }); //
      }

      await product.destroy();
      return res.status(204).send(); // Status 204 conforme escopo
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao deletar produto", error: error.message });
    }
  },
};

module.exports = ProductController;
