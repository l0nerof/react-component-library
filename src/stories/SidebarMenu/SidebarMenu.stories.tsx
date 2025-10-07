import SidebarMenu, { MenuItem } from "@/components/SidebarMenu";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Bell,
  FileText,
  Folder,
  HelpCircle,
  Home,
  Mail,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";

const meta = {
  title: "Components/SidebarMenu",
  component: SidebarMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sidebar menu that slides in from the right with support for nested submenus. The sidebar appears in a fixed position overlaying the page content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Is the sidebar open",
    },
    title: {
      control: "text",
      description: "Sidebar title",
    },
    items: {
      control: "object",
      description: "Menu items array",
    },
    onClose: {
      action: "closed",
      description: "Callback when sidebar closes",
    },
  },
  decorators: [
    (Story, context) => {
      // Apply wrapper only in Docs view
      if (context.viewMode === "docs") {
        return (
          <div className="relative h-[700px] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <div className="p-8">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Demo Page Content
                </h3>
                <p className="text-gray-600">
                  The sidebar will slide in from the right. Toggle the "isOpen"
                  control below to see it in action.
                </p>
              </div>
            </div>
            <Story />
          </div>
        );
      }
      // In Canvas and other views, render without wrapper
      return <Story />;
    },
  ],
} satisfies Meta<typeof SidebarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple 1-level menu items
const simpleMenuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User size={20} />,
    href: "/profile",
  },
  {
    id: "documents",
    label: "Documents",
    icon: <FileText size={20} />,
    href: "/documents",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={20} />,
    href: "/settings",
  },
];

// 1-level nested menu items
const oneNestedMenuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    id: "documents",
    label: "Documents",
    icon: <Folder size={20} />,
    children: [
      {
        id: "my-docs",
        label: "My Documents",
        icon: <FileText size={20} />,
        href: "/documents/my",
      },
      {
        id: "shared-docs",
        label: "Shared Documents",
        icon: <FileText size={20} />,
        href: "/documents/shared",
      },
      {
        id: "archived-docs",
        label: "Archived",
        icon: <FileText size={20} />,
        href: "/documents/archived",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "profile-settings",
        label: "Profile",
        icon: <User size={20} />,
        href: "/settings/profile",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: <Bell size={20} />,
        href: "/settings/notifications",
      },
    ],
  },
];

// 2-level nested menu items
const twoNestedMenuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: <Folder size={20} />,
    children: [
      {
        id: "projects",
        label: "Projects",
        icon: <Folder size={20} />,
        children: [
          {
            id: "active-projects",
            label: "Active Projects",
            href: "/workspace/projects/active",
          },
          {
            id: "archived-projects",
            label: "Archived Projects",
            href: "/workspace/projects/archived",
          },
        ],
      },
      {
        id: "team",
        label: "Team",
        icon: <User size={20} />,
        children: [
          {
            id: "members",
            label: "Members",
            href: "/workspace/team/members",
          },
          {
            id: "roles",
            label: "Roles & Permissions",
            href: "/workspace/team/roles",
          },
        ],
      },
      {
        id: "shared",
        label: "Shared Files",
        icon: <FileText size={20} />,
        href: "/workspace/shared",
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: <Mail size={20} />,
    children: [
      {
        id: "messages",
        label: "Messages",
        icon: <Mail size={20} />,
        href: "/communication/messages",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: <Bell size={20} />,
        children: [
          {
            id: "all-notifications",
            label: "All Notifications",
            href: "/communication/notifications/all",
          },
          {
            id: "unread",
            label: "Unread",
            href: "/communication/notifications/unread",
          },
        ],
      },
    ],
  },
  {
    id: "help",
    label: "Help & Support",
    icon: <HelpCircle size={20} />,
    href: "/help",
  },
];

/**
 * Simple sidebar with flat menu (no nesting)
 */
export const Simple: Story = {
  args: {
    isOpen: true,
    title: "Menu",
    items: simpleMenuItems,
    onClose: () => {},
  },
};

/**
 * Sidebar with 1-level nested items
 */
export const OneLevel: Story = {
  args: {
    isOpen: true,
    title: "Navigation",
    items: oneNestedMenuItems,
    onClose: () => {},
  },
};

/**
 * Sidebar with 2-level nested items
 */
export const TwoLevel: Story = {
  args: {
    isOpen: true,
    title: "Dashboard",
    items: twoNestedMenuItems,
    onClose: () => {},
  },
};

/**
 * Without icons
 */
export const WithoutIcons: Story = {
  args: {
    isOpen: true,
    title: "Simple Menu",
    items: [
      { id: "1", label: "Dashboard", href: "/" },
      { id: "2", label: "Analytics", href: "/analytics" },
      { id: "3", label: "Reports", href: "/reports" },
      { id: "4", label: "Settings", href: "/settings" },
    ],
    onClose: () => {},
  },
};

/**
 * Custom title
 */
export const CustomTitle: Story = {
  args: {
    isOpen: true,
    title: "🎨 My Application",
    items: simpleMenuItems,
    onClose: () => {},
  },
};

/**
 * Interactive demo with toggle button
 */
const InteractiveSidebarDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen w-full bg-gray-50 p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Interactive Sidebar Demo
        </h1>
        <p className="text-gray-600">
          Click the button below to toggle the sidebar. The sidebar will slide
          in from the right.
        </p>
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Open Sidebar
          </button>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Features:</h2>
          <ul className="flex list-inside list-disc flex-col gap-2 text-gray-600">
            <li>Slides in from the right</li>
            <li>Click backdrop to close</li>
            <li>Press Escape to close</li>
            <li>Nested submenus with accordion</li>
            <li>Smooth animations</li>
            <li>Prevents body scroll when open</li>
          </ul>
        </div>
      </div>

      <SidebarMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Navigation"
        items={twoNestedMenuItems}
      />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    isOpen: false,
    items: twoNestedMenuItems,
    onClose: () => {},
  },
  render: () => <InteractiveSidebarDemo />,
};
