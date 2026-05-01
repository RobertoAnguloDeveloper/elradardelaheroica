import { z } from "zod";

export const closingAnimationSchema = z.object({
  channelName: z.string(),
  imageSrc: z.string().optional(),
  useGreenScreen: z.boolean().optional(),
  durationInSeconds: z.number().min(1).max(3600).default(30),
});

export const defaultClosingAnimationProps = {
  channelName: "EL RADAR DE LA HEROICA",
  imageSrc: "Perfil2.PNG",
  useGreenScreen: false,
  durationInSeconds: 30,
};
