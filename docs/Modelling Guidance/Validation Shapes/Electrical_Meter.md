# Electrical Meter

An electrical meter is a device that measures the consumption of electricity.

For our requirements a meter is a simple device with a set of points. No componentry is required.

All meters (flow, electrical, thermal) are similar in function, but have different point sets and relationship restrictions, thus they have been given different shape definitions with no shared validators. This may change in future as we understand requirements further.

#### Variations
* AC Meter
* DC Meter

---

## Composition
An electrical meter requires no parts to be valid.

#### Core
Nil

#### Switch
Nil


## Relationships

#### Core
Nil.

An electrical meter does not need any relationships to be considered valid.

#### Switch

##### AC Electrical Meter & DC Electrical Meter
To get value out of a meter it is expected that it has the following relationships:
1. The meter *meters* some (equipment) entity (i.e. AHU, Chiller, etc.) <br />
    *or* <br />
    The meter has a submeter
    ```
    path: brick:meters
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        classOrSubClassOf: brick:Equipment
    ]
    ```
    ```
    path: brick:hasSubMeter
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        class: brick:Electrical_Meter
    ]
    ```

2. The meter is a *submeter* of another meter <br />
    *or* <br />
    The meter is part of a **`switch:InvoiceStream`**. See here for more info.
    ```
    path: brick:isSubMeterOf
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        class: brick:Electrical_Meter
    ]
    ```
    ```
    path: brick:isPartOf
    pathRequirements: [
        pathDistance: 1
    ]
    validationType: propertiesOfValues
    properties: [
        classOrSubClassOf: switch:InvoiceStream
    ]
    ```

## Points


#### All

##### AC Electrical Meter
An entity of this type is expected to have a selection of points from this provided list. Any points assigned that are not on this list will throw a warning.


| Point Name                       | Point Class                                  |
|----------------------------------|----------------------------------------------|
| Power Supply Status              | switch:Fault_Mode_Status                     |
| Fault Mode \| Alarm Mode         | Fault_Status                                 |
| Fault Status \| Alarm Status     | switch:Active_Energy_Delivered_Sensor        |
| Active Energy Delivered          | switch:Sample_Active_Energy_Delivered_Sensor |
| Active Energy Delivered (Sample) |                                              |
| Active Energy Received           |                                              |
| Reactive Energy Delivered        |                                              |
| Reactive Energy Received         |                                              |
| Net Active Energy Delivered      |                                              |
| Active Power                     | Active_Power_Sensor                          |
| Active Power A                   | switch:Active_Power_Phase_A_Sensor           |
| Active Power B                   | switch:Active_Power_Phase_B_Sensor           |
| Active Power C                   | switch:Active_Power_Phase_C_Sensor           |
| Apparent Power                   | switch:Apparent_Power_Sensor                 |
| Apparent Power A                 | switch:Apparent_Power_Phase_A_Sensor         |
| Apparent Power B                 | switch:Apparent_Power_Phase_B_Sensor         |
| Apparent Power C                 | switch:Apparent_Power_Phase_C_Sensor         |
| Reactive Power                   | Reactive_Power_Sensor                        |
| Reactive Power A                 | switch:Reactive_Power_Phase_A_Sensor         |
| Reactive Power B                 | switch:Reactive_Power_Phase_B_Sensor         |
| Reactive Power C                 | switch:Reactive_Power_Phase_C_Sensor         |
| Demand Active Power              |                                              |
| Demand Active Power A            |                                              |
| Demand Active Power B            |                                              |
| Demand Active Power C            |                                              |
| Max Demand Active Power          |                                              |
| Min Demand Active Power          |                                              |
| Demand Apparent Power            |                                              |
| Current A                        | switch:Current_Phase_A_Sensor                |
| Current B                        | switch:Current_Phase_B_Sensor                |
| Current C                        | switch:Current_Phase_C_Sensor                |
| Current N                        | switch:Current_Phase_N_Sensor                |
| Current L-L Average              |                                              |
| Current L-N Average              | switch:Average_Line_Current_Sensor           |
| Voltage AB                       | switch:Voltage_Phase_AB_Sensor               |
| Voltage AN                       | switch:Voltage_Phase_AB_Sensor               |
| Voltage BC                       | switch:Voltage_Phase_AB_Sensor               |
| Voltage BN                       | switch:Voltage_Phase_AB_Sensor               |
| Voltage CA                       | switch:Voltage_Phase_AB_Sensor               |
| Voltage CN                       | switch:Voltage_Phase_AB_Sensor               |
| Voltage NG                       |                                              |
| Voltage L-L Average              |                                              |
| Voltage L-N Average              | switch:Average_Line_Voltage_Sensor           |
| Frequency                        | Frequency_Sensor                             |
| Power Factor                     | Power_Factor_Sensor                          |
| Power Factor A                   | switch:Power_Factor_Phase_A_Sensor           |
| Power Factor B                   | switch:Power_Factor_Phase_A_Sensor           |
| Power Factor C                   | switch:Power_Factor_Phase_A_Sensor           |
| THD Current A                    |                                              |
| THD Current B                    |                                              |
| THD Current C                    |                                              |
| THD Current N                    |                                              |
| THD Voltage AN                   |                                              |
| THD Voltage BN                   |                                              |
| THD Voltage CN                   |                                              |
| THD Voltage AB                   |                                              |
| THD Voltage BC                   |                                              |
| THD Voltage CA                   |                                              |
| THD Current A K-Factor           |                                              |
| THD Current B K-Factor           |                                              |
| THD Current C K-Factor           |                                              |
| TDD Current A                    |                                              |
| TDD Current B                    |                                              |
| TDD Current C                    |                                              |
| Phase Angle                      |                                              |
| Phase Angle A                    |                                              |
| Phase Angle B                    |                                              |
| Phase Angle C                    |                                              |


##### DC Electrical Meter

| Point Name                   | Point Class                           |
|------------------------------|---------------------------------------|
| Power Supply   Status        | switch:Fault_Mode_Status              |
| Fault Mode \| Alarm Mode     | Fault_Status                          |
| Fault Status \| Alarm Status | switch:Active_Energy_Delivered_Sensor |
| Energy Delivered             |                                       |
| Current                      |                                       |
| Voltage                      |                                       |
| Ripple Voltage               |                                       |
| DC Ripple Voltage            |                                       |


#### Minimum Set
The minimum selection of points Switch Automation expects to see on an entity of this type.

#### ::Other Sets...::