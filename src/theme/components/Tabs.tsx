
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const TabsViewCenter = () => {


  
  return (
    <Tabs>
    <TabList>
      <Tab>Therapy info</Tab>
      <Tab>Recent Activites </Tab>
      <Tab>Subscriptions</Tab>
      <Tab>Specilaists</Tab>
      <Tab>kids</Tab>
      <Tab>Widgets</Tab>

    </TabList>
  
    <TabPanels>
      <TabPanel>
        <p>Therapy info</p>
      </TabPanel>
      <TabPanel>
        <p>Recent Activites</p>
      </TabPanel>
      <TabPanel>
        <p>Subscriptions</p>
      </TabPanel>

      <TabPanel>
        <p>Specilaists</p>
      </TabPanel>
      <TabPanel>
        <p>kids</p>
      </TabPanel>
      <TabPanel>
        <p>Widgets</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
  );
};

export default TabsViewCenter;