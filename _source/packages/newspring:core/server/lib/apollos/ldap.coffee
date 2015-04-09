
ldap = "ldap":
  "url": "ldap://cen-dc001.ad.newspring.cc:389"
  "base": "oDC=ad,DC-newspring,DC=cc"
  "timeout": 10000
  "bindDn": "cn=admin,dc=mydomain"
  "bindSecret": "ssq5&GXyJ8SzW5"
  "scope": "one"
  "nameAttribute": "displayName"
  "mailAttribute": "mail"

# cen-dc001.ad.newspring.cc : address
#
# 389 : port
#
# DC=ad,DC-newspring,DC=cc : base
#
# NS : host
# cen.webldap : user
#
# ssq5&GXyJ8SzW5 : password
#
# samaccountname : attribute
#
# Windows-1252 : encoding
#
# Fields
# company - org
# givenname - first
# sn - last
# cd - full name
# physicaldeliveryofficename - user campus
# dn[staff][intern] - access
# department - ministry
# telephonenumber - office phone
# mobile - cell
# title - staff title
# objectguid - UUID
