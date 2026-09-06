import { products } from "../data/products.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makePlans = (price) =>
  [3, 6, 9, 12].map((months) => ({
    id: `${months}-months`,
    months,
    monthlyAmount: Math.ceil(price / months),
    interest: 0
  }));

export async function getProducts() {
  await wait(450);
  return products;
}

export async function getProductById(id) {
  await wait(250);
  return products.find((p) => p.id === id) ?? null;
}

export async function getEmiPlans(productId, variantId) {
  await wait(300);
  const product = products.find((p) => p.id === productId);
  const variant = product?.variants.find((v) => v.id === variantId);
  return variant ? makePlans(variant.price) : [];
}