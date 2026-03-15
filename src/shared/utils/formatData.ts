export const formatDateToISO = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export const cleanCharacter = (data: string) => data.replace(/\D/g, "");

export function formatDateFromISO(dateISO: string | undefined | null): string {
  if (!dateISO) return "";

  const [year, month, day] = dateISO.split("-");

  if (!year || !month || !day) return "";

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export const getSingleParam = (
  param: string | string[] | undefined,
): string => {
  if (!param) throw new Error("ID da rota não encontrado.");
  return Array.isArray(param) ? param[0] : param;
};

export const formatPhone = (phone?: string | null): string => {
  if (!phone) return "-";

  const numbers = phone.replace(/\D/g, "");

  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  if (numbers.length === 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return phone;
};

export function formatCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
