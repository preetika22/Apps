package com.example.demo.controllers;

import com.example.demo.models.GroceryItems;
import com.example.demo.repository.GroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class GroceriesController {

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    @GetMapping()
    public List<GroceryItems> getAllGroceries() {
        return groceryItemRepository.findAll();
    }

    @PostMapping("/add")
    public GroceryItems addGroceryItem(@RequestBody GroceryItems item) {
        return groceryItemRepository.save(item);
    }

    @PutMapping("/update/{id}")
    public GroceryItems updateGroceryItem(@PathVariable String id, @RequestBody GroceryItems updatedItem) {
        return groceryItemRepository.findById(id)
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setQuantity(updatedItem.getQuantity());
                    return groceryItemRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }
    @DeleteMapping("/remove/{id}")
    public String removeGroceryItem(@PathVariable String id) {
        groceryItemRepository.deleteById(id);
        return "Grocery item removed successfully";
    }
}
