package com.tframe.task.controller;

import com.tframe.task.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
public class ProductsController {

    @Autowired
    private ProductsService productsService;
    @GetMapping("/get")
    public ResponseEntity<?> getProducts(){
        return ResponseEntity.ok(productsService.createProductsFromCSV());
    }
}
