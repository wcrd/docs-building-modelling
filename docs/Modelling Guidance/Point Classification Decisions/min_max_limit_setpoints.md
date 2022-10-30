---
sidebar_label: Min/Max Setpoint vs. Limit vs. Aggregations
---


# Aggregations (Min/Max) and Limits

Description: Note on modelling rules
Status: Done
Type: Internal Guidance

---

# Overview

Some confusion exists around the naming of points that deal with setpoint ranges, and with points that deal with aggregation of other points.

It is the aim of this note to set the Switch approach for these two concepts.

# Review of modelling systems

The various modelling ontologies and taxonomies add to this confusion as they all take a different approach to this task.

- **Brick**: Uses Limit, Min/Max, Occupied/Unoccupied without much regard and interchangeably.
- **Google:** The most clearly defined approach. Setpoint min/maxs (ranges) are denoted using ‘limit’. Avg/Min/Max are reserved for spatial aggregation; they can be used for temporal aggregation by adding a modifier tag to the aggregation.
    
    > • **Limit vs. Max**: Designate boundary conditions with `limit` instead of `max`, which is reserved for aggregation. For example, suppose a supply temperature setpoint resets between a high and low value: the fields should be `high_limit_supply_air_temperature_setpoint` and `low_limit_supply_air_temperature_setpoint`; `max_supply_air_temperature_setpoint` and `min_supply_air_temperature_setpoint` imply aggregations across several different instances of `supply_air_temperature_setpoint`.
    > 
- **Haystack**: Only provides min/max/occ/unocc tags. Does not provide a method for separation of these concepts.

# Issue Summary

There are three categories of point that share overlapping terminology:

1. **Setpoint ranges**: the boundary conditions for a sensor. i.e. resetting between a high (max) and low (min) temperature.
2. **Setpoint limits:** internal controller parameters that limit the range of values that a setpoint point can be set to. i.e. what the the range of numbers that a high (max) temperature setpoint is allowed to be when an operator sets it on the BMS.
3. **Aggregation points:** points that represent a spatial or temporal aggregation of other points. e.g. the Max Temperature from these 3 temperature points; or the Max Daily Temperature for this given temperature point.
    1. Note: Need to propose a way to indicate this using Brick; I think this is a good use of properties. Need to include:
        1. Type of Aggregation: Spatial | Temporal
        2. (if temporal) Aggregation Period: \<timeperiod of aggregation\>
        3. Source points: references to the points that this aggregation point operates on

The core of the issue is the shared usage of ‘min/max’ to denote aggregation and limitations on range. For the sake of modelling clarity these need to be easily differentiable.

In the next section we will define the language we are going to use to differentiate these.

# Proposed Strategy

We will utilise the Google method of modelling these, modified to fit into the Brick Schema ontology. 

Each of the three point types is detailed below.

## Setpoint Ranges

:::info
💡 Utilise the `limit` keyword in a **`Setpoint`** class to denote boundaries.
:::

This will be used for all (traditionally named) min/max setpoints moving forward. 

**Some examples:**

| Traditional Name (as found on BMS) | New Name | Description |
| --- | --- | --- |
| Max Zone Air Temperature Setpoint | Zone Air Temperature High Limit Setpoint | The maximum temperature a controller will allow the zone to be (excl. offsets/adjusts) before cooling begins. |
| Min Zone Air Temperature Setpoint | Zone Air Temperature Low Limit Setpoint | The minimum temperature a controller will allow the zone to be (excl. offsets/adjusts) before heating begins. |
| Max Occupied Zone Air Temperature Setpoint | Zone Air Temperature Occupied High Limit Setpoint |  |
| Min Standby Zone Air Temperature Setpoint | Zone Air Temperature Standby Low Limit Setpoint |  |
| Zone Air Temperature Heating Setpoint | Zone Air Temperature Low Limit Setpoint <br />or<br />Zone Air Temperature Heating Setpoint | Either are acceptable here; just showing that this alternate naming exists. |

***Heating/Cooling vs. High/Low***

These terms are equivalent from the perspective of HVAC zone control modelling. Due to the pervasiveness (and simplicity) of the heating/cooling terms both are also accepted as equivalents to the high/low terminology.

