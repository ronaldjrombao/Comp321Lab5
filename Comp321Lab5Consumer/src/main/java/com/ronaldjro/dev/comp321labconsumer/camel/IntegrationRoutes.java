package com.ronaldjro.dev.comp321labconsumer.camel;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class IntegrationRoutes extends RouteBuilder {

    @Override
    public void configure() throws Exception {
                from("kafka:test?"
                        + "brokers=pkc-p11xm.us-east-1.aws.confluent.cloud:9092"
                        + "&securityProtocol=SASL_SSL"
                        + "&saslMechanism=PLAIN"
                        + "&saslJaasConfig=org.apache.kafka.common.security.plain.PlainLoginModule required username=\"{{kafka.secret_id}}\" password=\"{{kafka.secret}}\"%3B")
                    .log("Received data: ${body}");

    }

}
