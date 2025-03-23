export type SidebarSubMenuItemType = {
  title: string;
  url: string;
  icon: string;
  active: string[];
};

export type SidebarMenuItemType = {
  type: "Single" | "Collapsible";
  title: string;
  url?: string;
  icon: string;
  active: string[];
  subMenu?: SidebarSubMenuItemType[];
};

export type SidebarMenuType = {
  label: string;
  menu: SidebarMenuItemType[];
};

export const sidebarMenu: SidebarMenuType[] = [
  {
    label: "Application",
    menu: [
      {
        type: "Single",
        title: "Dashboard",
        url: "/dashboard",
        icon: "LayoutDashboard",
        active: [""],
      },
      {
        type: "Single",
        title: "Pelanggan",
        url: "/dashboard/customer",
        icon: "User",
        active: [
          "/dashboard/customer/create",
          "/dashboard/customer/:id/edit",
          "/dashboard/customer/:id/detail",
        ],
      },
      {
        type: "Single",
        title: "Produk",
        url: "/dashboard/product",
        icon: "Table",
        active: [
          "/dashboard/product/create",
          "/dashboard/product/:id/edit",
          "/dashboard/product/:id/detail",
          "/dashboard/category",
          "/dashboard/category/create",
          "/dashboard/category/:id/edit",
          "/dashboard/category/:id/detail",
        ],
      },
      {
        type: "Single",
        title: "Pesanan",
        url: "/dashboard/order",
        icon: "ShoppingBag",
        active: [
          "/dashboard/order/create",
          "/dashboard/order/:id/edit",
          "/dashboard/order/:id/detail",
        ],
      },
      {
        type: "Single",
        title: "Transaksi",
        url: "/dashboard/transaction",
        icon: "ArrowLeftRight",
        active: [
          "/dashboard/transaction/:id/detail",
          "/dashboard/payment-record/:id/detail",
        ],
      },
      {
        type: "Collapsible",
        title: "Test",
        icon: "TestTubeDiagonal",
        active: [""],
        subMenu: [
          {
            title: "Test 1",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 2",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 3",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
        ],
      },
    ],
  },
  {
    label: "Settings",
    menu: [
      {
        type: "Single",
        title: "Profile",
        url: "settings/profile",
        icon: "User",
        active: [""],
      },
      {
        type: "Single",
        title: "Reset Password",
        url: "/settings/reset-password",
        icon: "KeyRound",
        active: [""],
      },
      {
        type: "Single",
        title: "Pengguna",
        url: "/settings/user",
        icon: "Users",
        active: ["/settings/user/create"],
      },
    ],
  },
];
