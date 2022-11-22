---
sidebar_label: Point Datatypes
title: Point Datatypes
---

Brick does not provide explicit separation of the point classes by datatype. This poses a problem for visualisation, analytics, and other downstream uses. It is therefore necessary to explicitly state the datatype expected for a particular point.

:::note
There is particular ambiguity around the definition of `command` points. See here for more detail: [Command: ENUM vs Analog](<./docs/Modelling Guidance/3. Point Classification Decisions/command_analog_vs_enum.mdx>)
:::

## Overview
Summary of datatypes per point class/sub-class.

| Point Type | Datatype | Detail | Other Allowable Datatypes |
| --- | --- | --- | --- |
| Status | `Boolean` | *default* | `Boolean`, `Complex` |
| ↳ *Mode Status* | `EnumeratedValue` | *default* | `EnumeratedValue` |
| Sensor | `Numeric` | *default* | `Numeric`, `Complex` |
| Setpoint | `Numeric` | *default* | `Numeric`, `Complex` |
| Command | `Numeric` OR `Boolean` | manual | `Numeric`, `Boolean`, `Complex` |
| ↳ *Mode Command* | `EnumeratedValue` | *default* | `EnumeratedValue` |
---

## Detail
### Standard Datatypes
For the following point types, the datatype defaults to:
* **Status** <br/>
  *datatype* = `Boolean`
* **Sensor** <br/>
  *datatype* = `Numeric`
* **Setpoint** <br/>
  *datatype* = `Numeric`

For the following sub-types, the datatype will default to:
* **Mode Status** <br/>
  *datatype* = `EnumeratedValue`
* **Mode Command** <br/>
  *datatype* = `EnumeratedValue`

It is possible to manually set or override the default datatype for each point; however this should not be a regular requirement. The list of available datatypes is restricted by point class.

The following point types ***always*** require manual selection of their datatype:
* **Command** <br/>
  *datatype* = `Boolean` OR `Numeric`

---
### Complex Datatype
Certain point types and data sources may provide data in a non-standard manner. The `complex` datatype is a flag to indicate this. Processing may vary on a point & source basis.

For example, an `Occupancy Tracking Sensor` point may provide a list of `user_ids` present in the observed zone as its value per observation: 
```
timestamp = 2022-11-20_221045.444Z0
value = [ user_11234, user_54234, user_2224 ]

timestamp = 2022-11-20_221145.137Z0
value = [ user_11234, user_54234 ]

...
```

:::note
The `complex` flag is a placeholder for additional sensor types and datastreams that are currently unknown. It is likely that this concept will be expanded upon in future.
:::

---
## RDF Defintion
We will use the `brick` entity properties concept to capture the datatype and any associated metadata, such as references or definitions for `enumerations`.

```python
:subject a brick:point_class ;
    brick:datatype [
        brick:value qudt:data_type ;
        brick:state qudt:Enumeration ; # This is optional; Only valid for Enumerated and Boolean datatypes
    ] .
```

### Examples

#### Sensor
```python
:point_1 a brick:Position_Sensor ;
    brick:hasUnit unit:Percentage ;
    brick:datatype [
        brick:value qudt:NumericType ;
    ] .
```

#### Status
```python
:point_2 a brick:Position_Status ;
    brick:hasUnit unit:Unitless ;
    brick:datatype [
        brick:value qudt:BooleanType ;
    ] .
```

#### Mode Status
```python
:point_2 a brick:Position_Mode_Status ;
    brick:hasUnit unit:Unitless ;
    brick:datatype [
        brick:value qudt:EnumeratedValue ;
        brick:states :enum_1 ; # where :enum_1 a qudt:Enumeration 
    ] .
```

#### Command
Datatype needs to be manually set.
```python
:point_3 a brick:Position_Command ;
    brick:hasUnit unit:Unitless ;
    brick:datatype [
        brick:value qudt:BooleanType .     # this point is a boolean position: OPEN | CLOSED
        brick:states :bool_1 ;
    ] .

# NEED TO FIGURE OUT HOW TO DEFINE THIS
:bool_1 a qudt:Enumeration ;
    brick:hasStates [
            a qudt:BooleanTypeEnumeratedValue ;
            meta:key 0;
            meta:value "OPEN"
        ] [
            a qudt:BooleanTypeEnumeratedValue ;
            meta:key 1;
            meta:value "CLOSED"
        ]
    ] .
```

```python
:point_4 a brick:Position_Command ;
    brick:hasUnit unit:Percentage ;
    brick:datatype [
        brick:value qudt:NumericType .     # this point is a Numeric position: %
    ]
```

#### Mode Command
```python
:point_5 a brick:Position_Mode_Command ;
    brick:hasUnit unit:Unitless ;
    brick:datatype [
        brick:value qudt:EnumeratedValue .
        brick:states :enum_1 ;                  # reusing the Enumeration definition from point 2
    ] .
```

#### Setpoint
```python
:point_6 a brick:Position_Setpoint ;
    brick:hasUnit unit:Percentage ;
    brick:datatype [
        brick:value qudt:NumericType .     # this point is a Numeric position: %
    ] .
```