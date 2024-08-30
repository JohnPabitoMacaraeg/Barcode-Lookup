document.addEventListener("DOMContentLoaded", () => {
  const productInfoDiv = document.getElementById("productInfo");

  const savedProductInfo = localStorage.getItem("productInfo");
  if (savedProductInfo) {
    productInfoDiv.innerHTML = savedProductInfo;
  }

  document.getElementById("fetchButton").addEventListener("click", async () => {
    const barcode = document.getElementById("barcode").value.trim();
    if (!barcode) {
      alert("Please enter a barcode.");
      return;
    }

    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 1) {
        const product = data.product;
        const productInfoHTML = `
                  <h2>${product.product_name || "No product name"}</h2>
                  <p><strong>Brand:</strong> ${product.brands || "No brand"}</p>
                  <p><strong>Quantity:</strong> ${
                    product.quantity || "No quantity"
                  }</p>
                  <p><strong>Ingredients:</strong> ${
                    product.ingredients_text || "No ingredients"
                  }</p>
                  <p><strong>Categories:</strong> ${
                    product.categories || "No categories"
                  }</p>
                  <p><strong>Labels:</strong> ${
                    product.labels || "No labels"
                  }</p>
                  <img src="${
                    product.image_url || "No image available"
                  }" alt="Product image" style="max-width: 300px; margin-top: 10px;">
              `;
        productInfoDiv.innerHTML = productInfoHTML;

        localStorage.setItem("productInfo", productInfoHTML);
      } else {
        productInfoDiv.innerHTML =
          "<p>No product found for the given barcode.</p>";
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      productInfoDiv.innerHTML =
        "<p>There was an error fetching the product information.</p>";
    }
  });
});
