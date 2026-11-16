---
title: SILICOFCM — EU Horizon 2020
category: Research
summary: A computational platform for in silico clinical trials of familial cardiomyopathies — ECG and CPET analysis, statistical modelling, and patient-specific 3D heart models.
order: 19
org: BioIRC
period: 2020 — 2022
link: https://silicofcm.eu/
impact:
  - Trials run computationally where running them on patients is not an option
  - ECG and CPET signal data turned into features the platform could model against
  - Patient-specific heart models — the individual as their own model, not a cohort member
  - Contributed to peer-reviewed research outputs
stack:
  - Python
  - PyTorch
  - Biostatistics
  - Data Analysis
  - ECG
  - CPET
  - In Silico Trials
metrics:
  - label: Programme
    value: EU Horizon 2020
  - label: Domain
    value: Computational cardiology
---

## The problem

Clinical trials for familial cardiomyopathies run into a hard limit: the trials you most
want to run are frequently the ones you cannot ethically or practically run on patients.
That leaves a permanent gap between what is known and what could be known — and it is a
gap computation can partly close, but only if the models are faithful enough to be worth
trusting with a clinical question.

## The approach

SILICOFCM is an EU Horizon 2020 platform for in silico clinical trials — running trials
computationally, on models, where running them on people is not an option. My contribution
covered the signal and modelling side:

- **ECG analysis**, processing cardiac electrical signal data into features the platform
  could actually model against.
- **CPET analysis**, working with cardiopulmonary exercise testing data as a window onto
  cardiac function under load rather than at rest.
- **Statistical modelling and biostatistics** across the biomedical datasets, feeding both
  the platform and the peer-reviewed research built on it.
- **Patient-specific 3D heart modelling**, the component that makes a simulated trial
  specific to an individual instead of generic to a population.

## The outcome

Work that fed the platform itself and the publications around it, aimed at making
personalized cardiac medicine tractable — treating a patient as their own model rather
than as a member of a cohort whose average they may not resemble.

[Project site →](https://silicofcm.eu/)
