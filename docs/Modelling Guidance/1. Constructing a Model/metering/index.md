---
sidebar_label: Metering
title: Metering
sidebar_position: 1
---
import DocCardList from '@theme/DocCardList';

import lod_full from '@site/static/img/docs/metering/lod_full.png'
import lod_abs from '@site/static/img/docs/metering/lod_abstracted.png'
import invoice_con from '@site/static/img/docs/metering/invoice_consideration.png'


## Why
Meters allow us to track the usage of some quantity throughout the building. Through a well modelled metering network it is possible to assign energy usage, actual costs, carbon emissions, and more to entities in a building; physical equipment, locations, tenants, etc.

## Model Objective
Our basic requirements from a metering model are:
* Track usage from sources to loads
* Understand metering heirarchies within the building (i.e. meter 1 + meter 2 = meter 3)

This will enable:
* Tracking energy use by reference entities, their locations, and any other relationships that are present in the model
* Validating metering reported energy usage against the 'quantity provider' bill (e.g. a utility company)
* Propogate tariff schedules, live pricing, carbon factors, and other metrics from the 'quantity provider' through to reference entities.

Of course there are other objectives that could be considered to enable other use cases, however they generally come with an exponential increase in modelling work as described in the LOD section below. The payoff of this extra modelling work is not worth it for a basic monitoring or analytics system.

## Types

There are three main types of metering networks to consider in a building:
1. ***Electrical Metering*** <br/>
   Measuring power and energy usage.
2. ***Flow Metering*** <br/>
   Measure the quantity and rate of delivery of some substance; e.g.: gas, water, refrigerant, steam, etc
3. ***Thermal Metering*** <br/>
    Measure the energy delivered by the flow of some substance. Thermal Meters can generally be considered 'flow' meters with some additional sensors and special controller calculations to determine energy from substance quantity.

## Levels of Detail
The relationship of meters to other meters and loads can be complex, as meters operate on the systems of delivery and are not explicitly linked to each other. These systems of delivery (piping, ductwork, circuits) provide too much detail for basic building modelling and as such are generally excluded from the model.

:::note
There are uses for detailed systems of delivery modelling, however they are not described in this guide and the methods for modelling these networks are not covered in detail or validated.
:::

:::important
Each section of this Metering modelling guide will detail the '**abstracted**' method of metering modelling.
:::

An example of a '**full**' vs. '**abstracted**' model is provided below. An electrical metering network is shown in the example, but the same concept applies for flow and thermal meters using 'pipes' or 'ducts' instead of 'circuits'.

### LOD: Full

:::caution
This modelling style is not covered in any of the guidance sections on this website. It is provided for reference only. Even if you choose to model the full distribution network, it is still advised to manually set the relationships detailed in the ***abstracted*** model as there are no standard methods for inferring them from a ***full*** model.
:::

Electrical meters monitor energy over circuits that run between Distribution Boards, other electrical junction equipment, and final loads. An accurate model of an electrical metering set up is provided in the image below.

<img src={lod_full} />

In order to extract the information we are interested in from the Objectives section we need to process this model to infer the sub-metering and load relationships between the meters, circuits, and terminal loads.
While this provides the most 'accurate' representation of site and supports flexible updating of the metering trees (as they are inferred), it is finicky to build and often times hard to come across the electrical network information.
Furthermore, the structure of the electrical distribution network is not of high value for our metering workflows generally; therefore it is much easier to model, manage, and obtain information to just directly model the relationships of interest (the '***abstract***' model).

### LOD: Abstracted
To achieve the objectives listed for the metering model, we only need to capture two relationships:
1. **Submeters**: which meters are submeters of this meter (and vice-versa). <br/>
   `brick:hasSubMeter` & `brick:isSubMeterOf`
2. **Loads**: what non-meter entities are 'supplied' via that meter. <br/>
   `brick:meters` & `brick:isMeteredBy`

This is detailed in each of the metering types documentation sections.

<img src={lod_abs} />

:::tip
The **abstracted** model is the outcome of processing the inferred relationships from the **full** model. If you do not need the detail of the full model, it is better to just model this!
:::

## Considerations

### Invoices
This is not explicitly part of the metering model, however invoicing from utility providers (and other 'quantity providers') goes hand-in-hand with metering.

:::info
Detailed information on modelling and connecting **Invoices** to **Meters** is provided in the LINK Invoices modelling documentation section.
:::

Any `brick:Meter` can be connected to a `switch:InvoiceStream` entity to relate invoices with their underlying metering records. A Utility Invoice is calculated on one or meters, typically.

Depending on the information provided on the Invoice, we can propagate detailed time-based cost and carbon information throughout the building model. See example model below.

<img src={invoice_con} />

Given the model above, we can apportion cost and carbon to any meter in the tree, and any connected loads.

<br/>
<br/>
<br/>


---


<DocCardList />
