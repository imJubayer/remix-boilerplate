import Swal from "sweetalert2";

export const checkNullInfo = (info: string | number | null | undefined) => {
  if (info || typeof info == "number") {
    return info;
  }
  return "---";
};

export function checkDecimal(inputValue: any) {
  const decimal = /^[-+]?[0-9]+\.[0-9]+$/;
  if (inputValue && inputValue.length && inputValue.match(decimal)) {
    return parseFloat(inputValue).toFixed(2);
  }
  if (inputValue) {
    return inputValue;
  }
  return 0;
}

export function regEmailTempalte(name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to AllinOne</h2>
      <p>Assalamu Alaikum ${name},</p>
      <p>We're excited to have you on board.</p>
      <p>If you have any questions, feel free to reach out to us.</p>
      <p>Best Regards,</p>
      <p>AllinOne Team</p>
    </div>
  `;
}

export function getDateString(dateStr: string): string {
  const date: Date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
}

export const showConfirmationAlert = async (
  title: string,
  text: string,
  confirmButtonText: string,
  cancelButtonText: string,
) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed;
};
