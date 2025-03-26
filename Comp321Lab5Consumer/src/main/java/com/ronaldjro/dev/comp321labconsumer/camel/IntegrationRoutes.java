package com.ronaldjro.dev.comp321labconsumer.camel;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class IntegrationRoutes extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("vertx-websocket:localhost:8084/order-received")
                .log("WebSocket client connected with message: ${body}")
                .to("seda:websocketInbound");

        from("kafka:test?"
                + "brokers=pkc-p11xm.us-east-1.aws.confluent.cloud:9092"
                + "&securityProtocol=SASL_SSL"
                + "&saslMechanism=PLAIN"
                + "&saslJaasConfig=org.apache.kafka.common.security.plain.PlainLoginModule required username=\"{{kafka.secret_id}}\" password=\"{{kafka.secret}}\"%3B")
                .log("Received Test Data: ${body}");

        from("kafka:orders?"
                + "brokers=pkc-p11xm.us-east-1.aws.confluent.cloud:9092"
                + "&securityProtocol=SASL_SSL"
                + "&saslMechanism=PLAIN"
                + "&saslJaasConfig=org.apache.kafka.common.security.plain.PlainLoginModule required username=\"{{kafka.secret_id}}\" password=\"{{kafka.secret}}\"%3B")
                .log("Received Order Approved: ${body}")
                .to("vertx-websocket:localhost:8084/order-received?sendToAll=true");
    }
}