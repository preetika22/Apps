package com.example.demo.repository;
import com.example.demo.models.ShoppingListItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ShoppingListItemRepository extends MongoRepository<ShoppingListItem, String> {
        List<ShoppingListItem> findByFamilyId(String familyId);
    }


