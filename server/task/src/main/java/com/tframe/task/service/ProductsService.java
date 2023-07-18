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
            List<List<ProductCart>> cartLists = new ArrayList<>();
            List<ProductCart> currentCart = new ArrayList<>();
            double priceToCheck = 0;

            for (ProductCart item : productCartList) {
                priceToCheck += item.getProductPrice();
                if (priceToCheck > 500) {
                    // If adding this item to the current cart would exceed the limit, create a new cart list
                    if (!currentCart.isEmpty()) {
                        cartLists.add(currentCart);
                    }
                    // Print the current cart list with products less than 500
                    printCartListWithLessThan500(currentCart);

                    // Start a new cart list with the current item
                    currentCart = new ArrayList<>();
                    priceToCheck = 0;
                }

                currentCart.add(item);

            }

// Print the last cart list with products less than 500
            printCartListWithLessThan500(currentCart);

// Add any remaining items to the last cart list
            if (!currentCart.isEmpty()) {
                cartLists.add(currentCart);
            }
        }
    private void printCartListWithLessThan500(List<ProductCart> cart) {
        if (cart.isEmpty()) {
            return;
        }

        double totalPrice = 0;
        System.out.println("Cart List with Products Less Than 500:");
        for (ProductCart item : cart) {
            totalPrice += item.getProductPrice();
            // Customize how you want to print the cart items, for example:
            System.out.println(item.getProductName() + " - Price: " + item.getProductPrice());
        }
        System.out.println("Total Price: " + totalPrice);
        System.out.println();
    }
    }


