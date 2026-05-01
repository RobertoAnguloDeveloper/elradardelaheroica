import { Composition } from "remotion";
import { NewsLabel } from "./NewsLabel";
import { newsLabelSchema, defaultNewsLabelProps } from "./NewsLabelSchema";
import { ClosingAnimation } from "./ClosingAnimation";
import { closingAnimationSchema, defaultClosingAnimationProps } from "./ClosingAnimationSchema";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BreakingNews-16x9"
        component={NewsLabel}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={newsLabelSchema}
        defaultProps={defaultNewsLabelProps}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * 30,
          };
        }}
      />
      <Composition
        id="BreakingNews-9x16"
        component={NewsLabel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        schema={newsLabelSchema}
        defaultProps={defaultNewsLabelProps}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * 30,
          };
        }}
      />
      <Composition
        id="ClosingAnimation-16x9"
        component={ClosingAnimation}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={closingAnimationSchema}
        defaultProps={defaultClosingAnimationProps}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * 30,
          };
        }}
      />
      <Composition
        id="ClosingAnimation-9x16"
        component={ClosingAnimation}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        schema={closingAnimationSchema}
        defaultProps={defaultClosingAnimationProps}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * 30,
          };
        }}
      />
    </>
  );
};
