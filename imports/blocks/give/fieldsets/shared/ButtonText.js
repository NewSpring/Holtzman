// @flow

type IButtonText = {
  payment: Object,
  savedAccount: Object,
  schedule: Object,
  scheduleToRecover: boolean,
  overrideText?: string,
};

const ButtonText = ({
  payment,
  savedAccount,
  schedule,
  scheduleToRecover,
  overrideText,
}: IButtonText) => {
  let paymentInfo = payment;

  if (!paymentInfo.accountNumber && !paymentInfo.cardNumber) {
    paymentInfo = { ...savedAccount.payment };
    paymentInfo.type = "ach";
  }

  let text = "Give";

  if (schedule.start) text = "Schedule";
  if (scheduleToRecover) text = "Transfer";
  if (overrideText) text = overrideText;

  if (paymentInfo.accountNumber || paymentInfo.cardNumber) {
    const masked = paymentInfo.type === "ach" ? paymentInfo.accountNumber : paymentInfo.cardNumber;
    text += ` With ${masked.replace(/-/g, "").slice(-4)}`;
  }

  return <span>{text}</span>;
};

export default ButtonText;
