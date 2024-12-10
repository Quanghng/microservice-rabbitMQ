package com.moudjane.microservice_product.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(collection = "products")
public record Product(
        @Id
        String id,

        String name,

        String category,

        BigDecimal price,

        int quantity
) {}
