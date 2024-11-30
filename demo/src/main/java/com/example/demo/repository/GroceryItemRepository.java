package com.example.demo.repository;
import com.example.demo.models.GroceryItems;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GroceryItemRepository extends MongoRepository<GroceryItems, String>{
    List<GroceryItems> findByFamilyId(String familyId);
}
