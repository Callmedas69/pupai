import type { NextPage } from "next";
import SafeIframe from "./SafeIframe";

const ChartPage: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <SafeIframe
            src="https://www.dextools.io/widget-chart/en/base/pe-light/0xe31a9406b0867c5ab0e3004098f254b488f7cd57?theme=light&chartType=1&chartResolution=30&drawingToolbars=true"
            title="Pupai Chart"
            aspectRatio="4/3"
            minHeight="600px"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            allowFullScreen={true}
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
