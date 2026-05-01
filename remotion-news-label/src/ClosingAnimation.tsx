import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img
} from "remotion";
import { z } from "zod";
import { closingAnimationSchema } from "./ClosingAnimationSchema";
import "./ClosingAnimation.css";

type ClosingAnimationProps = z.infer<typeof closingAnimationSchema>;

export const ClosingAnimation: React.FC<ClosingAnimationProps> = ({
  channelName,
  imageSrc = "Perfil2.PNG",
  useGreenScreen = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const entranceProgress = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
    },
    durationInFrames: 30,
  });

  const scale = interpolate(entranceProgress, [0, 1], [0.5, 1]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  const textEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15 },
  });

  const textTranslateY = interpolate(textEntrance, [0, 1], [50, 0]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  // Wow effect: continuous slow rotation and glow
  const { durationInFrames } = useVideoConfig();
  const rotation = interpolate(frame, [0, durationInFrames], [0, 10]);
  const glowPulse = interpolate(
    Math.sin(frame / 10),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: useGreenScreen ? "#00ff00" : "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="closing-container"
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div 
          className="image-container"
          style={{
            boxShadow: `0 0 40px rgba(255, 255, 255, ${glowPulse * 0.5})`,
            transform: `rotate(${rotation}deg)`
          }}
        >
          <Img 
            src={staticFile(imageSrc)} 
            className="closing-image"
          />
        </div>
        <div 
          className="channel-name"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`
          }}
        >
          {channelName}
        </div>
      </div>
    </AbsoluteFill>
  );
};
