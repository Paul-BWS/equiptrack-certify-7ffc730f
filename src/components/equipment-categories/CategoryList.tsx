import { Wrench, ArrowUpDown, Boxes, Wind, Crosshair, Gauge, Thermometer, Cog, Scale, Ruler, BarChart3, Microscope } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export const CategoryList = () => {
  const categories = [
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Torque Wrenches",
      description: "Calibrated torque measurement tools",
      type: "torque-wrenches",
    },
    {
      icon: <ArrowUpDown className="h-8 w-8" />,
      title: "Lifting Equipment",
      description: "Hoists, lifts, and lifting accessories",
      type: "lifting-equipment",
    },
    {
      icon: <Boxes className="h-8 w-8" />,
      title: "Axle Stands",
      description: "Vehicle support and maintenance stands",
      type: "axle-stands",
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: "Fume Extraction",
      description: "Welding fume extraction systems",
      type: "fume-extraction",
    },
    {
      icon: <Crosshair className="h-8 w-8" />,
      title: "BeamSetter",
      description: "Headlight alignment systems",
      type: "beam-setter",
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "Tyre Gauges",
      description: "Tire pressure measurement tools",
      type: "tyre-gauges",
    },
    {
      icon: <Thermometer className="h-8 w-8" />,
      title: "Air Quality",
      description: "Air quality monitoring equipment",
      type: "air-quality",
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "JIG Equipment",
      description: "Precision alignment and holding tools",
      type: "jig-equipment",
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Paint Scales",
      description: "Paint mixing and measurement scales",
      type: "paint-scales",
    },
    {
      icon: <Ruler className="h-8 w-8" />,
      title: "Measuring Equipment",
      description: "Precision measurement tools",
      type: "measuring-equipment",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Pressure Gauges",
      description: "Pressure measurement instruments",
      type: "pressure-gauges",
    },
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Calibration Equipment",
      description: "Equipment calibration tools",
      type: "calibration-equipment",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.type} {...category} />
      ))}
    </div>
  );
};