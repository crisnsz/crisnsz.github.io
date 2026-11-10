---
title: orderflow
summary: An event-driven order flow in Go with an orchestrated saga, transactional outbox, exponential retries and end-to-end tracing.
problem: In an order flow, stock, invoicing and payment live in different services, so a failure halfway through can leave stock reserved or a card charged for an order that never completes, and nobody can see where the order got stuck.
stack:
  - Go
  - gRPC
  - RabbitMQ
  - PostgreSQL
  - OpenTelemetry
  - Jaeger
  - Server-Sent Events
  - Docker Compose
  - Testcontainers
repo: https://github.com/crisnsz/orderflow
order: 1
featured: true
---

## Solution

Six Go services with a hexagonal layout and one package per use case. The browser places an order and follows it live, through stock reservation, invoicing, automatic card payment and notifications, or through compensation when a step fails.

- **Orchestrated saga:** the orders service drives the flow and compensates when a step fails, releasing the reserved stock and cancelling the order.
- **Transactional outbox and inbox:** each state change and its event are written in the same database transaction, and consumers skip events they already processed.
- **Retries and dead letters:** RabbitMQ 4.3 quorum queues with native delayed retry and exponential backoff, one queue and one dead-letter queue per consumer.
- **Resilience:** services survive a broker outage and out-of-order saga events, covered by integration tests that restart RabbitMQ.
- **Observability:** OpenTelemetry traces across HTTP, gRPC and the broker, visible in Jaeger, plus structured logs.

## Decisions

The repository keeps [architecture decision records](https://github.com/crisnsz/orderflow/blob/main/DECISIONS.md) for every trade-off, and a [start-here guide](https://github.com/crisnsz/orderflow/blob/main/docs/start-here.md) that walks through the demo.

## Note

It is a public showcase. The bank, the login and the email, SMS and push channels are simulated; the database transactions, the broker, the saga, the retries and the tracing are real.
