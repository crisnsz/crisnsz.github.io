---
title: Homelab
summary: A single-node Proxmox homelab managed as code, with k3s, ArgoCD GitOps and Terraform-managed edge.
problem: I wanted a realistic place to practice infrastructure work end to end, where every change is reproducible from Git and every outage ends in a written lesson instead of a one-off fix.
stack:
  - Proxmox
  - k3s
  - ArgoCD
  - Terraform
  - Ansible
  - Sealed Secrets
  - Cloudflare
  - Tailscale
repo: https://github.com/crisnsz/homelab
order: 1
featured: true
---

## Solution

A homelab built around a single Proxmox node and managed as code. Ansible provisions the host, the foundation LXCs (AdGuard Home, step-ca, Tailscale) and a k3s cluster. ArgoCD reconciles the applications from Git using an app-of-apps layout, and Terraform manages the Cloudflare and Tailscale edge. A second, independent kubeadm lab is used to practice infrastructure and GitOps patterns.

- **GitOps:** ArgoCD app-of-apps, with secrets committed as Sealed Secrets.
- **Edge and access:** public apps go through a Cloudflare Tunnel with no inbound ports and sit behind Cloudflare Access; private access goes through a Tailscale subnet router with split DNS.
- **TLS:** Let's Encrypt (DNS-01) for anything outside my control, an internal step-ca for the rest, and TLS verification is never turned off to make either work.
- **Apps:** Vaultwarden, Pocket-ID (OIDC with passkeys) and Stalwart (mail).
- **Quality:** gitleaks, pre-commit, yamllint and ansible-lint, terraform fmt and validate.

## Decisions and incidents

The repository keeps architecture decision records and blameless incident write-ups next to the code:

- [ADR-0002: Abandon Cilium as the CNI](https://github.com/crisnsz/homelab/blob/main/docs/adr/ADR-0002-abandon-cilium.md), a decision that followed a full cluster outage.
- [LAN outage after power cuts](https://github.com/crisnsz/homelab/blob/main/docs/forward-chain-incident.md), where the root cause had to be reopened after an audit.
- [TLS certificates](https://github.com/crisnsz/homelab/blob/main/docs/certificates.md), on when to use a public CA and when an internal one.

## Note

The public repository is a curated showcase. All values in it (domain, IPs, IDs, emails) are placeholders, so it is meant to be read, not applied as-is.
