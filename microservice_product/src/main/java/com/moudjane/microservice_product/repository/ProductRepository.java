package com.moudjane.microservice_product.repository;

import com.moudjane.microservice_product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategory(String category);

    @Query("{ 'price' : { $lte: ?0 } }")
    List<Product> findByPriceLessThanEqual(BigDecimal price);

    List<Product> findByNameContainingIgnoreCase(String name);
}
