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

    public List<List<ProductCart>> generateReport(List<ProductCart> productCartList) {
        List<List<ProductCart>> cartLists = new ArrayList<>();
        List<ProductCart> currentCart = new ArrayList<>();
        double priceToCheck = 0;

        for (ProductCart item : productCartList) {


            if(item.getProductPrice() >= 500) {
                if(item.getAmount() > 50){
                    int count = item.getAmount();
                    for(int i = 0; i < item.getAmount() / 50; i++){
                        List<ProductCart> list = new ArrayList<>();
                        ProductCart productCart = ProductCart.builder()
                                .productName(item.getProductName())
                                .productPrice(item.getProductPrice())
                                .productVAT(item.getProductVAT())
                                .amount(50)
                                .id(item.getId())
                                .discount(item.getDiscount())
                                .build();
                        list.add(productCart);
                        printCartListWithLessThan500(list, cartLists);
                        count -= 50;

                    }
                    if(count > 0){
                        List<ProductCart> list = new ArrayList<>();
                        ProductCart productCart = ProductCart.builder()
                                .productName(item.getProductName())
                                .productPrice(item.getProductPrice())
                                .productVAT(item.getProductVAT())
                                .amount(count)
                                .id(item.getId())
                                .discount(item.getDiscount())
                                .build();
                        list.add(productCart);
                        printCartListWithLessThan500(list, cartLists);
                    }
                    continue;
                }
                List<ProductCart> list = new ArrayList<>();
                list.add(item);
                printCartListWithLessThan500(list, cartLists);
                continue;
            }
            priceToCheck += item.getProductPrice() * item.getAmount();
            if (priceToCheck > 500) {
                // If adding this item to the current cart would exceed the limit, create a new cart list

                // Print the current cart list with products less than 500
                if(priceToCheck - (item.getProductPrice() * item.getAmount()) < 500 && productCartList.size() > 1){
                    List<ProductCart> list = new ArrayList<>();
                    list.add(item);
                    printCartListWithLessThan500(list, cartLists);
                    priceToCheck -= item.getProductPrice() * item.getAmount();
                    continue;
                }
                printCartListWithLessThan500(currentCart, cartLists);
                // Start a new cart list with the current item
                currentCart = new ArrayList<>();
                priceToCheck = item.getProductPrice() * item.getAmount();
            }
            currentCart.add(item);
        }
        // Add the last cart (currentCart) to the cartLists

        // Print the last cart list with products less than 500
        printCartListWithLessThan500(currentCart, cartLists);
        return cartLists;
    }


    private void printCartListWithLessThan500(List<ProductCart> cart, List<List<ProductCart>> listToAdd) {
        listToAdd.add(cart);
    }
    }


