---
layout: essay
title: Towing Dispatch API
subtitle: RESTful Web Service Documentation Example
---

_A (slightly modified) API document I wrote while working at FTI Groups, Inc._

## Purpose
The API will allow Customers, or Customer Agents, to add and edit WOs from applications other than the primary [REDACTED] application.

## Definitions

API
 :  The set of web accessible method explained herein, which are accessible remotely by an API Client for the purpose of creating, editing, and viewing WOs.
Customer
 :  A company which has contracted with [REDACTED] or [REDACTED] in order to receive managed towing services.
Customer Agent
 :  A non-customer entity which acts on behalf of one or more customers to add, edit, or otherwise manage WOs via an API Client.
API User
 :  A Customer or Customer Agent with a unique identity and login credentials for accessing the API.
API Client _or_ Client
 :  A software application which makes calls to the API and provides some sort of interface to people or systems of a customer or Customer Agent.
Word Order _or_ WO
 :  The record of a single service request related to a single vehicle involved in a single incident.
The Application _or_ The Primary Application
 :  The [REDACTED] web-app and its associated database, accessible at http://[REDACTED].com

## Access and Login

 - Each API User will be issued a unique API key and password. Each Customer already has a unique Customer ID in the Primary Application.
 - Any Customer may be linked to a Customer Agent. This linkage gives the Agent the right to add new WO’s into the database via the API, and to view or edit any WOs which that agent created. A Customer Agent DOES NOT have the right to edit or view Customer WOs which it did not create, even when it is an agent for that Customer.

 - When making calls to the API, the Client will typically send three identifying strings:
    - the API Username,
    - the API Key, and
    - the Customer Number.
 - Customer Agents may send certain calls (eg. data requests for multiple customers) with only their API Username and API Key.
 - All calls to the API require these identifying strings. Creating and populating a WO will require multiple calls (see below) and each requires all identifying strings.
    - That is: The web API does not create a user session. Each call, even in a series of calls for a single work order, is a separate transaction.
 - Return messages are in XML format.

## Example Use

 - API client makes a call to create a WO.
    - This creates an empty WO in the status of `Building`.
    - _NB: WOs in `Building` do not appear on any screens in the Application._
 - The `username` in the initial API call identifies who (among the Customer and its Agent[s]) created the WO. This is stored in the WO record as the `WO_Creator`.
 - The response to the CreateWO function (defined below in more detail) includes the WO#, so that the calling application can properly populate the WO.
 - The client will then make a series of calls to populate the WO.
 - Each section of the WO is populated with a separate call, which governs a set of related fields.
    - _NB: It is expected that the API client application will have prepared these calls in advance, and will make them in rapid succession once it has a WO# to populate. It is not our expectation that a WO will be populated by the API client over a long period of time._
 - Once the WO is fully populated, the API client will send a call to activate the Work Order. This updates the status from `Building` to `Pending`.
    - _NB: Our assumption is that the client will wait for success confirmations for the preceding calls before sending the final activation call._

### Notes

 - If a WO remains in `Building` for 300 seconds (5 minutes) the WO is deleted.
 - The client is able to make calls to `getFullWO` in order to access the WO data after creation. There are also methods for updating/adding information on a Work Order, and batch methods for retrieving information on sets of Work Orders.


## Methods


### ALL METHODS

#### Parameters

All calls must include the following parameters:

 - strAPIKey
 - strUsername
 - strCustomerNum

The following parameter is OPTIONAL:

 - strResponseFormat
    - `XML` _(Default)_
    - `JSON`
    - `JSONP`

In the case of `JSONP`, an additional parameter, `strCallBack` is required.

Other parameters, specific to each type of call, are listed below.


#### Response

All calls have a response with two major sections, _Meta_ and  _Return_, with the following information:

 - Meta
   - Time of Call
   - Caller
   - Call Status
      - Outcome
      - Failure Reason (if applicable)
 - Return
   - WONumber (str)
   - WOStatus (str)
   - WOCreatedDate (datetime)
      - YYYY-MM-DDThh:mm:ssZ (eg 2010-07-16T19:20:30Z)
      - All times are given in UTC (Z).

Additional information, typically contained in _Return_, is listed below with the relevant call.

_NB. See addenda for format-specific response details._

## General WO Methods

### `CreateWO`

#### Parameters

_Default only._

#### Response

_Default only._

### `ActivateWO`

#### Parameters

 - intWorkOrderNumber

#### Response

