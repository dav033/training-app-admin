type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, boolean>
  | ClassArray;
interface ClassArray extends Array<ClassValue> {}

function cn(...classes: ClassValue[]): string {
  return classes
    .flat() // Aplana arrays anidados
    .filter(Boolean) // Filtra valores falsos (null, undefined, false, etc.)
    .map((cls) => {
      if (typeof cls === "object" && cls !== null) {
        // Si es un objeto, filtra las claves con valor `true`
        return Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return cls; // Si es un string, número o booleano, lo devuelve tal cual
    })
    .join(" "); // Une todas las clases con un espacio
}

function axiosDuplicateErrorHandler(status: number, name: string) {
  if (status === 409) {
    alert(`Este ${name} ya existe. Intenta con otro nombre.`);
  } else {
    alert(`Ocurrió un error al crear el ${name}. Inténtalo más tarde.`);
  }
}

export { cn, axiosDuplicateErrorHandler };
