---
sidebar_label: Datatypes
title: Datatypes
sidebar_position: 1
---

The form of the analytics functions is dependent on the datatype of the points used. The core types (there may be others) are:
* **Numeric**
  * *BACnet*: AI, AO, AV
* **Boolean**
  * *BACnet*: BI, BO, BV
* **Enumeration**
  * *BACnet*: MI, MO, MV

The table below is a model style agnostic overview of how different point types should be used in analytic rules. Depending on the classification system used in the model the analytics engine needs to be able to identify the point types and apply the appropriate rule form.

## Generic analytics formats for point type combinations

||||s||
|---|---|---|---|---|
||   | ***Sensor (Analog)*** | ***Status (Mode\|ENUM)*** | ***Status (Binary)*** |
|| ***Command (Analog)*** | abs(c - s) > threshold | c < threshold && categoryOf( enum[s] ) == ACTIVE <br/> \|\| <br/> c >0 \|\| threshold && categoryOf( enum[s] ) != ACTIVE | c > threshold && !s |
|**c**| ***Command (Mode\|ENUM)*** | categoryOf( enum[c] ) == ACTIVE && s < threshold <br/> \|\| <br/> categoryOf( enum[c] ) != ACTIVE && s > 0 \|\| threshold | enum[c] != enum[s] <br/> \|\| <br/> categoryOf( enum[c] ) != categoryOf( enum[s] ) | categoryOf( enum[c] ) == ACTIVE && !s |
|| ***Command (Binary)*** | c && s < threshold <br/> \|\| <br/> !c && s > 0 \|\| threshold | !c && categoryOf( enum[s] ) == ACTIVE | c != s |