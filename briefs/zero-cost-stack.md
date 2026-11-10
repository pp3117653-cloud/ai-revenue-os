# Zero-cost-first stack

The dashboard and task control plane use GitHub Issues, GitHub Actions, GitHub Pages, and static HTML/CSS/JavaScript. These are the first choices because they can operate without Make or Zapier subscriptions.

## Selected GitHub projects

| Need | Repository | Why it is included | Cost caveat |
|---|---|---|---|
| General workflow automation | [Activepieces](https://github.com/activepieces/activepieces) | Self-hostable automation platform with a large connector ecosystem. | Self-hosting still needs a machine; verify its current license and commercial terms before reselling it.
| Event and flow automation | [Node-RED](https://github.com/node-red/node-red) | Mature low-code flow editor suitable for webhooks and local integrations. | Self-hosting still needs a machine and secure ingress.
| Workflow orchestration | [Kestra](https://github.com/kestra-io/kestra) | Useful for scheduled, auditable, multi-step jobs. | Self-hosting requires runtime resources; enterprise features may differ.
| Lightweight event agents | [Huginn](https://github.com/huginn/huginn) | Useful for feed, webhook, and event monitoring. | Requires careful privacy and rate-limit configuration.
| Workflow reference only | [n8n](https://github.com/n8n-io/n8n) | Technically capable and popular for self-hosted workflows. | It uses a fair-code model rather than a simple permissive open-source license; do not assume unrestricted resale or commercial embedding.

## What is installed in this repository

The repository contains the integration manifest, role permissions, workflow templates, and dashboard. The full third-party applications are not copied into this repository because they are large independent applications with separate update and license obligations. Use the links above as the pinned source projects and install only the one needed for a real workflow.

## Recommended order

Start with GitHub Issues + Actions + Pages. Add Node-RED or Activepieces only after a workflow cannot be expressed safely with GitHub-native primitives. Add Kestra when the system needs long-running orchestration. Do not add all engines at once.

## Zero-cost reality

“Free software” does not mean “no infrastructure cost.” GitHub Pages and Actions have plan quotas, public repositories expose code, and self-hosted tools need a computer, storage, backups, and secure credentials. The dashboard therefore defaults to draft mode and never stores secrets in the repository.
