package com.ronaldjro.dev.comm321lab5.routes;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class IntegrationRoutesBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("rest:post:publish?consumes=application/json;inType=TestMessage.class")
                .setExchangePattern("InOnly")
                .to("seda:asyncProcessing")
                .setBody(constant("Accepted"));

        from("seda:asyncProcessing")
                .log("Publish Message to Kafka: ${body}")
                .to("kafka:test?"
                        + "brokers=pkc-p11xm.us-east-1.aws.confluent.cloud:9092"
                        + "&securityProtocol=SASL_SSL"
                        + "&saslMechanism=PLAIN"
                        + "&saslJaasConfig=org.apache.kafka.common.security.plain.PlainLoginModule required username=\"{{kafka.secret_id}}\" password=\"{{kafka.secret}}\"%3B");

    }

}
