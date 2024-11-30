package com.example.demo.repository;
import com.example.demo.models.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RecipeRepository extends MongoRepository<Recipe, String>{
    List<Recipe> findByFamilyId(String familyId);
}

