import { Box } from "@mui/material";
import SideBar from "@/components/SideBar";
import menuItems from "@/components/MenuItems";

export default function Menu(): JSX.Element {
  return (
    <Box className="no-print">
      <SideBar menuItems={menuItems} />
    </Box>
  );
}
