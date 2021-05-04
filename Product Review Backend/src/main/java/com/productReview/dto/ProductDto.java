package com.productReview.dto;

import org.springframework.stereotype.Component;

import lombok.Data;


@Data
@Component
public class ProductDto {
	private String productName;
	private Long noOfProducts;
	private Double price;
	private String authorName;
	private String image;
	private String productDetails;
	private String userId;
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Long getNoOfProducts() {
		return noOfProducts;
	}
	public void setNoOfProducts(Long noOfProducts) {
		this.noOfProducts = noOfProducts;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getProductDetails() {
		return productDetails;
	}
	public void setProductDetails(String productDetails) {
		this.productDetails = productDetails;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
}