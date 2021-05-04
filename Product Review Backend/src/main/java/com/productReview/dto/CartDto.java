package com.productReview.dto;

import lombok.Data;

@Data
public class CartDto {

	private Long quantityId;
	private Long quantityOfProduct;
	private Double eachPrice;
	public Long getQuantityId() {
		return quantityId;
	}
	public void setQuantityId(Long quantityId) {
		this.quantityId = quantityId;
	}
	public Long getQuantityOfProduct() {
		return quantityOfProduct;
	}
	public void setQuantityOfProduct(Long quantityOfProduct) {
		this.quantityOfProduct = quantityOfProduct;
	}
	public Double getEachPrice() {
		return eachPrice;
	}
	public void setEachPrice(Double eachPrice) {
		this.eachPrice = eachPrice;
	}

	//@ApiModelProperty(notes = "The TotalPrice of the Product", required = true)// for swagger property mention...
}
