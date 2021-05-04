package com.productReview.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.productReview.entity.Product;

public interface ProductInterface extends CrudRepository<Product, Long>{
	
	List<Product> findByStatus(String status);
	
	Product findByProductId(Long ProductId);

}
