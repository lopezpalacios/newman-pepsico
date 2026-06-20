# newman-pepsico — GEPP Solar + BESS Energy Solution (PPA / EPC Prefeasibility)

Commercial and financial model for a **distributed solar PV + battery storage (BESS)** program
across six GEPP (PepsiCo's Mexican bottler — *Grupo Gepp / Pepsi Bottling Mexico*) sites,
structured under both a **Power Purchase Agreement (PPA) / shared-savings** path and a
**direct-purchase (EPC turnkey)** path.

Figures are **pre-VAT** (IVA is creditable for GEPP), **prefeasibility grade**, and produced
by a deterministic savings engine driven by live, editable assumptions.

> **Roles reflected in this analysis:** business analyst / commercial structuring lead for the
> PPA, EPC advisor for the six sites, and the CFE-tariff (utility) perspective that sets the
> baseline cost of energy and its escalation.

---

## Files

| File | What it is |
|------|------------|
| `GEPP-Solucion-Energetica-v4-Proplasa-techo-3.15MW.xlsx` | Full live model — assumptions, executive summary, one tab per site, commercial comparison, 20-year projection |
| `resumen-gepp.xlsx` | One-page portfolio summary table (per-site sizing, tariffs, IRR, savings) |

### Workbook tabs (main model)
`Supuestos` (assumptions) · `Resumen Ejecutivo` (executive summary) ·
`Ixtlahuacán` · `Acapulco` · `Cancún` · `Proplasa PR1` · `Proplasa PR2` · `Proplasa Tapas`
(per-site cashflows) · `Comparativo Comercial` (Buy vs PPA) · `Proyección 20 años` (20-yr portfolio).

---

## Scenario

**Proplasa rooftop capped at 3.15 MW** (PR1 + PR2 + Tapas) due to physical roof space,
versus 10.51 MW unconstrained. All downstream tabs recalc live off the blue cells in `Supuestos`.

---

## Portfolio at a glance (Year 1, pre-VAT)

| Metric | Value |
|--------|------:|
| Current electricity spend 2025 (CFE + self-supply) | **$294.6 M MXN** |
| Spend at full CFE tariff (no self-supply) | $316.2 M MXN |
| Self-supply savings today (Tala + ENEL) — **expires 2032** | ~$21.6 M MXN/yr |
| Installed solar PV (portfolio) | **~14.9 MWp** seed / **7.6 MWp** capped Proplasa case |
| BESS energy (portfolio) | **6,860 kWh** |
| Solar generation | ~13.1 GWh/yr |
| Project savings (PV + BESS + power-factor) Year 1 | **$41.4 M MXN** (~14% of current spend) |
| Total investment (Buy path) | **$134.7 M MXN** |
| GEPP benefit Year 1 (Buy) | **$36.8 M MXN** |
| Client benefit Year 1 (PPA) | **$15.0 M MXN** |

---

## Per-site recommendation

| Site | Consumption (GWh/yr) | Solution | LSE regime | Buy IRR | PPA $/kWh | PPA benefit Yr1 |
|------|---:|---|---|---:|---:|---:|
| **Ixtlahuacán** | 22.2 | PV 2.5 MWp + BESS 850 kW | Self-consumption (CNE) | 31% | 1.56 | $3.57 M |
| **Acapulco** | 8.9 | Power-factor + PV 1.0 MWp + BESS 320 kW | Self-consumption (CNE) | 43% | 1.58 | $3.35 M |
| **Cancún** | 4.8 | Power-factor + PV 0.7 MWp (no BESS) | Exempt < 0.7 MW | 44% | 1.68 | $2.46 M |
| **Proplasa PR1** | 16.3 | PV 0.56 MWp + BESS 360 kW | Self-consumption (CNE) | 29% | 1.59 | $1.25 M |
| **Proplasa PR2** | 45.7 | PV 1.57 MWp + BESS 1.22 MW | Self-consumption (CNE) | 29% | 1.61 | $2.75 M |
| **Proplasa Tapas** | 30.0 | PV 1.03 MWp + BESS 790 kW | Self-consumption (CNE) | 29% | 1.61 | $1.61 M |
| **PORTFOLIO** | **127.9** | — | — | 28–44% | — | **$15.0 M** |

---

## Commercial structures compared

**1. Buy (EPC turnkey).** GEPP funds CAPEX (~$134.7 M MXN), keeps 100% of savings.
Project IRR **28–44%**, above cost of capital — *maximizes GEPP value*. Recommended where
balance sheet allows.

**2. PPA / shared-savings.** Zero CAPEX, zero asset risk for GEPP. A financier funds the
asset at a seed **18% financier IRR** (negotiable to 14%, which raises client benefit).
PV transfers to GEPP at the end of the 15-year PPA term; BESS shared-savings runs 20 years.

> Seed PPA tariffs ($1.52–$1.68 /kWh) are solved to clear an 18% financier IRR at a 15-year
> term. Lowering the financier IRR or extending the term shifts value to GEPP.

---

## The 2032 self-supply cliff (why act now)

In 2025 GEPP paid **$294.6 M** (CFE + legacy *autoabasto* via Tala / ENEL). At full CFE
tariff that bill would be **$316.2 M** — self-supply saves ~$21.6 M/yr **but those contracts
expire in 2032** (ENEL already collapsed in 2026, putting Proplasa at ~85% CFE, so much of the
step-up has already hit). Owned PV + BESS **replaces that expiring discount with self-generation
that does not expire** and grows more valuable as CFE tariffs escalate.

---

## Key assumptions (editable in `Supuestos`)

| Parameter | Value |
|-----------|------:|
| EPC PV (turnkey) | 0.75 USD/Wp |
| EPC BESS (LFP installed) | 280 USD/kWh |
| FX | 17.55 MXN/USD |
| WACC / discount rate | 12% |
| CFE tariff escalation | 6%/yr |
| PPA escalation | 5%/yr (below CFE → widening gap for client) |
| BESS availability | 75% |
| PV degradation | 1%/yr (TOPCon/HJT) · BESS 1%/yr (LFP) |
| BESS DoD / round-trip eff. | 96% / 96% |
| Load-factor threshold (A/158/2024) | 0.57 |
| Target financier IRR | 18% (negotiable 14–18%) |
| Horizon | 20 yrs · Default PPA term 15 yrs · Start 2026 · Self-supply expiry 2032 |

---

## 20-year portfolio outcome (cumulative, pre-VAT)

- **Buy path** cumulative cash benefit: **~$1.26 Bn MXN**
- **Client PPA** cumulative benefit: **~$783 M MXN**

The gap between the two repays the financier's deployed capital. After the PPA term the PV
asset passes to GEPP and the full savings accrue to the client.

---

## Bottom line

Both structures are economic. **Buy maximizes GEPP value (IRR 28–44%)**; **PPA / shared-savings
delivers immediate savings with zero CAPEX or risk**. Either way, owned solar + BESS hedges the
2032 self-supply cliff and the 6%/yr CFE escalation with a non-expiring, depreciating-cost asset.

*Prefeasibility grade — not a binding offer. All figures recalc live from `Supuestos`.*
