package com.ronaldjro.dev.comm321lab5.routes;

import java.time.LocalDate;

public record TestMessage(
        String message,
        LocalDate currentDate,
        Integer quantity
) {
}
