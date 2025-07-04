import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    IconButton,
    useTheme,
    Paper,
    Avatar,
    Stack,
    Badge
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Home as HomeIcon,
    Settings as SettingsIcon,
    Mail as MailIcon,
    ChevronLeft as CollapseIcon,
    ChevronRight as ExpandIcon,
    ArrowBack as BackIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountIcon,
    BarChart as AnalyticsIcon,
    ListAlt as ReportsIcon,
    Person as ProfileIcon,
    Insights as InsightsIcon,

    Drafts as DraftsIcon,
    Security as SecurityIcon,
    Palette as PreferencesIcon
} from '@mui/icons-material';
import DummyComponent from "../Screen/DummyComponent.tsx";
import MultiStepForm from "../Screen/Container.tsx";

// Define TypeScript interfaces
interface NavItem {
    id: string;
    name: string;
    icon: React.ReactNode;
    component: React.ReactNode;
}

interface NavSection {
    id: string;
    icon: React.ReactNode;
    title: string;
    items: NavItem[];
}

// Content Components


const NestedSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const theme = useTheme();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        if (!isCollapsed) {
            setActiveSection(null);
            setActiveItem(null);
        }
    };

    const handleSectionClick = (sectionId: string) => {
        if (activeSection === sectionId) {
            setActiveSection(null);
            setActiveItem(null);
        } else {
            setActiveSection(sectionId);
            setIsCollapsed(false);
            // Set first item as active by default
            const section = navSections.find(s => s.id === sectionId);
            if (section && section.items.length > 0) {
                setActiveItem(section.items[0].id);
            }
        }
    };

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
    };

    // Type-safe navSections array
    const navSections: NavSection[] = [
        {
            id: 'dashboard',
            icon: <HomeIcon />,
            title: 'Dashboard',
            items: [
                {
                    id: 'overview',
                    name: 'Overview',
                    icon: <HomeIcon fontSize="small" />,
                    component: <DummyComponent />
                },
                {
                    id: 'analytics',
                    name: 'Analytics',
                    icon: <AnalyticsIcon fontSize="small" />,
                    component: <DummyComponent />
                },
                {
                    id: 'reports',
                    name: 'Reports',
                    icon: <ReportsIcon fontSize="small" />,
                    component: <Box p={3}><Typography variant="h5">Reports Dashboard</Typography></Box>
                }
            ]
        },
        {
            id: 'profile',
            icon: <PeopleIcon />,
            title: 'Profile',
            items: [
                {
                    id: 'profile-setup',
                    name: 'Profile Setup',
                    icon: <ProfileIcon fontSize="small" />,
                    component:

                        <MultiStepForm />
                },
                {
                    id: 'view-profile',
                    name: 'View Profile',
                    icon: <AccountIcon fontSize="small" />,
                    component: <Box p={3}><Typography variant="h5">Profile Viewer</Typography></Box>
                },
                {
                    id: 'insights',
                    name: 'Insights',
                    icon: <InsightsIcon fontSize="small" />,
                    component: <Box p={3}><Typography variant="h5">User Insights</Typography></Box>
                }
            ]
        },
        {
            id: 'messages',
            icon: <MailIcon />,
            title: 'Messages',
            items: [
                {
                    id: 'inbox',
                    name: 'Inbox',
                    icon: <MailIcon fontSize="small" />,
                    component: <DummyComponent/>
                },
                {
                    id: 'sent',
                    name: 'Sent Messages',
                    icon: <DraftsIcon fontSize="small" />,
                    component: <DummyComponent/>
                },
                {
                    id: 'drafts',
                    name: 'Drafts',
                    icon: <DraftsIcon fontSize="small" />,
                    component: <DummyComponent/>
                }
            ]
        },
        {
            id: 'settings',
            icon: <SettingsIcon />,
            title: 'Settings',
            items: [
                {
                    id: 'account',
                    name: 'Account Settings',
                    icon: <SettingsIcon fontSize="small" />,
                    component: <Box p={3}><Typography variant="h5">Account Settings</Typography></Box>
                },
                {
                    id: 'security',
                    name: 'Security',
                    icon: <SecurityIcon fontSize="small" />,
                    component: <Box p={3}><Typography variant="h5">Security Settings</Typography></Box>
                },
                {
                    id: 'preferences',
                    name: 'Preferences',
                    icon: <PreferencesIcon fontSize="small" />,
                    component: <Box p={3}><Typography variant="h5">User Preferences</Typography></Box>
                }
            ]
        }
    ];

    // Find the active section and active item
    const activeNavSection = navSections.find(s => s.id === activeSection);
    const activeNavItem = activeNavSection?.items.find(i => i.id === activeItem);

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Main Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: isCollapsed ? 64 : 64, // Fixed width for both states
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 64,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        borderRight: `1px solid ${theme.palette.divider}`,
                    },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    minHeight: 64
                }}>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
                    </IconButton>
                </Box>
                <Divider />

                <List sx={{ py: 0 }}>
                    {navSections.map((section) => (
                        <ListItem key={section.id} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                selected={activeSection === section.id}
                                onClick={() => handleSectionClick(section.id)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: 'center',
                                    px: 0,
                                    '&.Mui-selected': {
                                        backgroundColor: theme.palette.action.selected,
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: theme.palette.action.selected,
                                    },
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        color: activeSection === section.id ? theme.palette.primary.main : 'inherit'
                                    }}
                                >
                                    {section.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Nested Sidebar */}
            {activeSection && activeNavSection && (
                <Drawer
                    variant="permanent"
                    anchor="left"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            borderRight: `1px solid ${theme.palette.divider}`,
                            left: 64,
                        },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        minHeight: 44,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {activeNavSection.title}
                        </Typography>
                        <IconButton
                            onClick={() => {
                                setActiveSection(null);
                                setActiveItem(null);
                            }}
                            sx={{ color: theme.palette.primary.contrastText }}
                        >
                            <BackIcon />
                        </IconButton>
                    </Box>
                    <Divider />

                    <List>
                        {activeNavSection.items.map((item) => (
                            <ListItem key={item.id} disablePadding>
                                <ListItemButton
                                    selected={activeItem === item.id}
                                    onClick={() => handleItemClick(item.id)}
                                    sx={{
                                        py: 1.5,
                                        pl: 3,
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.action.selected,
                                            borderLeft: `3px solid ${theme.palette.primary.main}`,
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: theme.palette.action.selected,
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        primaryTypographyProps={{
                                            variant: 'body1',
                                            fontWeight: activeItem === item.id ? 'medium' : 'normal'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}

            {/* Main Content Area */}
            <Box component="main" sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                backgroundColor: '#f8f9fa',
                marginTop:"5%",
                marginInline: "auto !important",
                marginLeft: `${activeSection ? 304 : 64}px`,
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}>
                {/* App Bar */}
                <Box sx={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 3,
                    backgroundColor: 'white',
                    boxShadow: theme.shadows[1],
                    zIndex: 10
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
                        {activeNavItem?.name || 'Dashboard'}
                    </Typography>


                </Box>

                {/* Content Area */}
                <Box sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 3
                }}>
                    {activeNavItem ? (
                        activeNavItem.component
                    ) : (
                        <Box sx={{
                            maxWidth: 800,
                            backgroundColor: 'white',
                            p: 4,
                            borderRadius: 2,
                            boxShadow: theme.shadows[2],
                            margin: '0 auto',
                            textAlign: 'center'
                        }}>
                            <DashboardIcon sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2 }} />
                            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
                                Welcome to the Dashboard
                            </Typography>


                        </Box>
                    )}
                </Box>

                {/* Footer */}

            </Box>
        </Box>
    );
};

export default NestedSidebar;