***Note on ‘term’ positioning within class names***

The exact positioning of the term ‘high limit’ (for example) within the class name is not important. Further discussion to be had on preferred order. The only restriction is that the term comes before the point type designator (’Setpoint’), which in Brick is always at the end of the class name. 

## Setpoint Limits

Setpoint limits are internal controller parameters that limit what can be set when configuring controller variables. These points are rarely exposed (in our experience) and currently are ***not*** utilised in our analytics offerings.

:::info
💡 Utilise the `limit` keyword in a **`Parameter`** class to denote boundaries.
:::

Note that Brick regularly drops the ***Parameter*** class keyword from the classes defined under this type *(It is our preference that this is maintained for the purposes of consistency with the rest of Brick, however this is an issue we need the Brick maintainers to resolve; there is no impact on functionality).*

The general convention for setting a ***Limit Parameter*** on a point is to list the full point class, followed by the limit type being set: **`{point_class}{limit_type} Limit Parameter`**

***limit_types***

The ***limit_type*** will be either: `High` or `Low`

A setpoint will generally have a parameter for both a high and low limit.

**Some examples:**
***Note:*** The class keyword ***Parameter*** has be put in parenthesis as the Brick Schema drops these from the class names for these points (they are implied).

| Point to set parameter on | Parameter point | Description |
| --- | --- | --- |
| Zone Air Temperature Setpoint | Zone Air Temperature Setpoint High Limit (Parameter) |  |
| Zone Air Temperature Setpoint | Zone Air Temperature Setpoint Low Limit (Parameter) |  |
| Zone Air Temperature Occupied Setpoint | Zone Air Temperature Occupied Setpoint High Limit (Parameter) |  |
| Zone Air Temperature Cooling Setpoint | Zone Air Temperature Cooling Setpoint Low Limit (Parameter) |  |
| Zone Air Temperature Low Limit Setpoint | Zone Air Temperature Low Limit Setpoint Low Limit (Parameter) | this is ugly; but unlikely. Generally we would have a single pair of high/low limit parameters for all ‘ZAT’ setpoints. |

## Aggregated Points

Aggregation is represented by the addition of an aggregation operator at the beginning of a point class.

:::info
💡 Utilise the `Avg`, `Min`, `Max` keywords preceding a **`Sensor`**, **`Setpoint`**, **`Status`** class to denote an aggregated point.
:::

We will utilise an additional Brick concept called ‘entity properties’ to capture detailed information on the nature of the aggregation; if this additional information is not provided it is assumed that the aggregation is spatial.

:::info
💡 By default, it is assumed that the aggregation is spatial; that is, it aggregates over a number of points.
:::

**Some examples:**

***Spatial aggregation***:

| Point | Description |
| --- | --- |
| Max Zone Air Temperature Sensor | The maximum Zone Air Temperature reading over a number of sensors for the given timestamp. The sensors aggregated across can be captured as part of the entity properties, but are not required. |

```python
## RDF defition including 'entity properties'
:example_sensor   a   brick:Max_Zone_Air_Temperature_Sensor ;
    brick:aggregate [
        brick:aggregationType        "spatial" ;
        brick:aggregationFunction    "max" ;  # this is given by the prefix on the class
        brick:aggregationTargets    :example_sensor_A, :example_sensor_B, :example_sensor_C;
    ] ;
```

***Temporal*** ***aggregation***:

| Point | Description |
| --- | --- |
| Max Zone Air Temperature Sensor | The maximum Zone Air Temperature reading over a period of time trailing the current timestamp. |

```python
## RDF defition including 'entity properties'
:example_sensor   a   brick:Max_Zone_Air_Temperature_Sensor ;
    brick:aggregate [
        brick:aggregationType        "temporal" ;
        brick:aggregationFunction    "max" ; # this is given by the prefix on the class
        brick:aggregationInterval    "RPT1H" ;  # A 1 hour window
    ] ;
```

# Conclusion

**Setpoint ranges**

- Use High or Low Limit Setpoints

**Aggregations**: 

- Use Avg/Min/Max and provide the time period for aggregation if required.
- Default assumption is spatial aggregation across sensors.

**Setpoint internal controller limits**

- Use High or Low Limit Parameters