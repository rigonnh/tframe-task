package com.tframe.task.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductCart {

    private int id;

    private String productName;

    private double productPrice;

    private int productVAT;

    private double discount;

    private int amount;


}


