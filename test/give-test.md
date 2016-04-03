# Roadmap to testing Give

## newwwspring.cc

- Put stuff to test here

## Apollos

- src/core
  - util
    - regex
      - defaults.ts 
        - Lots of test values
        - Especially fringe cases
      - index.js
        - test existance of all is* funtions
- src/give
  - blocks
    - ActionButtons
      - Buttons.jsx
        - Guest
      - index.jsx
        - getPaymentDetails query
        - GiveNow.getAccount
        - GiveNow.buttonClasses    
        - GiveNow.onClick    
        - GiveNow.giveAsGuest
        - GiveNow.render (?)
    - AddToCart
      - index.jsx
        - SubFund.monetize
        - SubFund.getFund
        - SubFund.saveFund
        - SubFund.saveAmount
        - SubFund.statusClass
        - GiveNow.render (?)
  - collections
  - components
  - methods
  - observers
  - pages
  - store
  - index.js
    - onEnter