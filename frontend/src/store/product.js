// We will have some kind of golbal state for the application
// and some functions to manipulate this state

import { create } from "zustand";

// Creating hook for managing the state
export const useProductStore = create((set) => ({
  products: [], // array of all products
  setProducts: (products) => set({ products }), // function to set products state with it
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] })); // Update our state
    return { success: true, message: "Product created successfully." };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (productId) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message }; // check if request done successfully or not

    // Update the user interface immediately, without needing to refresh
    set((state) => ({
      products: state.products.filter((p) => p._id !== productId),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (productId, updatedProduct) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // Update the user interface immediately, without needing to refresh
    set((state) => ({
      products: state.products.map((p) =>
        p._id === productId ? data.data : p
      ),
    }));

    return { success: true, message: data.message };
  },
})); // returning an object
