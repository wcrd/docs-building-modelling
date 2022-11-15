# VFD

VFDs are found on AC Fans, Pumps, and other motor driven entities and are used to control the motor speed.

#### Variations

* VFD

A variation on VFDs exists called a VSD, which is a DC only VFD. That entity type is not explored in this shape.

---

## Composition

### Core
Nil
### Switch
Nil

A VFD does not have any components that are required to be modelled.


## Relationships

### Core
Nil

### Switch
1. A VFD must be (immediately) part of a Pump or Fan (or any of their subclasses)
   ```
   path: brick:isPartOf
   pathRequirements: [
        pathDistance: 1
   ]
   validationType: propertiesOfValues
   properties: [
     or (
        classOrSubClassOf: brick:Pump,
        classOrSubClassOf: brick:Fan
     )
   ]
   ```



## Points

### All
An entity of this type is expected to have a selection of points from this provided list. Any points assigned that are not on this list will throw a warning.


| Point Name    | Point Class |
| - | - |
| Active Energy Delivered        | switch:Active_Energy_Delivered_Sensor |
| Active Power                   | Active_Power_Sensor                   |
| Cold Plate Temperature         | switch:Cold_Plate_Temperature_Sensor  |
| Current                        | Current_Sensor                        |
| DC Ripple Voltage              | switch:DC_Ripple_Voltage_Sensor       |
| DC Voltage                     | DC_Bus_Voltage_Sensor                 |
| Demand Active Power            |                                       |
| Demand Apparent Power          |                                       |
| Electrical Energy Used         | switch:Electrical_Energy_Usage_Sensor |
| Enable Command                 | Enable_Command                        |
| Enable Status                  | Enable_Status                         |
| Fault Mode                     | switch:Fault_Mode_Status              |
| Fault Status                   | Fault_Status                          |
| Frequency                      | Frequency_Sensor                      |
| Heatsink Temperature           | Heat_Sink_Temperature_Sensor          |
| Mode                           |                                       |
| Motor Temperature              | switch:Motor_Temperature_Sensor       |
| Override Mode                  | switch:Override_Mode_Status           |
| Override Status                | Overriden_Status                      |
| Power Supply Status            |                                       |
| Reverse Command                | switch:Reverse_Direction_Command      |
| Rotation Direction Status      | switch:Rotation_Direction_Status      |
| Run Command                    | On_Off_Command                        |
| Run Status                     | On_Off_Status                         |
| Speed                          | Speed_Sensor                          |
| Speed Command                  | switch:Speed_Command                  |
| Torque                         | Torque_Sensor                         |
| Total After Hours Mode Runtime |                                       |
| Total Runtime                  | Run_Time_Sensor                       |
| Total Start Count              |                                       |
| Voltage                        | Voltage_Sensor                        |



### Minimum Set
The minimum selection of points Switch Automation expects to see on an entity of this type.