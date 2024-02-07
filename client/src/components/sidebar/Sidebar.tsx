import React from "react";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const items: MenuProps["items"] = [
  { icon: UserOutlined, label: "Candidates" },
  { icon: UserOutlined, label: "Hi" },
  { icon: UserOutlined, label: "Hi" },
  { icon: UserOutlined, label: "Hi" },
  { icon: UserOutlined, label: "Hi" },

  // UserOutlined,
  // VideoCameraOutlined,
  // UploadOutlined,
  // BarChartOutlined,
  // CloudOutlined,
  // AppstoreOutlined,
  // TeamOutlined,
  // ShopOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
  // UploadOutlined,
  // BarChartOutlined,
  // CloudOutlined,
  // AppstoreOutlined,
  // TeamOutlined,
  // ShopOutlined,
  // UploadOutlined,
  // BarChartOutlined,
  // CloudOutlined,
  // AppstoreOutlined,
  // TeamOutlined,
  // ShopOutlined,
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.label,
}));

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          paddingTop: "20px",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={() => {
            navigate("/admin/canidates");
          }}
        />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
