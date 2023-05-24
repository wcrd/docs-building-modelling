---
sidebar_label: Invoice Streams
title: Invoice Streams
---
import invoice_con from '@site/static/img/docs/metering/invoice_consideration.png'
import invoice_meter from '@site/static/img/docs/metering/invoice_meter.png'


## About
`Invoice Streams` represent bills or invoices that a site may receive, with the bill data being broken out and modelled as a set of standardised sensors and statuses.

Compared to standarised equipment telemetry, it is expected that the `Invoice Stream` data is updated much less frequently; commonly only once a month, although any frequency is possible with the rise of live billing APIs!

As well as containing points representing the figures provided on an Invoice/Bill, the `Invoice Stream` entity will commonly have '*virtual*' points which aggregate data over trailing time periods, pro-rate monthly data to daily (etc), or calculate cumulative totals.

Finally, one of the most important modelling actions is connecting the `Invoice Stream` to the underlying `Meters` or other `Entities` that the bill is based off; this gives us the options to relate operations with costs directly, forecast savings, and verify that the billing numbers are correct!

A basic building model with `Invoice Streams` is shown below.
<img src={invoice_con} />

## Modelling Guidance

### Points

:::caution
Coming Soon
:::

**Real**
* Consumption (Usage) by Type (i.e. sometimes Active and Reactive energy is billed)
  * Total
  * On Peak
  * Off Peak
  * Shoulder
  * etc
* Cost
  * Total
  * On Peak
  * Off Peak
  * Shoulder
  * etc
  * ...other fees, taxes

**Virtual**
* Rate
* Cost (double checked)
* Avg. Rate / Consumption / Costs
* Cumulative
* Totals (if not provided as part of bill)

### Structure

:::warning
This is still under review
:::

Certain Utility Bills (or `Invoice Streams` more generally) may have billing for multiple zones, or 'corporate tenancies', accounts, etc., included on the same bill. 

In this situation, we separate each of these seperate sub-bills by utilising the `brick:Collections` concept, with each sub-bill and associated sensors being grouped under a `brick:Collection` (exact Class TBC).

-- OR --

We will make a new class 'MultiInvoiceStream', with parts of `Invoice Stream`, and property `brick:isVirtualInvoiceStream`=`true`


### Relationships

To keep things simple for now we can leverage the standard `brick:hasPart` relationship to capture which meters belong to Invoice Stream.

The `brick:hasPart` relationship covers both physical relationships, and logical. In this case it is logical composition. The Utility Meter is integral to the definition of the Invoice Stream as the the invoice must be able to reference energy consumption on site.

Generally an `Invoice Steam` is tied to a single meter on site, the *Utility Meter*. Oftentimes polling this meter directly is restricted by standards as it is owned by the utility providers, however it is extremely common for the building to install their own top-level meter that is in series with the Utility Meter such that consumption is accurately recorded by the building managers. This will generally be the meter to which the `Invoice Steam` is linked.

<img src={invoice_meter} />

:::caution
We may change this relationship to a dedicated relationship in future if required.
:::