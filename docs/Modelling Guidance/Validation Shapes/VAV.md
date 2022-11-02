import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


import VAV_SingleDuct from "@site/static/img/docs/vav/SubParts_VAV-Single_Duct.svg"
import VAV_SingleDuct_ReheatElec from "@site/static/img/docs/vav/SubParts_VAV-Single_Duct_Reheat-Elec.svg"
import VAV_SingleDuct_ReheatHHW from "@site/static/img/docs/vav/SubParts_VAV-Single_Duct_Reheat-HHW.svg"
import VAV_DualDuct from "@site/static/img/docs/vav/SubParts_VAV-Dual_Duct.svg"
import VAV_Fan_Series_ReheatElec from "@site/static/img/docs/vav/SubParts_VAV-Series-Elec.svg"
import VAV_Fan_Series_ReheatHHW from "@site/static/img/docs/vav/SubParts_VAV-Series-HHW.svg"
import VAV_Fan_Parallel_ReheatElec from "@site/static/img/docs/vav/SubParts_VAV-Parallel-Elec.svg"
import VAV_Fan_Parallel_ReheatHHW from "@site/static/img/docs/vav/SubParts_VAV-Parallel-HHW.svg"

import VAV_Bypass from "@site/static/img/docs/vav/SubParts_VAV-Single_Duct.svg"



# VAV

There are a number of variations on a VAV that are found in buildings. A hierarchy of validation is described here, with a minimum set of requirements that every VAV must meet, as well as a series of finer requirement that describe each variation.

This document currently focuses on validating an entity **given** a class. A future operating state would better be an iterative validation and classification scheme, where we first classify something as a base VAV, before iterating down to the finest classification shape it satisfies.

### Variations
* Base VAV (minimum spec)
  * Single Duct
    * Single Duct with Reheat
  * Dual Duct
  * Fan Powered
    * Fan Powered Series
    * Fan Powered Parallel
  * Bypass

#### Diagrams

<details className="details-diagrams">
    <summary className="">Single Duct</summary>
    <div>
        <Tabs>
            <TabItem value="1" label="Single Duct" default>
                <VAV_SingleDuct width="100%"/>
            </TabItem>
            <TabItem value="2" label="Single Duct with Reheat (Elec)" default>
                <VAV_SingleDuct_ReheatElec width="100%"/>
            </TabItem>
            <TabItem value="3" label="Single Duct wth Reheat (HHW)" default>
                <VAV_SingleDuct_ReheatHHW width="100%"/>
            </TabItem>
        </Tabs>
    </div>
</details>
<details className="details-diagrams">
    <summary className="">Dual Duct</summary>
    <div>
        <Tabs>
            <TabItem value="1" label="Dual Duct" default>
                <VAV_DualDuct width="100%"/>
            </TabItem>
        </Tabs>
    </div>
</details>
<details className="details-diagrams">
    <summary className="">Fan Powered</summary>
    <div>
        <Tabs>
            <TabItem value="1" label="Series with Reheat (Elec)" default>
                <VAV_Fan_Series_ReheatElec width="100%"/>
            </TabItem>
            <TabItem value="2" label="Series wth Reheat (HHW)" default>
                <VAV_Fan_Series_ReheatHHW width="100%"/>
            </TabItem>
            <TabItem value="3" label="Parallel with Reheat (Elec)" default>
                <VAV_Fan_Parallel_ReheatElec width="100%"/>
            </TabItem>
            <TabItem value="4" label="Parallel wth Reheat (HHW)" default>
                <VAV_Fan_Parallel_ReheatHHW width="100%"/>
            </TabItem>
        </Tabs>
    </div>
</details>
<details className="details-diagrams">
    <summary className="">Bypass</summary>
    <div>
        <Tabs>
            <TabItem value="1" label="Bypass" default>
                <VAV_Bypass width="100%"/>
            </TabItem>
        </Tabs>
    </div>
</details>

---

## Composition

