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
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<List<ProductCart>> createInvoiceSort(List<ProductCart> inputList){
        List<List<ProductCart>> returnList = new ArrayList<>();
        //sorto produktet me qmim baze mbi 500
        sortOwnPriceGraterThan500(returnList, inputList);

        //sorto pjesen tjeter
        List<ProductCart> secondList = new ArrayList<>();
        List<ProductCart> newl = new ArrayList<>();
        List<ProductCart> currentArray = new ArrayList<>();
        inputList.forEach(item -> {
            if (item.getAmount() > 50) {
                int count = item.getAmount();
                for (int i = 0; i < item.getAmount() / 50; i++) {
                    ProductCart productCart = ProductCart.builder()
                            .productName(item.getProductName())
                            .productPrice(item.getProductPrice())
                            .productVAT(item.getProductVAT())
                            .amount(50)
                            .id(item.getId())
                            .discount(item.getDiscount())
                            .build();

                    if(i == 0){
                        newl.add(productCart);
                    }
                    else{
                        List<ProductCart> list = new ArrayList<>();
                        list.add(productCart);
                        returnList.add(list);

                    }

                    count -= 50;
                }
                if (count > 0) {
                    ProductCart productCart = ProductCart.builder()
                            .productName(item.getProductName())
                            .productPrice(item.getProductPrice())
                            .productVAT(item.getProductVAT())
                            .amount(count)
                            .id(item.getId())
                            .discount(item.getDiscount())
                            .build();



                    secondList.add(productCart);
                }
            }});
        inputList.addAll(newl);
        inputList.addAll(secondList);
        inputList.removeIf(item -> item.getAmount() > 50);
        List<ProductCart> listWithDuplicate = new ArrayList<>();
        double priceToCheck = 0;
        inputList = inputList.stream().sorted(
                Comparator.comparingDouble(item -> item.getProductPrice() * item.getAmount())
        ).collect(Collectors.toList());
        for (ProductCart item: inputList
             ) {
            priceToCheck += (item.getProductPrice() - item.getDiscount()) * item.getAmount();
            if(priceToCheck > 500){
                returnList.add(currentArray);
                priceToCheck = 0;
                currentArray = new ArrayList<>();
                currentArray.add(item);
                priceToCheck += item.getProductPrice() * item.getAmount();
            }
            else {
                if(currentArray.stream().anyMatch(item1 -> item1.getId() == item.getId())){
                    listWithDuplicate.add(item);
                }
                else {
                    currentArray.add(item);
                }

            }

        }
        if(!currentArray.isEmpty()){

            if(!listWithDuplicate.isEmpty()){
                for(ProductCart productCart : listWithDuplicate){
                    if(!currentArray.stream().anyMatch(item1 -> item1.getId() == productCart.getId())){
                        currentArray.add(productCart);
                    }
                    else{
                        List<ProductCart> item = new ArrayList<>();
                        returnList.add(item);
                    }
                }
            }
            returnList.add(currentArray);
        }
       return returnList;
    }

    private void sortOwnPriceGraterThan500(List<List<ProductCart>> returnList, List<ProductCart> inputList) {
        List<ProductCart> listWithGraterThan500 = inputList.stream()
                .filter(item -> (item.getProductPrice() - item.getDiscount()) >= 500)
                .collect(Collectors.toList());

        listWithGraterThan500.forEach(item -> {
            List<ProductCart> listToHelpDivide = new ArrayList<>();
            if (item.getAmount() > 50) {
                int count = item.getAmount();
                for (int i = 0; i < item.getAmount() / 50; i++) {
                    List<ProductCart> listToHelpDivide1 = new ArrayList<>();
                    ProductCart productCart = ProductCart.builder()
                            .productName(item.getProductName())
                            .productPrice(item.getProductPrice())
                            .productVAT(item.getProductVAT())
                            .amount(50)
                            .id(item.getId())
                            .discount(item.getDiscount())
                            .build();

                    listToHelpDivide1.add(productCart);
                    returnList.add(listToHelpDivide1);
                    count -= 50;
                }
                if (count > 0) {
                    List<ProductCart> listToHelpDivide1 = new ArrayList<>();
                    ProductCart productCart = ProductCart.builder()
                            .productName(item.getProductName())
                            .productPrice(item.getProductPrice())
                            .productVAT(item.getProductVAT())
                            .amount(count)
                            .id(item.getId())
                            .discount(item.getDiscount())
                            .build();

                    listToHelpDivide1.add(productCart);
                    returnList.add(listToHelpDivide1);
                }
            }
            else {
                listToHelpDivide.add(item);
                returnList.add(listToHelpDivide);
            }
        });

        inputList.removeIf(item -> (item.getProductPrice() - item.getDiscount()) >= 500);

    }
}


