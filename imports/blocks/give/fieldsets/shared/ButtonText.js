// @flow

type IButtonText = {
  payment: Object,
  savedAccount: Object,
  schedules: Object,
  scheduleToRecover: boolean,
};

const ButtonText = ({
  payment,
  savedAccount,
  schedules,
  scheduleToRecover,
}: IButtonText) => {
  let paymentInfo = payment;

  if (!paymentInfo.accountNumber && !paymentInfo.cardNumber) {
    paymentInfo = { ...savedAccount.payment };
    paymentInfo.type = "ach";
  }

  let text = "Give";

  if (Object.keys(schedules).length) text = "Schedule";
  if (scheduleToRecover) text = "Transfer";

  if (paymentInfo.accountNumber || paymentInfo.cardNumber) {
    const masked = paymentInfo.type === "ach" ? paymentInfo.accountNumber : paymentInfo.cardNumber;
    text += ` using ${masked.replace(/-/g, "").slice(-4)}`;
  }

  return <span>{text}</span>;
};

export default ButtonText;
