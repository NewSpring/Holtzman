import { api } from "../../../util/rock";
import makeNewGuid from "../../../util/guid";


let HomeId = false;
let BillingAddressId = false;
export function upsertLocations(PersonId, doc) { // eslint-disable-line
  let Location = doc;
  if (!PersonId || !Location) return;

  // verify the defined values are correctly in Rock
  // if they aren't in Rock already add them
  if (!HomeId || !BillingAddressId) {
    const locationTypes = api.get.sync("DefinedValues?$filter=DefinedTypeId eq 15");
    for (const loc of locationTypes) {
      if (loc.Value === "Home") {
        HomeId = loc.Id;
        continue; // eslint-disable-line
      }

      if (loc.Value === "Billing Address") {
        BillingAddressId = loc.Id;
      }
    }

    // this location type doesn't exist yet
    if (!BillingAddressId) {
      const BillingLocationDefinedValue = {
        IsSystem: false,
        Guid: makeNewGuid(),
        Value: "Billing Address",
        DefinedTypeId: 15,
        Order: 0,
        Description: "Address created from a transaction if the used address isn't already on file",
      };


      BillingAddressId = api.post.sync("DefinedValues", BillingLocationDefinedValue);
    }
  }

  // get the locations of a person
  const query = api.parseEndpoint(`
    Groups/GetFamilies/${PersonId}?
      $expand=
        GroupLocations,
        GroupLocations/Location,
        GroupLocations/GroupLocationTypeValue
  `);

  // get the group details
  let locations = api.get.sync(query);

  // only select the first family for now
  locations = locations[0];

  // store the Id for easy upserts / posts
  const GroupId = locations.Id;

  // repurpose the locations variable
  locations = locations.GroupLocations;


  // see if Street1 of the location matches any on file
  let home = false;
  let exists = false;

  for (const loc of locations) {
    const location = loc.Location;
    // this location is probably already on file
    if (location && location.Street1.trim() === Location.Street1.trim()) {
      exists = true;
      break;
    }

    // see if the person has a home
    if (loc.GroupLocationTypeValue.Value === "Home") {
      home = true;
    }
  }

  // location is already on file for this person :tada:
  if (exists) {
    return;
  }

  // add Guid and IsActive to the location
  Location = { ...{ Guid: makeNewGuid(), IsActive: true }, ...Location };

  const LocationId = api.post.sync("Locations", Location);

  if (!LocationId || LocationId.statusText) {
    // eslint-disable-next-line
    console.error("@@LOCATION_UPDATE_ERROR", Location);
    return;
  }

  // if a person has no home, make this locaiton their home
  if (!home) {
    const GroupLocation = {
      GroupId,
      LocationId,
      GroupLocationTypeValueId: HomeId,
      IsMailingLocation: true,
      Guid: makeNewGuid(),
    };

    api.post.sync("GroupLocations", GroupLocation);
    return;
  }

  // create the location as a custom `Billing Address`
  if (BillingAddressId) {
    const GroupLocation = {
      GroupId,
      LocationId,
      GroupLocationTypeValueId: BillingAddressId,
      IsMailingLocation: true,
      Guid: makeNewGuid(),
    };

    api.post.sync("GroupLocations", GroupLocation);
  }
}
