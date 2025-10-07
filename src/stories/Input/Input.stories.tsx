import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "../../components/Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "number", "email", "tel"],
      description: "Input type",
    },
    clearable: {
      control: "boolean",
      description: "Show the clear button",
    },
    disabled: {
      control: "boolean",
      description: "Is the field disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder",
    },
    label: {
      control: "text",
      description: "Label for the field",
    },
    error: {
      control: "text",
      description: "Error text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic text Input
 */
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    type: "text",
  },
};

/**
 * Input with label
 */
export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "john_doe",
    type: "text",
  },
};

/**
 * Input with clearable
 */
export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    clearable: true,
    type: "text",
  },
};

/**
 * Password Input with visibility toggle
 */
export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};

/**
 * Password Input with clearable
 */
export const PasswordClearable: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    clearable: true,
  },
};

/**
 * Number Input with clearable
 */
export const NumberInput: Story = {
  args: {
    label: "Age",
    placeholder: "25",
    type: "number",
  },
};

/**
 * Number Input with clearable
 */
export const NumberClearable: Story = {
  args: {
    label: "Quantity",
    placeholder: "0",
    type: "number",
    clearable: true,
  },
};

/**
 * Email Input with clearable
 */
export const Email: Story = {
  args: {
    label: "Email",
    placeholder: "example@mail.com",
    type: "email",
    clearable: true,
  },
};

/**
 * Input with error
 */
export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "example@mail.com",
    type: "email",
    error: "Invalid email format",
  },
};

/**
 * Disabled Input
 */
export const Disabled: Story = {
  args: {
    label: "Disabled field",
    placeholder: "Not available",
    disabled: true,
  },
};

/**
 * Interactive example with controlled state
 */
const ControlledExample = (args: any) => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "300px" }}>
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
        Current value: <strong>{value || "(empty)"}</strong>
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
  args: {
    label: "Controlled Input",
    placeholder: "Start typing...",
    clearable: true,
  },
};

/**
 * All variants together
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "400px",
      }}
    >
      <Input label="Text Input" placeholder="Enter text..." type="text" />
      <Input
        label="Clearable Input"
        placeholder="Search..."
        clearable
        type="text"
      />
      <Input label="Password" placeholder="Enter password" type="password" />
      <Input
        label="Password (clearable)"
        placeholder="Enter password"
        type="password"
        clearable
      />
      <Input label="Number" placeholder="0" type="number" clearable />
      <Input
        label="Email"
        placeholder="example@mail.com"
        type="email"
        clearable
      />
      <Input
        label="With error"
        placeholder="example@mail.com"
        type="email"
        error="Invalid email format"
      />
      <Input label="Disabled" placeholder="Not available" disabled />
    </div>
  ),
};
