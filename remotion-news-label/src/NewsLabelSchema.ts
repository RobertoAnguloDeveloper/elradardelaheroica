import { z } from "zod";

export const newsLabelSchema = z.object({
  brandName: z.string(),
  newsTopic: z.string(),
  tickerText: z.string(),
  themeColor: z.string().optional(),
  useGreenScreen: z.boolean().optional(),
  durationInSeconds: z.number().min(1).max(3600).default(30),
  tickerSpeed: z.number().min(1).max(50).default(8),
  
  // Customizations
  brandNameFontSize: z.string().optional(),
  newsTopicFontSize: z.string().optional(),
  tickerFontSize: z.string().optional(),
  headerFontSize: z.string().optional(),
  
  mainBackgroundColor: z.string().optional(),
  tickerBackgroundColor: z.string().optional(),
  headerBackgroundColor: z.string().optional(),

  // Location customizations
  topPosition: z.string().optional(),
  bottomPosition: z.string().optional(),
  leftPosition: z.string().optional(),
  rightPosition: z.string().optional(),
  padding: z.string().optional(),
});

export const defaultNewsLabelProps = {
  brandName: "EL RADAR DE LA HEROICA",
  newsTopic: "Cartagena de Indias",
  tickerText: "MANTÉNTE INFORMADO CON LAS NOTICIAS MÁS RELEVANTES DE LA HEROICA • SIGUENOS PARA MÁS CONTENIDO • EL RADAR DE LA HEROICA • ",
  themeColor: "#e63946",
  useGreenScreen: false,
  durationInSeconds: 30,
  tickerSpeed: 8,

  brandNameFontSize: "4rem",
  newsTopicFontSize: "2.5rem",
  tickerFontSize: "2rem",
  headerFontSize: "2.4rem",
  
  mainBackgroundColor: "rgba(29, 53, 87, 0.95)",
  tickerBackgroundColor: "rgba(0, 0, 0, 0.8)",
  headerBackgroundColor: "#e63946",

  bottomPosition: "8%",
  leftPosition: "0px",
  padding: "0 60px",
};
