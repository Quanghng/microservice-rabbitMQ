package com.moudjane.microservice_product.controller;

import com.moudjane.microservice_product.model.Product;
import com.moudjane.microservice_product.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product addProduct(@RequestBody Product product) {
        String generatedId = (product.id() == null || product.id().isBlank())
                ? UUID.randomUUID().toString()
                : product.id();

        Product newProduct = new Product(
                generatedId,
                product.name(),
                product.category(),
                product.price(),
                product.quantity()
        );
        return productService.addProduct(newProduct);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) String name) {

        if (category != null) {
            return productService.searchByCategory(category);
        } else if (price != null) {
            return productService.searchByPrice(price);
        } else if (name != null) {
            return productService.searchByName(name);
        } else {
            throw new IllegalArgumentException("At least one search parameter is required");
        }
    }
}
