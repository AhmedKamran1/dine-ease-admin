import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//Styles
import { List, ListItem, ListItemIcon } from "@mui/material";
import {
  DrawerIcon,
  CustomDrawer,
  DrawerListText,
  DrawerListButton,
  DrawerListItem,
} from "../UI";

//Icons
import SummarizeIcon from "@mui/icons-material/Summarize";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const value = router.asPath.split("/");
  const [selectedPage, setSelectedPage] = useState(value[value.length - 1]);
  const [open, setOpen] = useState(false);

  const dashboardLinks = [
    {
      id: "overview",
      text: "Overview",
      icon: <SummarizeIcon />,
    },
    {
      id: "restaurant-listing",
      text: "Restaurant Listings",
      icon: <EditNoteIcon />,
    },
    {
      id: "modify-requests",
      text: "Modify Requests",
      icon: <MonetizationOnIcon />,
    },
    {
      id: "logs",
      text: "Logs",
      icon: <WorkHistoryIcon />,
    },
    {
      id: "payments",
      text: "Payments",
      icon: <MenuBookIcon />,
    },
  ];

  const handleNavDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <CustomDrawer variant="permanent" open={open} onClose={handleNavDrawer}>
        <DrawerIcon onClick={handleNavDrawer} open={open}>
          {open ? (
            <KeyboardArrowLeftIcon color="primary" fontSize="large" />
          ) : (
            <KeyboardArrowRightIcon color="primary" fontSize="large" />
          )}
        </DrawerIcon>
        <List>
          {dashboardLinks.map((item, index) => (
            <Link href={`/dashboard/${item.id}`} key={item.id}>
              <DrawerListItem>
                <DrawerListButton
                  selected={selectedPage.includes(item.id)}
                  onClick={() => setSelectedPage(item.id)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <DrawerListText primary={item.text} open={open} />
                </DrawerListButton>
              </DrawerListItem>
            </Link>
          ))}
        </List>
        <List sx={{ mt: "auto", mb: 5 }}>
          <Link href={`/`}>
            <ListItem>
              <DrawerListButton>
                <ListItemIcon>
                  <KeyboardArrowLeftIcon />
                </ListItemIcon>
                <DrawerListText primary={"Logout"} open={open} />
              </DrawerListButton>
            </ListItem>
          </Link>
        </List>
      </CustomDrawer>
      {children}
    </React.Fragment>
  );
};

export default DashboardLayout;
