import { useState } from 'react';
import { AiOutlineBarChart, } from 'react-icons/ai';
import { PiMathOperationsThin, PiGraduationCapThin } from 'react-icons/pi';
import { TfiMedall } from 'react-icons/tfi';

import "../Pmu/style.css"; // Ensure this path is correct
import { CiSettings } from "react-icons/ci";
import ProjectSetup from '../GeneralSettings/ProjectSetup/AddProjectSetup';
import PartnerOrganizationSetup from '../GeneralSettings/PartnerOrganizationSetup/PartnerOrganizationSetup';
import ProjectWisePartnerOrganizationMapping from '../GeneralSettings/ProjectWisePartnerOrganizationMapping/ProjectWisePartnerOrganizationMapping';

import { Drawer, List, ListItem, ListItemText, Collapse, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SectorSetup from '../GeneralSettings/SectorSetup/SectorSetup';


const App: React.FC = () => {
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [loanMgtOpen, setLoanMgtOpen] = useState(false);
    const [generalSettingsOpen, setGeneralSettingsOpen] = useState(false);
    const [trainingMgtOpen, setTrainingMgtOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

    const handleSelectComponent = (component: string) => {
        setSelectedComponent(component);
    };

    return (
        <Box className="flex h-screen ">
            <Drawer variant="permanent" className="w-64 sm:max-w-sm md:max-w-md lg:max-w-lg flex-shrink-0">
                <List className="w-full">
                    {/* Dashboard */}
                    <ListItem button onClick={() => setDashboardOpen(!dashboardOpen)}>
                        <AiOutlineBarChart className="mr-2" />
                        <ListItemText primary="Dashboard" />
                        {dashboardOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={dashboardOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className="pl-8">
                                <ListItemText primary="Submenu 1" />
                            </ListItem>
                            <ListItem button className="pl-8">
                                <ListItemText primary="Submenu 2" />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Profile */}
                    <ListItem button>
                        <TfiMedall className="mr-2" />
                        <ListItemText primary="Profile" />
                    </ListItem>

                    {/* Loan Mgt. */}
                    <ListItem button onClick={() => setLoanMgtOpen(!loanMgtOpen)}>
                        <PiMathOperationsThin className="mr-2" />
                        <ListItemText primary="Loan Mgt." />
                        {loanMgtOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={loanMgtOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className="pl-8">
                                <ListItemText primary="Submenu 1" />
                            </ListItem>
                            <ListItem button className="pl-8">
                                <ListItemText primary="Submenu 2" />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* General Settings */}
                    <ListItem button onClick={() => setGeneralSettingsOpen(!generalSettingsOpen)}>
                        <CiSettings className="mr-2" />
                        <ListItemText primary="General Settings" />
                        {generalSettingsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={generalSettingsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className="pl-8" onClick={() => handleSelectComponent('ProjectSetup')}>
                                <ListItemText primary="Project Setup" />
                            </ListItem>
                            <ListItem button className="pl-8" onClick={() => handleSelectComponent('PartnerOrganizationSetup')}>
                                <ListItemText
                                    primary="Partner Organization Setup" />
                            </ListItem>
                            <ListItem button className="pl-8" onClick={() => handleSelectComponent('SectorSetup')}>
                                <ListItemText
                                    primary="Sector Setup" />
                            </ListItem>
                            {/* Add other submenus similarly */}
                        </List>
                    </Collapse>

                    {/* Training Mgt. */}
                    <ListItem button onClick={() => setTrainingMgtOpen(!trainingMgtOpen)}>
                        <PiGraduationCapThin className="mr-2" />
                        <ListItemText primary="Training Mgt." />
                        {trainingMgtOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={trainingMgtOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className="pl-8">
                                <ListItemText primary="Projects" />
                            </ListItem>
                            {/* Add other submenus similarly */}
                        </List>
                    </Collapse>
                </List>
            </Drawer>

            <Box className="flex-grow p-4">
                {selectedComponent === 'ProjectSetup' && <ProjectSetup />}

                {selectedComponent === 'PartnerOrganizationSetup' && <PartnerOrganizationSetup />}
                {selectedComponent === 'ProjectWisePartnerOrganizationMapping' && <ProjectWisePartnerOrganizationMapping />}
                {selectedComponent === 'SectorSetup' && <SectorSetup />}
                {/* {selectedComponent === 'ProjectWiseSectorSetup' && <ProjectWiseSectorSetup />}
                {selectedComponent === 'EligibilityCriteriaSetup' && <EligibilityCriteriaSetup />}
                {selectedComponent === 'MapEligibilityCriteriaWithP0' && <MapEligibilityCriteriaWithP0 />}
                {selectedComponent === 'HolidaySetup' && <HolidaySetup />}
                {selectedComponent === 'WeekendSetup' && <WeekendSetup />}
                {selectedComponent === 'FormBuilder' && <FormBuilder />} */}

            </Box>
        </Box>
    );
};

export default App;