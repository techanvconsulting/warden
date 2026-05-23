---
title: home
global:
  - header: {}
    footer:
      logo: /cms/svg/p.svg
      topLeftLinks:
        label: Product
        links:
          - link:
              text: Framework
              url: 'https://aidlc-sec.techanv.com/framework.html'
          - link:
              text: Phases
              url: 'https://aidlc-sec.techanv.com/phases.html'
      topRightLinks:
        label: Resources
        links:
          - link:
              text: Tools
              url: 'https://aidlc-sec.techanv.com/tools.html'
          - link:
              text: Threats
              url: 'https://aidlc-sec.techanv.com/threats.html'
          - link:
              text: OWASP LLM Top 10
              url: 'https://aidlc-sec.techanv.com/owasp.html'
          - link:
              text: Contact
              url: 'mailto:info@techanv.com'
      bottomLinks:
        label: Connect
        links:
          - link:
              text: Techanv
              url: 'https://techanv.com'
          - link:
              text: AIDLC-Sec
              url: 'https://aidlc-sec.techanv.com'
          - link:
              text: Github
              url: 'https://github.com/techanvconsulting/warden'
    _template: navigation
  - title: WARDEN X TECHANV
    description: >-
      Security-first AI-led SDLC platform. Bake security into every phase of
      AI development as a blocking constraint — 12 rules, a 7-tool CI pipeline,
      and human-in-the-loop gates.
    keywords:
      - AI security
      - DevSecOps
      - SDLC
      - AI agents
    image: /cms/OG.png
    _template: metadata
sections:
  - header:
      rowOne: The Agent OS
      rowTwo: for Secure
      rowThree: AI
      rowFour: Development
    bodyLeft: '12 blocking rules. 7-tool CI pipeline. Human-in-the-loop gates.'
    bodyRight: >-
      Warden bakes security into every phase of AI-led development as a blocking
      constraint — not a post-hoc checklist.
    banner:
      icon: /images/logomark.webp
      marquee:
        textEntry:
          - Security as a blocking constraint, not a checklist.
      cta:
        text: Explore Framework
        url: 'https://aidlc-sec.techanv.com/'
    _template: hero
  - header:
      rowOne: Security
      rowTwo: Baked Into
      rowThree: Every
      rowFour: Phase
    body: >
      Warden installs security into AI coding agents — **Claude Code, Amazon Q,
      GitHub Copilot, Cursor** — as a blocking constraint, enforced before any
      code is written.
    cardsSectionTitle: The Threat Landscape
    cards:
      - title: AI code with vulnerabilities
        number: 45%
      - title: Prompt-injection success rate
        number: 84%
      - title: Hardcoded secrets in public commits
        number: 28.6M
      - title: Blocking security rules
        number: '12'
    _template: stats
  - sectionTitle: How It Works
    cards:
      - header: Inception
        subHeader: Phase 1 — Plan & Threat Model
        text: >-
          Threat modeling and architecture review happen before any code is
          generated. Design flaws are caught early, so they never propagate into
          the build.
        illustration: /cms/svg/tls.svg
      - header: Construction
        subHeader: Phase 2 — Code & Review
        text: >-
          Every change runs the 7-tool CI pipeline — gitleaks, semgrep, grype,
          checkov and more. A failing SECURITY-XX rule blocks the merge until a
          human reviews the gate.
        illustration: /cms/svg/mpc.svg
      - header: Operations
        subHeader: Phase 3 — Deploy & Monitor
        text: >-
          Deploy, audit, and alert. Every AI decision, scan result, and human
          approval is recorded in an immutable audit trail for compliance.
        illustration: /cms/svg/zkp.svg
    _template: howItWorks
  - sectionTitle: Approach
    cards:
      - title: 12 Blocking Rules
        illustration: /cms/svg/transgate.svg
        description: >
          Twelve non-negotiable **SECURITY-XX** rules. Each is a hard gate — a
          violation halts all progress and escalates straight to human review.
          No "fix later".
        cta:
          text: View the Rules
          url: 'https://aidlc-sec.techanv.com/framework.html'
      - title: 7-Tool CI Pipeline
        illustration: /cms/svg/proof.svg
        description: >
          **gitleaks, semgrep, grype, checkov** and more run on every change.
          Secret detection, SAST, dependency and IaC scanning — all blocking,
          all automated.
      - title: Human-in-the-Loop
        illustration: /cms/svg/template.svg
        description: >
          At every phase boundary the only options are **Request Changes** or
          **Approve & Continue**. The agent cannot self-approve or bypass a
          review. No third option exists.
    _template: approach
  - sectionTitle: Tenets
    cards:
      - title: Security as a Blocking Constraint
        body: Violations halt all progress. Each of the 12 rules is a hard gate.
      - title: Human-in-the-Loop
        body: AI cannot self-approve or bypass reviews at any phase boundary.
      - title: Design Before Code
        body: Threat modeling and architecture review before any code is generated.
      - title: Overconfidence Prevention
        body: >-
          Agents must ask for clarification rather than hallucinate
          implementations.
      - title: Immutable Audit Trail
        body: >-
          Every decision, scan, and approval is recorded — SOC2, ISO 27001 and
          EU AI Act ready.
    _template: features
  - sectionTitle: Use Cases
    cards:
      - title: Enterprise AI Adoption
        header: Enterprise AI Adoption
        illustration: /cms/svg/Frame 1073715487.svg
        body: >-
          Roll AI coding agents out across teams with security gates enforced at
          the agent-instruction level — before any code is written.
      - title: Compliance-Ready Development
        header: Compliance-Ready Development
        illustration: /cms/svg/Frame 1073715487(1).svg
        body: >-
          Generate an immutable audit trail mapped to OWASP LLM Top 10, NIST AI
          RMF and the EU AI Act — ready for SOC2 and ISO 27001 evidence.
      - title: Secure Vibe-Coding
        header: Secure Vibe-Coding
        illustration: /cms/svg/Healthcare zk-data Marketplace svg.svg
        body: >-
          Let developers move fast with AI while insecure code is blocked before
          it can merge. Speed without the security debt.
      - title: Supply-Chain Defense
        header: Supply-Chain Defense
        illustration: /cms/svg/djm.svg
        body: >-
          Catch hallucinated packages, vulnerable dependencies and hardcoded
          secrets in CI — before they ever ship to production.
      - title: Agent Governance
        header: Agent Governance
        illustration: /cms/svg/Insurance Claims.svg
        body: >-
          Enforce phase gates and human approval consistently across Claude
          Code, GitHub Copilot, Cursor and Amazon Q Developer.
    cta:
      text: Read the Framework
      url: 'https://aidlc-sec.techanv.com/'
    _template: useCases
  - header:
      rowOne: Here
      rowTwo: To Answer
      rowThree: Your Questions
    contactCTA:
      text: Contact
      url: 'mailto:info@techanv.com'
    _template: contact
---
