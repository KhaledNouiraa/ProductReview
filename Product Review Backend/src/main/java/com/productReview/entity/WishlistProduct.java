package com.productReview.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Data;
@Entity
@Data
@Table(name="wishproduct")
public class WishlistProduct {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long wishlistId;
    
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Product> productsList;
	

	private LocalDateTime wishlistTime;

	public long getWishlistId() {
		return wishlistId;
	}

	public void setWishlistId(long wishlistId) {
		this.wishlistId = wishlistId;
	}

	public List<Product> getProductsList() {
		return productsList;
	}

	public void setProductsList(List<Product> productsList) {
		this.productsList = productsList;
	}

	public LocalDateTime getWishlistTime() {
		return wishlistTime;
	}

	public void setWishlistTime(LocalDateTime wishlistTime) {
		this.wishlistTime = wishlistTime;
	}
}
