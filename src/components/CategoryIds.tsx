"use state";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Category } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { createCategory, getAllCategories } from "@/actions/category";
import { toast } from "sonner";

interface Props {
  value?: string;
  onChange?: () => void;
}

const CategoryIds = ({ value, onChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory(newCategory.trim())
      .then((res) => {
        if (res.success && res.data) {
          const category = res.data;
          setCategories((prev) => [...prev, category]);
          toast.success(`Category ${category} created successfully`);
        }
        if (res.error) {
          toast.error(res.error);
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error, Try again later...");
      });
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await getAllCategories();
      const categoryList = response.data;
      categoryList && setCategories(categoryList as Category[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="input-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="flex w-full rounded-sm py-3 pl-8 text-primary">
            Create New Category
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category Name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddCategory}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default CategoryIds;
