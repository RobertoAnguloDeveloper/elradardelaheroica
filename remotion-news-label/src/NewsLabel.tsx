import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "./NewsLabel.css";
import { z } from "zod";
import { newsLabelSchema } from "./NewsLabelSchema";

type NewsLabelProps = z.infer<typeof newsLabelSchema>;

export const NewsLabel: React.FC<NewsLabelProps> = ({
  brandName,
  newsTopic,
  tickerText,
  themeColor = "#e63946",
  useGreenScreen = false,
  brandNameFontSize = "4rem",
  newsTopicFontSize = "2.5rem",
  tickerFontSize = "2rem",
  headerFontSize = "2.4rem",
  mainBackgroundColor = "rgba(29, 53, 87, 0.95)",
  tickerBackgroundColor = "rgba(0, 0, 0, 0.8)",
  headerBackgroundColor,
  topPosition,
  bottomPosition = "8%",
  leftPosition = "0px",
  rightPosition,
  padding = "0 60px",
  tickerSpeed = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();

  // Slide up animation using spring for smooth dynamics
  const entranceProgress = spring({
    frame,
    fps,
    config: {
      damping: 15,
      mass: 0.5,
    },
    durationInFrames: 24,
  });

  const translateY = interpolate(entranceProgress, [0, 1], [300, 0]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  // Pulse Glow (header bar shadow)
  const pulseAlpha = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [0.4, 0.8]
  );
  
  // Blink (dot)
  const blinkAlpha = interpolate(
    Math.sin(frame / 8),
    [-1, 1],
    [0.3, 1]
  );
  const blinkScale = interpolate(
    Math.sin(frame / 8),
    [-1, 1],
    [0.8, 1]
  );

  // Ticker animation
  const tickerTranslateX = -(frame * tickerSpeed);

  // Scanline animation
  const scanFrames = 120;
  const scanProgress = (frame % scanFrames) / scanFrames;
  const scanTop = interpolate(scanProgress, [0, 1], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: useGreenScreen ? "#00ff00" : "transparent",
      }}
    >
      <div
        className="scanline"
        style={{ top: `${scanTop}%` }}
      />
      
      <div
        className="breaking-news-label"
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
          top: topPosition,
          bottom: bottomPosition,
          left: leftPosition,
          right: rightPosition,
          padding,
        }}
      >
        <div className="label-container">
          {/* Header */}
          <div
            className="header-bar"
            style={{
              backgroundColor: headerBackgroundColor || themeColor,
              boxShadow: `0 12px 45px rgba(230, 57, 70, ${pulseAlpha})`,
              fontSize: headerFontSize,
            }}
          >
            <div
              className="dot"
              style={{
                opacity: blinkAlpha,
                transform: `scale(${blinkScale})`,
              }}
            ></div>
            Última hora
          </div>

          {/* Main Info */}
          <div className="main-bar" style={{ backgroundColor: mainBackgroundColor }}>
            <div className="brand-name" style={{ fontSize: brandNameFontSize }}>{brandName}</div>
            <div className="news-topic" style={{ fontSize: newsTopicFontSize }}>{newsTopic}</div>
          </div>

          {/* Ticker */}
          <div className="ticker-bar" style={{ backgroundColor: tickerBackgroundColor, fontSize: tickerFontSize }}>
            <div
              className="ticker-content"
              style={{
                transform: `translateX(${tickerTranslateX}px)`,
                paddingLeft: width, // Start from the right edge
              }}
            >
              {/* Repeat text enough times to fill the duration */}
              {Array(Math.ceil((durationInFrames * tickerSpeed) / 1000) + 2).fill(`${tickerText} `).join("")}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
