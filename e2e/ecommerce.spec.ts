import { test, expect } from '@playwright/test';


test.describe("Home Page", () => {
  test("displays product listing", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /discover products/i })).toBeVisible();
    // Wait for products to load from API
    await expect(page.locator("article").first()).toBeVisible({ timeout: 10000 });
    const products = page.locator("article");
    expect(await products.count()).toBeGreaterThan(0);
  });

  test("displays category filters", async ({ page }) => {
    await page.goto("/");
    const filterGroup = page.getByRole("group", { name: /filter by category/i });
    await expect(filterGroup).toBeVisible({ timeout: 10000 });
    const buttons = filterGroup.getByRole("button");
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test("filters products by category", async ({ page }) => {
    await page.goto("/");
    const filterGroup = page.getByRole("group", { name: /filter by category/i });
    await expect(filterGroup).toBeVisible({ timeout: 10000 });
    const firstFilter = filterGroup.getByRole("button").first();
    await firstFilter.click();
    await expect(firstFilter).toHaveAttribute("aria-pressed", "true");
    // Products should reload
    await expect(page.locator("article").first()).toBeVisible({ timeout: 10000 });
  });

  test("navigates to product detail", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("article").first()).toBeVisible({ timeout: 10000 });
    await page.locator("article a").first().click();
    await expect(page).toHaveURL(/\/product\/\d+\/details/);
    await expect(page.getByRole("button", { name: /add to my cart/i })).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Product Detail Page", () => {
  test("shows product info and add to cart button", async ({ page }) => {
    await page.goto("/product/1/details");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("button", { name: /add to my cart/i })).toBeVisible();
  });

  test("adds product to cart", async ({ page }) => {
    await page.goto("/product/1/details");
    await page.getByRole("button", { name: /add to my cart/i }).click();
    // Cart badge should appear in header
    await expect(page.locator("header").getByText("1")).toBeVisible();
  });

  test("has back link to home", async ({ page }) => {
    await page.goto("/product/1/details");
    await expect(page.getByText(/back to products/i)).toBeVisible({ timeout: 10000 });
    await page.getByText(/back to products/i).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Cart Page", () => {
  test("shows empty cart message", async ({ page }) => {
    await page.goto("/cart");
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test("can add and remove items", async ({ page }) => {
    // Add item first
    await page.goto("/product/1/details");
    await page.getByRole("button", { name: /add to my cart/i }).click();
    
    // Go to cart
    await page.goto("/cart");
    await expect(page.getByRole("list", { name: /cart items/i })).toBeVisible();
    
    // Remove item
    const removeBtn = page.getByRole("button", { name: /remove/i }).first();
    await removeBtn.click();
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });
});
