import { useState } from "react";
import { X, Loader2 } from "lucide-react";

const emptyForm = {
  name: "",
  brand: "",
  category: "",
  price: "",
  oldPrice: "",
  weight: "",
  description: "",
  inStock: true,
  isBulk: false,
  isFeatured: false,
  isBestSeller: false,
  isNew: false,
};

export default function ProductFormModal({ categories, initial, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    ...initial,
    price: initial?.price ?? "",
    oldPrice: initial?.oldPrice ?? "",
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.category || !form.price) {
      setError("Name, category, and price are required.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        rating: initial?.rating ?? 4.0,
        reviewsCount: initial?.reviewsCount ?? 0,
      });
    } catch (err) {
      setError(err.message || "Couldn't save product.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="font-display text-lg font-semibold text-ink">
            {initial ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-full hover:bg-basil-50">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <Field label="Product name" value={form.name} onChange={handleChange("name")} required />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Brand" value={form.brand} onChange={handleChange("brand")} />
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-ink-soft">Category</span>
              <select
                value={form.category}
                onChange={handleChange("category")}
                required
                className="px-4 py-2.5 rounded-full bg-cream shadow-soft focus:shadow-soft-lg outline-none transition-shadow text-ink"
              >
                <option value="">Select...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price ($)" type="number" min="0" value={form.price} onChange={handleChange("price")} required />
            <Field label="Old price" type="number" min="0" value={form.oldPrice} onChange={handleChange("oldPrice")} />
          </div>

          <Field label="Weight / quantity" placeholder="e.g. 1 kg, 500 ml" value={form.weight} onChange={handleChange("weight")} />

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink-soft">Description</span>
            <textarea
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
              className="px-4 py-3 rounded-2xl bg-cream shadow-soft focus:shadow-soft-lg outline-none transition-shadow text-ink resize-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Checkbox label="In stock" checked={form.inStock} onChange={handleChange("inStock")} />
            <Checkbox label="Bulk pack" checked={form.isBulk} onChange={handleChange("isBulk")} />
            <Checkbox label="Featured" checked={form.isFeatured} onChange={handleChange("isFeatured")} />
            <Checkbox label="Best seller" checked={form.isBestSeller} onChange={handleChange("isBestSeller")} />
          </div>

          {error && <p className="text-sm text-tomato-500">{error}</p>}

          <div className="flex items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-basil-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-basil-700 hover:shadow-glow transition-all disabled:opacity-60"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {initial ? "Save Changes" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-ink-soft hover:bg-basil-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, ...inputProps }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-ink-soft">{label}</span>
      <input
        {...inputProps}
        className="px-4 py-2.5 rounded-full bg-cream shadow-soft focus:shadow-soft-lg outline-none transition-shadow text-ink"
      />
    </label>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-soft cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-basil-600" />
      {label}
    </label>
  );
}
