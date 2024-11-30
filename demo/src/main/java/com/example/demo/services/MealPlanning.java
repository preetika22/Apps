package com.example.demo.services;

import com.example.demo.models.GroceryItems;
import com.example.demo.models.Recipe;
import com.example.demo.repository.GroceryItemRepository;
import com.example.demo.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MealPlanning {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    public List<Recipe> getAvailableRecipes(String familyId) {
        // Fetch all grocery items for the family
        List<GroceryItems> groceries = groceryItemRepository.findByFamilyId(familyId);

        // Create a set of available ingredient names (this assumes you don't care about quantities anymore)
        List<String> availableIngredients = groceries.stream()
                .map(GroceryItems::getName)
                .collect(Collectors.toList());

        // Filter recipes based on available ingredients
        return recipeRepository.findByFamilyId(familyId).stream()
                .filter(recipe -> canMakeRecipe(recipe, availableIngredients))
                .collect(Collectors.toList());
    }

    private boolean canMakeRecipe(Recipe recipe, List<String> availableIngredients) {
        // Check if all ingredients in the recipe are available in the house
        return new HashSet<>(availableIngredients).containsAll(recipe.getIngredients());
    }
}
