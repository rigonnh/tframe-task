package com.tframe.task.controller;

import com.tframe.task.model.ProductCart;
import com.tframe.task.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductsController {

    @Autowired
    private ProductsService productsService;
    @GetMapping("/get")
    public ResponseEntity<?> getProducts(){
        return ResponseEntity.ok(productsService.createProductsFromCSV());
    }
    @PostMapping("/generate")
    public ResponseEntity<?> generateInvoice(@RequestBody List<ProductCart> productCart){

        return ResponseEntity.ok(productsService.generateReport(productCart));
    }
    @PostMapping("/generate/sort")
    public ResponseEntity<?> generateInvoiceSort(@RequestBody List<ProductCart> productCart){

        return ResponseEntity.ok(productsService.createInvoiceSort(productCart));
    }
}