_Default only._


### `GetFullWO`

#### Parameters

 - intWorkOrderNumber

#### Response

 - Return
    - WO Service Type
    - WO Vehicle
    - WO Pickup Location
    - WO Destination Location
    - WO Insurance
    - WO Notes (set of objects):
       - datetime
       - username
       - noteText (str)
    - WO Attachments (set of objects):
       - datetime
       - username
       - name (str)
       - url (str)

_NB: See addenda for full list of fields and formats for Return information._

## WO Population Methods

For each section of the WO (as applicable), there are three methods:

 - Add – Adds data if that section is completely blank. If ANY relevant fields have data, this call will fail, and no data will be added.
 - Edit – Adds or overwrites fields. If a relevant field is not included in the call, but there is existing data, the existing data is NOT deleted. (That is, in order to erase data using the Edit function, the call would have to explicitly include NULL values as arguments, rather than simply not including the arguments.)
 - Get – Used for viewing existing data. Will not make any changes.

In a few cases (see below) not all three functions are appropriate to a field set.

#### Parameters

Required:

 - strAPIKey
 - strUsername
 - strCustomerNum
 - strWoNumber

For `Add` and `Edit` functions, the relevant fields are also included. For `Get` functions, no additional fields are required --- the API will return the entire section.

#### Response

In all cases, the response will include `Meta` and `Return` (described above). `Return` includes core WO details, along with all relevant fields (as described in _Parameters_).


### `AddWODetails`, `EditWODetails`, `GetWODetails`

#### Parameters (for `Add`, `Edit`)

 - strServiceTypeName
 - strVehicleType
 - strRepairPriority

### `AddDriver`, `EditDriver`, `GetDriver`

#### Parameters (for `Add`, `Edit`)

 - strDriverName
 - strDriverPhone
 - boolDriverWithVehicle (`TRUE` or `FALSE`)
 - boolCoDriverWithVehicle (`TRUE` or `FALSE`)
 - boolDriverUnderLoad (`TRUE` or `FALSE`)
 - strDriverHoursAvailable
 - strHoursToPuDel


### `AddTruck`, `EditTruck`, `GetTruck`

#### Parameters (for `Add`, `Edit`)

 - strTruckNumber
 - intTruckYear		
 - strTruckMake		
    - Enumerated option. See below for options API.
 - strTruckModel
    - Enumerated option with constraints to `strTruckMake`. See below for options API.
 - strTruckColor		
    - Enumerated option. See below for options API.
 - strTruckVIN
 - strTruckPlateNumber
 - intTruckOdometer
 - strTruckEngineManf
 - strTruckEngineModel
 - strTruckRearAxle
 - dtTruckInService
 - strDamageDescription
    - Enumerated option. See below for options API.


### `AddTrailer`, `EditTrailer`, `GetTrailer`

#### Parameters (for `Add`, `Edit`)

 - strTrailerNumber
 - strTrailerVIN
 - intTrailerYear
 - strTrailerMake
    - _NB: Trailer Make is not an enumerated option._
 - strTrailerModel
 - intTrailerTireSize (inches)
 - intTrailerLoadedWeight (lbs)
 - dtTrailerInService
 - boolTrailerLoaded (`TRUE` or `FALSE`)
 - boolTrailerHazCargo (`TRUE` or `FALSE`)
    - _NB: Hazardous_

### `AddPickUpLocation`, `EditPickUpLocation`, `GetPickUpLocation`

#### Parameters (for `Add`, `Edit`)

 - strLocationID
    - This can be used as an enumerated option, or to define a new option.
    - If a Pick Up Location ID is specified, without any address information:
       - AND IF id is exact match for an existing location,
          - Location is accepted, and address fields are populated.
       - BUT IF id is NOT a match,
          - call fails.
    - If a PickUp Location ID is specified, along with Address information,
       - THEN a new Pick Up location (ID & address) is stored for later use.
       - AND the address fields on the current WO are populated.

    - If a PickUp Location ID is NOT specified, provided address details are populated into the WO, but not saved for future use.
 - strLocationName
 - strStreetAddress		
 - strCity
 - strState
    - Enumerated option. See below for options API.
 - strZip
 - geoLocation (str: lat,long)
 - strPhone
 - strLocationType
    - Enumerated option. See below for options API.
 - strHoursOfOperation
    - Enumerated option. See below for options API.

### `AddDestination`, `EditDestination`, `GetDestination`

