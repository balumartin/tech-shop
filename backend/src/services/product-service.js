import prisma from "../db/prisma";

const productService = {
  createProduct: async ({ name, description, price, imageUrl }) => {
    return await prisma.product.create({
      data: { name, description, price, imageUrl },
    });
  },
  getAllProducts: async (page = 1, pageSize = 10) => {
    const skipPages = (page - 1) * pageSize;
    const takePages = pageSize;

    return await prisma.product.findMany({
      skip: skipPages,
      take: takePages,
    });
  },
  getAllProducts: async (queryParams) => {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      orderBy = "createdAt",
      order = "asc",
    } = queryParams;

    let pageNumber = Number(page);
    let limitNumber = Number(limit);

    let where = {};

    if (search) {
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ]
      }
    }

    if (categoryId) {
      where.categories = {
        some: { id: categoryId },
      };
    }

    const products = await prisma.product.findMany({
      where,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      orderBy: {
        [orderBy]: order,
      },
    });

    const totalProducts = await prisma.product.count({
      where,
    });

    return {
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitNumber),
      currentPage: pageNumber,
    };
  },
};

export default productService;
