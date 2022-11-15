---
sidebar_label: Validating a Model (Shapes)
title: Validation Shapes
sidebar_position: 2
---
import DocCardList from '@theme/DocCardList';


Shapes are considered from two perspectives (each with many sub-focuses):

1. **Is an Entity valid, at a 'basic level'**
    * *Does is conform to the general structure of that type?*
        <br />i.e. Does a VAV have a Damper?
        <br />i.e. Does a FCU have a Fan?
    * *Does an entity have unexpected points?*
      * i.e. Does a VFD have a After Hours Mode point?
    * *Does it conform to our specification of model structure?*
        <br />i.e. is a VFD partOf a Fan | Pump ?
        <br />i.e. Does a Chiller belong to a Collection?
2. **Does an entity meet the requirements for some use case**
    * This can be closely related to the above and there is bound to be some overlap here.
      * Is a entity or collection of entities valid for some logic applications?


Within each validation perspective there can be many different validation objectives and validation standards. They are not exclusive. As this industry develops further it is expected that there will (for a time at least) be many differing validation definition from different standards bodies. (ASHRAE, Airah, Brick, etc). 

---

<DocCardList />
