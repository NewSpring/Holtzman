# Getting realtime data for your app

Apollos apps pull data from a variety of sources. This data needs to be always accessible, fast, and accurate at all times. Seems easy right?


### Ideal

Client side -> cache -> GQL -> cache -> db/apps


### First iteration

Client side -> cache -> server -> cache -> db/apps


The questions is going to be in the query syntax. I'd 100% like to use GQL even if it isn't setup. That way we can seamlessly switch then endpoint down the road.

Getting SSR to work successfully will also be quite a challenge. The server cache should make this possible, but need to investigate.

Client side cache would ideally be stored in local storage so it can be universal no matter where the data is coming from. Plumbing reactivity into this will be trickery.

Server side cache will happen via Redis. Hopefully each app we communicate with has caching as well but at launch, Rock will not. Since it is one of our primary data sources, we have to help it out.


Data sources: (planned at launch)
 - [ ] Mongo (direct)
 - [ ] Rock (via OData)
 - [ ] EE / Craft (via REST)

Data caches: (planned at launch)
- [ ] local storage
- [ ] redis

### Steps for lookup

Depending on the environment, the lookup process of data will be slightly different

#### SSR
- [ ] Check redis
  - A: return data
  - B: make external lookup and return data
- [ ] Store data in memory for rendering using same client API
- [ ] Pass data to client (hydrate store)

#### Client
- [ ] Check local storage
  - A: return data
  - B: make server request and return data
- [ ] Store data in local storage


### Invalidation of store

Who even knows


## API for the client request

The goal behind the client request is that the client doesn't care where the data is stored, only that they get back the data that they want. The server / GQL server decides how to get data and how to merge it. It also handles the needs for updating / changing the cache.

#### Current implementations

```javascript

let subscription = Meteor.subscribe("transactions")
const transactions = Transactions.find({}, {
  limit: this.state.page * this.state.pageSize,
  sort: { CreatedDateTime: -1 }
}).fetch();

```

#### Proposed implementation

```javascript

let query = parseQuery(`
  query financialTransactionsListQuery {
    financialTransactions {
      summary
      createdDateTime
      id
      financialPaymentDetail {
        accountNumberMasked
        currencyTypeValue {
          value
          description
        }
        creditCardTypeValue
      }
      transactionDetails {
        createdDateTime
        account {
          publicDescription
          publicName
          id
        }
        amount
      }
    }
  }
`)

let params = {}
let filters = {
  limit: this.state.page * this.state.pageSize,
  sort: { createdDateTime: -1 }
}

let cursor = Query(query, params, filters)

let ready = cursor.ready() // reactive bool value
if (ready) {
  // get the data
  console.log(cursor.fetch()) // reactive
}

// stop the reactive watching of that data
cursor.stop()


```
