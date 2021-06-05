import React from "react";
import { SvgXml } from "react-native-svg";  
export default function SvgComponent({icon}){
  const svgMarkup = icon;
  const SvgImage = () => <SvgXml xml={svgMarkup}  />;  

  return <SvgImage />;
}