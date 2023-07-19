package com.tframe.task.model;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCart {

    private int id;

    private String productName;

    private double productPrice;

    private int productVAT;

    private double discount;

    private int amount;


}


