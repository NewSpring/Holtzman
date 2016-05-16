import { parseEndpoint } from "../utilities"

export default parseEndpoint(`
  FinancialAccounts?
    $select=
      Id,
      IsActive,
      EndDate,
      Name,
      PublicName,
      Description,
      PublicDescription,
      IsPublic,
      Order,
      Url,
      AccountTypeValueId
    &$filter=
      ParentAccountId eq null and
      IsPublic eq true and
      IsActive eq true and
      Description ne null
`)
