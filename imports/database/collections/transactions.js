import { Mongo } from "meteor/mongo";

const TransactionReciepts = new Mongo.Collection("transactionReciepts");

export default TransactionReciepts;
export { TransactionReciepts };
