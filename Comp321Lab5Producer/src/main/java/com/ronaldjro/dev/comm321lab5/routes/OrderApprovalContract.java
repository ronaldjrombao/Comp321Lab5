package com.ronaldjro.dev.comm321lab5.routes;

import java.util.List;

public record OrderApprovalContract(
        String orderId,
        String customerId,
        String customerName,
        String orderDate,
        List<Item> items,
        double totalAmount,
        String currency,
        Priority priority,
        String approvedBy
) {
    public record Item(
            String productId,
            int quantity,
            double price
    ) {}

    public enum Priority {
        Low, Medium, High
    }
}
