package com.moudjane.microservice_product.service;

import com.moudjane.microservice_product.model.Product;
import com.moudjane.microservice_product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Product updatedProduct = new Product(
                id,
                product.name(),
                product.category(),
                product.price(),
                product.quantity()
        );
        return productRepository.save(updatedProduct);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> searchByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchByPrice(BigDecimal price) {
        return productRepository.findByPriceLessThanEqual(price);
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
}
