package com.productReview.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "productinfo")
public class Product implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;
	private Long userId;
	private String productName;
	private Long noOfproduct;
	private Double price;
	private String authorName;
	@Column(columnDefinition="TEXT")
	private String productDetails;
	private LocalDateTime createdDateAndTime;
	private LocalDateTime updatedDateAndTime;
	private String status;
	private String image;
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Long getNoOfproduct() {
		return noOfproduct;
	}
	public void setNoOfproduct(Long noOfproduct) {
		this.noOfproduct = noOfproduct;
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
	public String getProductDetails() {
		return productDetails;
	}
	public void setProductDetails(String productDetails) {
		this.productDetails = productDetails;
	}
	public LocalDateTime getCreatedDateAndTime() {
		return createdDateAndTime;
	}
	public void setCreatedDateAndTime(LocalDateTime createdDateAndTime) {
		this.createdDateAndTime = createdDateAndTime;
	}
	public LocalDateTime getUpdatedDateAndTime() {
		return updatedDateAndTime;
	}
	public void setUpdatedDateAndTime(LocalDateTime updatedDateAndTime) {
		this.updatedDateAndTime = updatedDateAndTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}