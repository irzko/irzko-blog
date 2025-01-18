import { findChildCategories } from "@/lib/findChildCategories";
import { Category } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { createListCollection } from "@chakra-ui/react";

const SelectCategoryModal = ({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}: {
  categories: Category[];

  selectedCategoryIds: string[];
  setSelectedCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const handleChangeCategories = useCallback(
    (categoryId: string, index: number) => {
      if (index === 0) {
        setSelectedCategoryIds([categoryId]);
        return;
      } else if (index === selectedCategoryIds.length) {
        setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
        return;
      } else if (index < selectedCategoryIds.length - 1) {
        const newSelectedCategoryIds = selectedCategoryIds.slice(0, index + 1);
        setSelectedCategoryIds(
          newSelectedCategoryIds.map((id, i) => {
            if (i === index) {
              return categoryId;
            }
            return id;
          })
        );
      }
    },
    [selectedCategoryIds, setSelectedCategoryIds]
  );

  const rootCategories = useMemo(
    () =>
      createListCollection({
        items: findChildCategories(categories, null).map((category) => ({
          label: category.name,
          value: category.id,
        })),
      }),
    [categories]
  );
  return (
    <>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            rounded="lg"
            w="full"
            justifyContent={"start"}
            onClick={() => setOpen(true)}
          >
            {selectedCategoryIds.length > 0
              ? categories.find(
                  (category) =>
                    category.id ===
                    selectedCategoryIds[selectedCategoryIds.length - 1]
                )?.name
              : "Chọn danh mục"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Danh mục</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <SelectRoot
              collection={rootCategories}
              value={[selectedCategoryIds[0]]}
              aria-label="Chọn danh mục"
              onValueChange={(e) => {
                handleChangeCategories(e.value[0], 0);
              }}
            >
              <SelectLabel>Chọn danh mục</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Chọn danh mục" />
              </SelectTrigger>
              {rootCategories.items.map((category) => (
                <SelectItem key={category.value} item={category}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectRoot>
            {selectedCategoryIds.length > 0 &&
              selectedCategoryIds.map((selectedCategory, index) => {
                const childCategories = findChildCategories(
                  categories,
                  selectedCategory
                );
                if (childCategories.length === 0) return null;
                const collection = createListCollection({
                  items: childCategories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  })),
                });
                return (
                  <SelectRoot
                    // defaultSelectedKeys={[selectedCategoryIds[index + 1]]}
                    collection={collection}
                    aria-label="Chọn danh mục phụ"
                    key={`child-${selectedCategoryIds[index]}`}
                    onValueChange={(e) => {
                      handleChangeCategories(e.value[0], index + 1);
                    }}
                  >
                    <SelectLabel>Chọn danh mục phụ</SelectLabel>
                    <SelectTrigger>
                      <SelectValueText placeholder="Chọn danh mục phụ" />
                    </SelectTrigger>
                    {collection.items.map((category) => (
                      <SelectItem key={category.value} item={category}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectRoot>
                );
              })}
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button color="primary" onClick={() => setOpen(false)}>
                Xác nhận
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default SelectCategoryModal;
