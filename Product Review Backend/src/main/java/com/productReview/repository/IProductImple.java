package com.productReview.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.productReview.entity.Product;

@Repository
public class IProductImple implements IProduct {
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public Product save(Product Productinformation) {
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(Productinformation);
		return Productinformation;
	}

	@Override
	public List<Product> getUsers() {
		Session currentSession = entityManager.unwrap(Session.class);
		List ProductList = currentSession.createQuery("from Product").getResultList();
		return ProductList;
	}


}
