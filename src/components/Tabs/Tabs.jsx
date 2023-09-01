import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LeftTab, RightTab, Tab, TabContent, TabItem, TabWrapper } from "./styles";

const Tabs = ({
  tabs,
  centralise,
  background,
  renderActionTab,
  formTab,
  leftHeader,
  rightHeader,
  midSlot,
  ...rest
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabs = (index, name) => {
    setActiveTab(index);
  };

  const ActiveTabComponent = (props) => {
    const Component = tabs[activeTab]?.component;
    return <Component {...props} activeTabName={tabs[activeTab]?.name} />;
  };
  return (
    <>
      <TabWrapper formTab={formTab}>
        {leftHeader && <LeftTab>{leftHeader}</LeftTab>}
        <Tab centralise={centralise} background={background} formTab={formTab}>
          {tabs.map((tab, index) => (
            <TabItem key={index} isActive={activeTab === index} onClick={() => handleTabs(index, tab.name)} {...rest}>
              {tab.name}
            </TabItem>
          ))}
        </Tab>
        {rightHeader && <RightTab>{rightHeader}</RightTab>}
      </TabWrapper>
      {midSlot && <Tab>{midSlot}</Tab>}
      <TabContent>
        <ActiveTabComponent {...rest} />
      </TabContent>
    </>
  );
};

export default Tabs;
