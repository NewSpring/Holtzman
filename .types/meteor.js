declare module AccountsGlobal {
  declare function forgotPassword(options: { email: string, callback?: Function }): void;
}

declare var Accounts: $Exports<'AccountsGlobal'>;
