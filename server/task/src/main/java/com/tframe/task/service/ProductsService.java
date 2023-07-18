package com.tframe.task.service;

import com.opencsv.bean.CsvToBeanBuilder;
import com.tframe.task.model.Product;
import com.tframe.task.model.ProductCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
public class ProductsService {
    // ProductService.java
        @Autowired
        private ResourceLoader resourceLoader;

        public List<Product> createProductsFromCSV() {
            try {
                // Load the resource from the "resources" folder
                Resource resource = resourceLoader.getResource("classpath:products.csv");
                File file = resource.getFile();

                try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                    List<Product> products = new CsvToBeanBuilder<Product>(reader)
                            .withType(Product.class)
                            .withSeparator(',')
                            .build()
                            .parse();

                    return products;
                } catch (IOException e) {
                    // Handle the exception appropriately (e.g., log the error or throw a custom exception)
                    e.printStackTrace();
                    return null;
                }
            } catch (IOException e) {
                // Handle the exception appropriately (e.g., log the error or throw a custom exception)
                e.printStackTrace();
                return null;
            }
        }

        public void generateReport(List<ProductCart> productCartList) {
            List<ProductCart> cartList = new ArrayList<>();
            double priceToCheck = 0;
            for ( ProductCart item: productCartList
                 ) {
                priceToCheck += item.getProductPrice();
                if(priceToCheck > 500) {
                    cartList.add(item);
                }
            }

        }
    }


