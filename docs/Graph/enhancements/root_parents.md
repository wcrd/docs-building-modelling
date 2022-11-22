---
sidebar_label: Root Parents
sidebar_position: 1
---

# Root Parents
## Definition

The ***Root Parent*** is a useful model enhancement to make navigating and searching `brick:Equipment` in the graph model easier.

:::info
The ***Root Parent*** is top level entity that is found following the `brick:hasPart` relationship from the current entity, filtered to the same core type (`brick:Equipment`) as the current entity. The ***Root Parent*** is intended only for `brick:Equipment` entities, as these are composed of other entities in a nested format.
:::

The ***Root Parent*** makes it straight-forward to return all components and points of a given entity.

## Issues this solves
1. Given a model, how would you display the hierarchical structure of Equipment?
2. Given an entity, how would you tell it was stand-alone, or part of some larger entity?

Both of these can be answered via standard graph queries, however repeatedly executing these queries is tedious when exploring a model. Better we pre-calculate and store this information in the model (or a supporting model) on update to improve performance and experience.

The reasoning for this enhancement is better explained via an example.

---

## Example

``` python
# Example sub-parted AHU entity with points
> AHU (label: AHU_1)
    > Fan
        * Run_Status
        > VFD
            * Frequency_Sensor
            * Auto_Hand_Mode_Status
    > Damper
        * Position_Sensor
        * Position_Command
    > Hot_Water_Coil
        * Flow_Sensor
    > Chilled_Water_Coil
        * Flow_Sensor
```

Given the AHU shown above, it is common for us to want to show all entities that are considered 'part' of the AHU, or all points that are contained within the AHU entity.

:::caution
Looking at the model, it is also not possible to tell whether the AHU is in-fact the 'top level' entity, or it is itself a part of some larger equipment; we need to know the *root* entity. What if I had just shown the example from the `Fan` entity; how would you know if that is a stand-alone fan or in-fact part of some larger entity? I have only arbitrarily drawn this structure... we need to objectively tell from the model what the ultimate hierarchy is.
:::

As a user of the model, it is expected that I can list 'top level' entities and simply search for the AHU and all components will show. However with a basic RDF model, this is not possible directly. In order to return all components we need to perform a transitive query, as shown below:


### Query

Get all components of a given entity (*`ENTITY_SUBJECT`*):
``` sql
SELECT *
WHERE {
    VALUES (?base) {(ENTITY_SUBJECT)}
    ?base brick:hasPart* ?part .
    ?part brick:isPartOf ?parent .
    # All components must be of class brick:Equipment
    ?base rdf:type/rdfs:subClassOf* brick:Equipment .
    ?parent rdf:type/rdfs:subClassOf* brick:Equipment .
}


# RESULT
# ENTITY_SUBJECT = AHU_1

#   base (entity_subject)	parent (of part)	part
# - ---------------------   ----------------    -------------------
# 0	AHU_1	                Fan	                VFD
# 1	AHU_1	                AHU_1	            Fan
# 2	AHU_1	                AHU_1	            Damper
# 2	AHU_1	                AHU_1	            Hot_Water_Coil
# 2	AHU_1	                AHU_1	            Chilled_Water_Coil

```

Find 'top level' entity for all entities in model; i.e.: the `root parent`. This can also be run for a specific entity (*`ENTITY_SUBJECT`*).
``` sql
SELECT ?part ?root_parent
WHERE {
    # Entity must be an Equipment
  	?part rdf:type/rdfs:subClassOf* brick:Equipment .
    # Parent must not be a Collection/Location (must be Equipment)
    ?part brick:isPartOf+ ?root_parent .
  	?root_parent rdf:type/rdfs:subClassOf* brick:Equipment .
    # Parent is root if it has no more parents; filter to just top level entities
    FILTER NOT EXISTS {
        # Root Parent must also not be a Collection/Location (must be Equipment)
        ?root_parent brick:isPartOf+ ?parent .
        ?parent rdf:type/rdfs:subClassOf* brick:Equipment .
    }
}

# RESULT
# For the given example model, which has only the entities shown above, show root parent for each entity.

#   base (entity_subject)	root_parent
# - ---------------------   -----------
# 0 VFD                     AHU_1
# 1 Fan                     AHU_1
# 2 Damper                  AHU_1
# 3 Hot_Water_Coil          AHU_1
# 4 Chilled_Water_Coil      AHU_1
```
These queries need to be executed and processed every time a user is searching the model. Rather that simply searching for 'AHU_1', the user must wait for a complex query to return. It would be better instead to pre-calculate and store this information in the model (or a supporting model) on update.

### Shortcut (Enhancement)
Now, if we calculate the root_parent on model update, we can query the model much more easily.

:::note
We have written the `root parent` to each entity using the relationship `rnd:hasRootParent`.

By convention, we will also write an entity as its own `root parent` if it is the top level entity. This makes querying the model more explicit.
:::

Now in order to find all components of `AHU_1` we can simply:

``` sql
SELECT ?part
WHERE {
  ?part rnd:hasRootParent :AHU_1
}

# RESULT
# For the entity AHU_1

#   part
# - -------------------
# 0 VFD                     
# 1 Fan                     
# 2 Damper                  
# 3 Hot_Water_Coil          
# 4 Chilled_Water_Coil 
```

To see if an entity is 'stand-alone' or part of a larger entity (from a parts perspective), we can simply:
``` sql
SELECT ?parent
WHERE {
    VALUES (?entity) {(ENTITY_SUBJECT)}
    ?entity rnd:hasRootParent ?parent
}

# RESULT
# For the entity VFD

#   parent
# - -------------------
# 0 AHU_1                  

# Therefore this entity is not stand-alone, but part of the top level entitiy AHU_1


# RESULT
# For the entity AHU_1

#   parent
# - -------------------
# 0 AHU_1                  

# This entity is stand-alone, as it's parent is equal to itself; i.e.: it is the top-level
```