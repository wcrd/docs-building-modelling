---
sidebar_label: Location Shapes
title: Location Shapes
sidebar_position: 2
---
import DocCardList from '@theme/DocCardList';

# General Location rules

## Composition

### Brick
1. A location can only be composed of other locations.
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        classOrSubClassOf: brick:Location
    ]
    ```

## Relationships

### Brick
1. A location cannot *own* a point. A point must always also be a point of a `brick:Equipment`.
    > Points are a virtual concept and always belonging to a physical device, represented by Equipment. Thus, it cannot have a Location alone.
    >
    > — Brick

    This rule is defined as part of the Point validation rules. See here for more.

### Switch
1. A location should only be part of at most one location (excluding Zones; see technical note on Zones). <br/>We consider a location a real, physically defined space and it cannot be located in more than one other real space. Think about offices in rooms in spaces on floors in buildings. Think about it like nesting-dolls. <br />
    ```
    path: brick:isPartOf
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: qualifiedValuesOfProperties
    properties: [
        classOrSubClassOf: brick:Location
        !classOrSubClassOf: brick:Zone          // this is a special requirement due to nesting of Zones in Locations
    ]
    qualifiers: [
        max-count: 1
    ]
    ```
    :::info
    If you want to model a collection of spaces for some purpose (use-case, hvac, lighting, energy, tenant spaces, etc) use a `brick:Zone`.
    :::


## Points






---

<DocCardList />