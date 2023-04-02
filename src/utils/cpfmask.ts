export const cpfMask = (v?: string) => {
  const typeofV = typeof v;

  if (!v || typeofV !== "string") return "";

  v = v.replace(/\D/g, "");

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return v;
};
