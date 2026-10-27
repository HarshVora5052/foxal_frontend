'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminStore, AdminProduct } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Edit,
  Eye,
  Star,
  Upload,
  X,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    toggleProductFeatured,
    toggleProductActive,
  } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('id_desc');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal State: Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<'sticks' | 'cones'>('sticks');
  const [formFragrance, setFormFragrance] = useState('');
  const [formMrp, setFormMrp] = useState(199);
  const [formPrice, setFormPrice] = useState(149);
  const [formStock, setFormStock] = useState(120);
  const [formSku, setFormSku] = useState('');
  const [formVariantLabel, setFormVariantLabel] = useState('');
  const [formBurnTime, setFormBurnTime] = useState('45 - 50 Minutes');
  const [formDescription, setFormDescription] = useState('');
  const [formImages, setFormImages] = useState<string[]>([
    '/images/products/foxal-sukhad-premium-incense-sticks.jpg',
  ]);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [targetImageCount, setTargetImageCount] = useState<number>(4);

  // Auto-slug generator
  const handleNameChange = (name: string) => {
    setFormName(name);
    if (!editingProduct) {
      const generated = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormSlug(generated);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSlug('');
    setFormSubtitle('Sacred Temple Flower Incense');
    setFormCategory('sticks');
    setFormFragrance('Pure Musk, Sacred Herbs');
    setFormMrp(199);
    setFormPrice(149);
    setFormStock(100);
    setFormSku(`FXL-STICKS-${Date.now().toString().slice(-4)}`);
    setFormVariantLabel('250g (Approx. 130-140 Sticks)');
    setFormBurnTime('45 - 50 Minutes');
    setFormDescription('100% Charcoal-free natural agarbatti made from upcycled temple flowers.');
    setFormImages([
      '/images/products/foxal-sukhad-premium-incense-sticks.jpg',
    ]);
    setFormIsActive(true);
    setFormIsFeatured(false);
    setTargetImageCount(1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormSlug(product.slug);
    setFormSubtitle(product.subtitle);
    setFormCategory(product.category);
    setFormFragrance(product.fragrance_notes.join(', '));
    setFormMrp(product.mrp);
    setFormPrice(product.price);
    setFormStock(product.stock_quantity ?? 100);
    setFormSku(product.sku || `FXL-${product.category.toUpperCase()}-${product.id}`);
    setFormVariantLabel(product.variant_label);
    setFormBurnTime(product.burn_time);
    setFormDescription(product.description);
    setFormImages(product.images.length > 0 ? product.images : [
      '/images/products/foxal-sukhad-premium-incense-sticks.jpg'
    ]);
    setTargetImageCount(Math.min(6, Math.max(1, product.images.length || 1)));
    setFormIsActive(product.is_active ?? true);
    setFormIsFeatured(product.is_featured);
    setIsModalOpen(true);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setFormImages([...formImages, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) {
      toast.error('Product Name and Slug are required.');
      return;
    }

    const notes = formFragrance.split(',').map((s) => s.trim()).filter(Boolean);
    const activeImages = formImages.slice(0, targetImageCount).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        slug: formSlug,
        subtitle: formSubtitle,
        category: formCategory,
        category_name: formCategory === 'sticks' ? 'Incense Sticks' : 'Incense Cones',
        fragrance_notes: notes,
        mrp: Number(formMrp),
        price: Number(formPrice),
        discount_percent: Math.round(((formMrp - formPrice) / formMrp) * 100),
        stock_quantity: Number(formStock),
        sku: formSku,
        variant_label: formVariantLabel,
        burn_time: formBurnTime,
        description: formDescription,
        images: activeImages.length > 0 ? activeImages : editingProduct.images,
        is_active: formIsActive,
        is_featured: formIsFeatured,
      });
    } else {
      addProduct({
        name: formName,
        slug: formSlug,
        subtitle: formSubtitle,
        category: formCategory,
        category_name: formCategory === 'sticks' ? 'Incense Sticks' : 'Incense Cones',
        variant_label: formVariantLabel,
        mrp: Number(formMrp),
        price: Number(formPrice),
        discount_percent: Math.round(((formMrp - formPrice) / formMrp) * 100),
        rating: 5.0,
        reviews_count: 1,
        in_stock: Number(formStock) > 0,
        stock_quantity: Number(formStock),
        sku: formSku,
        burn_time: formBurnTime,
        fragrance_notes: notes,
        ingredients: ['Temple Flowers', 'Gir Cow Dung', 'Natural Resins'],
        description: formDescription,
        benefits: ['100% Charcoal-Free', 'Zero Black Soot', 'Ayurvedic Aromatherapy'],
        is_bestseller: false,
        is_featured: formIsFeatured,
        is_active: formIsActive,
        images: activeImages.length > 0 ? activeImages : [
          '/images/products/foxal-sukhad-premium-incense-sticks.jpg',
        ],
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      deleteProduct(id);
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  const handleBulkDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedIds.length} selected products?`
      )
    ) {
      bulkDeleteProducts(selectedIds);
      setSelectedIds([]);
    }
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.fragrance_notes.some((n) => n.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedStock === 'low') {
      list = list.filter((p) => (p.stock_quantity ?? 100) < 50);
    } else if (selectedStock === 'in_stock') {
      list = list.filter((p) => (p.stock_quantity ?? 100) > 0);
    }

    switch (sortBy) {
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'stock_asc':
        list.sort((a, b) => (a.stock_quantity ?? 0) - (b.stock_quantity ?? 0));
        break;
      case 'name_asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'id_desc':
      default:
        list.sort((a, b) => b.id - a.id);
        break;
    }

    return list;
  }, [products, searchQuery, selectedCategory, selectedStock, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedList.map((p) => p.id));
    }
  };

  const toggleSelectId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Inventory Central
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Products Management ({products.length})
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            Create, modify and control stock for all 100% charcoal-free incense items.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="h-4 w-4" />}
          className="shadow-sm"
        >
          Add New Product
        </Button>
      </div>

      {/* Filter & Action Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E3D4BD] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A5230]" />
          <input
            type="text"
            placeholder="Search by product name, fragrance, or SKU..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-[#E3D4BD] bg-[#FAF7F2] pl-10 pr-4 py-2 text-xs text-[#0F0D0B] placeholder:text-[#AFA8A2] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
          />
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs font-semibold text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
          >
            <option value="all">All Categories</option>
            <option value="sticks">Incense Sticks</option>
            <option value="cones">Incense Cones</option>
          </select>

          {/* Stock Filter */}
          <select
            value={selectedStock}
            onChange={(e) => {
              setSelectedStock(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs font-semibold text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
          >
            <option value="all">All Stock Status</option>
            <option value="in_stock">In Stock (&gt;0)</option>
            <option value="low">Low Stock (&lt;50)</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs font-semibold text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
          >
            <option value="id_desc">Newest Added</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="stock_asc">Stock Level: Lowest</option>
            <option value="name_asc">Name: A-Z</option>
          </select>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              leftIcon={<Trash2 className="h-3.5 w-3.5 text-red-500" />}
              className="text-xs border-red-300 text-red-600 hover:bg-red-50"
            >
              Delete ({selectedIds.length})
            </Button>
          )}
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-3xl border border-[#E3D4BD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E3D4BD] text-[#7A5230] font-semibold">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedList.length > 0 &&
                      selectedIds.length === paginatedList.length
                    }
                    onChange={toggleSelectAll}
                    className="rounded text-[#C8922A] focus:ring-[#C8922A]"
                  />
                </th>
                <th className="p-4">Product Details</th>
                <th className="p-4">SKU / Code</th>
                <th className="p-4">Category</th>
                <th className="p-4">Pricing</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D4BD]/60">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-[#7A5230]">
                    No flavor match your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedList.map((product) => {
                  const isChecked = selectedIds.includes(product.id);
                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-[#FAF7F2]/60 transition-colors ${isChecked ? 'bg-[#FDF9F2]' : ''
                        }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectId(product.id)}
                          className="rounded text-[#C8922A] focus:ring-[#C8922A]"
                        />
                      </td>

                      {/* Product Thumbnail & Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-[#E3D4BD] bg-white shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif text-sm font-bold text-[#0F0D0B] block leading-snug">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-[#7A5230]">
                              {product.variant_label}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="p-4 font-mono text-[#0F0D0B]">
                        {product.sku || `FXL-${product.id}`}
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F6EFE4] text-[#7A5230] border border-[#E3D4BD]">
                          {product.category_name}
                        </span>
                      </td>

                      {/* Pricing */}
                      <td className="p-4">
                        <span className="font-bold text-[#0F0D0B] block">
                          ₹{product.price}
                        </span>
                        <span className="text-[10px] text-[#AFA8A2] line-through">
                          ₹{product.mrp}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="p-4">
                        <span
                          className={`font-semibold ${(product.stock_quantity ?? 100) < 50
                              ? 'text-amber-600'
                              : 'text-[#354E3C]'
                            }`}
                        >
                          {product.stock_quantity ?? 120} units
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleProductActive(product.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${product.is_active !== false
                              ? 'bg-[#EBF2ED] text-[#4A6B53] border border-[#C7D9CD]'
                              : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                            }`}
                        >
                          {product.is_active !== false ? 'Live Active' : 'Draft'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/product/${product.slug}`}
                            target="_blank"
                            className="p-1.5 text-[#7A5230] hover:text-[#C8922A]"
                            title="View on Storefront"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>

                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 text-[#7A5230] hover:text-[#0F0D0B]"
                            title="Edit Product"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 text-[#AFA8A2] hover:text-red-600"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#E3D4BD] flex items-center justify-between text-xs text-[#7A5230]">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
              {filteredProducts.length} items
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#E3D4BD] disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-bold text-[#0F0D0B] px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-[#E3D4BD] disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── ADD / EDIT PRODUCT MODAL ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Sacred Product' : 'Add New Incense Fragrance'}
        description="Newly saved products will immediately show up live on the storefront /shop page."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Product Name *"
              required
              value={formName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Royal Gugal Pure Resin Sticks"
            />
            <Input
              label="Slug (Auto-generated) *"
              required
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder="e.g. royal-gugal-pure-resin-sticks"
            />
          </div>

          <Input
            label="Subtitle / Headline"
            value={formSubtitle}
            onChange={(e) => setFormSubtitle(e.target.value)}
            placeholder="e.g. Ayurvedic Temple Herb Blend with Desi Cow Dung"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A5230] mb-1.5">
                Category *
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as 'sticks' | 'cones')}
                className="w-full rounded-xl border border-[#E3D4BD] bg-white px-3 py-2.5 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
              >
                <option value="sticks">Incense Sticks (250g)</option>
                <option value="cones">Incense Cones (60 pcs)</option>
              </select>
            </div>

            <Input
              label="SKU Code"
              value={formSku}
              onChange={(e) => setFormSku(e.target.value)}
              placeholder="e.g. FXL-STICKS-009"
            />

            <Input
              label="Stock Quantity *"
              type="number"
              required
              value={formStock}
              onChange={(e) => setFormStock(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="MRP (₹) *"
              type="number"
              required
              value={formMrp}
              onChange={(e) => setFormMrp(Number(e.target.value))}
            />
            <Input
              label="Sale Price (₹) *"
              type="number"
              required
              value={formPrice}
              onChange={(e) => setFormPrice(Number(e.target.value))}
            />
            <Input
              label="Burn Duration"
              value={formBurnTime}
              onChange={(e) => setFormBurnTime(e.target.value)}
              placeholder="e.g. 45 - 50 Minutes"
            />
          </div>

          <Input
            label="Variant Label"
            value={formVariantLabel}
            onChange={(e) => setFormVariantLabel(e.target.value)}
            placeholder="e.g. 250g (Approx. 130-140 Sticks)"
          />

          <Input
            label="Fragrance Notes (comma separated)"
            value={formFragrance}
            onChange={(e) => setFormFragrance(e.target.value)}
            placeholder="e.g. Rare Musk, Earthy Sandal, Sacred Camphor"
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A5230] mb-1.5">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full rounded-xl border border-[#E3D4BD] bg-white p-3 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
            />
          </div>

          {/* Image Count Selector and Dynamic Slots */}
          <div className="space-y-4 pt-2 border-t border-[#E3D4BD]">
            <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E3D4BD] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#C8922A]">
                  📸 Kitne Images Upload Karne Hain? (Select Count)
                </label>
                <span className="text-[11px] text-[#7A5230] font-medium">
                  Photo 1 is Main Thumbnail
                </span>
              </div>
              <select
                value={targetImageCount}
                onChange={(e) => {
                  const count = parseInt(e.target.value, 10);
                  setTargetImageCount(count);
                }}
                className="w-full rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs text-[#0F0D0B] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
              >
                <option value={1}>1 Image (Sirf 1 Thumbnail / Primary Cover)</option>
                <option value={2}>2 Images (1 Thumbnail + 1 Gallery Image)</option>
                <option value={3}>3 Images (1 Thumbnail + 2 Gallery Images)</option>
                <option value={4}>4 Images (1 Thumbnail + 3 Gallery Images)</option>
                <option value={5}>5 Images (1 Thumbnail + 4 Gallery Images)</option>
                <option value={6}>6 Images (1 Thumbnail + 5 Gallery Images)</option>
              </select>
              <p className="text-[11px] text-[#7A5230]">
                💡 Niche sirf utne hi upload fields dikhenge jitne aapne select kiye hain.
              </p>
            </div>

            {/* Dynamic Slots */}
            <div className="space-y-3">
              {Array.from({ length: targetImageCount }).map((_, idx) => {
                const label =
                  idx === 0
                    ? 'Photo 1 (Thumbnail / Primary Cover) *'
                    : `Photo ${idx + 1} (Gallery Photo / Video ${idx})`;
                const currentVal = formImages[idx] || '';

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white border border-[#E3D4BD] space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0F0D0B]">{label}</span>
                      {currentVal && (
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          ✓ Image Set
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Thumbnail Preview */}
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E3D4BD] flex items-center justify-center shrink-0">
                        {currentVal ? (
                          <Image
                            src={currentVal}
                            alt={`Preview ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-[#AFA8A2] text-center px-1">
                            No image
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={currentVal}
                          onChange={(e) => {
                            const newArr = [...formImages];
                            newArr[idx] = e.target.value;
                            setFormImages(newArr);
                          }}
                          placeholder={
                            idx === 0
                              ? '/images/products/... or image URL (Primary Cover)'
                              : `/images/products/... or image URL (Gallery ${idx})`
                          }
                          required={idx === 0}
                          className="flex-1 rounded-xl border border-[#E3D4BD] bg-[#FAF7F2] px-3 py-2 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                        />
                        {currentVal && (
                          <button
                            type="button"
                            onClick={() => {
                              const newArr = [...formImages];
                              newArr[idx] = '';
                              setFormImages(newArr.filter(Boolean));
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg text-xs"
                            title="Clear"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-2 flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F0D0B]">
              <input
                type="checkbox"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="rounded text-[#C8922A] focus:ring-[#C8922A]"
              />
              <span>Live on Storefront (Active)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F0D0B]">
              <input
                type="checkbox"
                checked={formIsFeatured}
                onChange={(e) => setFormIsFeatured(e.target.checked)}
                className="rounded text-[#C8922A] focus:ring-[#C8922A]"
              />
              <span>Mark as Featured Aroma</span>
            </label>
          </div>

          {/* Action CTAs */}
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
              {editingProduct ? 'Save Product Changes' : 'Create & Publish Aroma'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
