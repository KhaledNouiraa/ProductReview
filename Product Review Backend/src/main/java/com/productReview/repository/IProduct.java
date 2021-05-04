package com.productReview.repository;

import java.util.List;

import com.productReview.entity.Product;



public interface IProduct {

	Product save(Product Productinformation);

	List<Product> getUsers();

}
