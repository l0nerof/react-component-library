import Toast from "@/components/Toast";
import ToastProvider, { useToast } from "@/components/ToastContainer";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description: "Type of the toast notification",
    },
    message: {
      control: "text",
      description: "Main message of the toast",
    },
    description: {
      control: "text",
      description: "Additional description (optional)",
    },
    duration: {
      control: "number",
      description: "Duration in milliseconds (0 = no auto-dismiss)",
    },
    closable: {
      control: "boolean",
      description: "Show close button",
    },
    onClose: {
      action: "closed",
      description: "Callback when toast is closed",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toast with info type
 */
export const Default: Story = {
  args: {
    type: "info",
    message: "Information",
    description: "This is an informational message",
    duration: 0,
    closable: true,
  },
};

/**
 * Success notification
 */
export const Success: Story = {
  args: {
    type: "success",
    message: "Success!",
    description: "Your changes have been saved successfully",
    duration: 0,
    closable: true,
  },
};

/**
 * Error notification
 */
export const ErrorState: Story = {
  args: {
    type: "error",
    message: "Error occurred",
    description: "Something went wrong. Please try again",
    duration: 0,
    closable: true,
  },
};

/**
 * Warning notification
 */
export const Warning: Story = {
  args: {
    type: "warning",
    message: "Warning",
    description: "Please check your input before proceeding",
    duration: 0,
    closable: true,
  },
};

/**
 * Info notification
 */
export const Info: Story = {
  args: {
    type: "info",
    message: "Did you know?",
    description: "You can customize the duration of the toast",
    duration: 0,
    closable: true,
  },
};

/**
 * Without description
 */
export const WithoutDescription: Story = {
  args: {
    type: "success",
    message: "Operation completed successfully",
    duration: 0,
    closable: true,
  },
};

/**
 * Without close button
 */
export const WithoutCloseButton: Story = {
  args: {
    type: "info",
    message: "This toast will auto-dismiss",
    description: "No close button available",
    duration: 0,
    closable: false,
  },
};

/**
 * Short duration (2 seconds)
 */
export const ShortDuration: Story = {
  args: {
    type: "success",
    message: "Quick message",
    description: "This will disappear in 2 seconds",
    duration: 2000,
    closable: true,
  },
};

/**
 * Long duration (5 seconds)
 */
export const LongDuration: Story = {
  args: {
    type: "warning",
    message: "Take your time",
    description: "This will stay for 5 seconds",
    duration: 5000,
    closable: true,
  },
};

/**
 * Long message
 */
export const LongMessage: Story = {
  args: {
    type: "info",
    message: "Important notification with a very long title",
    description:
      "This is a longer description that provides more context about the notification. It can span multiple lines if needed.",
    duration: 0,
    closable: true,
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  args: {
    type: "info",
    message: "All variants",
    duration: 0,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast
        type="success"
        message="Success!"
        description="Operation completed"
        duration={0}
      />
      <Toast
        type="error"
        message="Error"
        description="Something went wrong"
        duration={0}
      />
      <Toast
        type="warning"
        message="Warning"
        description="Please be careful"
        duration={0}
      />
      <Toast
        type="info"
        message="Information"
        description="Here's something you should know"
        duration={0}
      />
    </div>
  ),
};

/**
 * Interactive demo with ToastProvider
 * Toasts appear at the bottom right corner
 */
const InteractiveToastDemo = () => {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">
        Click buttons to show toasts at bottom right
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            showToast({
              type: "success",
              message: "Success!",
              description: "Operation completed successfully",
              duration: 3000,
            })
          }
          className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Show Success
        </button>
        <button
          onClick={() =>
            showToast({
              type: "error",
              message: "Error!",
              description: "Something went wrong",
              duration: 3000,
            })
          }
          className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Show Error
        </button>
        <button
          onClick={() =>
            showToast({
              type: "warning",
              message: "Warning!",
              description: "Please be careful",
              duration: 3000,
            })
          }
          className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Show Warning
        </button>
        <button
          onClick={() =>
            showToast({
              type: "info",
              message: "Info",
              description: "Here's some information",
              duration: 3000,
            })
          }
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Show Info
        </button>
        <button
          onClick={() =>
            showToast({
              type: "success",
              message: "No auto-dismiss",
              description: "This toast stays until closed",
              duration: 0,
            })
          }
          className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Show Persistent
        </button>
      </div>
    </div>
  );
};

export const WithProvider: Story = {
  args: {
    type: "info",
    message: "Interactive demo",
    duration: 0,
  },
  render: () => (
    <ToastProvider>
      <InteractiveToastDemo />
    </ToastProvider>
  ),
};
