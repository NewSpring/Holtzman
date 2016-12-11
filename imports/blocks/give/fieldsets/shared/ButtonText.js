// @flow

type IButtonText = {
  payment: Object,
  savedAccount: Object,
  schedule: Object,
  scheduleToRecover: boolean,
};

const ButtonText = ({
  payment,
  savedAccount,
  schedule,
  scheduleToRecover,
}: IButtonText) => {
  let paymentInfo = payment;

  if (!paymentInfo.accountNumber && !paymentInfo.cardNumber) {
    paymentInfo = { ...savedAccount.payment };
    paymentInfo.type = "ach";
  }

  let text = "Give";

  if (schedule.start) text = "Schedule";
  if (scheduleToRecover) text = "Transfer";

  if (paymentInfo.accountNumber || paymentInfo.cardNumber) {
    const masked = paymentInfo.type === "ach" ? paymentInfo.accountNumber : paymentInfo.cardNumber;
    text += ` Using ${masked.replace(/-/g, "").slice(-4)}`;
  }

  return <span>{text}</span>;
};

export default ButtonText;
