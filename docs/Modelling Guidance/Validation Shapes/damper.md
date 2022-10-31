# Damper

Dampers control the flow of air.

Damper can either be:
* Components of a larger entity (AHU, VAV, etc)
* Stand-alone components (Floor Damper, inline damper in duct)
  * An argument could be made that stand alone dampers are VAVs; however we have made the distinction that VAVs will have additional sensors (esp. with regards to zone control) that a standalone damper may not have

At this time we are not validating against this distinction, but we will do in future.

#### Variations
Nil

---
## Composition

#### Core
Nil

#### Switch
Nil


## Relationships

#### Core
Nil

#### Switch
Nil

Switch does not require modelling components beyond the damper entity.

## Points

#### All
An entity of this type is expected to have a selection of points from this provided list. Any points assigned that are not on this list will throw a warning.


| switch:hasPointName          | sh:class                                         |
|------------------------------|--------------------------------------------------|
| Run Command                  | On_Off_Command                                   |
| Run Status                   | On_Off_Status                                    |
| Enable Command               | Enable_Command                                   |
| Enable Status                | Enable_Status                                    |
| Mode                         | Mode_Status                                      |
| Occupancy Command            | Occupancy_Command                                |
| Occupancy Mode               | Occupied_Mode_Status                             |
| Override Mode                | switch:Override_Mode_ Status                     |
| Pressure Reset Mode          | switch:Pressure_Reset_Operating_Mode_Status      |
| Out of Service Status        | switch:Maintenance_Mode_Enable_Status            |
| Fault Mode                   | switch:Fault_Mode_Status                         |
| Fault Status                 | Fault_Status                                     |
| Air Temperature              | Air_Temperature_Sensor                           |
| Air Temperature Setpoint     | Air_Temperature_Setpoint                         |
| Air Humidity                 | Relative_Humidity_Sensor                         |
| Air Absolute Humidity        | Humidity_Sensor                                  |
| Air Pressure                 | Static_Pressure_Sensor                           |
| Air Pressure Setpoint        | Static_Pressure_Setpoint                         |
| Air Flow                     | Air_Flow_Sensor                                  |
| Air Flow Setpoint            | Air_Flow_Setpoint                                |
| Air Velocity                 |                                                  |
| Position                     | Position_Sensor                                  |
| Position Setpoint            | switch:Position_Setpoint                         |
| Position Command             | Position_Command                                 |
| Position Low Limit Setpoint  | switch:Position_Low_Limit_Setpoint               |
| Position High Limit Setpoint | switch:Position_High_Limit_Setpoint              |
| Position Status              | switch:Position_Status                           |
| Open Command                 |                                                  |
| Close Command                |                                                  |
| Flow Rate                    | Flow_Sensor                                      |
| Flow Status                  | switch:Flow_Status                               |
| Delta-P                      | Differential_Pressure_Sensor                     |
| Delta-P High Limit Setpoint  | switch:Differential_Pressure_High_Limit_Setpoint |
| Delta-P Low Limit Setpoint   | switch:Differential_Pressure_Low_Limit_Setpoint  |
| CO2                          | CO2_Sensor                                       |
| Index Pressure               | switch:Index_Static_Pressure_Sensor              |

#### Minimum Set
The minimum selection of points Switch Automation expects to see on an entity of this type.

**ONE** point from the following list:

| switch:hasPointName          | sh:class                            |
|------------------------------|-------------------------------------|
| Position                     | Position_Sensor                     |
| Position Setpoint            | switch:Position_Setpoint            |
| Position Command             | Position_Command                    |
| Position Status              | switch:Position_Status              |

#### ::Other Sets...::