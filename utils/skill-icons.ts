import {
  SiKotlin,
  SiJetpackcompose,
  SiAndroid,
  SiSqlite,
  SiJunit5,
  SiSwift,
  SiOpenjdk,
  SiGit,
} from "react-icons/si";
import {
  LuBoxes,
  LuGlobe,
  LuLayers,
  LuLayoutTemplate,
  LuListOrdered,
  LuNetwork,
} from "react-icons/lu";
import { IconType } from "react-icons";

type SkillMeta = { icon: IconType; color: string };

// Brand shades, so the marquee stays blue but each icon still reads distinctly.
const BRAND = "#a8c7fa";
const BRAND_STRONG = "#7fa9f2";
const BRAND_MID = "#6f93d6";
const BRAND_DEEP = "#5b7fc0";

const skillMeta: Record<string, SkillMeta> = {
  kotlin: { icon: SiKotlin, color: BRAND_MID },
  "jetpack compose": { icon: SiJetpackcompose, color: BRAND },
  compose: { icon: SiJetpackcompose, color: BRAND },
  android: { icon: SiAndroid, color: BRAND_STRONG },
  "kotlin multiplatform": { icon: SiKotlin, color: BRAND_MID },
  coroutines: { icon: SiKotlin, color: BRAND_STRONG },
  flow: { icon: SiKotlin, color: BRAND_STRONG },
  mvvm: { icon: LuLayoutTemplate, color: BRAND_DEEP },
  "clean architecture": { icon: LuLayers, color: BRAND_DEEP },
  sdui: { icon: LuListOrdered, color: BRAND_DEEP },
  paging3: { icon: LuListOrdered, color: BRAND_DEEP },
  hilt: { icon: LuBoxes, color: BRAND_DEEP },
  room: { icon: SiSqlite, color: BRAND_DEEP },
  retrofit: { icon: LuGlobe, color: BRAND_DEEP },
  grpc: { icon: LuNetwork, color: BRAND_DEEP },
  junit: { icon: SiJunit5, color: BRAND_DEEP },
  mockito: { icon: SiJunit5, color: BRAND_DEEP },
  swiftui: { icon: SiSwift, color: BRAND_STRONG },
  java: { icon: SiOpenjdk, color: BRAND_STRONG },
  git: { icon: SiGit, color: BRAND_STRONG },
};

const fallback: SkillMeta = { icon: SiAndroid, color: BRAND };

export const getSkillIcon = (skill: string): IconType =>
  (skillMeta[skill.toLowerCase()] ?? fallback).icon;

export const getSkillColor = (skill: string): string =>
  (skillMeta[skill.toLowerCase()] ?? fallback).color;
