# Fan

Fans move air.

Fans can either be:
* Components of a larger entity (AHU, VAV, Cooling Tower, etc)
* Stand-alone components (Return Fan, Exhaust Fan, etc)

At this time we are not validating against this distinction, but we will do in future.

Fans may also have an associated VFD. A VFD is related to the Fan through a `brick:isPartOf` relationship (see [VFD.md](./VFD.md))

#### Variations
Nil.
There will be variations in a future version.

---
## Composition

### Core
Nil.

Fans may have an associated VFD through a `brick:isPartOf` relationship (see [VFD.md](./VFD.md)), however this is validated as part of the VFD shapes.

If there is a requirement for a root equipment (i.e. AHU, Cooling Tower, etc) to have a Fan with a VFD then this would be validated as part of the root equipment shapes.

### Switch
Nil.


## Relationships

### Core
Nil.

### Switch
Nil.



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