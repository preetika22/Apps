package com.example.demo.services;

import com.example.demo.models.GroceryItems;
import com.example.demo.models.ShoppingListItem;
import com.example.demo.repository.GroceryItemRepository;
import com.example.demo.repository.ShoppingListItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShoppingListService {
    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    // Constants for categories
    public static final String GROCERIES = "Groceries";
    public static final String VEGETABLES = "Vegetables";
    public static final String FRUITS = "Fruits";
    public static final String MEAT = "Meat";

    // Add item to the shopping list
    public ShoppingListItem addItemToShoppingList(String name, int quantity, String familyId, String category) {
        if (category == null || !isValidCategory(category)) {
            throw new IllegalArgumentException("Invalid category");
        }
        ShoppingListItem item = new ShoppingListItem(name, quantity, familyId, category);
        return shoppingListItemRepository.save(item);

    }

    private boolean isValidCategory(String category) {
        return category != null &&
                (category.equalsIgnoreCase(GROCERIES) ||
                        category.equalsIgnoreCase(VEGETABLES) ||
                        category.equalsIgnoreCase(FRUITS) ||
                        category.equalsIgnoreCase(MEAT));
    }

    // Move item from shopping list to grocery inventory
    @Transactional
    public GroceryItems moveItemToInventory(String shoppingListItemId, String familyId) {
        // Find the shopping list item by ID
        ShoppingListItem shoppingListItem = shoppingListItemRepository.findById(shoppingListItemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));

        if (!shoppingListItem.getFamilyId().equals(familyId)) {
            throw new IllegalArgumentException("Family ID mismatch");
        }

        // Create a new Grocery item and save it
        GroceryItems groceryItem = new GroceryItems(
                shoppingListItem.getName(),
                shoppingListItem.getQuantity(),
                shoppingListItem.getCategory(),  // Ensure category is included if needed
                familyId
        );

        // Save the new inventory item
        groceryItem = groceryItemRepository.save(groceryItem);

        // Remove item from the shopping list after moving it to the inventory
        shoppingListItemRepository.deleteById(shoppingListItemId);

        return groceryItem; // Return the newly created inventory item
    }


    // Discard item from shopping list
    public void discardItem(String shoppingListItemId, String familyId) {
        ShoppingListItem shoppingListItem = shoppingListItemRepository.findById(shoppingListItemId).orElseThrow(() -> new IllegalArgumentException("Item not found"));
        shoppingListItemRepository.deleteById(shoppingListItemId);
    }

    public List<ShoppingListItem> getShoppingListByFamilyId(String familyId) {
        return shoppingListItemRepository.findByFamilyId(familyId);
    }




}
