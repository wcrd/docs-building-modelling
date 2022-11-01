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
                <VAV_SingleDuct/>
            </TabItem>
            <TabItem value="2" label="Single Duct with Reheat (Elec)" default>
                <VAV_SingleDuct_ReheatElec/>
            </TabItem>
            <TabItem value="3" label="Single Duct wth Reheat (HHW)" default>
                <VAV_SingleDuct_ReheatHHW/>
            </TabItem>
        </Tabs>
    </div>
</details>
<details className="details-diagrams">
    <summary className="">Dual Duct</summary>
    <div>
        <Tabs>
            <TabItem value="1" label="Dual Duct" default>
                <VAV_DualDuct/>
            </TabItem>
        </Tabs>
    </div>
</details>
<details className="details-diagrams">
    <summary className="">Fan Powered</summary>
    <div>
        <Tabs>
            <TabItem value="1" label="Series with Reheat (Elec)" default>
                <VAV_Fan_Series_ReheatElec/>
            </TabItem>
            <TabItem value="2" label="Series wth Reheat (HHW)" default>
                <VAV_Fan_Series_ReheatHHW/>
            </TabItem>
            <TabItem value="3" label="Parallel with Reheat (Elec)" default>
                <VAV_Fan_Parallel_ReheatElec/>
            </TabItem>
            <TabItem value="4" label="Parallel wth Reheat (HHW)" default>
                <VAV_Fan_Parallel_ReheatHHW/>
            </TabItem>
        </Tabs>
    </div>
</details>
<details className="details-diagrams">
    <summary className="">Bypass</summary>
    <div>
        <Tabs>
            <TabItem value="1" label="Bypass" default>
                <VAV_Bypass/>
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


| Point Name | Point Class |
| - | - |
|||
|||
|||
|||


### Minimum Set
The minimum selection of points Switch Automation expects to see on an entity of this type.

### ::Other Sets...::