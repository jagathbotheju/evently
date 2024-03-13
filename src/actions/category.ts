"use server";
import prisma from "@/lib/prismadb";

/************************************GET ALL CATEGORIES*/
/************************************CREATE CATEGORY*/

/************************************GET CATEGORY BY NAME*/
export const getCategoryByName = async (categoryName: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    if (category) {
      return {
        success: true,
        data: category,
      };
    }

    return {
      success: false,
      error: "No Category Found",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error,try again later",
    };
  }
};

/************************************GET ALL CATEGORIES*/
export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    if (categories) {
      return {
        success: true,
        data: categories,
      };
    }

    return {
      success: false,
      error: "Unable to get categories, try again later...",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, Try again later...",
    };
  }
};

/************************************CREATE CATEGORY*/
export const createCategory = async (categoryName: string) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });

    if (newCategory) {
      return {
        success: true,
        data: newCategory,
      };
    }

    return {
      success: false,
      error: "Unable to create Category, try later",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error, Try Later...",
    };
  }
};
