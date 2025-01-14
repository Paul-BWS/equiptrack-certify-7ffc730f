import { useState, useEffect } from "react";

interface LiftingEquipment {
  model: string;
  serial_number: string;
  last_service_date: string;
  next_service_due: string;
  engineer: string;
  result: string;
  notes: string;
  cert_number: string;
  status: string;
  platform_condition: string;
  control_box_condition: string;
  hydraulic_hoses_condition: string;
  main_structure_inspection: string;
  oil_levels: string;
  rollers_and_guides: string;
  safety_mechanism: string;
  scissor_operation: string;
  securing_bolts: string;
  toe_guards: string;
  lubrication_moving_parts: string;
}

interface LiftingEquipmentReadings {
  date: string;
  retestDate: string;
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  result: string;
  notes: string;
  status: string;
  platform_condition: string;
  control_box_condition: string;
  hydraulic_hoses_condition: string;
  main_structure_inspection: string;
  oil_levels: string;
  rollers_and_guides: string;
  safety_mechanism: string;
  scissor_operation: string;
  securing_bolts: string;
  toe_guards: string;
  lubrication_moving_parts: string;
}

export const useLiftingEquipmentForm = (
  equipment: LiftingEquipment | null,
  isOpen: boolean
) => {
  const [readings, setReadings] = useState<LiftingEquipmentReadings>({
    date: "",
    retestDate: "",
    certNumber: "",
    model: "",
    serialNumber: "",
    engineer: "",
    result: "",
    notes: "",
    status: "ACTIVE",
    platform_condition: "PASS",
    control_box_condition: "PASS",
    hydraulic_hoses_condition: "PASS",
    main_structure_inspection: "PASS",
    oil_levels: "PASS",
    rollers_and_guides: "PASS",
    safety_mechanism: "PASS",
    scissor_operation: "PASS",
    securing_bolts: "PASS",
    toe_guards: "PASS",
    lubrication_moving_parts: "PASS"
  });

  useEffect(() => {
    if (equipment && isOpen) {
      setReadings({
        date: equipment.last_service_date || "",
        retestDate: equipment.next_service_due || "",
        certNumber: equipment.cert_number || "",
        model: equipment.model || "",
        serialNumber: equipment.serial_number || "",
        engineer: equipment.engineer || "",
        result: equipment.result || "",
        notes: equipment.notes || "",
        status: equipment.status || "ACTIVE",
        platform_condition: equipment.platform_condition || "PASS",
        control_box_condition: equipment.control_box_condition || "PASS",
        hydraulic_hoses_condition: equipment.hydraulic_hoses_condition || "PASS",
        main_structure_inspection: equipment.main_structure_inspection || "PASS",
        oil_levels: equipment.oil_levels || "PASS",
        rollers_and_guides: equipment.rollers_and_guides || "PASS",
        safety_mechanism: equipment.safety_mechanism || "PASS",
        scissor_operation: equipment.scissor_operation || "PASS",
        securing_bolts: equipment.securing_bolts || "PASS",
        toe_guards: equipment.toe_guards || "PASS",
        lubrication_moving_parts: equipment.lubrication_moving_parts || "PASS"
      });
    } else if (!isOpen) {
      setReadings({
        date: "",
        retestDate: "",
        certNumber: "",
        model: "",
        serialNumber: "",
        engineer: "",
        result: "",
        notes: "",
        status: "ACTIVE",
        platform_condition: "PASS",
        control_box_condition: "PASS",
        hydraulic_hoses_condition: "PASS",
        main_structure_inspection: "PASS",
        oil_levels: "PASS",
        rollers_and_guides: "PASS",
        safety_mechanism: "PASS",
        scissor_operation: "PASS",
        securing_bolts: "PASS",
        toe_guards: "PASS",
        lubrication_moving_parts: "PASS"
      });
    }
  }, [equipment, isOpen]);

  return { readings, setReadings };
};