### Core
#### Base VAV
* VAV must have a damper as a direct part.
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        classOrSubClassOf: brick:Damper
    ]
    ```

#### Single Duct
* Inherits all requirements from Base VAV.

#### Single Duct with Reheat
* Inherits all requirements from Single Duct VAV.
* VAV must have a subclass of Heating Coil (primarily Hot Water Coil or an Electric Heating Coil).
  * *Method 1 - subclass of heating coil*
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        classOrSubClassOf: brick:Heating_Coil
    ]
    ```
  * *Method 2 - explicit coil type*
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        or (
            class: brick:Hot_Water_Coil,
            class: switch:Electric_Heating_Coil
        )
    ]
    ```
* If VAV has Hot Water Coil, it must also have a Hot Water Valve
    THIS IS ON HOLD: We are determining best way to link the Valve to the VAV currently (part or other relationship)
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        classOrSubClassOf: brick:Hot_Water_Valve
    ]
    ```

We can represent this by requiring the VAV to have either:
* Electric Heating Coil
<br />OR
* Hot Water Coil AND Hot Water Valve
  * Could store this as a subshape (Terminal Unit HHW Heating bundle)


**NOTE:** Add class switch:Electric_Heating_Coil

#### Dual Duct
* Inherits all requirements from Base VAV.
* VAV must have 2 dampers as direct parts.
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: qualifiedValuesOfProperties
    properties: [
        classOrSubClassOf: brick:Damper
    ]
    qualifiers: [
        min-count: 2
        max-count: 2
    ]
    ```

#### Fan Powered
* Inherits all requirements from Base VAV.
* VAV must have a Fan as a direct part.
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        classOrSubClassOf: brick:Fan
    ]
    ```
* VAV must have a subclass of Heating Coil (primarily Hot Water Coil or an Electric Heating Coil).
  * See validation steps described in `Single Duct with Reheat`

#### Fan Powered: Series & Parallel
We do not have an explicit method for determining differences.
Technically, we could separate via the fan 'air stream':
* Parallel: Return Fan
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        class: brick:Return_Fan
    ]
    ```
* Series: Discharge Fan
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        class: brick:Discharge_Fan
    ]
    ```



Currently we are just using 'Fan'. We can add this validation soon.

#### Bypass VAV
This is technically the same componentry as the Base VAV. The method for differentiation is the same as for the Series and Parallel boxes - providing a more detailed subclass for the components.
* VAV must have a Bypass Damper
    ```
    path: brick:hasPart
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        class: brick:Bypass_Damper
    ]
    ```

### Switch
Nil


## Relationships

A VAV should be fed by some air distribution network or from major airside equipment (AHU, DOAS, MAU).

This is not currently being validated.

### Core
Nil

### Switch
Nil



## Points

{ Rules around points for each variation; must include at least the following: All, Minimum Set}

### All
An entity of this type is expected to have a selection of points from this provided list. Any points assigned that are not on this list will throw a warning.


