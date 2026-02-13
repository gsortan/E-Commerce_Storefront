"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/validation/ProductSchema";
import { useDisclosure } from "@heroui/react";
import SuccessModal from "@/components/admin/SuccessModal";

export default function ProductForm({ defaultValues, onSubmit, buttonLabel, modalMessage}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

   async function handleValidSubmit(data) {
    try {
      await onSubmit(data); 
      onOpen();             
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="w-full pt-4 max-w-full md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 space-y-2"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input {...register("title")} className="w-full border border-black px-2 py-1.5" />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows="4"
          {...register("description")}
          className=" border border-black px-2 py-1.5  w-full resize-none"
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          {...register("imageURL")}
          className="w-full border border-black px-2 py-1.5"
        />
        {errors.imageURL && (
          <p className="text-xs text-red-500">{errors.imageURL.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full border border-black px-2 py-1.5"
          />
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="w-full border border-black px-2 py-1.5"
          />
          {errors.stock && (
            <p className="text-xs text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            {...register("category")}
            className="w-full border border-black px-2 py-1.5"
          />
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select {...register("status")} className="w-full border border-black px-2 py-1.5">
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Archived</option>
          </select>
          {errors.status && (
            <p className="text-xs text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-1.5 rounded disabled:opacity-50"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
    <SuccessModal onOpenChange={onOpenChange} isOpen={isOpen} modalMessage={modalMessage}/>
    </>
  );
}
