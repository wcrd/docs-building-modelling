---
sidebar_label: Entity Paths (Equipment)
sidebar_position: 2
---

# Entity Paths

## Definition

The ***Entity Path*** follows on from the ***Root Parent*** enhancement discussed here: LINK.

:::info
The ***Entity Path*** shows each entity in the steps taken from the current entity to the ***Root Parent*** following the `brick:isPartOf` path and the requirements of the ***Root Entity*** generation.
:::

The entity path itself can show any field from the entities that make up the path; e.g.: Class, Label, Subject, or any other common field present on each entity.
* ***Class Path***: `/AHU/Fan/VFD`
* ***Label Path***: `/AHU.L02.AC94/RAF.01/VFD_722`

Again, this is only applicable for `brick:Equipment` entities in the model, but could be extended to other paths and entity types in the future.

## Issues this solves
The ***Entity Path*** is mainly a UX enhancement that is leveraged to make creating and updating models easier. It is leveraged as an interactive path browser, similar to how the Windows File Explorer path browser works. It simplifies the process of moving, creating, and browsing components of the equipment hierarchy.

## Example
Given the same model from the LINK(***Root Parent***) page the ***Entity Paths*** would be displayed as follows:

| Entity | Entity Path (Class path) |
| ------ | ----------- |
| AHU                   | `/AHU` |
| ↳ Fan                 | `/AHU/Fan` |
| &nbsp; &nbsp; ↳ VFD   | `/AHU/Fan/VFD` |
| ↳ Damper              | `/AHU/Damper` |
| ↳ Hot_Water_Coil      | `/AHU/Hot_Water_Coil` |
| ↳ Chilled_Water_Coil  | `/AHU/Chilled_Water_Coil` |