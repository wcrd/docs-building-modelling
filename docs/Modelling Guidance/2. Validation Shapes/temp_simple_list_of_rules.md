# Working: Simple Rule List
While the rules are being fully developed and fleshed out, this document will serve as a quick, simple was to list out rules per target.

:::info
For more detail on rationale behind each rule, please see dedicated validation documentation sections.
:::

## Equipment

### Composition
* **GENERAL**
  * (Brick) An equipment can only be comprised of other equipment ✅
  * (Brick) Equipment can be part of another Equipment(s) or Collection(s). ✅
  * An Equipment should only be part of at most ONE equipment ❌
* **TARGETED**
  * ***VAV***
    * A VAV must have a Damper ✅
    * ***Single Duct with Reheat***
      * Must also have a Heating Coil ✅
    * ***Dual Duct***
      * Must also have an additional Damper ✅
    * ***Fan Powered***
      * Must also have a Fan ✅
    * ***Bypass***
      * Must have a Bypass Damper instead of just a Damper ✅
  * ***VFD***
  * ***Damper***
  * ***Fan***

### Relationships
* **GENERAL**
  * (Brick) An equipment can `hasLocation` only at a Location ✅
  * (Brick) An equipment can `feed` only Equipment(s) or Locations(s) ✅
* **TARGETED**
  * ***Meters***
    * ***Electrical Meters***
      * (
        A meter `meters` an Equipment(s)
        OR
        A meter `hasSubMeter` of another meter
      ) ✅
      * [DISABLED] (
        A meter `isSubMeterOf` another meter
        OR
        A meter `isPartOf` an InvoiceStream
      ) ✅
      * A meter `meters` an Equipments(s) excl. Meters ❌
      * A meter `hasSubMeter` of the same category (substance?) as itself ❌
  * ***VFD***
    * A VFD must be directly `partOf` a Pump or Fan ✅

### Points
* **GENERAL**
  * (Brick) An equipment can `hasPoint` of Point(s) ✅


## Locations

### Composition
* **GENERAL** 
    * (Brick) A location can only be comprised of other locations. ✅
    * A location should only be part of at most ONE location (excl. Zones) ✅

### Points
* **GENERAL**
    * (Brick) A location cannot be the sole parent of a point [*validated via Point rules*] ❌

## Collections

## Other