| switch:hasPointName                                         | sh:class                                                     |
|-------------------------------------------------------------|--------------------------------------------------------------|
| Run Command                                                 | On_Off_Command                                               |
| Run Status                                                  | On_Off_Status                                                |
| Enable Command                                              | Enable_Command                                               |
| Enable Status                                               | Enable_Status                                                |
| Mode                                                        | Mode_Status                                                  |
| Occupancy Command                                           | Occupancy_Command                                            |
| Occupancy Mode                                              | Occupied_Mode_Status                                         |
| Override Mode                                               | switch:Override_Mode_ Status                                 |
| Out of Service Status                                       | switch:Maintenance_Mode_Enable_Status                        |
| Power Supply Status                                         |                                                              |
| Fault Mode \| Alarm Mode                                    | switch:Fault_Mode_Status                                     |
| Fault Status \| Alarm Status                                | Fault_Status                                                 |
| Discharge Air Temperature                                   | Discharge_Air_Temperature_Sensor                             |
| Discharge Air Temperature Setpoint                          | Discharge_Air_Temperature_Setpoint                           |
| Discharge Air Temperature   High Limit Setpoint             | switch:Discharge_Air_Temperature_High_Limit_Setpoint         |
| Discharge Air Temperature Low   Limit Setpoint              | switch:Discharge_Air_Temperature_Low_Limit_Setpoint          |
| Discharge Air Temperature   Unnoccupied Cooling Setpoint    | switch:Unoccupied Discharge Air Temperature Setpoint         |
| Discharge Air Temperature   Occupied Cooling Setpoint       | switch:Occupied Discharge Air Temperature Setpoint           |
| Discharge Air Temperature   Occupied Heating Setpoint       | switch:Occupied Discharge Air Temperature Heating Setpoint   |
| Discharge Air Temperature   Unnoccupied Heating Setpoint    | switch:Unoccupied Discharge Air Temperature Heating Setpoint |
| Discharge Air Humidity                                      | Discharge_Air_Humidity_Sensor                                |
| Discharge Air Humidity   Setpoint                           | Discharge_Air_Humidity_Setpoint                              |
| Discharge Air Absolute   Humidity                           | switch:Discharge_Air_Absolute_Humidity_Sensor                |
| Discharge Air Pressure                                      | Discharge_Air_Static_Pressure_Sensor                         |
| Discharge Air Pressure   Setpoint                           | Discharge_Air_Static_Pressure_Setpoint                       |
| Discharge Air Pressure High   Limit Setpoint                | switch:Discharge_Air_Static_Pressure_High_Limit_Setpoint     |
| Discharge Air Pressure Low   Limit Setpoint                 | switch:Discharge_Air_Static_Pressure_Low_Limit_Setpoint      |
| Discharge Air Velocity   Pressure                           |                                                              |
| Discharge Air Dew Point   Temperature                       | Discharge_Air_Dewpoint_Sensor                                |
| Discharge Air Dew Point   Temperature Setpoint              | switch:Discharge_Air_Dewpoint_Setpoint                       |
| Discharge Air Flow                                          | Discharge_Air_Flow_Sensor                                    |
| Discharge Air Flow Setpoint                                 | Discharge_Air_Flow_Setpoint                                  |
| Discharge Air Flow Status                                   |                                                              |
| Discharge Air Velocity                                      | switch:Discharge_Air_Velocity_Sensor                         |
| Discharge Air Flow High Limit Setpoint                      | switch:Discharge_Air_Flow_High_Limit_Setpoint                |
| Discharge Air Flow Low Limit Setpoint                       | switch:Discharge_Air_Flow_Low_Limit_Setpoint                 |
| Discharge Air Flow Cooling High Limit   Setpoint            | switch:Cooling_Discharge_Air_Flow_High_Limit_Setpoint        |
| Discharge Air Flow Cooling Low Limit   Setpoint             | switch:Cooling_Discharge_Air_Flow_Low_Limit_Setpoint         |
| Discharge Air Flow Heating High Limit   Setpoint            | switch:Heating_Discharge_Air_Flow_High_Limit_Setpoint        |
| Discharge Air Flow Heating Low Limit   Setpoint             | switch:Heating_Discharge_Air_Flow_Low_Limit_Setpoint         |
| Entering Air Temperature                                    | switch:Entering_Air_Temperature_Sensor                       |
| Entering Air Dew Point Temperature                          |                                                              |
| Entering Air Dew Point Temperature   Setpoint               |                                                              |
| Entering Air Flow                                           |                                                              |
| Entering Air Flow Setpoint                                  |                                                              |
| Entering Air Velocity                                       |                                                              |
| Max Entering Air Flow Setpoint                              |                                                              |
| Min Entering Air Flow Setpoint                              |                                                              |
| Hot Deck Entering Air Temperature                           | switch:Entering_Air_Temperature_Sensor                       |
| Neutral Deck Entering Air Temperature                       |                                                              |
| Cold Deck Entering Air Temperature                          |                                                              |
| Hot Deck Entering Air Flow                                  | switch:Entering_Air_Flow_Sensor                              |
| Hot Deck Entering Air Flow Setpoint                         | switch:Entering_Air_Flow_Setpoint                            |
| Hot Deck Entering Air Flow High Limit   Setpoint            |                                                              |
| Hot Deck Entering Air Flow Low Limit   Setpoint             |                                                              |
| Cold Deck Entering Air Flow                                 | switch:Entering_Air_Flow_Sensor                              |
| Cold Deck Entering Air Flow Setpoint                        | switch:Entering_Air_Flow_Setpoint                            |
| Cold Deck Entering Air Flow High Limit   Setpoint           |                                                              |
| Cold Deck Entering Air Flow Low Limit   Setpoint            |                                                              |
| Neutral Deck Entering Air Flow                              |                                                              |
| Neutral Deck Entering Air Flow Setpoint                     |                                                              |
| Neutral Deck Entering Air Flow High Limit   Setpoint        |                                                              |
| Neutral Deck Entering Air Flow Low Limit   Setpoint         |                                                              |
| Return Air Dew Point Temperature                            |                                                              |
| Return Air Dew Point Temperature Setpoint                   |                                                              |
| Terminal Load                                               | switch:Terminal_Load_Sensor                                  |
| Cooling Load                                                | switch:Cooling_Load_Sensor                                   |
| Heating Load                                                | switch:Heating_Load_Sensor                                   |
| Reheat Enable Command \| Auxiliary Heating   Enable Command |                                                              |
| Reheat Enable Status \| Auxiliary Heating   Enable Status   |                                                              |
| Reheat Command \| Auxiliary Heating   Command               |                                                              |
| Preheat Enable Command                                      |                                                              |
| Preheat Enable Status                                       |                                                              |
| Preheat Command                                             |                                                              |
| Heating Call                                                | switch:Heating_Call_Status                                   |
| Cooling Call                                                | switch:Cooling_Call_Status                                   |
| Zone Air Temperature                                        | Zone_Air_Temperature_Sensor                                  |
| Zone Air Temperature Setpoint                               | Zone_Air_Temperature_Setpoint                                |
| Zone Air Temperature Effective Setpoint                     | Effective_Zone_Air_Temperature_Setpoint                      |
| Zone Air Temperature Effective Cooling   Setpoint           | switch:Cooling_Effective_Zone_Air_Temperature_Setpoint       |
| Zone Air Temperature Effective Heating   Setpoint           | switch:Heating_Effective_Zone_Air_Temperature_Setpoint       |
| Zone Air Temperature Occupied Cooling   Setpoint            | switch:Cooling_Occupied_Zone_Air_Temperature_Setpoint        |
| Zone Air Temperature Occupied Heating   Setpoint            | switch:Zone_Air_Temperature_Occupied_Heating_Setpoint        |
| Zone Air Temperature Unoccupied Cooling   Setpoint          | switch:Zone_Air_Temperature_Unoccupied_Cooling_Setpoint      |
| Zone Air Temperature Unoccupied Heating   Setpoint          | switch:Zone_Air_Temperature_Unoccupied_Heating_Setpoint      |
| Zone Air Temperature Standby Cooling   Setpoint             |                                                              |
| Zone Air Temperature Standby Heating   Setpoint             |                                                              |
| Zone Air Humidity                                           | Zone_Air_Humidity_Sensor                                     |
| Zone Air Humidity Setpoint                                  |                                                              |
| Zone Air Humidity High Limit Setpoint                       |                                                              |
| Zone Air Humidity Low Limit Setpoint                        |                                                              |
| Zone Air Pressure                                           |                                                              |
| Zone Air Pressure Setpoint                                  |                                                              |
| Zone Air CO2                                                | switch:Zone_Air_CO2_Sensor                                   |
| Zone Air CO2 Setpoint                                       | switch:Zone_Air_CO2_Setpoint                                 |
| Zone Air CO                                                 | switch:Zone_Air_CO_Sensor                                    |
| Zone Air CO Setpoint                                        |                                                              |
| Zone Air NO2                                                |                                                              |
| Zone Air NO2 Setpoint                                       |                                                              |
| Zone Air TVOC                                               |                                                              |
| Zone Air Radon                                              |                                                              |
| Zone Air Temperature Setpoint Deviation                     |                                                              |
| Outside Air Call                                            | switch:Outside_Air_Call_Request_Status                       |
| AHU Status                                                  | switch:AHU_On_Off_Status                                     |
| AHU Call                                                    |                                                              |


### Minimum Sets
The minimum selection of points Switch Automation expects to see on an entity of this type.

#### Base VAV (Minimum Set)
At least **one** of the following points

| switch:hasPointName | sh:class       |
|---------------------|----------------|
| Run Command         | On_Off_Command |
| Run Status          | On_Off_Status  |
| Enable Command      | Enable_Command |
| Enable Status       | Enable_Status  |
| Mode                | Mode_Status    |