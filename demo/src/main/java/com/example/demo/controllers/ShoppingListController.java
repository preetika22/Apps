package com.example.demo.controllers;

import com.example.demo.models.GroceryItems;
import com.example.demo.models.ShoppingListItem;
import com.example.demo.services.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping-list")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    // Add item to shopping list (Family-specific)
    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestParam String familyId, @RequestBody ShoppingListItem shoppingListItem) {
        if (!familyId.equals(shoppingListItem.getFamilyId())) {
            return ResponseEntity.badRequest().body("Family ID mismatch");
        }
        ShoppingListItem item = shoppingListService.addItemToShoppingList(
                shoppingListItem.getName(),
                shoppingListItem.getQuantity(),
                familyId,
                shoppingListItem.getCategory()
        );
        return ResponseEntity.ok(item);
    }

    // Get shopping list for a specific family
    @GetMapping("/{familyId}")
    public ResponseEntity<List<ShoppingListItem>> getShoppingList(@PathVariable String familyId) {
        List<ShoppingListItem> shoppingList = shoppingListService.getShoppingListByFamilyId(familyId);
        if (shoppingList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(shoppingList);
    }

    // Move item from shopping list to grocery inventory (Family-specific)
    @PostMapping("/move-to-inventory")
    public ResponseEntity<?> moveItemToInventory(@RequestParam String shoppingListItemId, @RequestParam String familyId) {
        try {
            GroceryItems groceryItem = shoppingListService.moveItemToInventory(shoppingListItemId, familyId);
            return ResponseEntity.ok(groceryItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Discard item from shopping list (Family-specific)
    @DeleteMapping("/discard/{id}")
    public ResponseEntity<?> discardItem(@PathVariable String id, @RequestParam String familyId) {
        try {
            shoppingListService.discardItem(id, familyId);
            return ResponseEntity.ok("Item discarded successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    }