#### Parameters (for `Add`, `Edit`)

_Same as parameters for PickUpLocation._

### `AddPowerSwap`, `EditPowerSwap`, `GetPowerSwap`

#### Parameters (for `Add`, `Edit`)

 - strPSwapLocationName
 - strPSwapAddress
 - strPSwayCity
 - strPSwapState
 - strPSwapZip
 - geoLocation (str: lat,long)

### `AddWONarrative`, `EditWONarrative`, `GetWONarrative`

#### Parameters (for `Add`, `Edit`)

 - strComplaint
 - strCause
 - strCorrection

### GetPriceDetail

#### Parameters

_Defaults only._

### `AddNote`, `GetNotes`

#### Parameters (for `Add`)

strNoteText

#### Return

_All notes are returned._


### `AddAttachment`, `GetAttachments`

#### Parameters (for `Add`)

 - strAttachmentFileName
 - strAttachmentType
    - Enumerated option. See below for options API.
 - strAttachmentURL
    - Client will post the attachment on its own server. Server will download the attachment at the provided URL.

#### Return

_All attachments are returned._


## Reports API

The Report methods return a set of Word Orders, with all available data on all relevant WOs.

### `GetWOsByStatus`

#### Parameters

 - strStatus

### `GetWOsByDate`

_Returns all WOs based on field “Submitted Date”._

#### Parameters

 - dtFromDate
 - dtToDate

### `GetWOsByNumber`

#### Parameters

 - intFromWOnum
 - intToWOnum

### `GetWOsByCustomer`

_Used by a multi-Customer Agent, to retrieve all active WOs for a customer._

#### Parameters

 - boolReturnFull
    - `FALSE` = returns list of WO Numbers. (Default.)
    - `TRUE` = returns set of complete WO records.
 - boolIncludeInactive
    - `FALSE` = returns only WOs in a status designated as active. (Default.)  
    - `TRUE` = returns all WOs.
       - `boolReturnFull` will be forced to `FALSE`.


### `GetAllByStatus`

#### Parameters

 - strStatus
    - Enumerated option. See below for Options API.
 - boolReturnFull
    - `FALSE` = returns list of WO Numbers. (Default.)
    - `TRUE` = returns set of complete WO records.

### `GetAllWOs`

_Returns all WOs accessible by the client._

#### Parameters

- boolReturnFull
   - `FALSE` = returns list of WO Numbers. (Default.)
   - `TRUE` = returns set of complete WO records.
- boolIncludeInactive
   - `FALSE` = returns only WOs in a status designated as active. (Default.)  
   - `TRUE` = returns all WOs.
      - `boolReturnFull` will be forced to `FALSE`.


## Options API

These methods are used to retrieve valid string lists for enumerated options.

Unless otherwise noted, these methods have no parameters besides the tree identifying strings.

 - `GetStatuses`
 - `GetTruckMakeModels`
     - Return: List of all Makes, with sub list of all associated Models.
 - `GetColors`
 - `GetStates`
 - `GetLocationTypes`
 - `GetLocationHours`
 - `GetLocationIDs`
    - Returns all the locations associated with the Customer, with all the relevant fields associated with each Location.



## Sample of Direct HTTP Call to API

The API can be accessed directly through HTTP GET requests, such as:

```
http://[REDACTED]/webservices/[REDACTED]_CUSTOMER_API.php?method=createWO&apiKey=XXXX&apiPassword=XXX&CustomerNum=XXXX
```

## Sample Code for Calling API

More likely, the API will be accessed from inside Client Applications, using cURL or a similar library.
For example:


```php

<?php
/**
  * Below is sample PHP code for calling different API functions.
  * We are creating a variable called $strParam for each function and appending this variable to the URL before sending it.
  * This represents only one possible way of implementing calls to the API.
  */

// To create Work Order
$strParams = "method=createWO&apiKey=XXXX&apiPassword=XXX&CustomerNum=XXXX";

// To Activate WO from building status to pending
$strParams = "method=activateWO&apiKey=XXXX&apiPassword=XXX&CustomerNum=XXXX &work_order_key=XXXX";

// Get Full WO Details
$strParams = "method=getFullWO&apiKey=XXXX&apiPassword=XXX&CustomerNum=XXXX &work_order_key=XXXX";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://[REDACTED]/webservices/[REDACTED]_CUSTOMER_API.php');
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $strParams);
$result = curl_exec($ch);
curl_close($ch);

return $result;
?>
```
