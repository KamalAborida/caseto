import { TablesDynamicForm, type FieldConfig } from "./TablesDynamicForm";

/**
 * Example usage of TablesDynamicForm component
 */
export const TablesDynamicFormExample = () => {
  // Example 1: Simple form with text and email fields
  const simpleFields: FieldConfig[] = [
    {
      name: "tableName",
      isRequired: true,
      type: "text",
      initialValue: "",
      label: "Table Name",
      placeholder: "Enter table name",
    },
    {
      name: "capacity",
      isRequired: true,
      type: "number",
      initialValue: "",
      label: "Capacity",
      placeholder: "Enter capacity",
    },
    {
      name: "location",
      isRequired: false,
      type: "text",
      initialValue: "",
      label: "Location",
      placeholder: "Enter location",
    },
  ];

  // Example 2: Form with select field
  const fieldsWithSelect: FieldConfig[] = [
    {
      name: "tableName",
      isRequired: true,
      type: "text",
      initialValue: "",
      label: "Table Name",
    },
    {
      name: "status",
      isRequired: true,
      type: "select",
      initialValue: "",
      label: "Status",
      placeholder: "Select status",
      options: [
        { value: "available", label: "Available" },
        { value: "occupied", label: "Occupied" },
        { value: "reserved", label: "Reserved" },
      ],
    },
    {
      name: "section",
      isRequired: true,
      type: "select",
      initialValue: "",
      label: "Section",
      options: [
        { value: "indoor", label: "Indoor" },
        { value: "outdoor", label: "Outdoor" },
        { value: "patio", label: "Patio" },
      ],
    },
  ];

  // Example 3: Form with initial values (for update mode)
  const updateFields: FieldConfig[] = [
    {
      name: "tableName",
      isRequired: true,
      type: "text",
      initialValue: "Table 5",
      label: "Table Name",
    },
    {
      name: "capacity",
      isRequired: true,
      type: "number",
      initialValue: 4,
      label: "Capacity",
    },
  ];

  // Example handlers
  const handleCreate = async (values: any, { resetForm, setSubmitting }: any) => {
    console.log("Creating with values:", values);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    alert("Created successfully!");
    resetForm();
    setSubmitting(false);
  };

  const handleUpdate = async (values: any, { setSubmitting }: any) => {
    console.log("Updating with values:", values);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    alert("Updated successfully!");
    setSubmitting(false);
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <h2>Example 1: Simple Create Form</h2>
        <TablesDynamicForm
          fields={simpleFields}
          onSubmit={handleCreate}
          submitButtonText="Create Table"
          formTitle="Create New Table"
        />
      </div>

      <div>
        <h2>Example 2: Form with Select Fields</h2>
        <TablesDynamicForm
          fields={fieldsWithSelect}
          onSubmit={handleCreate}
          submitButtonText="Save"
          formTitle="Table Configuration"
        />
      </div>

      <div>
        <h2>Example 3: Update Form with Initial Values</h2>
        <TablesDynamicForm
          fields={updateFields}
          onSubmit={handleUpdate}
          submitButtonText="Update Table"
          formTitle="Update Table"
        />
      </div>
    </div>
  );
};

