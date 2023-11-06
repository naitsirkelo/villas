import {
  AppShell,
  Group,
  Space,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Icon, IconLayoutGrid, IconSearch } from "@tabler/icons-react";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <AppShell navbar={{ width: 305, breakpoint: "xs", collapsed: {} }}>
      <AppShell.Navbar
        styles={{ navbar: { border: "none" } }}
        style={{ background: "#fbfbff" }}
      >
        <Stack align="center" style={{ position: "relative" }}>
          <Space h="xl" />
          <Space h="xs" />
          <Stack align="start" style={{ width: "75%" }} gap={0}>
            <NavButton to="dashboard" icon={IconLayoutGrid}>
              Kontrollpanel
            </NavButton>
            <NavButton to="graphs" icon={IconSearch}>
              Grafer
            </NavButton>
          </Stack>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

const NavButton: React.FC<{
  to: string;
  children: string;
  icon: Icon;
}> = ({ to, children: child, icon: Icon }) => {
  const location = useLocation();
  const theme = useMantineTheme();
  const { hovered, ref } = useHover<HTMLAnchorElement>();

  const active = location.pathname.startsWith("/" + to);

  return (
    <UnstyledButton
      ref={ref}
      component={NavLink}
      to={to}
      p="md"
      w="100%"
      styles={{
        root: {
          display: "flex",
          background: active ? "white" : undefined,
          boxShadow: active ? theme.shadows.sm : undefined,
          borderRadius: theme.radius.lg,
          color: theme.colors[theme.primaryColor][theme.primaryShade as number],
        },
      }}
    >
      <Group opacity={hovered || active ? 1 : 0.5}>
        <Icon size={24} />
        <Text size="lg">{child}</Text>
      </Group>
    </UnstyledButton>
  );
};
