package com.productReview.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.productReview.entity.Quantity;
@Repository
public interface QuantityRepository extends JpaRepository<Quantity, Long>{

}