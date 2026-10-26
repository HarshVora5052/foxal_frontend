'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminStore, AdminCategory } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit, Trash2, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(
    null
  );

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage(
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop'
    );
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImage(cat.image);
    setIsActive(cat.is_active);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error('Category Name and Slug are required.');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        slug,
        description,
        image,
        is_active: isActive,
      });
    } else {
      addCategory({
        name,
        slug,
        description,
        image,
        is_active: isActive,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, catName: string) => {
    if (confirm(`Are you sure you want to delete category "${catName}"?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Taxonomy Architecture
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Categories CRUD ({categories.length})
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            Organize incense into Sticks (250g), Cones (60 pcs), and specialized seasonal collections.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="h-4 w-4" />}
          className="shadow-sm"
        >
          Add New Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-[#E3D4BD] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-[#0F0D0B]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0F0D0B]/80 text-[#DFB15B] backdrop-blur-sm border border-[#C8922A]/30">
                    {cat.productCount} Fragrances
                  </span>
                </div>
              </div>

              <div className="p-6">
                <span className="font-mono text-[10px] uppercase font-bold text-[#C8922A] block mb-1">
                  /{cat.slug}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0F0D0B] mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#7A5230] leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#E3D4BD]/60 mt-4 flex items-center justify-between">
              <Link
                href={`/shop/${cat.slug}`}
                target="_blank"
                className="text-xs font-bold text-[#C8922A] hover:underline flex items-center gap-1"
              >
                <span>View on Shop</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-2 text-[#7A5230] hover:text-[#0F0D0B] rounded-lg hover:bg-[#F6EFE4]"
                  title="Edit Category"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 text-[#AFA8A2] hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Sacred Category'}
        description="Categories organize your incense sticks, cones, and gift packages on the storefront navigation."
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name *"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Incense Sticks"
          />

          <Input
            label="Slug *"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. sticks"
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A5230] mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 250g Handcrafted sticks with pure temple flower aromas..."
              className="w-full rounded-xl border border-[#E3D4BD] bg-white p-3 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
            />
          </div>

          <Input
            label="Banner Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />

          <div className="pt-4 border-t border-[#E3D4BD] flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingCategory ? 'Update Category' : 'Save Category'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
