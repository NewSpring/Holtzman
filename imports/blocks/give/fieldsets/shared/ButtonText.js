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

  let text = "Give Now";

  if (Object.keys(schedules).length) text = "Schedule Now";
  if (scheduleToRecover) text = "Transfer Now";

  if (paymentInfo.accountNumber || paymentInfo.cardNumber) {
    const masked = paymentInfo.type === "ach" ? paymentInfo.accountNumber : paymentInfo.cardNumber;
    text += ` using ${masked.slice(-4)}`;
  }

  return <span>{text}</span>;
};

export default ButtonText;
