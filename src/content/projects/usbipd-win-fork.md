---
title: usbipd-win fork
summary: A fork of usbipd-win that lets non-admin Windows users bind USB devices through a service and named-pipe IPC.
problem: On a machine without local admin rights, such as a managed work laptop, every usbipd bind or unbind needs an elevated terminal and an admin prompt.
stack:
  - C#
  - .NET
  - WiX
  - Windows services
  - Named pipes
repo: https://github.com/crisnsz/usbipd-win
order: 2
featured: true
status: Fork of dorssel/usbipd-win
---

## Solution

The fork applies the same model Docker Desktop uses with its `docker-users` group: a privileged service does the elevated work, and the CLI talks to it over a named pipe.

- **Privilege separation:** the elevated `usbipd` service performs the privileged operations. The CLI sends requests over the `usbipd-bind` named pipe instead of needing elevation itself.
- **Group-based authorization:** the service checks the caller's Windows token. Only members of `Administrators` or the local `usbipd-users` group are accepted; anyone else is rejected and logged. The MSI installer creates the group empty, and an administrator adds users once.
- **Allowlisted commands:** the pipe accepts only `Bind`, `Unbind` and `UnbindAll`.
- **Pipe hardening:** a maximum string length (20 KiB), a request read timeout (50 s) and a cap on concurrent pipe instances limit malformed or slow clients.
- **MSI install:** release automation builds MSI packages for x64 and ARM64, with checksums.
- **Stability fix:** devices disconnected under heavy USB traffic. Testing versions one by one traced it to the device I/O code, which I reverted to the v5.3.0 implementation.

## Known gap

`bind --force` currently passes through the pipe. I am listing it here rather than hiding it, because it matters for anyone judging the security model.

## Context

The request was discussed upstream in dorssel/usbipd-win#1315. The maintainer declined a service and IPC redesign because a dedicated driver is planned, so this fork implements that redesign on its own. My use case is opening untrusted cloned repositories inside a WSL distro while still passing USB devices through.
