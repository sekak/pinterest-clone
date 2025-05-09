export const handleFormData = (formData: FormData) => {
  let errors: { name: string; message: string }[] = [];
  if (!formData.get("title".trim()))
    errors.push({ name: "title", message: "Title is required" });
  if (!formData.get("description".trim()))
    errors.push({ name: "description", message: "Description is required" });
  if (!formData.get("board".trim()))
    errors.push({ name: "board", message: "Board is required" });
  if (errors.length > 0) return errors;

  return null;
};
