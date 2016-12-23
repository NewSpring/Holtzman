import { Mongo } from "meteor/mongo";

const ScheduledTransactionReciepts = new Mongo.Collection("scheduledTransactionReciepts");

export default ScheduledTransactionReciepts;
export { ScheduledTransactionReciepts };
